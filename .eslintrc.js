module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["react", "import"],
  "rules": {
    "no-console": "off",
    "no-restricted-syntax": [
      "error",
      {
        "selector": "CallExpression[callee.object.name='console'][callee.property.name!=/^(error|warn)$/]",
        "message": "You can only call the error() and warn() functions from the console object"
      }
    ],
    "react/react-in-jsx-scope": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/no-unescaped-entities": "off",
    'semi': ['error', 'always'],
    'indent': ['error', 2],
    'no-multi-spaces': ['error'],
  },
  "settings": {
    "import/resolver": {
      "eslint-import-resolver-custom-alias": {
        "alias": {
          "@assets": "./src/assets",
          "@components": "./src/components",
          "@pages": "./src/pages",
          "@services": "./src/services"
        },
        "extensions": [".js", ".jsx"]
      }
    }
  }
};
