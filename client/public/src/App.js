// Framework connection
window.React = require('react');

//Components

//Routes
var Gallery = require('./components/gallery.react');

// App

var App = React.createClass({
  getInitialState: function(){
    return {
      display: "notdefault"
    }
  },
  render: function(){
    <div className="AppContainer">
      <Gallery display = { this.state.display }/>
    </div>
  }
});