var React = require('react');

var AppActions = require('./../actions/actions');
var AppStore = require('./../stores/store');
var HeroBox = require('./HeroBox');

function enemyTeam(){
  return {enemies: AppStore.getEnemyTeam()}
}

var EnemyTeam = React.createClass({
  getInitialState: function(){
    return enemyTeam();
  },

  clickHandler: function(hero){
    AppActions.removeEnemy(hero);
  },

  componentWillMount: function(){
    AppStore.addChangeListener(this._onChange)
  },

  _onChange: function(){
    this.setState(enemyTeam());
  },

  render: function(){
    var that = this;
    var heroList = this.state.enemies.map(function(hero, i){
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
      <h3>Enemy Team</h3>
      <ul>
          { heroList }
      </ul>
    </div>
    )
  },

});

module.exports = EnemyTeam;
