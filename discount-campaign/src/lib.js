'use strict'

exports.isOneOf = (propertyName, allowedValues) => (obj) => allowedValues.indexOf(obj[propertyName]) >= 0

exports.arrayFlatten = (a, b) => a.concat(b)

exports.extractProperty = (propertyName) => (obj) => obj[propertyName]

exports.sum = (a, b) => a + b

exports.range = (size) => Array.apply(null, Array(size)).map((_, i) => i)

exports.leftPad = (string, length) => (' '.repeat(length) + string).substr(-length, length)

exports.transformDate = (order) => {
  const date = order.date.split('-')
  const day = parseInt(date[2])
  const month = parseInt(date[1])
  const year = parseInt(date[0])
  return {
    year: year,
    month: month,
    day: day,
    total: order.total
  }
}
