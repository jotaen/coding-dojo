#!/usr/bin/env bash

### SETUP ###

go build clockdiff.go
trap teardown EXIT
overall_exit_code=0
report=''
teardown() {
  printf "\n%b" "$report"
  exit $overall_exit_code
}
check() {
  expected_out="$2"; expected_code="$1"; actual_out=$(./clockdiff "${@:4}"); actual_code="$?"
  if [[ "$expected_out" == "$actual_out" && "$expected_code" == "$actual_code" ]];
    then printf '.'
    else printf 'X'; overall_exit_code=1; report+="${*:4}\n"
  fi
}

### TEST CASES ###
# Format:
#     check EXPECTED_EXIT_CODE EXPECTED_OUTPUT -- [INPUT_ARGS]

# Diff with just hours:
check 0 '1:00' -- '0:00' '1:00'
check 0 '4:00' -- '15:00' '19:00'

# Diff with just minutes:
check 0 '0:01' -- '0:01' '0:02'
check 0 '0:23' -- '0:33' '0:56'

# Diff with hours and minutes:
check 0 '1:00' -- '0:00' '1:00'

# Order is commutative:
check 0 '5:15' -- '7:30' '12:45'
check 0 '5:15' -- '12:45' '7:30'

# Zero diff:
check 0 '0:00' -- '1:30' '1:30'
check 0 '0:00' -- '21:42' '21:42'

# Maximal diff:
check 0 '23:59' -- '0:00' '23:59'

# Sub-hour diff with differing hour part:
check 0 '0:40' -- '1:40' '2:20'

# Hour part can be padded with zeros
check 0 '0:40' -- '01:40' '02:20'

# Wrong number of arguments
check 1 'Error: wrong number of arguments' --
check 1 'Error: wrong number of arguments' -- '1:40'
check 1 'Error: wrong number of arguments' -- '1:40' '2:40' '3:40'

# Random argument (not times)
check 1 'Error: invalid input' -- '1:00' 'foo'
check 1 'Error: invalid input' -- 'foo' '1:00'
check 1 'Error: invalid input' -- '::' '0:00'
check 1 'Error: invalid input' -- ':' 'ff:ff'

# Invalid hour part
check 1 'Error: invalid input' -- 'a:00' '1:00'
check 1 'Error: invalid input' -- '1:00' 'a:00'

# Invalid minute part
check 1 'Error: invalid input' -- '1:aa' '1:00'
check 1 'Error: invalid input' -- '1:00' '1:aa'

# Both parts invalid
check 1 'Error: invalid input' -- 'ff:ff' '*:()'

# Hour part absent
check 1 'Error: invalid input' -- ':01' '00:00'
check 1 'Error: invalid input' -- '00:00' ':01'

# Minute part absent
check 1 'Error: invalid input' -- '00:00' '01:'
check 1 'Error: invalid input' -- '01:' '00:00'

# Negative hour part
check 1 'Error: invalid input' -- '-1:00' '1:00'
check 1 'Error: invalid input' -- '1:00' '-1:00'

# Negative minute part
check 1 'Error: invalid input' -- '0:00' '2:-09'
check 1 'Error: invalid input' -- '0:-55' '1:00'

# More than 24 hours
check 1 'Error: invalid input' -- '24:00' '1:00'
check 1 'Error: invalid input' -- '928:00' '1:00'
check 1 'Error: invalid input' -- '1:00' '24:00'
check 1 'Error: invalid input' -- '1:00' '283:00'

# More than 60 minutes
check 1 'Error: invalid input' -- '0:60' '1:00'
check 1 'Error: invalid input' -- '0:99' '1:00'
check 1 'Error: invalid input' -- '0:00' '2:60'
check 1 'Error: invalid input' -- '0:00' '2:88'

# Hour part longer than 2 chars
check 1 'Error: invalid input' -- '003:00' '2:09'
check 1 'Error: invalid input' -- '2:09' '003:00'

# Minute part longer than 2 chars
check 1 'Error: invalid input' -- '03:010' '2:09'
check 1 'Error: invalid input' -- '2:09' '03:010'

# Minute part less than 2 chars
check 1 'Error: invalid input' -- '2:09' '03:1'
check 1 'Error: invalid input' -- '2:9' '03:10'
