# next-minify-classnames [![npm][1]][2]

Minify CSS Modules class names.

## Installation

```sh
npm install next-minify-classnames
```

## Usage

### With [next-with-plugins][3]

```js
/* next.config.js */

const withPlugins = require('next-with-plugins')

module.exports = withPlugins({
  plugins: [
    {
      resolve: 'next-minify-classnames',
      options: {
        /* next-minify-classnames options here */
      }
    }
  ]
})
```

### Standalone

```js
/* next.config.js */

const withMinifyClassNames = require('next-minify-classnames')

module.exports = withMinifyClassNames({
	/* Next.js config options here */
	minifyClassNames: {
		/* Plugin options here */
	},
})
```

### With next-compose-plugins

```js
/* next.config.js */

const withMinifyClassNames = require('next-minify-classnames')

module.exports = withPlugins([
	[withMinifyClassNames, {
		minifyClassNames: {
			/* Plugin options here */
		},
	}],
],
{
  /* Next.js config options here */
})
```

## Options

### dictionary

Type: `string`.
Default: `'bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ0123456789'`.

Characters used to generate the minified class names. Class names should start
with letters, so the string must have at least one letter. To avoid issues with
specific class names and ad blockers — e.g. `ad` —, the default dictionary uses
only consonants and numbers.

### enable

Type: `boolean`. Default: `process.env.NODE_ENV === 'production'`.

Set it to `true` to enable the plugin, `false` to disable. By default, it'll be
enabled on production environments.

### prefix

Type: `string`. Default: `''`.

### suffix

Type: `string`. Default: `''`.

## How it works

It shortens the class name length by mapping `resourcePath` and `localName`
to incremental strings.

### Example

The files `index.module.css` and `menu.module.css`, respectively:

```css
.container {
  display: flex;
}

.footer {
  padding: 1rem;
}
```

```css
.container {
  position: fixed;
}
```

Generate the following CSS with `next-minify-classnames` enabled:

```css
/* index.module.css */

.b_b {
  display: flex;
}

.b_c {
  padding: 1rem;
}

/* menu.module.css */

.c_b {
  position: fixed;
}
```

With `next-minify-classnames` disabled, the following CSS would be generated:

```css
/* index.module.css */

.index-module--container--l2fVb {
  display: flex;
}

.index-module--footer--3V8ew {
  padding: 1rem;
}

/* menu.module.css */

.menu-module--container--28fe0 {
  position: fixed;
}
```

## License

[The MIT License][license]

[1]: https://img.shields.io/npm/v/@numbered/next-minify-classnames
[2]: https://www.npmjs.com/package/@numbered/next-minify-classnames
[3]: https://github.com/mrgnou/next-minify-classnames
[license]: ./LICENSE
