// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var multer  = require('multer');
var storage = multer.memoryStorage()

var uml_functions = require('./scripts')

var mongoose   = require('mongoose');
mongoose.connect('mongodb://camilo:test@ds041623.mlab.com:41623/labmongo');

var DModel = require('./app/models/django_model.js');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multer({ storage: storage}).single('model'))

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

// on routes that end in /bears
// ----------------------------------------------------
router.route('/djmodels')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        var dmodel = new DModel();      // create a new instance of the Django model
        dmodel.name = req.body.name;  // set the name (comes from the request)
        dmodel.model = req.file.buffer //Sets the file
        var uml_decoded = JSON.parse(req.file.buffer.toString("utf-8"))
        var pymodel = uml_functions.convert_mdj(uml_decoded);
        dmodel.code = new Buffer(pymodel, 'utf8');


        //save the model and check for errors
        dmodel.save(function(err) {
            if (err)
                res.send(err);
            else
              res.json({ message: 'Model created!', model: pymodel});
        });


      })
        // get all the models (accessed at GET http://localhost:8080/api/models)
      .get(function(req, res) {
          DModel.find(function(err, models) {
            if (err)
                res.send(err);

            res.json(models);
        });
      });




// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
