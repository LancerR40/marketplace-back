const express = require('express')
const router  = express.Router()
const { productsByParams } = require('./buyer')
const { responseCodes, successResponse } = require('../../response')

router.post('/products', async (req, res) => {
    const products = await productsByParams(req.body) || []
    res.status(responseCodes.HTTP_200_OK).json(successResponse({ products }))
})

module.exports = router