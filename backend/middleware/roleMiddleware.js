/**
 * Role-based access control middleware factory.
 * Usage: router.get('/admin-only', auth, requireRole('ADMIN'), handler)
 * @param {...string} roles - Allowed roles, e.g. 'DOCTOR', 'ADMIN'
 */
const requireRole = (...roles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' })
  }
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({
      error: `Access denied. Required role: ${roles.join(' or ')}. Your role: ${req.user.role}`
    })
  }
  next()
}

module.exports = requireRole
