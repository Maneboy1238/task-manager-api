const {Router} = require('express');

const router = Router();

router.get("/", getUserHandler);

module.exports = router