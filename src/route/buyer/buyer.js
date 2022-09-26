const query = require('../../database')

exports.productsByParams = async (params) => {
  try {
    const { byText, min, max } = params
    
    let sql          = `SELECT p.IDProduct as productId, p.Name as productName, p.SKU as sku, p.Quantity as quantity, p.Price as price, v.Name as vendorName FROM product as p INNER JOIN vendor as v ON p.IDVendor = v.IDVendor WHERE (p.Name LIKE ? OR p.SKU LIKE ?)`
    const bindParams = [`${byText}%`, `${byText}%`]

    if (min) {
        sql += ' AND Price >= ?'
        bindParams.push(min)
    }

    if (max || max === 0) {
      sql += ' AND Price <= ?'
      bindParams.push(max)
    }

    return await query(sql, bindParams)
  } catch (error) {
    console.log(error)
    return false
  }
}

