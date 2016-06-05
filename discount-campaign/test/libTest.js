'use strict'

const assert = require('assert')
const lib = require('../src/lib.js')

describe('#lib', () => {
  describe('#isOneOf', () => {
    it('should return true if a value is contained in the array', () => {
      const array = ['foo', 'bar', 'baz']
      const result = lib.isOneOf('value', array)({value: 'bar'})
      assert(result === true)
    })
    it('should return true if a value is contained in the array (at beginning)', () => {
      const array = ['foo', 'bar', 'baz']
      const result = lib.isOneOf('value', array)({value: 'foo'})
      assert(result === true)
    })
    it('should return true if a value is contained in the array (at end)', () => {
      const array = ['foo', 'bar', 'baz']
      const result = lib.isOneOf('value', array)({value: 'baz'})
      assert(result === true)
    })
    it('should return false if a value is not contained in the array', () => {
      const array = ['foo', 'bar', 'baz']
      const result = lib.isOneOf('value', array)({value: 'asdfasdf'})
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

  describe('#range', () => {
    it('should create an array of the specified size with index as values', () => {
      const result = lib.range(6)
      assert(result.length === 6)
      let index = 0
      result.forEach((value) => {
        assert(value === index)
        index++
      })
    })
  })

  describe('#leftPad', () => {
    it('should fill up a string with spaces on the left side', () => {
      const result = lib.leftPad('test', 10)
      assert(result.length === 10)
      assert(result.substr(0, 6) === '      ')
      assert(result.substr(6, 10) === 'test')
    })
  })

  describe('#splitDate', () => {
    it('should split a date string into separate properties', () => {
      const date = {date: '2001-04-18'}
      const result = lib.splitDate(date)
      assert(result.date.day === 18)
      assert(result.date.month === 4)
      assert(result.date.year === 2001)
    })
    it('should return a fresh object and not modify the original one', () => {
      const original = {date: '2001-04-18'}
      lib.splitDate(original)
      assert(Object.keys(original).length === 1)
      assert(original.date === '2001-04-18')
    })
  })
})
