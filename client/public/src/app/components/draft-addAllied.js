var React = require('react');
var AppActions = require('./../actions/actions');

var addAllied = React.createClass({
  handler: function(){
    AppActions.addItem(this.props.hero);
  },
  render: function(){
    return (
      <button onClick={this.handler}>TestClicky</button>
    )
  }
})