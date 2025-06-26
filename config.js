require('dotenv').config();

module.exports = {
  port: parseInt(process.env.PORT, 10) || 3602,
  nestHost: process.env.NEST_HOST || 'http://127.0.0.1:3601',
  nestChannel: process.env.NEST_EVENT || 'gps_data'
};