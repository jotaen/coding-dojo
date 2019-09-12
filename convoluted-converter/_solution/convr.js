const numberSystems = [
  {name: "bin", prefix: "0b", base: 2, shape: /^0b[01]+$/},
  {name: "hex", prefix: "0x", base: 16, shape: /^0x[0-9a-fA-F]+$/},
  {name: "dec", prefix: "", base: 10, shape: /^[0-9]+$/},
];

const normalise = (ns, input) => parseInt(input.substr(ns.prefix.length), ns.base);
const translate = (ns, intermediate) => ns.prefix + intermediate.toString(ns.base);
const convert = (targetName, input) => {
  const inputNS = numberSystems.find(c => c.shape.test(input));
  const targetNS = numberSystems.find(c => c.name === targetName);
  if (!inputNS || !targetNS) {
    throw "Input arguments invalid";
  }
  const intermediate = normalise(inputNS, input);
  return translate(targetNS, intermediate);
};

try {
  if (process.argv.length !== 4) {
    throw "Wrong number of arguments";
  }
  const targetName = process.argv[2].substr(1);
  const input = process.argv[3];
  const out = convert(targetName, input);
  console.log(out);
} catch (e) {
  console.log("Error: " + e);
  process.exit(1);
}
