var path=require('path');
var route=require('../route.js').create();
module.exports=function(app){
	route.attach(app);
};


function getImage(req,res){
	console.log(req.params.imageid);
  res.sendFile(path.resolve("pubs/images/product_icon.png"));
}
function sendImageFile(res,imageFilePath){

}
route.get('/image/:imageid',getImage);
route.get('/image/:imageid-:width-:height',getImage);