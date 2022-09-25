const query = require('../../database')

exports.vendorByEmail = async (email) => {
  try {
    const result = await query('SELECT IDVendor as vendorId, Email as email, Password as password FROM vendor WHERE Email = ?', email)
    return result[0]
  } catch (error) {
    return false
  }
}