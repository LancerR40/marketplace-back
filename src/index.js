const express = require('express')
const cors = require('cors')
const config = require('./config')

const authRoute   = require('./route/auth/auth_handler')
const adminRoute  = require('./route/admin/admin_handler')
const vendorRoute = require('./route/vendor/vendor_handler')

const app = express()

app.use(cors())
app.use(express.json())

/* routes */
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/admin', adminRoute)
app.use('/api/v1/vendor', vendorRoute)

app.listen(config.PORT, () => console.log('Server on port: ' + config.PORT))