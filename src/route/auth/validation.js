const { body, validationResult } = require('express-validator')
const { errorResponse, responseCodes } = require('../../response')

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const message = errors.errors[0].msg;
    return res.status(responseCodes.HTTP_200_OK).json(errorResponse(message, errors.errors[0].param));
  }
  
  next();
};

exports.vendorLoginValidation = () => [
  body('email')
    .notEmpty()
    .withMessage('El campo de correo es requerido')
    .bail()

    .isEmail()
    .withMessage('El correo ingresado es inválido')
    .bail()
    
  .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('El campo de contraseña es requerido')
    .bail()

    .isLength({ min: 6, max: 255 })
    .withMessage('El campo de contraseña debe poseer un rango de caracteres desde seis (6) a docientos cincuenta y cinco caracteres (255)')
    .bail()
]