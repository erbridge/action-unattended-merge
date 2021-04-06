const core = require("@actions/core");
const github = require("@actions/github");
const checkAutomergeLabels = require("./src/checkAutomergeLabels");
const init = require("./src/init");
const validate = require("./src/validate");

async function run() {
  try {
    {
      const strict = core.getInput("strict");

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
    const { octokit, failure } = init(token);

    if (failure) {
      throw new Error(failure);
    }

    core.info("Checking PR for automerge labels...");
    const automergeLabels = core.getInput("automerge-labels");

    const { found } = await checkAutomergeLabels(
      octokit,
      github.context,
      automergeLabels
    );

    if (!found) {
      core.info("PR is not ready to merge!");
      return;
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
