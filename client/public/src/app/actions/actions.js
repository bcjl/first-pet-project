var AppConstants = require('./../constants/constants');
var AppDispatcher = require('./../dispatcher/dispatcher');

var AppActions = {
  addAllied: function(hero){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.ADD_ALLIED,
      hero: hero
    })
  },
  removeAllied: function(hero){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.REMOVE_ALLIED,
      hero: hero
    })
  },
  addEnemy: function(hero){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.ADD_ENEMY,
      hero: hero
    })
  },
  removeEnemy: function(hero){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.REMOVE_ENEMY,
      hero: hero
    })
  },
  loadHeroes: function(){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.LOADING_HEROES,
    })
  },
}

module.exports = AppActions;