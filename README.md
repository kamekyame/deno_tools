# Deno tools by kamekyame

[![ci](https://github.com/kamekyame/deno_tools/actions/workflows/ci.yml/badge.svg)](https://github.com/kamekyame/deno_tools/actions/workflows/ci.yml)

Denoで使えるツールをまとめました。

以下のようにインポートすることで使えます。

```ts
import * as denoToolHttp from "https://cdn.jsdelivr.net/gh/kamekyame/deno_tools/http/mod.ts";
```

各ツールの詳しい使い方はそれぞれのREADMEをご覧ください。

## Caution

各ツールについて、Denoのstdライブラリ等にて似たような機能が実装された場合にはこのリポジトリから削除（または別フォルダに移動）する可能性があります。
使用する際にはご注意ください。（代替の手法等は別途記載する予定ではあります。）

## Tools

### [http](./http/README.md)

fetch系のツールをまとめてあります。

- Basic Authを使用したfetch
- OAuth1.0aを使用したfetch

など...

### [path](./path/README.md)

path操作系のツールをまとめてあります。

- 相対パスを絶対パスに変換
