const router = require("express").Router();
const userController = require("../../controllers/userController");
var passport = require("../../config/passport");
const jwt = require("jsonwebtoken");
//Matches with '/api/user
router
  .route("/login")
  .post(passport.authenticate("local"), function (req, res) {
    if (req.user) {
      const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SIGNATURE, {
        expiresIn: 60 * 60,
      });
      res.json({
        token: token,
        type: req.user.userType,
        id: req.user._id,
        name: req.user.firstName,
      });
    }
  });

router.route("/").get(userController.findAllUser);
router.route("/employee").get(userController.findAllEmployee);
router.route("/").post(userController.create);
router.route("/findByEmail/:email").get(userController.findByEmail);
router.route("/googleFacebook").post(userController.createGoogleFacebook);
router
  .route("/:id")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;
