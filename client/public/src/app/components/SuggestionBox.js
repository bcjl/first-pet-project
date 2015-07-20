var React = require('react');

var AppActions = require('./../actions/actions');
var AppStore = require('./../stores/store');
var HeroBox = require('./HeroBox');
function calcWin(){
  console.log(AppStore.getSuggestions());
  return {
    suggestions: AppStore.getSuggestions()
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
    AppStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    AppStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState(calcWin());
  },

  render: function(){
    var cutSuggestions = this.state.suggestions.slice(0,5);
    var suggestionList = cutSuggestions.map(function(heroname, i){
        return (
          <li key = {i}>
            <div className="SuggestionBoxEntry">
              <HeroBox hero={heroname} />
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
