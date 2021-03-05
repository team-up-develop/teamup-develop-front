## fornt 環境 / version
- node v12.12.0
- vue/cli v4.3.1
- vue v2.6.12 
- typescript v3.8.3 
- vuex v3.4.0
- eslint v6.7.2
- docker v19.03.13

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

### runserver
```
$ npm run dev
```

## その他コマンド
### bundle size 

```
$ yarn build --analyze
```
## error が出たとき..
## cache クリア
```
$ npm cache verify --force
```

### vue cli not found と出た場合
```
$ rm -rf node_modules package-lock.json && npm install
```

## モジュールを削除 再インストール
```
$ rm -rf node_modules && rm package-lock.json && npm cache clear --force && npm cache clean --force && npm i
```

## Compoent構成
Atomic Design 導入 
詳しくは → https://github.com/team-up-develop/teamup-develop-front/issues/86

## 命名規約
```
案件: job
詳細: detail
管理: manage
参加: participate
応募: apply
拒否: reject
チャット: chat
お気に入り いいね: favorite
```

## style & javaScript ※ここは今後linterにて設定します🙇‍♂️
- JavaScript キャメルケース推奨
- インデントは半角スペース2つ分で揃え、タブは混ぜないこと
- 固有名詞などを除いて大文字は使用を控えること
- 不要なスペースをコード各所に残さないこと
- コメントは必要に応じて残すこと
> https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments
> https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight
```
//* 処理の内容(必要に応じて)
//? 処理の中の子説明 or paramsの説明
// TODO: すること
// FIXME: 私が修正します
```

- メディアのキャプションや alt テキストを設定すること
- 行の折り返しは適宜行うこと
- style ケバブケース推奨
- Bemを使用すること
- セクションコメントでグループ化すること
- _variables.scssでの共通化すること
- PXの多用はしない (% or remを推奨)
- media screen ごとに分けること
- ComponentあたりでStyleを適用すること

## color
<img width="612" alt="スクリーンショット 2020-12-19 10 59 58" src="https://user-images.githubusercontent.com/56709557/102679879-7673e880-41f6-11eb-8889-27143779a070.png">
