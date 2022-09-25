const query = require('../../database')
const config = require('./../../config')
const jsonwebtoken = require('jsonwebtoken')
const { errorResponse, responseCodes } = require('../../response')

exports.checkAuth = (req, res, next) => {
  try {
    const token = req.headers['x-auth-token']
    const payload = jsonwebtoken.verify(token, config.TOKEN_KEY)
    req.user = payload
    next()
  } catch (error) {
    return res.status(responseCodes.HTTP_401_UNAUTHORIZED).json(errorResponse('No estas autorizado'))
  }
}

exports.vendorByEmail = async (email) => {
  try {
    const result = await query('SELECT IDVendor as vendorId, Email as email FROM vendor WHERE Email = ?', email)
    return result[0]
  } catch (error) {
    return false
  }
}

exports.insertVendor = async (vendor) => {
  try {
    await query('INSERT INTO vendor SET ?', vendor)
    return true
  } catch (error) {
    return false
  }
}

exports.productBySKU = async (vendorId, sku) => {
  try {
    const result = await query('SELECT IDProduct FROM product WHERE IDVendor = ? AND SKU = ?', [vendorId, sku])
    return result[0]
  } catch (error) {
    return false
  }
}

exports.insertProduct = async (product) => {
  try {
    await query('INSERT INTO product SET ?', product)
    return true
  } catch (error) {
    return false
  }
}

exports.productsByVendor = async (vendorId) => {
  try {
    return await query('SELECT IDProduct as productId, Name as name, SKU as sku, Quantity as quantity, Price as price, CreatedAt as createdAt FROM product WHERE IDVendor = ?', vendorId)
  } catch (error) {
    return false
  }
}