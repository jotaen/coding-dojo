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
	time1 := strings.Split(os.Args[1], ":")
	time2 := strings.Split(os.Args[2], ":")
	if len(time1) != 2 || len(time1[0]) > 2 || len(time1[1]) != 2 ||
		len(time2) != 2 || len(time2[0]) > 2 || len(time2[1]) != 2 {
		fmt.Println("Error: invalid input")
		os.Exit(1)
	}
	hours1, errH1 := strconv.Atoi(time1[0])
	mins1, errM1 := strconv.Atoi(time1[1])
	hours2, errH2 := strconv.Atoi(time2[0])
	mins2, errM2 := strconv.Atoi(time2[1])
	if errH1 != nil || errM1 != nil || errH2 != nil || errM2 != nil ||
		hours1 < 0 || hours1 >= 24 || mins1 < 0 || mins1 >= 60 ||
		hours2 < 0 || hours2 >= 24 || mins2 < 0 || mins2 >= 60 {
		fmt.Println("Error: invalid input")
		os.Exit(1)
	}
	diff := (hours2*60 + mins2) - (hours1*60 + mins1)
	if diff < 0 {
		diff = diff * -1
	}
	fmt.Printf("%d:%02d\n", diff/60, diff%60)
}
