/* eslint-disable */
module.exports = {
    root: true,
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    plugins: [
        "react",
        "@typescript-eslint"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        }
    },
    ignorePatterns: ["node_module/*", "dist/*"],
    settings: {
        react: {
            version: "detect"
        }
    },
    rules: {
        semi:"warn",
        "@typescript-eslint/no-unused-vars": [
            "off",
            {
                varsIgnorePattern: "^_",
                argsIgnorePattern: "^_"
            },
        ],
        "@typescript-eslint/no-explicit-any": "off"
    }
}