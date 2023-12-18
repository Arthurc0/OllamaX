# OllamaX
A customizable graphical interface for Ollama

## Project Status

⚠️ **This project is currently in development and is not ready for public use. We appreciate your interest and patience as we work towards a stable release.** ⚠️

## Environment variables
Handled in .env file at the root
Base structure :  [see the .env.sample file](.env.sample)

## Configuration and linter in VS Code
* Install the "ESLint" extension
* In the `settings.json`, add these properties :
```
"eslint.workingDirectories": ["."],
"eslint.enable": true,
"editor.formatOnType": true,
"eslint.format.enable": true,
"[vue]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
},
"[typescript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
}
```