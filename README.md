[![npm version](https://img.shields.io/npm/v/@georapbox/lorem-ipsum-element.svg)](https://www.npmjs.com/package/@georapbox/lorem-ipsum-element)
[![npm license](https://img.shields.io/npm/l/@georapbox/lorem-ipsum-element.svg)](https://www.npmjs.com/package/@georapbox/lorem-ipsum-element)

[demo]: https://georapbox.github.io/lorem-ipsum-element/
[license]: https://github.com/georapbox/lorem-ipsum-element/blob/main/LICENSE
[changelog]: https://github.com/georapbox/lorem-ipsum-element/blob/main/CHANGELOG.md

# &lt;lorem-ipsum&gt;

A custom element that generates "Lorem Ipsum" placeholder text.

[API documentation](#api) &bull; [Demo][demo]

## Description

The `lorem-ipsum` element generates "Lorem Ipsum" placeholder text. Use this element to quickly generate placeholder text for demos and prototypes, or to fill in content for testing purposes.

## Install

```sh
npm install --save @georapbox/lorem-ipsum-element
```

## Usage

### Script

```js
import { LoremIpsum } from './node_modules/@georapbox/lorem-ipsum-element/dist/lorem-ipsum.js';

// Manually define the element.
LoremIpsum.defineCustomElement();
```

Alternatively, you can import the automatically defined custom element.

```js
import './node_modules/@georapbox/lorem-ipsum-element/dist/lorem-ipsum-defined.js';
```

### Markup

```html
<lorem-ipsum count="3" start-with-lorem></lorem-ipsum>
```

## API

### Properties
| Name | Reflects | Type | Required | Default | Description |
| ---- | -------- | ---- | -------- | ------- | ----------- |
| `count` | - | Number | - | `1` | The number of paragraphs or lists to generate. |
| `lists` | - | Boolean | - | `false` | Whether to generate lists instead of paragraphs. |
| `startWithLorem`<br>*`start-with-lorem`* | - | Boolean | - | `false` | Whether the first paragraph should start with "Lorem ipsum dolor sit amet...". |

### Methods

| Name | Type | Description | Arguments |
| ---- | ---- | ----------- | --------- |
| `defineCustomElement` | Static | Defines/registers the custom element with the name provided. If no name is provided, the default name is used. The method checks if the element is already defined, hence will skip trying to redefine it. | elementName='lorem-ipsum' |
| `generate`<sup>1</sup> | Instance | Generates the lorem ipsum text. Useful if you want to regenerate the text after changing the properties. | - |

<sup>1</sup> Instance methods are only available after the component has been defined. To ensure the component is defined, you can use `whenDefined` method of the `CustomElementRegistry` interface, eg `customElements.whenDefined('lorem-ipsum').then(() => { /* call methods here */ });`

## Changelog

For API updates and breaking changes, check the [CHANGELOG][changelog].

## Development setup

### Prerequisites

The project requires `Node.js` and `npm` to be installed on your environment. Preferrably, use [nvm](https://github.com/nvm-sh/nvm) Node Version Manager and use the version of Node.js specified in the `.nvmrc` file by running `nvm use`.

### Install dependencies

Install the project dependencies by running the following command.

```sh
npm install
```

### Build for development

Watch for changes and start a development server by running the following command.

```sh
npm start
```

### Linting

Lint the code by running the following command.

```sh
npm run lint
```

### Testing

Run the tests by running any of the following commands.

```sh
npm test
npm run test:watch # watch mode
```

### Build for production

Create a production build by running the following command.

```sh
npm run build
```

## License

[The MIT License (MIT)][license]
