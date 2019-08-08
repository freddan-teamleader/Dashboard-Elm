# Elm Dashboard Plugin

Elm Dashboard Plugin is a starter project for developing Dashboard plugins in Elm that contains all the tools you need for writing awesome plugins.

## Wiki

[Learn all the things](https://github.com/Infomaker/Dashboard-Plugin/wiki)

## Prerequisites

* Yarn - [https://github.com/yarnpkg/yarn](https://github.com/yarnpkg/yarn)

## Setup

```text
yarn
```

## Build

> Build development package yarn dev
>
> Build production package yarn build:prod

## Server

> Serve plugin locally yarn server

This will serve your plugin local and that url can be used for install you dev-plugin on dev.dashboard.infomaker.io.

## Upload S3

```text
yarn upload:s3 accessKeyId="YOUR_ACCESS_KEY_ID" secretAccessKey="YOUR_SECRET_ACCESS_KEY" bucket="YOUR_BUCKET"
```

This will first execute yarn build:prod

The plugin bundle from the manifest file will be added as part of the key. Example: se-infomaker-dashboard-plugin/manifest.json

So your plugin manifest path will be: S3\_URL\_PATH/se-infomaker-dashboard-plugin/manifest.json

## License

Dashboard Plugin is released under the [MIT](http://www.opensource.org/licenses/MIT) License.

