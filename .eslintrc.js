const path = require("path");

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react"],
  extends: [
    "react-app",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/typescript",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    "import/default": 0,
    "import/export": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/member-delimiter-style": 0,
    quotes: ["error", "single", { avoidEscape: false }],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
      },
    ],
    "quote-props": ["error", "as-needed"],
    "no-use-before-define": 0,
    "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
    "object-curly-spacing": ["error", "always"],
    semi: ["error", "never"],
    "react/prop-types": 0,
    "react/display-name": 0,
    "comma-spacing": ["error", { before: false, after: true }],
    "no-empty-pattern": 0,
    "comma-dangle": [
      "error",
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        exports: "never",
        functions: "only-multiline",
      },
    ],
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
      },
    },
  },
};
