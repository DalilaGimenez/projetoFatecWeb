const express = require("express");
const router = express();

router.use("/users", require("./UserRouter"));
router.use("/photos", require("./PhotoRoutes"));

//test route
router.get("/",(req, res) =>{
    res.send("API Working!");
})

module.exports = router