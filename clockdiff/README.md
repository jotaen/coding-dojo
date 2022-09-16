# “Diff it to me baby (aha, aha)”

A refactoring kata in Go.

`clockdiff` is a CLI tool for computing the difference between two wall clock times, e.g.:

```
$ clockdiff 9:38 13:11
3:33
```

Your job is to improve the code in [`clockdiff.go`](./clockdiff.go) in a way that doesn’t change the behaviour of the program. 

## Setup

You need the Go 1.18+ toolchain.

```bash
# Compile binary:
go build clockdiff.go

# Run end-to-end tests:
./tests.sh
```
