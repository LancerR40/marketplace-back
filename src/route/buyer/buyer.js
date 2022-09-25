const query = require('../../database')

exports.productsByParams = async (params) => {
  try {
    const { name, sku, min, max } = params
    
    let sql          = `SELECT * FROM product WHERE Name LIKE ? AND SKU LIKE ?`
    const bindParams = [`${name}%`, `${sku}%`]

    if (min) {
        sql += ' AND Price >= ?'
        bindParams.push(min)
    }

    if (max) {
      sql += ' AND Price <= ?'
      bindParams.push(max)
    }

    return await query(sql, bindParams)
  } catch (error) {
    console.log(error)
    return false
  }
}

