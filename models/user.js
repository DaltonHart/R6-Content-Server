const mongoose = require('mongoose');

module.exports = mongoose.model('User', new mongoose.Schema(
	{
	email: { 
		type: String, 
		required: true, 
		unique: true, 
		match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ ,
		},
	password: { type: String, required: true,  select: false},
	username: {type: String, required: true},
	uplayAccount: String,
	admin: Boolean,
	moderator: Boolean,
	dateJoined: { type : Date, default: Math.floor(new Date().getTime()/1000.0) }
	}
	))