const admin = (req, res, next) => {
   
  if (req.user && req.user.role=='ROLE_ADMIN') {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}


export default admin;