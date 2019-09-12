# “The convoluted converter”

A refactoring code kata in JavaScript. Read my corresponding [blog post](https://www.jotaen.net/0K2pE/clean-code-refactoring-kata) for further background.

## How to use it

`convr.js` is a CLI tool that converts different number formats from one base to another. Here is how you can use it:

```
$ node convr.js -hex 32335
> 0x7e4f

$ node convr.js -bin 0x8c
> 0b10001100

$ node convr.js -dec 0b1100
> 12
```

You need NodeJS 10.16.3 (or higher) to run it. If you have Docker (19.03.2 or higher), you can run `make`, which will spawn a container that provides the environment in which you can execute the above commands.

## The task

Take the current implementation of this app and perform a non-functional refactoring. The goal is to improve code quality without changing behaviour or functionality.

## Bonus tasks

1. Add support for octal conversion, i.e. numbers prefixed with `0`, e.g. `04615`. The corresponding target option would be `-oct`.
2. Introduce aliasing for options: e.g. `-h`, `-x` and `-16` for hexadecimal (and equivalent for the other converters)
3. Make the program’s output more user-friendly: you could make it echo the input parameters for confirmation or you could syntax-highlight the output to make it easier to tell the prefix apart from the numerical value.
4. Introduce aliasing for the prefixes that determine the number format, like the `2r` prefix for binary numbers as it is common in Clojure (e.g. `2r10011101`)
5. Experiment with alternative data structures, such as an `java.lang.Optional`-equivalent (for initialising variables) or monads (instead of throwing exceptions).
