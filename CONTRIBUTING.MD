# Contributing to Gorciu Studio

This document contains informations how to contribute to Gorciu Studio or run it from its code. Use the table of contents below to navigate this document.

* [Installing Node.JS packages](#installing-the-gorciu-studio-dependencies)
    * [Troobleshooting](#troubleshotting-dependencies-installation)
* [Running project](#running-the-gorciu-studio)
* [Bug reporing](#bug-reporting)
    * [Opening an issue](#opening-a-issue)

## Installing the Gorciu Studio dependencies

First install the Node.JS modules using this command (don't use Yarn):

```npm install```

### Troubleshotting dependencies installation

If you see the errors use this section to delete them.

1. Node.JS version error
    - The error message: `Error detected: unsupported version of Node.JS. Use latest version of Node.JS from https://nodejs.org/ website. (error code: 0x0001)`
    - Troobleshoting: The Gorciu Studio preinstall script detected that you have unsupported version of Node.JS (in this project the required version is 21.0.0). Install new version of Node.JS from [Node.JS's official website](https://nodejs.org/).
2. Installation stopped error
    - The error message: `INSTALLATION STOPPED: A problem / problems has been detected and the required packages has been prevented from installing.`
    - Troobleshoting: Fix the previous displayed errors. This error is displayed only if minimum one of previous problems exists.

## Running the Gorciu Studio

After installing the Gorciu Studio dependencies you can run or compile project. If you want to run the project use this command:

```npm start```

## Bug reporting

If you find the bug in Gorciu Studio (I think this project has a lot of bugs) go to [SECURITY.MD](https://github.com/gorciu-official/studio/blob/main/SECURITY.MD) file and follow the instructions.

### Opening a issue

1. Before performing any actions please check for identical issues. If there is identical issue don't submit the same content.
2. If your issue is original send it via [Github Issues](https://github.com/gorciu-official/studio/issues)

### Reporting a security vulnerability

The complete instruction you can find on [SECURITY.MD](https://github.com/gorciu-official/studio/blob/main/SECURITY.MD).