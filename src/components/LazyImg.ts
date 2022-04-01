import { throttle } from 'lodash'

class LazyImg extends HTMLElement {
  private shadow: ShadowRoot;
  private img: HTMLImageElement;
  private loaded: boolean = false;

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.img = document.createElement('img')
    this.shadow.innerHTML = `
      <style>
        :host{
          display: inline-block;
          background: #F5F7FA;
        }
      </style>
    `
    this.shadow.appendChild(this.img)
  }

  static observedAttributes = ['src', 'width', 'height']
  
  attributeChangedCallback(name, oldVal, newVal) {
    console.log('lazy-img-changed', name, oldVal, newVal)
    if(oldVal !== newVal) {
      if(name === 'src') {
        this.loaded && this.img.setAttribute(name, newVal)
      } else {
        this.img.setAttribute(name, newVal)
      }
    }
  }
  
  connectedCallback() {
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