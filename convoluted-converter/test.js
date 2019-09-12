const { exec } = require('child_process');

[
  // TEST PROPERTY FORMAT:
  //  [
  //    string[]: `list of cli args to pass to convr.js`,
  //    int: `expected programm exit code`,
  //    string: `expected output on stdout (trimmed)`
  //  ]

  // Convert to bin
  [["-bin", "14"], 0, "0b1110"],
  [["-bin", "0xea"], 0, "0b11101010"],
  [["-bin", "0b1001"], 0, "0b1001"],

  // Convert to dec
  [["-dec", "14"], 0, "14"],
  [["-dec", "0xea"], 0, "234"],
  [["-dec", "0b1001"], 0, "9"],

  // Convert to hex
  [["-hex", "14"], 0, "0xe"],
  [["-hex", "0xea"], 0, "0xea"],
  [["-hex", "0b1001"], 0, "0x9"],

  // Reject invalid input
  [["-hex", "23z7"], 1, "Error: Input number invalid"],
  [["-bin", "0xyvag"], 1, "Error: Input number invalid"],
  [["-dec", "0b03030"], 1, "Error: Input number invalid"],

  // Reject invalid options
  [["-π", "123"], 1, "Error: Target option invalid"],
  [["-foo", "123"], 1, "Error: Target option invalid"],
  [["123", "123"], 1, "Error: Target option invalid"],

  // Reject wrong number of args
  [["-bin", "123", "456"], 1, "Error: Wrong number of arguments"],
  [["-bin"], 1, "Error: Wrong number of arguments"],
  [[""], 1, "Error: Wrong number of arguments"],

].forEach(t => {
  const exp = {
    args: t[0].join(" "),
    status: t[1],
    out: t[2]
  }
  exec("node convr.js " + exp.args, (err, out) => {
    const msg = out.trim();
    if ((err && exp.status !== 0 && msg === exp.out) || (!err && msg === exp.out)) {
      console.log("👍");
    }
    else {
      console.log("💥💥💥  `%s` was `%s` instead of `%s`", exp.args, msg, exp.out);
    }
  })
});
