var React = require('react');


var HeroBox = React.createClass({
  propTypes: {
    hero: React.PropTypes.string.isRequired
  },
  cleanHeroName: function(name){
    return name.replace(/[^-a-z0-9]/ig,'');
  },

  render: function() {

      return (
        <img src={ "./../../assets/images/portraits/" + this.cleanHeroName(this.props.hero) + ".png" } alt="" />
      )
  }
})

module.exports = HeroBox;
