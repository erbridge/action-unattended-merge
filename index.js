const core = require("@actions/core");
const github = require("@actions/github");
const yn = require("yn");
const validate = require("./src/validate");

async function run() {
  try {
    {
      const strict = yn(core.getInput("strict"));

      const { warning, failure } = validate(github.context.payload, strict);

      if (failure) {
        throw new Error(failure);
      }

      if (warning) {
        core.warning(warning);
        return;
      }
    }

    core.info("Running...");
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
