var React = require('react');

var AppActions = require('./../actions/actions');
var AppStore = require('./../stores/store');
var HeroBox = require('./HeroBox');
function calcWin(){
  return {
    winSet: AppStore.getPercents(), 
    sorted: AppStore.getSuggestions(), 
    allied: AppStore.getAlliedTeam(), 
    enemies: AppStore.getEnemyTeam()
  }
}

var SuggestionBox = React.createClass({
  getInitialState: function(){
    return calcWin();
  },

  // clickHandler: function(hero){
  //   AppActions.removeAllied(hero);
  // },

  componentWillMount: function(){
    AppStore.addChangeListener(this._onChange)
  },

  _onChange: function(){
    this.setState(calcWin());
  },

  render: function(){
    var that = this;
    var mapInputs = [];
    for(var i = 0; mapInputs.length < 5; i++){
      var checkedHero = this.state.sorted[i];
      if(this.state.allied.indexOf(checkedHero) === -1 && this.state.enemies.indexOf(checkedHero) === -1){
        mapInputs.push([checkedHero, this.state.winSet[checkedHero]]);
      }
    }
    var suggestionList = mapInputs.map(function(heroPercentBucket, i){
      return (
        <li>
          <div className="SuggestionBoxEntry">
            <HeroBox hero={heroPercentBucket[0]} />
            <p>{heroPercentBucket[0]}</p>
            <p>{heroPercentBucket[1]}</p>
          </div>
        </li>
      )
    })
    return (
    <div className="">
      <ul>
        { suggestionList }
      </ul>
    </div>
    )
  },

});

module.exports = SuggestionBox;
