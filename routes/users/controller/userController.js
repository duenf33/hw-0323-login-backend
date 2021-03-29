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
			let foundUser = await User.findOne({ email: req.body.email });
			if (!foundUser) {
				res.json({ message: "email not found" });
				throw { message: "email not found" };
			}
			let comparedPassword = await bcrypt.compare(
				req.body.password,
				foundUser.password
			);
			if (!comparedPassword) {
				res.json({ message: "something went wrong, check email and password" });
				throw { message: "something went wrong, check email and password" };
			}
			res.json({
				message: "your logged in",
				email: foundUser.email,
			});
		} catch (e) {
			console.log(e);
		}
	},
	updateUserPassword: async (req, res) => {
		try {
			let foundUser = await User.findOne({ email: req.body.email });
			if (!foundUser) {
				res.json({ message: "user not found" });
				throw { message: "user not found" };
			}
			let comparedPassword = await bcrypt.compare(
				req.body.oldPassword,
				foundUser.password
			);
			if (!comparedPassword) {
				res.json({ message: "check email and password" });
				throw { message: "check email and password" };
			}
			let salted = await bcrypt.genSalt(10);
			let hashedNewPassword = await bcrypt.hash(req.body.newPassword, salted);
			await User.findOneAndUpdate(
				{ email: req.body.email },
				{ password: hashedNewPassword },
				{ new: true }
			);
			res.json({ message: "Password updated" });
		} catch (e) {
			console.log(e);
			res.status(500).json(e);
		}
	},
};
