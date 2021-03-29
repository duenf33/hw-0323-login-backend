const bcrypt = require("bcryptjs");

const User = require("../model/User");

module.exports = {
	signUp: async (req, res) => {
		try {
			let salted = await bcrypt.genSalt(10);
			let hashedPassword = await bcrypt.hash(req.body.password, salted);
			let createdUser = new User({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				password: hashedPassword,
			});
			let savedUser = await createdUser.save();
			res.json({
				data: savedUser,
			});
		} catch (e) {
			console.log(e);
		}
	},
	login: async (req, res) => {
		try {
		} catch (e) {
			console.log(e);
		}
	},
	updateUserPassword: async (req, res) => {
		try {
		} catch (e) {
			console.log(e);
		}
	},
};
