module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "standard-with-typescript",
    "eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    semi: ["error", "always"],
  },
};
