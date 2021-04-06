const github = require("@actions/github");
const init = require("./init");

jest.mock("@actions/github");

class Octokit {}

beforeAll(() => {
  jest.spyOn(github, "getOctokit").mockImplementation(() => new Octokit());
});

it("returns an octokit instance when passed a token", () => {
  const { octokit } = init("abcdef");

  expect(octokit).toBeInstanceOf(Octokit);
});

it("returns a failure when not passed a token", () => {
  const { failure } = init();

  expect(failure).toMatchInlineSnapshot(
    `"You must set \`repo-token: <personal-access-token>\` in your workflow configuration to use this action"`
  );
});
