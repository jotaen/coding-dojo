# The discount campaign

## Problem

The owner of a skateboard shop asks you for help: In order to attract more students and pupils to come to her store, she is about to launch a discount campaign. The idea is to offer a rebate for the period of one month. Since she has a pretty much complete set of customer data, she wants to get an overview over the average revenue within the target group. That way she hopes to figure out what a reasonable discount might look like based on actual numbers.

## Task

The customer data can be found in the [`customer.json`](customer.json) file. This is how the data structure looks:

```
[
  {
    "name": "Rebecca Miller",
    "job": "student",
    "age": 29,
    "orders": [
      {"date": "2015-04-12", "total": 59.99},
      {"date": "2014-12-08", "total": 14.95},
      {"date": "2012-09-26", "total": 102.47}
    ]
  },
  ...
]
```

The conditions for participation for customers are defined as follows:

- The job status of the customer must be one of `student`, `pupil` or `apprentice`
- The age must be 25 or less (the owner does not want to support long term students!)

For the data analysis, all purchases of the calendar year (in this case: 2015) within the target group must be taken into consideration. The shop owner is interested in…

- the revenue aggregated by months (from January 2015 until December 2015)
- the total revenue throughout the entire year 2015

## Constraints

It is **not allowed to use control flow statements** to solve this kata: Do not use `if`, `while`, `for`, `do`, `switch`. (Sidenote: `Array.prototype.forEach()` or `Array.prototype.map()` is okay, though.)
