const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://camilataborda:camila@cluster0.3igir.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise= global.Promise;

module.exports = mongoose;