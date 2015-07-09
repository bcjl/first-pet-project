var React = require('react');

var AppActions = require('./../actions/actions');
var AppStore = require('./../stores/store');
var HeroBox = require('./HeroBox');

function alliedTeam(){
  return {allies: AppStore.getAlliedTeam()}
}

var AlliedTeam = React.createClass({
  getInitialState: function(){
    return alliedTeam();
  },

  clickHandler: function(hero){
      AppActions.removeAllied(hero);
  },

  componentWillMount: function(){
    AppStore.addChangeListener(this._onChange)
  },

  _onChange: function(){
    this.setState(alliedTeam());
  },

  render: function(){
    var that = this;
    var heroList = this.state.allies.map(function(hero, i){
      return (
        <li key={i}>
            <div onClick={ that.clickHandler.bind(that, hero) }>
              <h3>{hero}</h3>
              <HeroBox hero={hero} />
            </div>
        </li>      
      )
    });

    return (
    <div className="">
      <ul>
          { heroList }
      </ul>
    </div>
    )
  },

});

module.exports = AlliedTeam;
