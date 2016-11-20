var
  mongoose = require('mongoose'),
//  ownerPlugin =   require('./plugins/owner'),
  Schema,
  dataTables = require('mongoose-datatables'),
Schema = new mongoose.Schema({
    student_ID: {
        type: String,
        required: true
    },
    student_name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    personId: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    }
});
Schema.pre('save', function (next) {
    var
            me = this,
            error;

    next();
    
});
Schema.plugin(dataTables, {
    totalKey: 'recordsTotal',
    dataKey: 'data'
});
module.exports = Schema;
