const core = require("@actions/core");

async function run() {
  try {
    core.info("Running...");
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
