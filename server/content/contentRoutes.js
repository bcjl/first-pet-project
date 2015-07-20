var contentController = require('./contentController.js');



module.exports = function(app){
  app.get('/heroes', contentController.getHeroes);
};