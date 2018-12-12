"use strict";

const report = require("../../utils/report");
const ruleMessages = require("../../utils/ruleMessages");
const styleSearch = require("style-search");
const validateOptions = require("../../utils/validateOptions");

const ruleName = "color-no-rgb-rgba";

const messages = ruleMessages(ruleName, {
  rejected: rgb => `Unexpected rgb(a) color "${rgb}"`
});

const rule = function(actual) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, { actual });

    if (!validOptions) {
      return;
    }

    root.walkDecls(decl => {
      const declString = decl.toString();

      styleSearch(
        { source: declString, target: ["rgb", "rgba"], functionNames: "check" },
        match => {
          const rgbaMatch = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/.exec(
            declString.substr(match.startIndex)
          );

          if (!rgbaMatch) {
            return;
          }

          const rgbaValue = rgbaMatch[0];

          report({
            message: messages.rejected(rgbaValue),
            node: decl,
            index: match.startIndex,
            result,
            ruleName
          });
        }
      );
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
