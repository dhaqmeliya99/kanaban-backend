const User = require("../models/user");
const userService = require("../services/user")

exports.loadAuth = (req, res) => {
	res.render('auth');
};

exports.successGoogleLogin = async (req, res) => {
	if (!req.user) {
		res.redirect('/failure');
	} else {
		const checkEmail = await User.findOne({ email: req.user.email });

		if (checkEmail) {
			const token = userService.getToken(checkEmail);
			res.status(200).json({
				msg: `Welcome ${req.user.email}`,
				token: token,
			});
		} else {
			const userData = new User({
				name: req.user.displayName,
				email: req.user.email,
				googleid: req.user.sub,
				picture: req.user.picture,
				email_verified: req.user.email_verified,
				verified: req.user.verified,
				provider: req.user.provider,
			});

			const data = await userData.save();
			const token = userService.getToken(data);

			res.status(200).json({
				message: 'User Login Successfully',
				msg: `Welcome ${req.user.email}`,
				token: token,
				data: data,
			});
		}
	}
};

exports.failureGoogleLogin = (req, res) => {
	res.send("Error");
};