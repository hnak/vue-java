# toiware backend template project

## Overview
トイウェアで作成する業務アプリケーションのバックエンドのテンプレートプロジェクトです。
SpringBootをコアコンポーネントとしており、試験的に（Servletを使わずに）Webfluxを採用しています。

フロントエンドはVue.js+Quasarで開発し、本バックエンドプロジェクトのデプロイ時にインテグレーションします。
バックエンドへのインテグレーションは未実装です。（TODO）

基本的に画面を持たず、REST API/websocketの応答を行うシステムになります。

## System Requirement
- Java8 (Java9検討中)
- SpringBoot2
- Spring5
- MySQL
- Docker/docker-compose

フロントエンド開発・テスト環境以上はDockerで実行する想定です。
ローカル開発の際にはデバッガーを利用するためJava実行環境・MySQLをインストールしてください。

# Build Setup
```bash
# Local(事前にMySQLをインストールしてください。)
cd spring
./gradlew bootRun

# Docker
docker-compose build
docker-compose up
```

## フォルダ構成
```
docker-compose.yml
logs : ログファイル出力場所  
spring
├─build.gradle : ビルド定義  
├─lib : 外部ライブラリ置き場  
└─src  
   ├─main  
   │  ├─java  
   │  │  └─jp  
   │  │      └─co  
   │  │          └─toiware  
   │  │              └─condor: Javaソースのトップレベルドメイン  
   │  │                  | CondorApplication.java : Springboot起動クラス  
   │  │                  ├─controller : REST Controllerの配置場所  
   │  │                  ├─service : サービスクラス配置先
   │  │                  ├─domain : ドメインモデルクラスを以下に配置  
   │  │                  │  ├─entity : エンティティクラス配置先  
   │  │                  │  └─repository : レポジトリクラス配置先   
   │  │                  ├─config : コンフィグクラスを以下に配置  
   │  │                  └─utils : ユーティリティクラス  
   │  └─resources  
   │     ├─application.yml  
   │     └─static : フロントエンドのモジュールの配置先
   │          
   └─test  
       └─java  
           └─jp  
               └─co  
                   └─toiware  
                       └─condor : テストディレクトリはmainとパスを合わせて配置  
```

## Javaパッケージ構成とクラス責務
### controller
- REST Controllerクラスをこの下に配置してください。（@RestControllerアノテーションが付随したクラスが対象）  
- IFのやり取りに使用するPOJOなDTOクラスもここに配置するので機能単位でサブディレクトリを掘ってください。  
- コントローラーは「XXXXController.java」、DTOはPostメソッドの場合は「XXXXPostDto.java」となるネーミングにしてください。※仮ルール
- BaseController、BaseDtoを継承したクラスとしてください。
- XXXXのネーミングは基本的に各レイヤで共通となるイメージです。ACCOUNTの場合は、AccountController、AccountRepository、AccountServiceです。

### service
- サービスクラスをこの下に配置してください。（@Serviceアノテーションが付随したクラスが対象）  
- 「XXXXService.java」となるネーミングにしてください。
- BaseServiceを継承したクラスとしてください。サービスクラスでトランザクションを定義（@Transactional）するのでBaseServiceの挙動を変更したい場合はOverrideしてください。<br>デフォルト設定は(rollbackFor = Exception.class, propagation = Propagation.REQUIRED)です。
- 基本的にこのクラスに業務処理をすべて記載するので肥大化しやすくなっています。<br>可読性が悪くなる場合は、XXXXValidatorやXXXXLogicといったクラスに分離することも検討してください。これらのクラスはサブディレクトリを切って配置してください。

### domain
#### entity
- エンティティクラスをこの下に配置してください。（@Entityアノテーションが付随したクラスが対象）  
- テーブル名に合わせたクラス名してください。ex. ACCOUNTテーブルの場合は「Account.java」
- BaseEntityを継承したクラスとしてください。このクラスで共通カラムを定義するので重複しないようにしてください。

#### repository
- エンティティインターフェースをこの下に配置してください。
- テーブル名に合わせたクラス名してください。ex. ACCOUNTテーブルの場合は「AccountRepository.java」
- SpringJPAに合わせてCrudRepositoryを継承したインターフェースとしてください。（継承元は実装に合わせて適宜変更してください）

### config
- プロセスを起動時のインスタンスごとの事前処理や準備を行う処理はここにまとめて配置します。
- @Configrationをつけたクラスが配置されるイメージです。

### utils
- StrinUtilsのような各クラス共通に使用できるもので状態に依存しない応答を返すクラスについてはここに配置してください。


## コーディング規約
### グラウンドルール
基本的なルールとしてGoogleのコーディング規約に則って開発を行ってください。
https://google.github.io/styleguide/javaguide.html  
（日本語訳）https://kazurof.github.io/GoogleJavaStyle-ja/

静的解析ツールの規約を守るようにしてください。（警告がでないようにメンテナンス）  
Java：FindBugs、Checkstyle  
Typescript：tslint  
※IDE（統合開発環境）の設定でこれらのチェックを適用するように設定します。  

### コーディング関連
- クラス責務を守ってコーディングしてください。<br>ex. コントローラーに業務処理を記載しない、サービスに状態を持たせない、同じ処理を何度もコーディングしない
- 特に制約がない場合にはアクセサ、コンストラクタはlombokアノテーションを利用してください。
- テストコードを記述すること（JUnitで実施、カバレッジは C0:100%,C1:90%を目標値とする）

### プロパティ関連
- プロパティのハードコーディングを禁止します。application.yml等に記載してください。単一のプロパティを取得する場合は@Valueを使用してください。
- 環境依存でアプリケーションの挙動を帰る場合はapplication-{ENV}.ymlで吸収します。環境ごとの設定は環境別YMLに記載してください。（ex. 本番環境の場合は application-production.yml）
- application.ymlの内のプロパティで類似したカテゴリのプロパティはグルーピングして階層構造になるようにしてください。

### 例外処理・ログ関連
- Controller内で発生した例外はエラーハンドリングクラスで共通処理します。発生が予期できるものついてはエラーメッセージ、デバッグ用の変数等をセットするようにしてください。
- 開発用のログはデバッグレベルで出力してください。（logger.debug()で出力）

### コミットルール
- コミットコメントには変更内容の概要を記載してください。コメントなし・同じコメントでのコミットは禁止。
- 誤ってコミットした場合や単純な修正をしたい場合にコメント記載するのが難しい場合はコミットをまとめてコメントをメンテナンスするようにしてください。
- masterブランチは常に正常起動する状態に保ってください。
- 異なる課題のコミットを混ぜないようにしてください。
