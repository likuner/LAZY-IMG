import { throttle } from 'lodash'
import { getValWithUnit } from '../utils'

class LazyImg extends HTMLElement {
  private shadow: ShadowRoot;
  private img: HTMLImageElement;
  private loaded: boolean = false;

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.shadow.innerHTML = `
      <style>
        :host{
          display: inline-block;
          background: #F5F7FA;
        }
        img{
          width: 100%;
          height: 100%;
        }
      </style>
    `
    this.img = document.createElement('img')
  }

  static observedAttributes = ['src', 'alt', 'width', 'height']
  
  attributeChangedCallback(name, oldVal, newVal) {
    if(oldVal !== newVal) {
      if(name === 'src') {
        this.loaded && this.img.setAttribute(name, newVal)
      } else if(name === 'alt') {
        this.img.setAttribute(name, newVal)
      } else {
        this.style.setProperty(name, getValWithUnit(newVal))
      }
    }
  }
  
  connectedCallback() {
    if(!this.hasAttribute('width') && !this.hasAttribute('height')) {
      this.style.setProperty('width', '300px')
      this.style.setProperty('height', '200px')
    }
    this.setImgSrc()
    window.addEventListener('scroll', this.setImgSrc)
  }

  disconnectedCallback() {
    if(!this.loaded) this.removeScrollListener()
  }

  setImgSrc = throttle(() => {
    if(this.loaded) return
    const { top } = this.getBoundingClientRect()
    if(top < window.innerHeight) {
      this.img.setAttribute('src', this.getAttribute('src'))
      this.shadow.appendChild(this.img)
      console.log('lazy-img-loaded')
      this.loaded = true
      this.removeScrollListener()
    }
  }, 200, { leading: true })

  removeScrollListener = () => {
    window.removeEventListener('scroll', this.setImgSrc)
  }
  
}

export default LazyImg