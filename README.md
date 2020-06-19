# Baseline App

Welcome to the repository for the Baseline App.
The Baseline app is an [Electron based](https://github.com/electron/electron) application.

## Supported Operating Systems

* MacOS (darwin)

## Download

Please head over to https://baseline.dev/download to download the latest release.

## Baseline Account

If you don't yet have access to Baseline, please head over to https://baseline.dev and request an invite.

## Running the application

Simply download the application and move it to your applications folder.

## Building and Signing the application

1. Create a file called `electron-builder.env` and add the following contents:

```
CSC_IDENTITY_AUTO_DISCOVERY=false
GH_TOKEN=GITHUB_TOKEN
CSC_NAME=DEVELOPER_IDENTITY
APPLEID=DEVELOPER_ACCOUNT@EMAIL.COM
APPLEIDPASS=DEVELOPER_ACCOUNT_PASSWORD
```

You can then run `npm run release` to sign the application.