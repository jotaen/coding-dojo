'use strict'

const lib = require('./lib')
const customerData = require('../data/customer.json')

const relevantOrders = customerData
  .filter(lib.isInEducation)
  .filter(lib.isYoungerThan(26))
  .map(lib.reduceToProperty('orders'))
  .reduce(lib.arrayFlatten)
  .map(lib.transformDate)
  .filter(lib.isFromYear(2015))

const revenueByMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  .map((i) => relevantOrders
    .filter(lib.isFromMonth(i))
    .map(lib.reduceToProperty('total'))
    .reduce(lib.arraySum, 0)
    .toFixed(2)
  )

const revenueInYear = relevantOrders
  .map(lib.reduceToProperty('total'))
  .reduce(lib.arraySum, 0)
  .toFixed(2)

const indent = revenueInYear
  .toString()
  .split('.')[0]
  .length

revenueByMonths.forEach((revenue, i) => {
  const indented = lib.rightAlign(revenue, indent)
  console.log(`${i+1}: ${indented} €`)
})

;(() => {
  const indented = lib.rightAlign(revenueInYear, indent)
  console.log('='.repeat(indent*3))
  console.log(`∑  ${indented} €`)
})()
