# team-devlop-fornt
Typescript導入後

## 環境構築
### build
```
docker-compose up -d --build
```

### in container & bash start up
```
docker-compose exec app sh
```

### runserver
```
npm run dev
```

### build size 

```
yarn build --analyze
```

### node package install
```
npm i
```

### vue cli not found と出た場合
```
rm -rf node_modules package-lock.json && npm install
```

### error が起きている時
```
rm -rf node_modules && rm package-lock.json && npm cache clear --force && npm cache clean --force && npm i
```

# Compoent構成
Atomic Design 導入 
詳しくは → https://github.com/team-up-develop/teamup-develop-front/issues/86

## 命名規約
```
案件
job
詳細
detail
管理
manage
参加
participate
応募
apply
拒否
reject
チャット
chat
お気に入り いいね
favorite
```

## Style & JavaScript
- キャメルケースを使用(JavaScript)
- インデントは半角スペース2つ分で揃え、タブは混ぜないこと
- 固有名詞などを除いて大文字は使用を控えること
- 不要なスペースをコード各所に残さないこと
- コメントは必要に応じて残すこと
> https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments

```
// Todo: 
// FIXME: 
//* 内容(必要に応じて)
//? 子要素に使用 or paramsの説明
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

## Color
<img width="612" alt="スクリーンショット 2020-12-19 10 59 58" src="https://user-images.githubusercontent.com/56709557/102679879-7673e880-41f6-11eb-8889-27143779a070.png">
