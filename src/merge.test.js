const merge = require("./merge");

let octokit;
let context;

beforeEach(() => {
  octokit = {
    pulls: {
      checkIfMerged: jest.fn(),
      merge: jest.fn(),
    },
  };
  context = {
    repo: { owner: "test-owner", repo: "test-repo" },
    issue: { owner: "test-owner", repo: "test-repo", number: 123 },
  };
});

it("eventually returns alreadyMerged as truthy when the pull request is already merged", async () => {
  octokit.pulls.checkIfMerged.mockResolvedValue({ status: 204 });

  const { alreadyMerged } = await merge(octokit, context);

  expect(alreadyMerged).toBeTruthy();
});

it("eventually returns alreadyMerged as falsy when the pull request is not already merged", async () => {
  octokit.pulls.checkIfMerged.mockResolvedValue({ status: 404 });

  const { alreadyMerged } = await merge(octokit, context);

  expect(alreadyMerged).toBeFalsy();
});

it("doesn't attempt to merge when the pull request is already merged", async () => {
  octokit.pulls.checkIfMerged.mockResolvedValue({ status: 204 });

  await merge(octokit, context);

  expect(octokit.pulls.merge).not.toHaveBeenCalled();
});

it("attempts to merge when the pull request is not already merged", async () => {
  octokit.pulls.checkIfMerged.mockResolvedValue({ status: 404 });

  await merge(octokit, context);

  expect(octokit.pulls.merge).toHaveBeenCalledWith(
    expect.objectContaining({
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: context.issue.number,
    })
  );
});
