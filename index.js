const core = require("@actions/core");
const github = require("@actions/github");
const yn = require("yn");
const checkAutomergeLabels = require("./src/checkAutomergeLabels");
const init = require("./src/init");
const merge = require("./src/merge");
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
    const { octokit, failure } = init(token);

    if (failure) {
      throw new Error(failure);
    }

    core.info("Checking PR for automerge labels...");
    const automergeLabels = core.getInput("automerge-labels").split(/\s*,\s*/);

    const { found } = await checkAutomergeLabels(
      octokit,
      github.context,
      automergeLabels
    );

    if (!found) {
      core.info("PR is not ready to merge!");
      return;
    }

    const { alreadyMerged } = await merge(octokit, github.context);

    if (alreadyMerged) {
      core.warning("PR was already merged!");
    } else {
      core.info("Done!");
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
