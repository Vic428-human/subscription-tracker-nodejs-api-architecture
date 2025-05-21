### 一開始製作專案的時候啟用的 express skelton

https://expressjs.com/en/starter/generator.html

```
node -v => 18
npx express-generator --no-view --git ./
```

### 自動刷新 nodejs server

automatically restarting the node application when file changes in the directory are detected.
https://www.npmjs.com/package/nodemon

```
npm install --save-dev nodemon
```

### package.json 說明

不要用 舊的 require，而是使用 es module 進行

```
"type": "module",
```

### linter => add more code in clean way

1. vscode setting:

Notebook: Default Formatter
Defines a default notebook formatter which takes precedence over all other formatter settings. Must be the identifier of an extension contributing a formatter.
選擇 eslint

2. Eslint › Format: Enable
   enalbe eslint as a formatter

3. Editor: Format On Save
   Format a file on save

4. 文檔說明：This option runs npm init @eslint/config to start the config initialization wizard. It’s designed to help new users quickly create an .eslintrc file by answering a few questions. When you use this flag, the CLI does not perform linting.

5. 但在當前這個版本 generate 出來的是 eslint.config.js 這個檔案
   https://eslint.org/docs/latest/use/command-line-interface#options

6. 初始化 eslint 後 devDependencies 出現以下幾個框架版本

```
npx eslint --init

完成後出現如下：
"@eslint/js": "^9.27.0",
"eslint": "^9.27.0",
"globals": "^16.1.0",

```
