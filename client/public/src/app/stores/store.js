
var AppDispatcher = require('../dispatcher/dispatcher');
var AppConstants = require('../constants/constants');
var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';
var ServerData = require('./../constants/data');

var _heroData = {};
var _heroSelection = [];
var _heroWinCalcs = {};
var _sortedSuggestionList = [];

//Fill up hero selection from base server data
//may keep server data as a default if fetch from server fails.

//immediately invoked function once to populate heroSelection.
function _updateFromServer(){
  for(var i = 0; i < ServerData.length; i++){
    _heroSelection.push(ServerData[i].name);
    _heroData[ServerData[i].name] = ServerData[i];
  }
};
_updateFromServer();

//Utility function for handling the input
function _percentConverter(stringPercent){
  return parseFloat(stringPercent);
};

function _calculateAllyWinPoints(hero){
  var percentChances = [];
  var output = hero.overall_win ? _percentConverter(hero.overall_win) : 50;
  
  for(var i = 0; i < _enemyTeam.length; i++){
    var currentMatchCheck = hero.matchups[_enemyTeam[i]] ? hero.matchups[_enemyTeam[i]] : 50;
    percentChances.push(_percentConverter(currentMatchCheck));
  }

  for(var j = 0; j < percentChances.length; j++){
    output += percentChances[j]
  }
  return (output/(percentChances.length + 1)).toFixed(2);
};

//Efficiency thoughts, can't memoize due to potential for
//stats to change on new scrape, which wouldn't get taken into acct
//Maybe persist last 1-2 permutations? Possibly more, space is cheap.
function _populateSuccessChances(){
  var currentHeroName = "";
  for(var i = 0; i < _heroSelection.length; i++){
    currentHeroName = _heroSelection[i];
    _heroWinCalcs[currentHeroName] = _calculateAllyWinPoints(_heroData[currentHeroName]);
  }
};

function _calculateEnemyWinPoints(hero){

};

// Takes in object, calls sort (JS natively sorts via quicksort)
//in descending order from the callback, returns a new sorted array
function _sortObjectValues(obj){
  var sortedList = Object.keys(obj).sort(function(a,b){return obj[b]-obj[a]});
  var newSortedPercents
  return sortedList;
};


//Prevents a hero from being drafted twice, from either team
//May expand for future websocket 2 players drafting simultaneously
function _alreadySelectedCheck(hero){
  if(_alliedTeam.indexOf(hero) === -1 && _enemyTeam.indexOf(hero) === -1){
    return true;
  } else {
    alert(hero + ' is already drafted!');
    return false;
  }
};

var _alliedTeam = [];

function _addAlliedHero(hero){
  if(_alliedTeam.length < 5 && _alreadySelectedCheck(hero)){
    _alliedTeam.push(hero);
  } else {
    console.log("failed to add hero");
  }
};

function _removeAlliedHero(hero){
  var index = _alliedTeam.indexOf(hero);
  if(index > -1){
    _alliedTeam.splice(index, 1);
  }
}


var _enemyTeam = [];

function _addEnemyHero(hero){
  if(_enemyTeam.length < 5 && _alreadySelectedCheck(hero)){
    _enemyTeam.push(hero);
  } else {
    console.log("failed to add to enemies");
  }
};

function _removeEnemyHero(hero){
  var index = _enemyTeam.indexOf(hero);
  if(index > -1){
    _enemyTeam.splice(index, 1);
  }
}

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

  getHeroList: function(){
    return _heroSelection;
  },

  getPercents: function(){
    _populateSuccessChances();
    // console.log(_heroWinCalcs);
    return _heroWinCalcs;
  },

  getSuggestions: function(){
    var testval = _sortObjectValues(_heroWinCalcs);
    // console.log(testval);
    return _sortObjectValues(_heroWinCalcs);
  },

  dispatcherIndex: AppDispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType){
      case AppConstants.ADD_ALLIED:
        _addAlliedHero(payload.action.hero);
        break;

      case AppConstants.REMOVE_ALLIED:
        _removeAlliedHero(payload.action.hero);
        break;

      case AppConstants.ADD_ENEMY:
        _addEnemyHero(payload.action.hero);
        break;

      case AppConstants.REMOVE_ENEMY:
        _removeEnemyHero(payload.action.hero);
        break;
    }

    AppStore.emitChange();

    return true;
  })

});

module.exports = AppStore;

