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

exports.vendorSignupValidation = () => [
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

exports.addProductValidation = () => [
  body('name')
    .notEmpty()
    .withMessage('El campo de nombre es requerido')
    .bail()

    .isLength({ max: 45 })
    .withMessage('El campo de nombre puede tener un máximo de cuarenta y cinco (45) caracteres')
    .bail(),

  body('sku')
    .notEmpty()
    .withMessage('El campo de sku es requerido')
    .bail()

    .isLength({ min: 5, max: 10 })
    .withMessage('El campo de sku puede tener un rango entre cinco (5) y diez (10) caracteres')
    .bail(),

  body('quantity')
    .notEmpty()
    .withMessage('El campo de cantidad es requerido')
    .bail()

    .isNumeric()
    .withMessage('El campo solo puede ser númerico')
    .bail(),

  body('price')
    .notEmpty()
    .withMessage('El campo de precio es requerido')
    .bail()

    .isNumeric()
    .withMessage('El campo solo puede ser númerico')
    .bail(),
]