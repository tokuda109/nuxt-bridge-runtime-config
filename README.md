# nuxt-bridge-runtime-config

`nuxi preview` で環境変数をどのように渡すのかを確認するためのデモアプリ。

## ドキュメント

https://nuxt.com/docs/guide/directory-structure/env から必要な箇所を抜粋。

> if you have a .env file in your project root directory, it will be automatically loaded at build, dev, and generate time, and any environment variables set there will be accessible within your nuxt.config file and modules.
>
> プロジェクトのルートディレクトリに .env ファイルを置くと、`nuxi build` の時、`nuxt dev`の時、`nuxt generate`の時に自動的に読み込まれ、設定された環境変数は nuxt.config ファイルやモジュールでアクセス可能になります。

> However, after your server is built, you are responsible for setting environment variables when you run the server. Your .env file will not be read at this point. How you do this is different for every environment. On a Linux server, you could pass the environment variables as arguments using the terminal DATABASE_HOST=mydatabaseconnectionstring node .output/server/index.mjs. Or you could source your env file using source .env && node .output/server/index.mjs.
>
> しかし、サーバーがビルドされた後は、サーバーを起動する時に環境変数を設定する必要があります。この時には .env ファイルは読み込まれません。
> これを設定するには環境ごとに違います。Linux では、DATABASE_HOST=mydatabaseconnectionstring node .output/server/index.mjs のように引数として渡せます。
> もしくは、source .env && node .output/server/index.mjs のように env ファイルを反映させることもできます。

## 確認手順

`nuxi dev` に環境変数を渡すと Runtime Config に反映される。次のコマンドを実行して、http://localhost:3000 にアクセスすると次の Rumtime Config が出力される。

```
❯ npm ci
❯ BASE_URL=http://localhost:4000 npm run dev
Listening http://[::]:3000

{
  app: {
    baseURL: '/',
    basePath: '/',
    assetsPath: '/_nuxt/',
    cdnURL: '',
    buildAssetsDir: '/_nuxt/'
  },
  nitro: { envPrefix: 'NUXT_', routeRules: {} },
  public: { baseUrl: 'http://localhost:4000' },
  BASE_URL: 'http://localhost:4000',
  build: { number: 0 }
}
```

しかし、次のような実行に環境変数を渡しても反映されない。

```
❯ npm run build
❯ BASE_URL=http://localhost:4000 node .output/server/index.mjs

{
  app: {
    baseURL: '/',
    basePath: '/',
    assetsPath: '/_nuxt/',
    cdnURL: '',
    buildAssetsDir: '/_nuxt/'
  },
  nitro: { envPrefix: 'NUXT_', routeRules: {} },
  public: { baseUrl: 'http://localhost:3000' },
  BASE_URL: 'http://localhost:3000',
  build: { number: 0 }
}
```

ブラウザで確認すると、HTML は http://localhost:4000 になっているが、クライアント上で http://localhost:3000 に切り替わる。

これは process.env としては環境変数を渡すことができ、Node.js は環境変数を受け取ることができるが、ブラウザ上では環境変数をアプリケーション実行時に受け取れないことを意味する。

どうするか?

## 調査メモ

### 似たような問題 / 質問

- https://discord.com/channels/473401852243869706/1102186562567012443/1102186562567012443
- https://discord.com/channels/473401852243869706/1080132545292812298/1080132545292812298


### ofetch は 1.0.1 で固定している

```
❯ npm run dev

> dev
> NODE_ENV=${NODE_ENV:-development} nuxi dev

Module parse failed: Unexpected token (106:15)                                                                                                                                                                                                        friendly-errors 15:47:44
File was processed with these loaders:
 * ./node_modules/unplugin/dist/webpack/loaders/transform.js
You may need an additional loader to handle the result of these loaders.
|     ...input
|   };
>   if (defaults?.params && input?.params) {
|     merged.params = {
|       ...defaults?.params,

 @ ./node_modules/ofetch/dist/index.mjs 1:0-64 2:0-86 2:0-86 2:0-86 23:15-26 26:0-55
 @ ./.nuxt/nitro-bridge.client.mjs
 @ ./.nuxt/index.js
 @ ./.nuxt/client.js
 @ multi ./node_modules/eventsource-polyfill/dist/browserify-eventsource.js (webpack)-hot-middleware/client.js?reload=true&timeout=30000&ansiColors=&overlayStyles=&path=%2F__webpack_hmr%2Fclient&name=client ./.nuxt/client.js
```

### GitHub Issues

* https://github.com/nuxt/nuxt/issues/15220
