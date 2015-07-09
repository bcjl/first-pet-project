/* 
* @Author: John Winstead
* @Date:   2015-05-28 16:03:10
* @Last Modified by:   awate
* @Last Modified time: 2015-05-28 19:56:44
*/
window.React = require('react');
var AppActions = require('./actions/actions');

$ = jQuery = require('jquery');
require('../assets/lib/bootstrap/js/collapse.js');

/*  ========  Components  =======  */
var NavigationBar = require('./components/NavigationBar');

var AlliedTeam = require('./components/AlliedTeam');
var EnemyTeam = require('./components/EnemyTeam');

var HeroSelect = require('./components/HeroSelect');
var SuggestionBox = require('./components/SuggestionBox');
var AppStore = require('./stores/store');


/*  ========  Routes  =======  */
// var Main = require('./components/Main.react');


function getAllHeroes(){
  return ({ 
    HeroList: AppStore.getHeroList(),
    AlliedTeam: AppStore.getAlliedTeam(),
    EnemyTeam: AppStore.getEnemyTeam(),
    Matchups: {
      Anub: {Hatman: 40, Arthur: 60, Azmodad: 50},
      Hatman: {Anub: 60, Arthur: 50, Azmodad: 70},
      Arthur: {Anub: 40, Hatman: 50, Azmodad: 40},
      Azmodad: {Anub: 50, Hatman:30, Arthur: 60}
    },
  })
};



var App = React.createClass({

  // handler: function(){
  //   AppActions.addAllied('addAlliedTest')
  // },

  getInitialState: function( ) {
    
    return getAllHeroes();
  },
  /* == == == == == == == == == == == == == == == == */
  // Fetchers
  // These will be refactored out into FLUX eventually

  //called during initialization in function componentWillMount
  // fetchLessonList: function(){
  //   //Make ajax request to the backend api to get the list of lessons
  //   $.get( "/api/lesson/",
  //     //pass a bound function as the callback so >this< is preserved.
  //     (function( response ){
  //       //Store the response in the state
  //       this.setState({ lessonList: response });
  //     }).bind(this)
  //   );
  // },

  /* == == == == == == == == == == == == == == == == */
      /*  <div className="enemyContainer teamContainer">
        </div>
      </div>

        <div>
        <button onClick={this.handler}>Test</button>
          <HeroSelect HeroList = {this.state.HeroList} />
        </div> */

  componentWillMount: function( ) {
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
            <AlliedTeam teamComposition={this.state.AlliedTeam} />
          </div>


          <div className="enemyContainer teamContainer">
            <EnemyTeam teamComposition={this.state.EnemyTeam} />
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
