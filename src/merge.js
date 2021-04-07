module.exports = async function merge(octokit, context) {
  const output = {};

  const { status } = await octokit.pulls.checkIfMerged({
    ...context.repo,
    pull_number: context.issue.number,
  });

  if (status === 204) {
    output.alreadyMerged = true;
  } else {
    await octokit.pulls.merge({
      ...context.repo,
      pull_number: context.issue.number,
    });
  }

  return output;
};
