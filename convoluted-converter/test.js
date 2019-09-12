const { exec } = require('child_process');

Promise.all([
  // TEST PROPERTY FORMAT:
  //  [
  //    string[]: `list of cli args to pass to convr.js`,
  //    int: `expected programm exit code`,
  //    string: `expected output on stdout (trimmed)`
  //  ]

  // Convert to bin
  [["-bin", "0"], 0, "0b0"],
  [["-bin", "14"], 0, "0b1110"],
  [["-bin", "0xea"], 0, "0b11101010"],
  [["-bin", "0b1001"], 0, "0b1001"],
  [["-bin", "0x6ef819c6ed"], 0, "0b110111011111000000110011100011011101101"],

  // Convert to dec
  [["-dec", "0"], 0, "0"],
  [["-dec", "14"], 0, "14"],
  [["-dec", "0xea"], 0, "234"],
  [["-dec", "0b1001"], 0, "9"],
  [["-dec", "0b110111011111000000110011100011011101101"], 0, "476608841453"],

  // Convert to hex
  [["-hex", "0"], 0, "0x0"],
  [["-hex", "14"], 0, "0xe"],
  [["-hex", "0xea"], 0, "0xea"],
  [["-hex", "0b1001"], 0, "0x9"],
  [["-hex", "476608841453"], 0, "0x6ef819c6ed"],

  // Reject invalid input
  [["-hex", "-15"], 1, "Error: Input number invalid"],
  [["-hex", "-0xab"], 1, "Error: Input number invalid"],
  [["-hex", "00"], 1, "Error: Input number invalid"],
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

].map(t => {
  const exp = {
    args: t[0].join(" "),
    status: t[1],
    out: t[2]
  }
  return new Promise(res => {
    exec("node convr.js " + exp.args, (err, out) => {
    const msg = out.trim();
    return ((err && exp.status !== 0 && msg === exp.out) || (!err && msg === exp.out)) ?
      res(null) :
      res(`\`${exp.args}\` was \`${msg}\` instead of \`${exp.out}\``);
  })});
})).then(rs => {
  const ok = rs.filter(r => r === null);
  const failed = rs.filter(r => r !== null);
  console.log("👍 %s okay", ok.length);
  console.log("💥 %s failures", failed.length || "—" );
  if (failed.length > 0) {
    failed.forEach(f => console.log("\n%s", f));
  }
  console.log("");
});
