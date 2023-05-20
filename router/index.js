const express = require("express");
const router = express.Router();
const controller = require('../controller/agent');

router.get('/agent',controller.agent);
router.post('/add_agent',controller.add_agent );
router.post('/edit_agent/:user_id',controller.edit_agent);
router.delete('/delete_agent/:user_id',controller.delete_agent);

module.exports = router;