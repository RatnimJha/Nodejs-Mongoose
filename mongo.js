var mongoose = require('mongoose');
var http = require("http");
var url = require("url");

mongoose.connect('mongodb://localhost/test');

var mySchema = mongoose.Schema({
	username: {
		type : String,   //Datatype
		unique : true,   //Avoids dulplicacy
		required : true  //cannot be empty
	},
	password: {
		reuired : true,
		type : String
	}
});

var LoginModel = mongoose.model('Login',mySchema);


http.createServer(function(req,res){
	var uri = url.parse(req.url,true);
	var username = uri.query.username;
	var password = uri.query.password;

	var newUser = new LoginModel();
	
	newUser.username = username;
	newUser.password = password;
		newUser.save(function(err, obj){

			if(err) {
				console.log(err);
				res.end("Problem");
			}else {
				res.end("Working   " + obj);
			}

		});



	res.end("Not enetered");
}).listen(8000);



