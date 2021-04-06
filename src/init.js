const github = require("@actions/github");

module.exports = function init(token) {
  const output = {};

  if (token) {
    output.octokit = github.getOctokit(token, {
      userAgent: "erbridge/action-unattended-merge",
    });
  } else {
    output.failure =
      "You must set `repo-token: <personal-access-token>` in your workflow configuration to use this action";
  }

  return output;
};
