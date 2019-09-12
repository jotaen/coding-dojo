try {
  if (process.argv.length === 4) {
    const target = process.argv[2];
    const input = process.argv[3];
    if (target === "-bin" || target === "-hex" || target === "-dec") {
      if (/^(0b[01]+|0x[0-9a-fA-F]+|0|[1-9]\d*)$/.test(input)) {
        let decimal;
        const prefix = input.substr(0, 2);
        if (prefix === "0b") decimal = parseInt(input.substr(2), 2);
        else if (prefix === "0x") decimal = parseInt(input.substr(2), 16);
        else decimal = parseInt(input);
        if (target === "-bin") console.log("0b" + decimal.toString(2));
        else if (target === "-hex") console.log("0x" + decimal.toString(16));
        else console.log(decimal.toString());
      } else {
        throw "Input number invalid";
      }
    } else {
      throw "Target option invalid";
    }
  } else {
    throw "Wrong number of arguments";
  }
} catch (e) {
  console.log("Error: " + e);
  process.exit(1);
}
