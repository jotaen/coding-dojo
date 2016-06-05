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

const revenuesByMonths = Array(12).fill().map((_, i) => relevantOrders
  .filter(lib.isFromMonth(i + 1))
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

console.log('Revenue for students in 2015')
console.log('-'.repeat(28))

revenuesByMonths.forEach((revenue, i) => {
  const indented = lib.rightAlign(revenue, indent)
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  console.log(`${monthNames[i]}: ${indented} €`)
})

;(() => {
  const indented = lib.rightAlign(revenueTotal, indent)
  console.log('='.repeat(indent + 7))
  console.log(`∑    ${indented} €`)
})()
