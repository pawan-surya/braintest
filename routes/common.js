var express = require("express");
var router = express.Router();
const common = require("../controllers/commonController");

router.post("/registerStep", common.userregistration);
router.post("/loginUser", common.userLogin);
module.exports = router;
