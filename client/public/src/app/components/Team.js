var React = require('react');

var AppActions = require('./../actions/actions');
var AppStore = require('./../stores/store');
var HeroBox = require('./HeroBox');


var AlliedTeam = React.createClass({

  clickHandler: function(hero){
    this.props.team.Remove(hero);
  },

  componentWillMount: function(){
    AppStore.addChangeListener(this._onChange)
  },

  _onChange: function(){
    this.forceUpdate();
  },

  render: function(){
    var that = this;
    var heroList = this.props.team.TeamComp.map(function(hero, i){
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
      <h3>{this.props.team.Title}</h3>
      <ul>
          { heroList }
      </ul>
    </div>
    )
  },

});

module.exports = AlliedTeam;
