const requireUser = (req, res, next) => {
  if (!req.user) return res.status(403).json({ message: 'invalid session' });
  return next();
};

module.exports = requireUser;
