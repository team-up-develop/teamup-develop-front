## fornt 環境 / version
- node v12.12.0
- vue/cli v4.3.1
- vue v2.6.12 
- typescript v3.8.3 
- vuex v3.4.0
- eslint v6.7.2
- docker v19.03.13

## URL
- [テスト環境](https://teamup-dev.netlify.app/jobs) 

## 環境構築
### コンテナ作成 / 起動
```
$ docker-compose up -d --build
```

### in container & bash start up
```
$ docker-compose exec app sh
```

### node package install
```
$ npm i
```

### runServer
```
$ npm run dev
```

## その他コマンド

### jest test 
```
npm run test
```

### storybook
```
npm run storybook
```

## Tips
### bundle size 

```
$ yarn build --analyze
$ open dist/report.html 
```

<img width="800" alt="スクリーンショット 2021-04-14 20 37 17" src="https://user-images.githubusercontent.com/56709557/114704374-7ed1cf80-9d61-11eb-8902-82385d1d0214.png">


### cache クリア
```
$ npm cache verify --force
```

### モジュールを削除 再インストール
```
$ rm -rf node_modules && rm package-lock.json && npm cache clear --force && npm cache clean --force && npm i
```

## Doc
### Compoent構成
Atomic Design 導入 
詳しくは → https://github.com/team-up-develop/teamup-develop-front/issues/86

- コメントは必要に応じて残すこと
> https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments
> https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight
```
//* 処理の内容(必要に応じて)
//? 処理の中の子説明 or paramsの説明
// TODO: issueURL
// FIXME: issueURL
```

### color
<img width="612" alt="スクリーンショット 2020-12-19 10 59 58" src="https://user-images.githubusercontent.com/56709557/102679879-7673e880-41f6-11eb-8889-27143779a070.png">

### Sass 定義
[src/assets/scss/_variables.scss](https://github.com/team-up-develop/teamup-develop-front/blob/7ec7379dd1886ca19b29d75ed89b1e1cd8482e73/src/assets/scss/_variables.scss#L7)

### 型定義
- index (type of fetch)
- params (type of post & put & delete parameter)

[src/types](https://github.com/team-up-develop/teamup-develop-front/tree/main/src/types)

### 画像素材参考
- [lordicon](https://lordicon.com/icons)
- [material icon](https://materialdesignicons.com/)
- [storyset](https://storyset.com/)
- [unDraw](https://undraw.co/illustrations)
- [freepik](https://www.freepik.com/)

### deploy関連
- [netlify](https://app.netlify.com/teams/kazuya-sakamoto/overview) 
