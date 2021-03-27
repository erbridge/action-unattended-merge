const process = require("process");
const childProcess = require("child_process");
const path = require("path");
const pkg = require("./package.json");

it("runs", () => {
  const ip = path.join(__dirname, pkg.main);

  console.log(
    childProcess.execSync(`node ${ip}`, { env: process.env }).toString()
  );
});
