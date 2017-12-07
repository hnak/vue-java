# セットアップ方法

## Vue+webpck クライアント開発環境構築
適当なディレクトリにプロジェクトをチェックアウト
http://github1.greatsimplex.com/nakanoya150151/golet  

node/npmがインストールされていること（以下コマンドで確認、手順は割愛）
```
$ npm -v
$ node -v
```

### webpackインストール
JSなどのアセットファイルをまとめて管理するモジュールバンドラーです。
開発の際の実行環境となるローカルサーバー（webpack-dev-server）も合わせて提供します。
```
$ cd {プロジェクトroot}/golet/
$ npm install
$ npm install -g webpack
（本番環境などサーバー環境向けにビルドファイルを作成する場合）
$ webpack
or
$ webpack -p （本番用）
```
### ローカルサーバー起動（フロントエンド）
```
$ npm start
以下URLにアクセスすると画面が確認できます（ホットリロードに対応しているハズなので合わせて確認してください）
http://localhost:3000/
※たまにバックグラウンドで残る場合があります、止めたい場合はタスクマネージャーからnode.exeをkillしてください。
```
### ローカルサーバー起動（バックエンド）
```
$ ./gradlew bootRun
以下URLにアクセスすると画面が確認できます（フロントエンドのリソースをあわせて確認する場合は上のwebpackビルドを事前に実行してください）
http://localhost:8080/
```
---

## Cordova環境構築
ハイブリッドアプリの実行環境です。HTML+JavascriptでiOS・Android向けアプリを作成することができます。

### Cordovaインストール
```
$ npm install -g cordova
PJ作成は不要なので省略
```

### プラットフォーム追加
```
$ cordova platform add android
$ cordova platform add browser
```

### iOS/android Simulator環境構築
とりあえずWEBで開発できるので割愛、あとで書いておきます。
```
$ cordova platform add android
android studioをインストール（かなり時間かかります）
https://developer.android.com/studio/index.html?hl=ja
```
### Simulator起動
```
$ cordova build
$ cordova run android
```
