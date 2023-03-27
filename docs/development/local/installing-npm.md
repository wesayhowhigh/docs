---
sidebar_position: 3
sidebar_label: Installing npm packages
---

# Installing npm packages

When running `npm install` to install packages in the local node_modules folder, you may experience an error like this:

```bash
npm ERR! code E404
npm ERR! 404 Not Found - GET https://registry.npmjs.org/@jump%2Fpages - Not found
npm ERR! 404
npm ERR! 404  '@jump/pages@^1.1.0' is not in the npm registry.
npm ERR! 404 You should bug the author to publish it (or use the name yourself!)
npm ERR! 404 It was specified as a dependency of 'goring-victory-voyage'
npm ERR! 404
npm ERR! 404 Note that you can also install from a
npm ERR! 404 tarball, foder, http url, or git url.
```

In that case, you should change your npm registry to access JUMP packages

```bash
npm config set registry https://npm-proxy.fury.io/iQe2xgJjTKscoNsbBNit/jump/
npm config set ca ""
```
