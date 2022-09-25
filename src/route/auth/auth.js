const query = require('../../database')
const config = require('../../config')
const jsonwebtoken = require('jsonwebtoken')
const { errorResponse, responseCodes } = require('../../response')

exports.checkAuth = (req, res, next) => {
  try {
    const token = req.headers['x-auth-token']
    const payload = jsonwebtoken.verify(token, config.TOKEN_KEY)
    req.user = payload
    next()
  } catch (error) {
    console.log(error)
    return res.status(responseCodes.HTTP_401_UNAUTHORIZED).json(errorResponse('No estas autorizado'))
  }
}

exports.vendorByEmail = async (email) => {
  try {
    const result = await query('SELECT IDVendor as vendorId, Name as name, Email as email, Password as password FROM vendor WHERE Email = ?', email)
    return result[0]
  } catch (error) {
    return false
  }
}

exports.adminByEmail = async (email) => {
  try {
    const result = await query('SELECT IDAdmin as adminId, Name as name, Email as email, Password as password FROM admin WHERE Email = ?', email)
    return result[0]
  } catch (error) {
    return false
  }
}

exports.vendorById = async (id) => {
  try {
    const result = await query('SELECT IDVendor as vendorId, Name as name, Email as email, Password as password FROM vendor WHERE IDVendor = ?', id)
    return result[0]
  } catch (error) {
    return false
  }
}

exports.adminById = async (id) => {
  try {
    const result = await query('SELECT IDAdmin as adminId, Name as name, Email as email, Password as password FROM admin WHERE IDAdmin = ?', id)
    return result[0]
  } catch (error) {
    return false
  }
}