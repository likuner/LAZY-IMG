import { throttle } from 'lodash'

class LazyImg extends HTMLElement {
  private shadow: ShadowRoot = null;
  private img: HTMLImageElement = null;
  private loaded: boolean = false;

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.img = document.createElement('img') as HTMLImageElement
    this.shadow.appendChild(this.img)
  }

  static observedAttributes = [
    'src', 'width', 'height'
  ]
  
  attributeChangedCallback(name, oldVal, newVal) {
    console.log('lazy-img-change', name, oldVal, newVal)
    if(oldVal !== newVal) {
      if(name === 'src') {
        this.loaded && this.img.setAttribute(name, newVal)
      } else {
        this.img.setAttribute(name, newVal)
      }
    }
  }
  
  connectedCallback() {
    this.style.cssText = [
      'display: inline-block',
      'background: #F5F7FA'
    ].join('; ')
    this.img.setAttribute('width', this.hasAttribute('width') ? this.getAttribute('width') : '300')
    this.img.setAttribute('height', this.hasAttribute('height') ? this.getAttribute('height') : '200')
    this.setImgSrc()
    window.onscroll = throttle(this.setImgSrc, 200)
  }

  disconnectedCallback() {}

  setImgSrc = () => {
    if(this.loaded) return
    const { top } = this.getBoundingClientRect()
    if(top < window.innerHeight) {
      this.img.setAttribute('src', this.getAttribute('src'))
      console.log('lazy-img-loaded')
      this.loaded = true
      window.onscroll = null
    }
  }
  
}

export default LazyImg