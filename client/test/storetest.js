require('../setup');
var React = require('react/addons'),
    assert = require('assert'),
    expect = require('chai').expect,
    Store = require('../../public/src/app/stores/store'),
    TestUtils = React.addons.TestUtils;

// describe('LoginOverlay component', function(){
//   before('render and locate element', function() {
//     var testFunction = function(){
//       return 0;
//     }
//     var renderedComponent = TestUtils.renderIntoDocument(
//       <LoginOverlay 
//         overlayState = "block"
//         closeLogin = { testFunction }
//         />
//     );

//     //Search for tag with class "loginContainer" within rendered React component
//     //Throws an exception if not found
//     var containerComponent = TestUtils.findRenderedDOMComponentWithClass(
//       renderedComponent,
//       'loginContainer'
//     );

//     var closeComponent = TestUtils.findRenderedDOMComponentWithClass(
//       renderedComponent,
//       'closeOverlay'
//     );

//     this.componentObject = renderedComponent;
//     this.containerElement = containerComponent.getDOMNode();
//     this.closeElement = closeComponent.getDOMNode();
//   });

  it('should have 3 data structures', function(){
    assert(!!Store._heroData)
    // var _heroSelection = [];
    // var _heroWinCalcs = {};
  });

  
// })