const checkAutomergeLabels = require("./checkAutomergeLabels");

let octokit;
let context;

beforeEach(() => {
  octokit = {
    pulls: {
      get: () =>
        Promise.resolve({
          data: {
            labels: [{ name: "present-label" }],
          },
        }),
    },
  };
  context = {
    repo: { owner: "test-owner", repo: "test-repo" },
    issue: { owner: "test-owner", repo: "test-repo", number: 123 },
  };
});

it("eventually returns the found label when there is a matching label", async () => {
  const { found } = await checkAutomergeLabels(octokit, context, [
    "present-label",
  ]);

  expect(found).toEqual(["present-label"]);
});

it("eventually returns no found labels when there is no matching label", async () => {
  const { found } = await checkAutomergeLabels(octokit, context, [
    "missing-label",
  ]);

  expect(found).toEqual([]);
});

it("eventually returns no found labels when there are no labels", async () => {
  const { found } = await checkAutomergeLabels(octokit, context);

  expect(found).toEqual([]);
});
