'use strict';

const express = require('express'),
  router = express.Router(),
  passport = require('passport');

router.get('/', (req, res, next) => {
  res.render('login'); 
});

/**
 * We are attempting a login.
 */
router.post('/', passport.authenticate('local'), (req, res, next) => {
  res.redirect('/');
});

router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;