window.React = require('react');
var AppActions = require('./actions/actions');

$ = jQuery = require('jquery');
require('../assets/lib/bootstrap/js/collapse.js');

/*  ========  Components  =======  */
var NavigationBar = require('./components/NavigationBar');

var Team = require('./components/Team');

var HeroSelect = require('./components/HeroSelect');
var SuggestionBox = require('./components/SuggestionBox');
var AppStore = require('./stores/store');


/*  ========  Routes  =======  */
// var Main = require('./components/Main.react');


function getAllHeroes(){
  return ({ 
    HeroList: AppStore.getHeroArray(),
    AlliedTeam: {
      TeamComp: AppStore.getAlliedTeam(),
      Add: AppActions.addAllied,
      Remove: AppActions.removeAllied,
      Title: 'Allied Team',
    },
    EnemyTeam: {
      TeamComp: AppStore.getEnemyTeam(),
      Add: AppActions.addEnemy,
      Remove: AppActions.removeEnemy,
      Title: 'Enemy Team',
    }
  })
};



var App = React.createClass({

  getInitialState: function( ) {
    return getAllHeroes();
  },

  componentWillMount: function( ) {
    this.setState(getAllHeroes());
  },
  componentWillUnmount: function( ) {
  },

  render: function( ) {

    return (
      <div className="pageWrapper">

        <NavigationBar />
          <div className="SuggestionBox">
          <SuggestionBox />
          </div>
      
        <div className="teamWrapper">
          <div className="allyContainer teamContainer">
            <Team team={this.state.AlliedTeam} />
          </div>


          <div className="enemyContainer teamContainer">
            <Team team={this.state.EnemyTeam} />
          </div>
        </div>

        <div>
          <HeroSelect HeroList = {this.state.HeroList} />
        </div>

    </div>
    )
  }
});



React.render(<App />, document.getElementById('app'));
