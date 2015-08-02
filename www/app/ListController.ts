export default class ListController {
  public static $inject = [
    '$state',
    'recipeService',
    '$scope',
    'allFiles'
  ]
  constructor (
    private $state,
    private recipeService,
    private $scope
    private allfiles
  ) {
    $scope.$watch(() => this.recipeFilter, () => {
      this.getRecipes()
    })
    this.getNewRecipes()
  }

  public recipeFilter = ''

  public getRecipes () {
    this.filteredRecipes = this.recipeService.getFiles({specFile: true, filterString: this.recipeFilter})
  }

  public goToItem (item) {
    this.$state.go('root.item', { itemId: item.filerelpath })
  }

  public getNewRecipes () {
    this.newRecipes = this.recipeService.getNewRecipes()
  }
}
