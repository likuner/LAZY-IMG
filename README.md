# Introduction
`lazy-img`

- a custom element of lazy-load-image based on web-components.
- it can be used in both `vue` & `react` projects.
- it can also be used in native `html`.
# Installing 🛠
## CDN

- you can get `lazy-img` through CDN.
- you can add `@+version` after `/lazy-img` if you need to load the specified version.
```html
<script src="https://unpkg.com/@likun./lazy-img/dist/index.js"></script>
```
## npm
```
npm install @likun./lazy-img
```
## yarn
```
yarn add @likun./lazy-img
```
# Usage
## Use in HTML
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>lazy-img</title>
  <script src="https://unpkg.com/@likun./lazy-img/dist/index.js"></script>
</head>
<body>
  <lazy-img src="image.png" width="500" height="300" alt="lazy image" />
</body>
</html>
```
## Use in Vue and React
### Importing package
```
import '@likun./lazy-img'
```
### Use in Vue

- learn more: [Vue and Web Components](https://vuejs.org/guide/extras/web-components.html) and [🇨🇳中文](https://v3.cn.vuejs.org/guide/web-components.html).
```vue
<lazy-img
  :src="imgSrc"
  width="50%"
  height="200px"
  @lazyload="handleLoad"
  @lazyerror="handleError"
/>
```
### Use in React

- learn more: [Using Web Components in React](https://reactjs.org/docs/web-components.html) and [🇨🇳中文](https://zh-hans.reactjs.org/docs/web-components.html).
- **className** will be resolved to **classname**, but you can use `class` directly.
- events triggered by web components may not be delivered correctly through the react rendering tree, you need to manually add event handlers in the react component to handle these events, the following example:
```jsx
import { useState, useRef, useEffect } from 'react'
import styles from './LazyDemo.module.less'

function LazyDemo() {
  const lazyRef = useRef()
  const [imgSrc] = useState('image.png')

  useEffect(() => {
    const handleLoad = () => {}
    const handleError = (e) => {
      // e.target.setAttribute('src', 'image1.png')
    }
    lazyRef.current.addEventListener('lazyload', handleLoad)
    lazyRef.current.addEventListener('lazyerror', handleError)

    return () => {
      lazyRef.current.removeEventListener('lazyload', handleLoad)
      lazyRef.current.removeEventListener('lazyerror', handleError)
    }
  }, [])

  return (
    <lazy-img
      ref={lazyRef}
      src={imgSrc}
      width="300px"
      height="200px"
      // class can be used here
      class={styles.lazyImage}
    />
  )
}

export default LazyDemo
```
## Attributes
| **Parameter** | **Explanation** | **Type** | **Defalut value** |
| --- | --- | --- | --- |
| src | url of image | string |  |
| presrc | url of space occupying image when lazy | string |  |
| width | width of image | number &#124; string &#124; percentage | 300px |
| height | height of image | number &#124; string &#124; percentage | 200px |
| alt | alternate text description of the image when failed | string |  |

## Events
| **Name** | **Explanation** | **Callback arguments** |
| --- | --- | --- |
| lazyload | triggered when image is loaded successfully | event |
| lazyerror | triggered when image loading failed | event |
