'use strict'

exports.isOneOf = (propertyName, allowedValues) => (obj) => allowedValues.indexOf(obj[propertyName]) >= 0

exports.arrayFlatten = (a, b) => a.concat(b)

exports.extractProperty = (propertyName) => (obj) => obj[propertyName]

exports.sum = (a, b) => a + b

exports.range = (size) => Array.apply(null, Array(size)).map((_, i) => i)

exports.leftPad = (string, length) => (' '.repeat(length) + string).substr(-length, length)

exports.splitDate = (obj) => {
  const date = obj.date.split('-')
  return Object.assign({}, obj, {
    date: {
      year: parseInt(date[0]),
      month: parseInt(date[1]),
      day: parseInt(date[2])
    }
  })
}
