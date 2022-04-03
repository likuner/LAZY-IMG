# Introduction
`lazy-img`

- a custom element of lazy-image-loading based on web-components.
- it can be used in both Vue and React.
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

- className is not valid in lazy-img, may be the reason there is "-" in the name. However, the name of the custom element of web-components must contain "-".
- event listeners that need special handling of lazyload & lazyerror in react，the following example：
```jsx
import { useState, useRef, useEffect } from 'react'

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
    />
  )
}

export default LazyDemo
```
## Note

- attribute `width` & `height` can be _string_, _number_, and _percentage_.
- attribute `alt` defines an alternate text description of the image.
- event `lazyload` is triggered when image is loaded successfully.
- event `lazyerror` is triggered when image loading failed.
