'use strict'

const lib = require('./lib')

exports.relevantOrders = (customerData) => customerData
  .filter(lib.isOneOf('job', ['student', 'pupil', 'apprentice']))
  .filter((customer) => customer.age <= 25)
  .map(lib.extractProperty('orders'))
  .reduce(lib.arrayFlatten, [])
  .map(lib.transformDate)
  .filter((order) => order.year === 2015)

exports.revenuesByMonths = (orders) => lib.range(12).map((i) => orders
  .filter((order) => order.month === i + 1)
  .map(lib.extractProperty('total'))
  .reduce(lib.sum, 0)
  .toFixed(2)
)

exports.revenueTotal = (orders) => orders
  .map(lib.extractProperty('total'))
  .reduce(lib.sum, 0)
  .toFixed(2)
