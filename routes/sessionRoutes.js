const sessionController = require('./../controllers/sessionController');
const requireUser = require('./../middleware/requireUser');

const express = require('express');

const router = express.Router();

router.route('/oauth/google').get(sessionController.googelOAuthHandler);

router.route('/users').get(requireUser, sessionController.getUserHandler);

router
  .route('/users')
  .delete(requireUser, sessionController.deleteSessionHandler);

module.exports = router;
