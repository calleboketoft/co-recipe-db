export default class RecipeService {
  public static $inject = [
    '$http',
    '$q'
  ]
  constructor (
    private $http,
    private $q
  ) { }

  public allFiles = []
  public recipes = []

  public fetchFiles () {
    if (this.recipes.length > 0) {
      return this.$q((resolve) => {
        resolve(this.recipes)
      })
    } else {
        return this.$q((resolve, reject) => {
        this.$http.get('/recipes').then((res) => {
          res.data.forEach((recipe) => {
            if (recipe.specFile) {
              recipe.contentJson = JSON.parse(recipe.content)
            }
          })
          this.allFiles = res.data
          resolve(this.allFiles)
        })
      })
    }
  }

  private getRecipe (filerelpath) {
    var found
    var decodedFilerelpath = decodeURIComponent(filerelpath)
    this.allFiles.some((recipe) => {
      if (recipe.filerelpath === decodedFilerelpath) {
        found = recipe
        return true
      }
    })
    return found
  }

  public saveRecipe (recipe) {
    recipe.content = angular.toJson(recipe.contentJson)
    return this.$http.post('/recipes', recipe)
  }

  public getSelectableTags () {
    let addedTags = {}
    let selectableTags = []
    this.getFiles({specFile:true}).forEach((recipe) => {
      recipe.contentJson.tags.forEach((tag) => {
        if (!addedTags[tag]) {
          addedTags[tag] = true
          selectableTags.push({
            refValue: tag,
            displayName: tag
          })
        }
      })
    })
    return selectableTags
  }

  // options
  //   filterString
  //   typeoffile
  //   specFile
  //   filterString
  //   dirname
  public getFiles (options) {

    let filteredList = []

    // specFile = true
    // ***************
    if (options.specFile) {
      let filterStringLowerCase = options.filterString ? options.filterString.toLowerCase() : ''
      if (filterStringLowerCase === '') {
        filteredList = this.allFiles.filter((fileData) => {
          return fileData.specFile
        })
      } else {
        // Filter name and tags
        filteredList = this.allFiles.reduce((mem, fileData) => {
          if (fileData.specFile) {
            if (fileData.contentJson.englishName && fileData.contentJson.englishName.toLowerCase().indexOf(filterStringLowerCase) !== -1) {
              mem.push(fileData)
              return mem
            } else if (fileData.contentJson.originalName && fileData.contentJson.originalName.toLowerCase().indexOf(filterStringLowerCase) !== -1) {
              mem.push(fileData)
              return mem
            } else if (tagInFilter(fileData, filterStringLowerCase)) {
              mem.push(fileData)
              return mem
            }
          }
          return mem
        }, [])

        function tagInFilter (recipe, filterStrLC) {
          return recipe.contentJson.tags.some((tag) => {
            return tag.toLowerCase().indexOf(filterStrLC) !== -1
          })
        }
      }
    }

    // typeoffile || dirname
    // *********************
    else if (options.typeoffile || options.dirname) {
      if (options.typeoffile) {
        filteredList = this.allFiles.filter((file) => {
          return file.typeoffile === options.typeoffile
        })
      }

      if (options.dirname) {
        filteredList = filteredList.filter((file) => {
          return file.dirname === options.dirname
        })
      }
    }

    return filteredList
  }
}