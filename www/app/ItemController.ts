export default class ItemController {
  public static $inject = ['recipe', '$window', 'recipeService']
  constructor (
    public recipe,
    private $window,
    private recipeService
  ) {
    this.getSelectableTags()

    this.images = this.recipeService.getFiles({
      typeoffile: 'image',
      dirname: this.recipe.dirname
    })
  }

  public selectableItemsTrigger = 0

  public cancelEdit () {
    if (this.$window.confirm('sure you want to cancel?')) {
      this.$window.location.reload()
    }
  }

  public saveChanges () {
    this.recipeService.saveRecipe(this.recipe).then(() => {
      this.editing = false
    })
  }

  public getSelectableTags () {
    this.selectableTags = this.recipeService.getSelectableTags()
  }

  public addTag (newTag) {
    if (newTag) {
      let tagExist = this.recipe.contentJson.tags.some((tag) => {
        return tag === newTag
      })
      if (!tagExist) {
        this.recipe.contentJson.tags.push(newTag)
        this.selectableTags = this.recipeService.getSelectableTags()
        this.selectableItemsTrigger++
      } else {
        this.$window.alert('this recipe already has that tag')
      }
      this.clearTagField()
    }
  }

  private clearTagField () {
    this.newTag = ''
  }

  public selectNewMainImage (mainImage) {
    this.recipe.contentJson.mainImage = mainImage.filename
  }

  public addRecipeText (newRecipeType) {
    console.log('add', newRecipeType)
    this.recipe.contentJson.recipeTexts.push({
      format: newRecipeType,
      language: 'english'
    })
  }

  public removeRecipeText (index) {
    this.recipe.contentJson.recipeTexts.splice(index, 1)
  }

  public selectNewRecipeTextImage (recipeText, fileName) {
    recipeText.fileName = fileName
  }
  
  public addTagKeydown($event, newTag) {
    if ($event.keyCode === 13) {
      this.addTag(newTag)
    }
  }
}
