'use strict'

const lib = require('./lib')

exports.relevantOrders = (customerData) => customerData
  .filter(lib.isInEducation)
  .filter(lib.isYoungerThan(26))
  .map(lib.extractProperty('orders'))
  .reduce(lib.arrayFlatten, [])
  .map(lib.transformDate)
  .filter(lib.isFromYear(2015))

exports.revenuesByMonths = (orders) => Array(12).fill().map((_, i) => orders
  .filter(lib.isFromMonth(i + 1))
  .map(lib.extractProperty('total'))
  .reduce(lib.sum, 0)
  .toFixed(2)
)

exports.revenueTotal = (orders) => orders
  .map(lib.extractProperty('total'))
  .reduce(lib.sum, 0)
  .toFixed(2)
