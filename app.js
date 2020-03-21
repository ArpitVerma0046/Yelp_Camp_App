var express =    	require("express"),
	bodyParser = 	require("body-parser"),
    app =        	express(),
    mongoose =   	require("mongoose")




mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); 




// Schema Setup
var campgroundSchema = new mongoose.Schema({
	
	name: String,
    image: String,
	description: String
});


// We are compiling the schema into a model
var Campground = mongoose.model("Campground", campgroundSchema);



// Landing Page
app.get("/", function(req, res){
	
	res.render("landing");
	
});


// INDEX ROUTE---It shows all Campgrounds
app.get("/campgrounds", function(req, res){
	
	// Get all the campgrounds from DB
	  Campground.find({}, function(err, allCampgrounds){
		  if(err){
			  console.log(err);
		  }
		  else{
			  	res.render("index",{campgrounds: allCampgrounds});

		  }
	  });

	
});



// CREATE ROUTE---Add new Campground to DB
app.post("/campgrounds", function(req, res){
	// Get data from the form 
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {
		            name: name,
					image: image
	               };
	
		// Create a new campground and save it to database
		Campground.create(newCampground,function(err, newlyCreated){
			if(err){
				console.log(err);
			}
			// Redirect back to campground page (as GET).
			else{
				res.redirect("/campgrounds");
			}
			
		});
	
							
	
});


// NEW Route--- Shows form to create new Campground

app.get("/campgrounds/new", function(req, res){
	
	res.render("new");
		
});



// SHOW ROUTE--- Shows information about one particular Campground
app.get("/campgrounds/:id", function(req, res){
	
	res.render("show");
	
});






app.listen(3000, function(){	
console.log("Server has started");			
});