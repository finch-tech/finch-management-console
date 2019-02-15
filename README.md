<div style="text-align:center; margin: 50px 0">
  <img src="docs/finch-logo.png" width="200" />
</div>

# Official Web-based Finch Management Console.

This is the official web-based Finch management console.

**Note**: Finch is currently in beta form and may change significantly before version 1.0 is released.

## Demo

Try [public demo](https://app.finchtech.io) of Finch and this Management Console.

## Dependencies

- nodejs
- npm

## Installation

```shell
$ git clone https://github.com/finch-tech/finch-management-console
$ npm install
$ API_PROTOCOL=<YOUR_API_PROTOCOL> API_HOST=<YOUR_API_HOST> API_PORT=<YOUR_API_PORT> npm run build
```

This creates `finch-management-console.js` file in the `dist` subdirectory.

## Running Management Console

The management console consists of a single JavaScript file (`finch-management-console.js`).
Therefore all you need to do is to serve a static HTML with a mount point(`<div id="app" />`) that loads the `finch-management-console.js`.

Example HTML:

```html
<html>
  <head>
    <title></title>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
  </head>

  <body>
    <div id="app"></div>
    <script src="/PATH_TO/finch-management-console.js"></script>
  </body>
</html>
```

## Setting Up Your Store

Here is the [step-by-step guide](https://docs.finchtech.io/docs/getting_started/setup) on how to set up your store on the management console.

## Resources

- [Documentation](https://docs.finchtech.io/docs/home/overview.html)
- [Finch Installation Guide](https://docs.finchtech.io/docs/installation/server)
- [Finch Getting Started Guide](https://docs.finchtech.io/docs/getting_started/overview) (Store Setup and Integration)
