'use strict'

const lib = require('./lib')

exports.relevantOrders = (customerData) => customerData
  .filter(lib.isOneOf('job', ['student', 'pupil', 'apprentice']))
  .filter((customer) => customer.age <= 25)
  .map(lib.cutDownTo('orders'))
  .reduce(lib.arrayFlatten, [])
  .map(lib.splitDate)
  .filter((order) => order.date.year === 2015)

exports.revenuesByMonths = (orders) => lib.range(12).map((i) => orders
  .filter((order) => order.date.month === i + 1)
  .map(lib.cutDownTo('total'))
  .reduce(lib.sum, 0)
  .toFixed(2)
)

exports.revenueTotal = (orders) => orders
  .map(lib.cutDownTo('total'))
  .reduce(lib.sum, 0)
  .toFixed(2)
