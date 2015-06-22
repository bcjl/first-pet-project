var React = require('react');

var Gallery = React.createClass({
  getDefaultProps: function(){
    display: "default"
  },
  propTypes: {
    display: React.prototypes.string,
  },
  loadNewImages: function(){
    console.log("failed to load new images");
  },
  render: function(){
    return ( 
      <div className="GalleryContainer">
      Insert Images here
      <h1>Currently Set To { this.props.display } Visuals</h1>

      <button onClick=loadNewImages>Button Label</button>
      </div>
    )
  }
});

modules.exports = Gallery;