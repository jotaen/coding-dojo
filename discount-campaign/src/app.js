'use strict'

const lib = require('./lib')
const calculate = require('./calculate')
const customerData = require('../data/customer.json')

const relevantOrders = calculate.relevantOrders(customerData)
const revenuesByMonths = calculate.revenuesByMonths(relevantOrders)
const revenueTotal = calculate.revenueTotal(relevantOrders)

console.log('Revenue for students in 2015')
console.log('-'.repeat(28))

const indent = revenueTotal.toString().length

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
