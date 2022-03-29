
import LazyImg from './components/LazyImg'
import LazyImgList from './components/LazyImgList'

customElements.define('lazy-img', LazyImg)
customElements.define('lazy-load-list', LazyImgList)

export {
  // 注意导出的是class，并不是自定义元素
  LazyImg,
  LazyImgList
}