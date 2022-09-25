exports.successResponse = (data) => {
  return {
    success: true,
    data,
  };
};
  
exports.errorResponse = (message, field = null) => {
  return {
    success: false,
    error: {
      message,
      field,
    },
  };
};
  
exports.responseCodes = {
  HTTP_200_OK: 200,
  HTTP_401_UNAUTHORIZED: 401,
};