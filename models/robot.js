const mongoose    = require("mongoose");
mongoose.Promise  = require("bluebird");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');


const robotSchema = new mongoose.Schema({

  username: {type: String, required: true, unique: true},
  passwordHash: {type: String, required: true, unique: true},
  name: {type: String, required: true, unique: true},
  avatar: String,
  email: {type: String},
  university: {type: String},
  job: {type: String},
  company: {type: String},
  skills: [ {type: String}],
  phone: {type: Number},
  address: {
    street_num: Number,
    street_name: String,
    city: String,
    state_or_province: String,
    postal_code: String,
    country: String
  }
});



robotSchema.virtual('password')
    .get(function() {
        return null
    })
    .set(function(value) {
        const hash = bcrypt.hashSync(value, 8);
        this.passwordHash = hash;
    })

robotSchema.methods.authenticate = function (password) {
  return bcrypt.compareSync(password, this.passwordHash);
}

robotSchema.statics.authenticate = function(username, password, done) {
    this.findOne({
        username: username
    }, function(err, user) {
        if (err) {
            done(err, false)
        } else if (user && user.authenticate(password)) {
            done(null, user)
        } else {
            done(null, false)
        }
    })
};



const Robot = mongoose.model("User", robotSchema);

module.exports = Robot;
