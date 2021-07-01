var express = require('express');
var router = express.Router();

router.get('/', function(req,res) {
  /**
   * request datails here..
   * 
   */
  console.log('------ share')
  res.render('bot', { 
    url: "http://dev-fan.vom.world/share/UmVxdWVzdFR5cGU6MjMx", 
    title: "TALENT | VOM", 
    descriptionText: "Message From Talent", 
    imageUrl : "http://dev-fan.vom.world/ogp.png"
  }); 
});


module.exports = router;