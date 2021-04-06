const core = require("@actions/core");
const github = require("@actions/github");
const yn = require("yn");
const init = require("./src/init");
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

    core.info("Initializing GitHub API...");
    const token = core.getInput("repo-token");
    const { failure } = init(token);

    if (failure) {
      throw new Error(failure);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
