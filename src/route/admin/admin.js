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

exports.getVendors = async () => {
  try {
    return await query('SELECT IDVendor as vendorId, Name as name FROM vendor')
  } catch (error) {
    return false
  }
}

exports.productsByVendorsIds = async (ids) => {
  try {
    return await query(`SELECT p.IDProduct as productId, p.Name as productName, p.SKU as sku, p.Quantity as quantity, p.Price as price, v.Name as vendorName FROM product as p INNER JOIN vendor as v ON p.IDVendor = v.IDVendor WHERE v.IDVendor IN (${ids.toString()})`)
  } catch (error) {
    return false
  }
}