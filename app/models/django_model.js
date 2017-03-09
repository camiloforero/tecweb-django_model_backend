var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DjangoSchema   = new Schema({
    model_name: String,
    person_name: String,
    model: { type: Buffer, contentType: String },
    code: String,

});

module.exports = mongoose.model('Django Model', DjangoSchema);
