'use strict'

const assert = require('assert')
const lib = require('../src/lib.js')

describe('#lib', () => {
  describe('#isInEducation', () => {
    it('should return true for a "student"', () => {
      const customer = {job: 'student'}
      const result = lib.isInEducation(customer)
      assert(result === true)
    })
    it('should return true for a "pupil"', () => {
      const customer = {job: 'pupil'}
      const result = lib.isInEducation(customer)
      assert(result === true)
    })
    it('should return true for a "apprentice"', () => {
      const customer = {job: 'apprentice'}
      const result = lib.isInEducation(customer)
      assert(result === true)
    })
    it('should return false for a "employee"', () => {
      const customer = {job: 'employee'}
      const result = lib.isInEducation(customer)
      assert(result === false)
    })
    it('should return false for a "pupils"', () => {
      const customer = {job: 'pupils'}
      const result = lib.isInEducation(customer)
      assert(result === false)
    })
    it('should return false for a anything else', () => {
      const customer = {job: 'qwerty'}
      const result = lib.isInEducation(customer)
      assert(result === false)
    })
  })

  describe('#isYoungerThan', () => {
    it('should return true for people who are younger than specified', () => {
      const customer = {age: 17}
      const result = lib.isYoungerThan(20)(customer)
      assert(result === true)
    })
    it('should return true for people who are of the same age as specified', () => {
      const customer = {age: 40}
      const result = lib.isYoungerThan(40)(customer)
      assert(result === false)
    })
    it('should return false for people who are older than specified', () => {
      const customer = {age: 48}
      const result = lib.isYoungerThan(30)(customer)
      assert(result === false)
    })
  })

  describe('#isFromYear', () => {
    it('should return true for dates that are of the same year as specified', () => {
      const order = {year: 2001}
      const result = lib.isFromYear(2001)(order)
      assert(result === true)
    })
    it('should return false for dates that are of an earlier year as specified', () => {
      const order = {year: 1946}
      const result = lib.isFromYear(2001)(order)
      assert(result === false)
    })
    it('should return false for dates that are of a later year as specified', () => {
      const order = {year: 2571}
      const result = lib.isFromYear(2001)(order)
      assert(result === false)
    })
  })

  describe('#isFromMonth', () => {
    it('should return true for dates that are of the same month as specified', () => {
      const order = {month: 4}
      const result = lib.isFromMonth(4)(order)
      assert(result === true)
    })
    it('should return false for dates that are of an earlier month as specified', () => {
      const order = {month: 2}
      const result = lib.isFromMonth(6)(order)
      assert(result === false)
    })
    it('should return false for dates that are of a later month as specified', () => {
      const order = {month: 11}
      const result = lib.isFromMonth(3)(order)
      assert(result === false)
    })
  })

  describe('#arrayFlatten', () => {
    it('should return the original array, if it’s flat already (when used as reducer)', () => {
      const array = [1, 2, 3, 4, 5]
      const result = array.reduce(lib.arrayFlatten, [])
      assert.deepEqual(result, array)
    })
    it('should return flatten a level 2 nested array (when used as reducer)', () => {
      const array = [1, 2, [3, 4], 5]
      const result = array.reduce(lib.arrayFlatten, [])
      const expected = [1, 2, 3, 4, 5]
      assert.deepEqual(result, expected)
    })
  })

  describe('#extractProperty', () => {
    it('should extract a property from an object', () => {
      const obj = {foo: 'a', bar: 'b', baz: 'c'}
      const result = lib.extractProperty('foo')(obj)
      assert(result === 'a')
    })
    it('should return undefined, if the property does not exist', () => {
      const obj = {foo: 'a', bar: 'b', baz: 'c'}
      const result = lib.extractProperty('asdfasdf')(obj)
      assert(result === undefined)
    })
  })

  describe('#sum', () => {
    it('should calculate the sum of two values', () => {
      const result = lib.sum(7, 5)
      assert(result === 12)
    })
    it('should calculate the sum of an array (when used as reducer)', () => {
      const numbers = [14, 99, -40]
      const result = numbers.reduce(lib.sum)
      assert(result === 73)
    })
  })

  describe('#rightAlign', () => {
    it('should fill up a string with spaces on the left side', () => {
      const result = lib.rightAlign('test', 10)
      assert(result.length === 10)
      assert(result.substr(0, 6) === '      ')
      assert(result.substr(6, 10) === 'test')
    })
  })

  describe('#transformDate', () => {
    it('should split a date string into separate properties', () => {
      const date = {date: '2001-04-18'}
      const result = lib.transformDate(date)
      assert(result.day === 18)
      assert(result.month === 4)
      assert(result.year === 2001)
    })
  })
})
