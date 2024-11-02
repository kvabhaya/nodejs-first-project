const mongoose = require('mongoose');
const CustomerSchema = new CustomerSchema({
    name:{type:String,required:true},
    address:{type:String,required:true},
})
modele.exports = mongoose.model('customer', CustomerSchema);