'use strict'

const jobs = ['student', 'pupil', 'apprentice', 'employee', 'retired', 'self-employed']
const firstNames = ['John', 'Laura', 'Sarah', 'Michael', 'Tony', 'Barbara']
const lastNames = ['Miller', 'Hanson', 'Schneider', 'Goldberg', 'Foster', 'Peterson']
const minAge = 16
const maxAge = 35

const selectRandomFrom = (array) => array[Math.floor(Math.random()*array.length)]
const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomFloat = (min, max) => Math.random() * (max - min + 1) + min
const randomDate = () => {
  const year = randomNumber(2007, 2015)
  const month = '0' + randomNumber(1, 12)
  const day = '0' + randomNumber(1, 28)
  return [year, month.substr(-2,2), day.substr(-2,2)].join('-')
}

const data = Array(1000).fill().map(() => {
  const name = selectRandomFrom(firstNames) + ' ' + selectRandomFrom(lastNames)
  const age = randomNumber(minAge, maxAge)
  const job = selectRandomFrom(jobs)
  const orders = Array(randomNumber(1,7)).fill().map(() => {
    return {
      date: randomDate(),
      total: parseFloat(randomFloat(1, 300).toFixed(2))
    }
  })
  return {name, age, job, orders}
})

console.log(JSON.stringify(data, null, 2))
