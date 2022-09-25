const express = require('express')
const router  = express.Router()
const config = require('../../config')
const jsonwebtoken = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { vendorByEmail } = require('./auth')
const { validate, vendorLoginValidation } = require('./validation')
const { successResponse, errorResponse, responseCodes } = require('../../response')

router.post('/vendor/login', vendorLoginValidation(), validate, async (req, res) => {
  const { email, password } = req.body
  const result = await vendorByEmail(email)

  if (!result) {
    return res.status(responseCodes.HTTP_200_OK).json(errorResponse('El correo es incorrecto', 'email'))
  }

  const { vendorId, password: hash } = result
  const role = 'vendor'

  if (!await bcrypt.compare(password, hash)) {
    return res.status(responseCodes.HTTP_200_OK).json(errorResponse('La contraseña es incorrecta', 'password'))
  }

  const token = jsonwebtoken.sign({ id: vendorId, role }, config.TOKEN_KEY, { expiresIn: "1d" });
  
  res.status(responseCodes.HTTP_200_OK).json(successResponse({ auth: true, role, token }))
})

module.exports = router