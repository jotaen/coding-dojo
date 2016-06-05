'use strict'

exports.isInEducation = (customer) => customer.job === 'student' || customer.job === 'apprentice' || customer.job === 'pupil'

exports.isYoungerThan = (age) => (customer) => customer.age < age

exports.isFromYear = (year) => (order) => order.year === year

exports.isFromMonth = (month) => (order) => order.month === month

exports.arrayFlatten = (a, b) => a.concat(b)

exports.reduceToProperty = (property) => (obj) => obj[property]

exports.arraySum = (prev, curr) => prev + curr

exports.rightAlign = (string, length) => (' '.repeat(length) + string).substr(-length*2,length*2)

exports.transformDate = (order) => {
  const date = order.date.split('-')
  const month = parseInt(date[1])
  const year = parseInt(date[0])
  return {
    year: year,
    month: month,
    total: order.total
  }
}
