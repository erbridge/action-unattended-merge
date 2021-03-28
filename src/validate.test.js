const validate = require("./validate");

it("returns an empty output when the payload contains a pull request", () => {
  const output = validate({ pull_request: {} });

  expect(Object.keys(output).length).toEqual(0);
});

it("returns a warning when the payload doesn't contain a pull request and strict=false", () => {
  const { warning, failure } = validate({}, false);

  expect(warning).toMatchInlineSnapshot(
    `"Skipping as this action was not run with a pull request as context!"`
  );
  expect(failure).toBeUndefined();
});

it("returns a failure when the payload doesn't contain a pull request and strict=true", () => {
  const { warning, failure } = validate({}, true);

  expect(warning).toBeUndefined();
  expect(failure).toMatchInlineSnapshot(
    `"This action must be run with a pull request as context! To ignore this failure in future, set \`strict: false\` in your workflow configuration"`
  );
});

it("returns a failure when the payload doesn't contain a pull request and strict=null", () => {
  const { warning, failure } = validate({}, null);

  expect(warning).toBeUndefined();
  expect(failure).toMatchInlineSnapshot(
    `"This action must be run with a pull request as context! To ignore this failure in future, set \`strict: false\` in your workflow configuration"`
  );
});

it("returns a failure when the payload doesn't contain a pull request and strict=undefined", () => {
  const { warning, failure } = validate({}, undefined);

  expect(warning).toBeUndefined();
  expect(failure).toMatchInlineSnapshot(
    `"This action must be run with a pull request as context! To ignore this failure in future, set \`strict: false\` in your workflow configuration"`
  );
});
