const numberSystems = [
  {name: "bin", prefix: "0b", base: 2, shape: /^0b[01]+$/},
  {name: "hex", prefix: "0x", base: 16, shape: /^0x[0-9a-f]+$/i},
  {name: "dec", prefix: "", base: 10, shape: /^(0|[1-9]\d*)$/},
];

const findNumberSystemByName = name => numberSystems.find(ns => ns.name === name);
const findNumberSystemByExampleNumber = numberStr => numberSystems.find(ns => ns.shape.test(numberStr));
const parseNumber = (ns, numberStr) => parseInt(numberStr.substr(ns.prefix.length), ns.base);
const formatNumber = (ns, number) => ns.prefix + number.toString(ns.base);
const convert = (targetNumberSystemName, inputNumberStr) => {
  const inputNS = findNumberSystemByExampleNumber(inputNumberStr) || fail("Input number invalid");
  const targetNS = findNumberSystemByName(targetNumberSystemName) || fail("Target option invalid");
  const inputNumber = parseNumber(inputNS, inputNumberStr);
  return formatNumber(targetNS, inputNumber);
};
const fail = message => { throw message };

try {
  if (process.argv.length !== 4) fail("Wrong number of arguments");
  const targetNumberSystemName = process.argv[2].substr(1);
  const inputNumberStr = process.argv[3];
  const result = convert(targetNumberSystemName, inputNumberStr);
  console.log(result);
} catch (e) {
  console.log("Error: " + e);
  process.exit(1);
}
