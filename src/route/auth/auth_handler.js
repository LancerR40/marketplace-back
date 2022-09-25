const express = require('express')
const router  = express.Router()
const config = require('../../config')
const jsonwebtoken = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { vendorByEmail, adminByEmail, checkAuth, adminById, vendorById } = require('./auth')
const { validate, vendorLoginValidation, adminLoginValidation } = require('./validation')
const { successResponse, errorResponse, responseCodes } = require('../../response')

router.get('/', (req, res) => {
  const token = req.headers['x-auth-token']

  if (!token) {
    return res.status(responseCodes.HTTP_200_OK).json(successResponse({ auth: false, role: null }))
  }

  try {
    const { role } = jsonwebtoken.verify(token, config.TOKEN_KEY)
    
    return res.status(responseCodes.HTTP_200_OK).json(successResponse({ auth: true, role }))
  } catch (error) {
    return res.status(responseCodes.HTTP_401_UNAUTHORIZED).json(errorResponse({ message: 'No estas autorizado' }))
  }
})

router.get('/data', checkAuth, async (req, res) => {
  const { id, role } = req.user
  
  if (role === 'vendor') {
    const { name } = await vendorById(id)
    return res.status(responseCodes.HTTP_200_OK).json(successResponse({ name }))
  }

  const { name } = await adminById(id)
  res.status(responseCodes.HTTP_200_OK).json(successResponse({ name }))
})

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

router.post('/admin/login', adminLoginValidation(), validate, async (req, res) => {
  const { email, password } = req.body
  const result = await adminByEmail(email)

  if (!result) {
    return res.status(responseCodes.HTTP_200_OK).json(errorResponse('El correo es incorrecto', 'email'))
  }

  const { adminId, password: hash } = result
  const role = 'admin'

  if (!await bcrypt.compare(password, hash)) {
    return res.status(responseCodes.HTTP_200_OK).json(errorResponse('La contraseña es incorrecta', 'password'))
  }

  const token = jsonwebtoken.sign({ id: adminId, role }, config.TOKEN_KEY, { expiresIn: "1d" });
  
  res.status(responseCodes.HTTP_200_OK).json(successResponse({ auth: true, role, token }))
})

module.exports = router