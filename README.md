## URL
- [テスト環境](https://teamup-dev.netlify.app/jobs) 

## 環境構築
- コンテナ作成/起動

```console
$ docker-compose up -d --build
```

- アプリケーションコンテナ内へ移動
```console
$ docker-compose exec app sh
```

- node package install
```console
$ npm i
```

- 起動
```console
$ npm run dev
```

## Tips
- bundle size 

```console
$ yarn build --analyze
$ open dist/report.html 
```

<img width="800" alt="スクリーンショット 2021-04-14 20 37 17" src="https://user-images.githubusercontent.com/56709557/114704374-7ed1cf80-9d61-11eb-8902-82385d1d0214.png">


- cache クリア
```console
$ npm cache verify --force
```

- modulesを削除 再インストール
```console
$ rm -rf node_modules && rm package-lock.json && npm cache clear --force && npm cache clean --force && npm i
```

- modulesの依存関係でうまくいかない場合
```console
$ rm -rf node_modules && rm package-lock.json && npm cache clear --force && npm cache clean --force && npm i --legacy-peer-deps
```

## Doc
### Compoent構成
Atomic Design 導入 
詳しくは → https://github.com/team-up-develop/teamup-develop-front/issues/86

- コメントは必要に応じて残すこと
  - https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments
  - https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight
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
- params (type of request parameter)

[src/types](https://github.com/team-up-develop/teamup-develop-front/tree/main/src/types)

### 画像素材参考
- [lordicon](https://lordicon.com/icons)
- [material icon](https://materialdesignicons.com/)
- [storyset](https://storyset.com/)
- [unDraw](https://undraw.co/illustrations)
- [freepik](https://www.freepik.com/)

### deploy
- テスト環境
  - [netlify](https://app.netlify.com/teams/kazuya-sakamoto/overview) 

