import { getValWithUnit, throttle } from '@/utils'

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
          display: inline-flex;
          background: #F5F7FA;
        }
        img{
          width: 100%;
          height: 100%;
        }
      </style>
    `
    this.img = document.createElement('img')
    this.img.setAttribute('alt', ' ') // remove default border
    this.shadow.appendChild(this.img)
  }

  static observedAttributes = ['src', 'alt', 'presrc', 'width', 'height']
  
  attributeChangedCallback(name, oldVal, newVal) {
    if(oldVal !== newVal) {
      if(['width', 'height'].includes(name)) {
        this.style.setProperty(name, getValWithUnit(newVal))
      } else if(name === 'src') {
        this.loaded && this.img.setAttribute(name, newVal)
      } else if(name === 'presrc') {
        !this.loaded && this.img.setAttribute(name, newVal)
      } else {
        this.img.setAttribute(name, newVal)
      }
    }
  }
  
  connectedCallback() {
    if(!this.hasAttribute('width') && !this.hasAttribute('height')) {
      this.style.setProperty('width', '300px')
      this.style.setProperty('height', '200px')
    }
    this.img.onload = this.handleLoad
    this.img.onerror = this.handleError
    // add pre-image if lazy-img is initially not in viewport
    if(!this.isInViewport && this.hasAttribute('presrc')) {
      this.img.setAttribute('src', this.getAttribute('presrc'))
    }
    // prefer IntersectionObserver to binding scroll event
    if(this.isSupportIntersectionObserver) {
      this.createIntersectionObserver()
    } else {
      window.addEventListener('scroll', this.setImgSrc)
      this.setImgSrc()
    }
  }

  disconnectedCallback() {
    if(!this.loaded && !this.isSupportIntersectionObserver) {
      this.removeScrollListener()
    }
    this.img.onload = null
    this.img.onerror = null
  }

  // whether element is in viewport?
  get isInViewport() {
    const vWidth = window.innerWidth || document.documentElement.clientWidth
    const vHeight = window.innerHeight || document.documentElement.clientHeight
    const { top, bottom, left, right } = this.getBoundingClientRect()
    return !( top > vHeight || bottom < 0 || left > vWidth || right < 0 )
  }

  // whether browser support IntersectionObserver & IntersectionObserverEntry API?
  get isSupportIntersectionObserver() {
    return [IntersectionObserver, IntersectionObserverEntry]
      .map(fn => typeof fn).every(type => type === 'function')
  }

  setImgSrc = throttle(() => {
    if(this.loaded) return
    if(this.isInViewport) {
      this.img.setAttribute('src', this.getAttribute('src'))
      // this.shadow.appendChild(this.img)
      this.loaded = true
      this.removeScrollListener()
    }
  }, 300)

  createIntersectionObserver = () => {
    if(!this.isSupportIntersectionObserver) return
    const handleObserver = (
      [entry]: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      if(!this.loaded && entry && entry.isIntersecting) {
        this.img.setAttribute('src', this.getAttribute('src'))
        // this.shadow.appendChild(this.img)
        this.loaded = true
      }
    }
    const options = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0 // threshold can be also array type, such as [0, 0.2, 0.4, 0.6, 0.8, 1]
    }
    const observer: IntersectionObserver = new IntersectionObserver(handleObserver, options)
    observer.observe(this)
  }

  handleEmit = (eventName: string) => {
    this.dispatchEvent(new CustomEvent(eventName, {
      bubbles: true,
      composed: true,
      detail: {
        target: this,
        src: this.getAttribute('src')
      }
    }))
  }

  handleLoad = () => {
    this.handleEmit('lazyload')
  }

  handleError = () => {
    this.handleEmit('lazyerror')
  }

  removeScrollListener = () => {
    window.removeEventListener('scroll', this.setImgSrc)
  }
  
}

export default LazyImg