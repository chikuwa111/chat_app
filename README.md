セットアップ
---
* リポジトリの作成  
githubで新しいリポジトリを作成  
リポジトリ名はchat_app

* flux_tutorialのリポジトリをクローン  
```
$ git clone -b master https://github.com/water23/flux_tutorial.git
```
gitリポジトリのURLを変更  
```
$ git remote set-url origin https://github.com/アカウント名/chat_app.git
```

* アプリケーションのセットアップ  
```sh
# Gemのインストール
$ bundle install
```

* js周りのセットアップ  
nodebrew,node,npmを下記サイト等を参考にインストール  
http://qiita.com/sinmetal/items/154e81823f386279b33c  
```sh
$ npm install
# jsのビルド

$ npm run watch
# jsの開発時に走らせておくと、自動でビルドが走る(エラー箇所等を教えてくれます)。
# 3877448 bytes written to public/assets/javascripts/boot.js (1.20 seconds)のような1行が出たら成功です。
```

###セットアップ完了
ここまで全て完了したら、fluxチュートリアルに移りましょう。  
チュートリアルはwikiにあります。
