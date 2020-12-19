# team-devlop-fornt
Typescript導入後

## Docker setup
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

### errorが起きるはずです。
その際に必要なパッケージをInstallしてくださいと指示があるはずです。
それらを指示通りコンテナ内でinstallしてください。
そちらで完了です。

### vue cli not found と出た場合
```
rm -rf node_modules package-lock.json && npm install
```
# Compoent構成
Atomic Design 導入 
詳しくは → https://github.com/team-up-develop/teamup-develop-front/issues/86

# 命名規約
## 開発案件
### 案件
```
job
```

### 詳細

```
detail
```

## 管理

```
manage
```

### 参加

```
apply
or
participate
```

### 拒否

```
reject
```

## チャット

```
chat
```

## お気に入り いいね

```
favorite
```

## 応募

```
apply
```

## ユーザー

```
user
```

# Style & JavaScript
### ・キャメルケースを使用(JavaScript)
### ・インデントは半角スペース2つ分で揃え、タブは混ぜないこと
### ・固有名詞などを除いて大文字は使用を控えること
### ・不要なスペースをコード各所に残さないこと
### ・コメントは必要に応じて残すこと
> https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments

```
//! Todo
//* 基本処理や親要素に使用
//? 子要素に使用 or paramsの説明
```

**style**

```
// * color
// ? basic
$basic-white: #ffffff;
$sub-white: #EFEFEF;
$primary-color: #2196F3;
```

**javascript**

```
    getJob(job) {
      this.jobDetail = job; //? clickした案件を取得
      this.detailFlag = true; //? 詳細画面を表示するか否かを判定する
      this.id = job.id;  //? clickしたIdを this.idに格納する
      this.selfJobPost = false; //? clickする度に 自分の案件では無くする
      this.applyFlug = true; //? clickする度に 応募済み案件にする
      // * ログインしていれば以下の処理が走る
      if(this.userId) {
        // * 自分の案件かを判定
```

### ・中に子要素が入らない場合ワンライナー記述
**通常**

```
<router-link to="/jobs" class="router-link">案件を探す</router-link>
```

**ワンライナー**

```
<font-awesome-icon icon="search" class="icon"/>
```

### ・メディアのキャプションや alt テキストを設定すること
### ・行の折り返しは適宜行うこと
# Style

### ・ケバブケース推奨
### ・Bemを使用すること
### ・セクションコメントでグループ化すること
### ・_variables.scssでの共通化すること
### ・PXの多用はしない (% or remを推奨)
### ・media screen ごとに分けること
### ・ComponentあたりでStyleを適用すること

## Color
<img width="612" alt="スクリーンショット 2020-12-19 10 59 58" src="https://user-images.githubusercontent.com/56709557/102679879-7673e880-41f6-11eb-8889-27143779a070.png">

