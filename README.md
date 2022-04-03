# Introduction
`lazy-img`

- A custom element of lazy-image-loading based on web-components.
- It can be used in both Vue and React.
# Installing
## npm
```
npm install @likun./lazy-img
```
## yarn
```
yarn add @likun./lazy-img
```
# Usage
## Importing package
```
import '@likun./lazy-img';
```
## Use in Vue
```vue
<lazy-img
  :src="imgSrc"
  width="50%"
  height="200px"
  @lazyload="handleLoad"
  @lazyerror="handleError"
/>
```
## Use in React
```jsx
<lazy-img
  src={imgSrc}
  width={300}
  height="200"
  onLazyload={handleLoad}
  onLazyerror={handleError}
/>
```
## Note

- Attribute `width` & `height` can be _string_, _number_, and _percentage_.
- Event `lazyload` is triggered when image is loaded successfully.
- Event `lazyerror` is triggered when image loading failed.
