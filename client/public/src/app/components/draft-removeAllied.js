var React = require('react');
var AppActions = require('./../actions/actions');

var addAllied = React.createClass({
  handler: function(){
    AppActions.removeAllied(this.props.hero);
  },
  render: function(){
    return (
      <button onClick={this.handler}>RemoveThisHero</button>
    )
  }
})