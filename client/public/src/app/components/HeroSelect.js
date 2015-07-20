var React = require('react');

var AppStore = require('./../stores/store');
var AppActions = require('./../actions/actions');
var HeroBox = require('./HeroBox');


function Handler(hero){
  AppActions.addAllied(hero);
}

var HeroSelect = React.createClass({
  clickHandler: function(hero){
    this.setState({currentSelection: hero.name});
  },
  toAlly: function(){
    if(this.state.currentSelection !== "None"){
      AppActions.addAllied(this.state.currentSelection);
    } else {
      console.log('Select a hero first!');
    }
  },
  toEnemy: function(){
    if(this.state.currentSelection !== "None"){
      AppActions.addEnemy(this.state.currentSelection);
    } else {
      console.log('Select a hero first!');
    }
  },

  getInitialState: function(){
    return {
      currentSelection: 'None'
    };
  },
  componentWillMount: function( ) {
    // console.log('props for select', this.props.HeroList);
    // AppActions.loadHeroes();
  },
  render: function() {
    var that = this;
    var heroes = this.props.HeroList.map(function(hero, i){
      return (
        <span key = {i}>
        <li>
          <div onClick={ that.clickHandler.bind(that, hero)} >
            <HeroBox hero={hero.name} />
          </div>
        </li>
        </span>
      )
    })


    return (
      <div className="selectionWrapper">
        <div className="currentSelectionContainer">
          <button onClick={ this.toAlly }>Ally</button>
          <button onClick={ this.toEnemy }>Enemy</button>
          <div>{ this.state.currentSelection }</div>
        </div>

        <ul id="categories" className="clr">
          { heroes }
        </ul>
      </div>
    )
  }
})

module.exports = HeroSelect;
