'use strict'

const lib = require('./lib')
const customerData = require('../data/customer.json')

const relevantOrders = customerData
  .filter(lib.isInEducation)
  .filter(lib.isYoungerThan(26))
  .map(lib.extractProperty('orders'))
  .reduce(lib.arrayFlatten, [])
  .map(lib.transformDate)
  .filter(lib.isFromYear(2015))

const revenuesByMonths = Array(9).fill().map((_, i) => relevantOrders
  .filter(lib.isFromMonth(i+1))
  .map(lib.extractProperty('total'))
  .reduce(lib.sum, 0)
  .toFixed(2)
)

const revenueTotal = relevantOrders
  .map(lib.extractProperty('total'))
  .reduce(lib.sum, 0)
  .toFixed(2)

const indent = revenueTotal
  .toString()
  .length

revenuesByMonths.forEach((revenue, i) => {
  const indented = lib.rightAlign(revenue, indent)
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
  console.log(`${monthNames[i]}: ${indented} €`)
})

;(() => {
  const indented = lib.rightAlign(revenueTotal, indent)
  console.log('='.repeat(indent+7))
  console.log(`∑    ${indented} €`)
})()
