var AppDispatcher = require('../dispatcher/dispatcher');
var AppConstants = require('../constants/constants');
var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';


/* ======= Store State Variables ======= */

var _alliedTeam = [];
var _enemyTeam = [];
var _heroArray = [];
// Extra hashtable to allow referencing heroes by name
var _heroData = {};


// Hardcoded placeholder data, remove when Web API util is complete
var defaultData = require('./../constants/data');
_heroArray = defaultData;

/* ======= Store data initialization ======= */

(function _updateFromServer(){
  $.get('/api/heroes', (
    function(response){
      _heroArray = JSON.parse(response);
    }
  ));
}());

// Immediately invoked function for populating hero data offline
(function _populateDefaultHeroes(){
  for(var i = 0; i < _heroArray.length; i++){
    _heroData[_heroArray[i].name] = _heroArray[i];
  }
}())

/* ======= Store Suggestion Utilities ======= */

//Convert data from string format to float
function _percentConverter(stringPercent){
  return parseFloat(stringPercent);
};

// Calculate for input hero score for suggestion rankings
function _calculatePoints(hero){
  var matchupPercents = [];
  // Allows calculation with missing overall data (due to parsing or scraping errors)
  var currentSum = hero.overall_win ? _percentConverter(hero.overall_win) : 50;
  for(var i = 0; i < _enemyTeam.length; i++){
    var currentMatchCheck = hero.matchups[_enemyTeam[i]] ? hero.matchups[_enemyTeam[i]] : 50;
    matchupPercents.push(_percentConverter(currentMatchCheck));
  }
  for(var j = 0; j < matchupPercents.length; j++){
    currentSum += matchupPercents[j]
  }
  return (currentSum/(matchupPercents.length + 1)).toFixed(2);
};

// Native quicksort of an object by values in descending order into an array
function _sortObjectValues(obj){
  var sortedList = Object.keys(obj).sort(function(a,b){return obj[b]-obj[a]});
  return sortedList;
};

// Produce a sorted array of hero names
function _generateSuggestions(heroArray){
  var heroArrayCopy = heroArray.slice();
  var suggestions = heroArrayCopy.sort(function(a,b){
    return b.score - a.score;
  }).map(function(d){
    return d.name;
  })
  return suggestions;
};

// Checks if target hero is already drafted
function _alreadySelected(hero){
  if(_alliedTeam.indexOf(hero) === -1 && _enemyTeam.indexOf(hero) === -1){
    return true;
  } else {
    return false;
  }
};

//Checks if too many tanks/healers have already been drafted
function _checkRole(hero){
  //This object could become a property on teams
  var composition = {
    1: 0,
    2: 0,
    3: 0,
    4: 0
  };
  for(var i = 0; i < _alliedTeam.length; i++){
    composition[_alliedTeam[i].role]++;
  }
  if((hero.role === 1 || hero.role === 2) && composition[hero.role] > 2 ){
    return false;
  } else {
    return true;
  }
};

// Mutates input and adds/updates score property
function _updateScores(heroArray){
  for(var i = 0; i < heroArray.length; i++){
    heroArray[i].score = _calculatePoints(heroArray[i]);
  }
};

/* ======= Store Action Utilities ======= */

function _addHero(hero, team){
  if(team.length < 5 && _alreadySelected(hero)){
    team.push(hero);
  } else {
    console.log("Error: Failed to add " + hero + " to team");
  }
};

function _removeHero(hero, team){
  var index = team.indexOf(hero);
  if(index > -1){
    team.splice(index, 1);
  } else {
    console.log("Error: Failed to find " + hero + " in target team");
  }
};

/* ======= Exported Object / Interface ======= */

var AppStore = assign(EventEmitter.prototype, {
  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAlliedTeam: function(){
    return _alliedTeam;
  },

  getEnemyTeam: function(){
    return _enemyTeam;
  },

  getHeroArray: function(){
    return _heroArray;
  },

  getSuggestions: function(){
    _updateScores(_heroArray);
    var output = _generateSuggestions(_heroArray).filter(_alreadySelected);
    return output;
  },

  /* ======= Dispatcher Routing (Setters) ======= */

  dispatcherIndex: AppDispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType){
      case AppConstants.ADD_ALLIED:
        _addHero(payload.action.hero, _alliedTeam);
        break;

      case AppConstants.REMOVE_ALLIED:
        _removeHero(payload.action.hero, _alliedTeam);
        break;

      case AppConstants.ADD_ENEMY:
        _addHero(payload.action.hero, _enemyTeam);
        break;

      case AppConstants.REMOVE_ENEMY:
        _removeHero(payload.action.hero, _enemyTeam);
        break;
    }

    // Upon any dispatched action, signal change event to trigger update
    AppStore.emitChange();
    return true;
  })
});

module.exports = AppStore;
