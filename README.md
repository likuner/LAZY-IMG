# Introduction
`lazy-img`

- a custom element of lazy image loading based on web components.
- It can be used in both Vue and React.
# Download
## yarn
```
yarn add @likun./lazy-img
```
## npm
```
npm install @likun./lazy-img
```
# Usage
## import package
```
import '@likun./lazy-img';
```
## Use in Vue
```
<lazy-img :src="imgSrc" width="50%" height="200px" alt="this is a lazy img" />
```
## Use in React
```
<lazy-img src={imgSrc} width="300" height="200" alt="this is a lazy img"/>
```
## Note
- width and height can be `string`, `number` and `percentage`.