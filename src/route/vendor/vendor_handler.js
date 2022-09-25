const express = require('express')
const router  = express.Router()
const bcrypt = require('bcrypt')
const { vendorByEmail, productBySKU, productsByVendor, insertVendor, insertProduct, checkAuth } = require('./vendor')
const { validate, vendorSignupValidation, addProductValidation } = require('./validation')
const { errorResponse, responseCodes, successResponse } = require('../../response')

router.post('/signup', vendorSignupValidation(), validate, async (req, res) => {
  const { email, password } = req.body
  const vendor = await vendorByEmail(email)

  if (vendor) {
    return res.status(responseCodes.HTTP_200_OK).json(errorResponse('El correo se encuentra registrado', 'email'))
  }

  const hash = await bcrypt.hash(password, 8)
  const data = { email, password: hash }

  const result = insertVendor(data)

  if (!result) {
    return res.status(responseCodes.HTTP_200_OK).json(errorResponse('Ocurrió un error al registrar los datos. Por favor, intenta más tarde', 'email'))
  }

  res.status(responseCodes.HTTP_200_OK).json(successResponse({ message: 'Registro exitoso' }))
})

router.post('/products', checkAuth, addProductValidation(), validate, async (req, res) => {
  const { sku } = req.body
  const { id } = req.user
  const found = await productBySKU(id, sku)

  if (found) {
    return res.status(responseCodes.HTTP_200_OK).json(errorResponse('Ya existe un producto con el mismo código', 'sku')) 
  }

  const data = { ...req.body, idvendor: id }
  const result = await insertProduct(data)

  if (!result) {
    return res.status(responseCodes.HTTP_200_OK).json(errorResponse('Ocurrió un error al registrar el producto. Por favor, intenta más tarde', 'name')) 
  }

  res.status(responseCodes.HTTP_200_OK).json(successResponse({ message: 'Producto registrado con éxito' }))
})

router.get('/products', checkAuth, async (req, res) => {
  const { id } = req.user
  const products = await productsByVendor(id)

  if (products) {
    for (let i = 0; i < products.length; i++) {
      products[i].createdAt = new Date(products[i].createdAt).toDateString()
    }
  }

  res.status(responseCodes.HTTP_200_OK).json(successResponse({ products: products || [] }))
})

module.exports = router