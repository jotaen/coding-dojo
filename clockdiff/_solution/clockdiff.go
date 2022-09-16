package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	if len(os.Args) != 3 {
		fmt.Println("Error: wrong number of arguments")
		os.Exit(1)
	}
	time1, ok1 := Parse(os.Args[1])
	time2, ok2 := Parse(os.Args[2])
	if !ok1 || !ok2 {
		fmt.Println("Error: invalid input")
		os.Exit(1)
	}
	fmt.Println(DiffAbs(time1, time2))
}

// ClockTime represents the time as it would be displayed on a wall clock.
type ClockTime struct {
	Hours   int
	Minutes int
}

func (t ClockTime) String() string {
	return fmt.Sprintf("%d:%02d\n", t.Hours, t.Minutes)
}

// Parse constructs a ClockTime object from its serialized form (HH:MM).
func Parse(serializedTime string) (t ClockTime, ok bool) {
	parts := strings.Split(serializedTime, ":")
	if len(parts) != 2 || len(parts[0]) > 2 || len(parts[1]) != 2 {
		return ClockTime{}, false
	}
	hours, errH := strconv.Atoi(parts[0])
	mins, errM := strconv.Atoi(parts[1])
	if errH != nil || hours < 0 || hours >= 24 ||
		errM != nil || mins < 0 || mins >= 60 {
		return ClockTime{}, false
	}
	return ClockTime{hours, mins}, true
}

// DiffAbs computes the absolute (unsigned) difference between two ClockTime objects.
func DiffAbs(t1 ClockTime, t2 ClockTime) ClockTime {
	diff := (t2.Hours*60 + t2.Minutes) - (t1.Hours*60 + t1.Minutes)
	if diff < 0 {
		diff = diff * -1
	}
	return ClockTime{diff / 60, diff % 60}
}
