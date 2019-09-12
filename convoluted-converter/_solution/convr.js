const numberSystems = [
  {name: "bin", prefix: "0b", base: 2, shape: /^0b[01]+$/},
  {name: "hex", prefix: "0x", base: 16, shape: /^0x[0-9a-fA-F]+$/},
  {name: "dec", prefix: "", base: 10, shape: /^(0|[1-9]\d*)$/},
];

const normalise = (ns, input) => parseInt(input.substr(ns.prefix.length), ns.base);
const translate = (ns, intermediate) => ns.prefix + intermediate.toString(ns.base);
const convert = (targetName, input) => {
  const targetNS = numberSystems.find(n => n.name === targetName)
    || (() => {throw "Target option invalid"})();
  const inputNS = numberSystems.find(n => n.shape.test(input))
    || (() => {throw "Input number invalid"})();
  const intermediate = normalise(inputNS, input);
  return translate(targetNS, intermediate);
};

try {
  if (process.argv.length !== 4) {
    throw "Wrong number of arguments";
  }
  const targetName = process.argv[2].substr(1);
  const input = process.argv[3];
  const result = convert(targetName, input);
  console.log(result);
} catch (e) {
  console.log("Error: " + e);
  process.exit(1);
}
