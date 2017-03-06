var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DjangoSchema   = new Schema({
    name: String,
    model: { type: Buffer, contentType: String },
    code: { type: Buffer, contentType: String },

});

module.exports = mongoose.model('Django Model', DjangoSchema);
