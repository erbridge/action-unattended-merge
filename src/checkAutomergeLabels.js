module.exports = async function checkAutomergeLabels(
  octokit,
  context,
  labels = []
) {
  const output = { found: [] };

  if (labels && labels.length > 0) {
    const { data: pullRequest } = await octokit.pulls.get({
      ...context.repo,
      pull_number: context.issue.number,
    });

    const prLabels = pullRequest.labels.map((label) => label.name);

    output.found = labels.filter((label) => prLabels.includes(label));
  }

  return output;
};
