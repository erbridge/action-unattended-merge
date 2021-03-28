module.exports = function validate(payload, strict = true) {
  const output = {};

  if (!payload.pull_request) {
    if (strict === false) {
      output.warning =
        "Skipping as this action was not run with a pull request as context!";
    } else {
      output.failure =
        "This action must be run with a pull request as context! To ignore this failure in future, set `strict: false` in your workflow configuration";
    }
  }

  return output;
};
