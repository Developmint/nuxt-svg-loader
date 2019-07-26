# Nuxt SVG Loader - SVGs as components, also on the server side!
[![npm (scoped with tag)](https://img.shields.io/npm/v/nuxt-svg-loader/latest.svg?style=flat-square)](https://npmjs.com/package/nuxt-svg-loader)
[![npm](https://img.shields.io/npm/dt/nuxt-svg-loader.svg?style=flat-square)](https://npmjs.com/package/nuxt-svg-loader)
[![Build Status](https://travis-ci.com/Developmint/nuxt-svg-loader.svg?branch=master)](https://travis-ci.com/Developmint/nuxt-svg-loader)
[![codecov](https://codecov.io/gh/Developmint/nuxt-svg-loader/branch/master/graph/badge.svg)](https://codecov.io/gh/Developmint/nuxt-svg-loader)
[![Dependencies](https://david-dm.org/Developmint/nuxt-svg-loader/status.svg?style=flat-square)](https://david-dm.org/Developmint/nuxt-svg-loader)
[![js-standard-style](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com)
 [![thanks](https://img.shields.io/badge/thanks-%E2%99%A5-ff69b4.svg)](https://thanks.lichter.io/)

>

[📖 **Release Notes**](./CHANGELOG.md)

## Features

* Full support of SVGs as components. Import them like your Vue SFCs
* Use Vue bindings as you'd do it with normal components
* Built on top of [svg-to-vue-component](https://github.com/egoist/svg-to-vue-component)
* Nuxt 2 (and only Nuxt 2) support
* Fully tested!

## Demo

A live demo is available through the [CodeSandBox](https://codesandbox.io/s/github/Developmint/nuxt-svg-loader/tree/master) of the repo.

## Setup

- Add `nuxt-svg-loader` as a dependency using yarn or npm to your project
- Add `nuxt-svg-loader` to `modules` section of `nuxt.config.js`

```js
{
  modules: [
    'nuxt-svg-loader',
  ]
}
```

- Now you can use your svg files like regular Vue components
- You can use inline svg as well by adding `?inline` at the end of the file path
```
<template>
  <nav>
    <a href="https://github.com/vuejs/vue">
      <VueLogo />
      Vue
    </a>
    <a href="https://github.com/svg/svgo">
      <SVGOLogo />
      SVGO
    </a>
    <a href="https://github.com/webpack/webpack">
      <WebpackLogo />
      webpack
    </a>
    <!-- Inline svg -->
    <a class="with-background-svg" href="https://github.com/webpack/webpack">
      webpack
    </a>
    <a href="https://github.com/webpack/webpack">
      <img src="../components/NuxtTwo.svg?inline">
      webpack>
    </a>
  </nav>
</template>
<script>
import VueLogo from '@/assets/svg/vue.svg';
import SVGOLogo from '@/assets/svg/svgo.svg';
import WebpackLogo from '@/assets/svg/webpack.svg';

export default {
  name: 'Example',
  components: {
    VueLogo,
    SVGOLogo,
    WebpackLogo,
  }
};
</script>
<style>
.with-background-svg {
  background: url('@/assets/svg/vue.svg?inline')
}
</style>
```

- No more options are needed. It'll simply work

## Configuration

The plugin will work seamlessly out of the box.
It will also include SVGO defaults to avoid collisions between your optimized SVG files!
 
If you want to configure the underlying loader (or SVGO), you can do that easily as well.
(All options available [here](https://github.com/egoist/svg-to-vue-component#loader-options))

```js
// file: nuxt.config.js

export default {
  // ...
  // Your loader options as svgLoader object
  svgLoader: {
    svgoConfig: {
      plugins: [
        { prefixIds: false } // Disables prefixing for SVG IDs
      ]
    }
  }
}
```

## Migrating from 0.x

1. Update the deps (of course!)
2. Rename `svgo` to `svgoConfig`
3. If you used id prefixing manually before, you can delete the config:

```js
export default {
  svgLoader: {
    svgo: { //Rename to svgoConfig  
      plugins: [
        { prefixIds: true } // Delete that line (or the whole svgLoader object if you don't have any other configurations)
      ]
    }
  }
}
```

## How to fix Eslint auto lint error
If you turn on Eslint on save by server, you should exclude `.svg` files of `eslint-loader`.

Example:
```js
// nuxt.config.js
build: {
    extend(config, ctx) {
    // Run ESLint on save
    if (ctx.isDev && ctx.isClient) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)|(\.svg$)/ /* <--- here */
      })
    }
  }
}
```

## Development

- Clone this repository
- Install dependencies using `yarn install` or `npm install`
- Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) Alexander Lichter
