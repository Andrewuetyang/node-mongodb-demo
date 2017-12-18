module.exports = function (req, res, next) {
  if (!req.body.admin_id) {
		res.send({
			status: 401,
			message: "未登录"
		})
  } else {
    next()
  }
}