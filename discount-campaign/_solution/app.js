'use strict'

const lib = require('./lib')
const calculate = require('./calculate')
const customerData = require('../customer.json')

const relevantOrders = calculate.relevantOrders(customerData)
const revenuesByMonths = calculate.revenuesByMonths(relevantOrders)
const revenueTotal = calculate.revenueTotal(relevantOrders)

console.log('Revenue for students in 2015')
console.log('-'.repeat(28))

const lineLength = revenueTotal.toString().length

revenuesByMonths.forEach((revenue, i) => {
  const valueRightAligned = lib.leftPad(revenue, lineLength)
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  console.log(`${monthNames[i]}: ${valueRightAligned} €`)
})

console.log('='.repeat(lineLength + 7))
console.log(`∑    ${revenueTotal} €`)
