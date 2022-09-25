const express = require('express')
const router  = express.Router()
const config = require('../../config')
const { checkAuth, getVendors, productsByVendorsIds } = require('./admin')
const { successResponse, errorResponse, responseCodes } = require('../../response')

router.post('/products-by-vendors', async (req, res) => {
  const { vendors } = req.body
  const products = await productsByVendorsIds(vendors)

  res.status(responseCodes.HTTP_200_OK).json(successResponse({ products: products || [] }))
})

router.get('/vendors', checkAuth, async (req, res) => {
  const vendors = await getVendors()
  res.status(responseCodes.HTTP_200_OK).json(successResponse({ vendors: vendors || [] }))
})

module.exports = router