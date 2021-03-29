var express = require("express");
var router = express.Router();
var {signUp, login, updateUserPassword} = require("./controller/userController");
// const { update } = require("./model/User");

/* GET users listing. */
router.get("/", function (req, res, next) {
	res.send("respond with a resource");
});

router.post("/sign-up", signUp);

router.post("/login", login);

router.put("/update-user-password", updateUserPassword);

module.exports = router;
