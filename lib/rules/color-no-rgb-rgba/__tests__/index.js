"use strict";

const rule = require("..");
const { messages, ruleName } = rule;

testRule(rule, {
  ruleName,
  config: [true],

  accept: [
    {
      code: "a { color: pink; }"
    },
    {
      code: "a { something: black, white, gray; }"
    },
    {
      code: "a { padding: 000; }"
    },
    {
      code: 'a::before { content: "#ababa"; }'
    }
  ],

  reject: [
    {
      code: "a { color: rgba(0, 0, 0, 0); }",
      message: messages.rejected("rgba(0, 0, 0, 0)"),
      line: 1,
      column: 12
    },
    {
      code: "a { something: black, #fff1a1, rgb(250, 250, 0); }",
      message: messages.rejected("rgb(250, 250, 0)"),
      line: 1,
      column: 32
    },
    {
      code: "a { background-color: rgba(0, 23, 53, 0.3); }",
      message: messages.rejected("rgba(0, 23, 53, 0.3)"),
      line: 1,
      column: 23
    }
  ]
});
