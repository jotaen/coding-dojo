'use strict'

exports.isInEducation = (customer) => customer.job === 'student' || customer.job === 'apprentice' || customer.job === 'pupil'

exports.isYoungerThan = (age) => (customer) => customer.age < age

exports.isFromYear = (year) => (order) => order.year === year

exports.isFromMonth = (month) => (order) => order.month === month

exports.arrayFlatten = (a, b) => a.concat(b)

exports.extractProperty = (propertyName) => (obj) => obj[propertyName]

exports.sum = (a, b) => a + b

exports.rightAlign = (string, length) => (' '.repeat(length) + string).substr(-length,length)

exports.transformDate = (order) => {
  const date = order.date.split('-')
  const day = parseInt(date[2])
  const month = parseInt(date[1])
  const year = parseInt(date[0])
  return {
    day: day,
    year: year,
    month: month,
    total: order.total
  }
}
