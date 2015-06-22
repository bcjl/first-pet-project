var React = require('react');

var Gallery = React.createClass({
  getDefaultProps: function(){
    display: "default"
  },
  propTypes: {
    display: React.prototypes.string,
  },
  render: function(){
    return ( 
      <div className="GalleryContainer">
      Insert Images here
      <h1>Currently Set To { this.props.display } Visuals</h1>
      </div>
    )
  }
});

modules.exports = Gallery;