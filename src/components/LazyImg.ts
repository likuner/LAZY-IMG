import { getValWithUnit } from '@/utils'

class LazyImg extends HTMLElement {
  private shadow: ShadowRoot;
  private img: HTMLImageElement;
  private done: boolean = false;
  private observer: IntersectionObserver;

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

  static observedAttributes = ['src', 'alt', 'presrc', 'width', 'height', 'scroll-element']
  
  attributeChangedCallback(name, oldVal, newVal) {
    if(oldVal !== newVal) {
      if(['width', 'height'].includes(name)) {
        this.style.setProperty(name, getValWithUnit(newVal))
      } else if(name === 'src') {
        this.done && this.img.setAttribute(name, newVal)
      } else if(name === 'presrc') {
        !this.done && this.img.setAttribute(name, newVal)
      } else if (name === 'scroll-element') {
        this.init()
      } else {
        this.img.setAttribute(name, newVal)
      }
    }
  }
  
  connectedCallback() {
    this.init()
  }

  disconnectedCallback() {
    this.img.onload = null
    this.img.onerror = null
  }

  private init() {
    if(!this.hasAttribute('width') && !this.hasAttribute('height')) {
      this.style.setProperty('width', '300px')
      this.style.setProperty('height', '200px')
    }
    this.img.onload = this.handleLoad
    this.img.onerror = this.handleError
    this.createIntersectionObserver()
    Promise.resolve().then(() => {
      if(!this.done && this.hasAttribute('presrc')) {
        this.img.setAttribute('src', this.getAttribute('presrc'))
      }
    })
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

  createIntersectionObserver = () => {
    if(!this.isSupportIntersectionObserver) {
      throw new Error('The current environment does not support IntersectionObserver API.')
    }

    this.observer && this.observer.unobserve(this)

    const handleObserver = ([entry]: IntersectionObserverEntry[]) => {
      if(!this.done && entry && entry.isIntersecting) {
        this.img.setAttribute('src', this.getAttribute('src'))
        // this.shadow.appendChild(this.img)
        this.done = true
        this.observer && this.observer.unobserve(this)
      }
    }
    
    let rootEl = null
    if (this.hasAttribute('scroll-element')) {
      const selector = this.getAttribute('scroll-element')
      rootEl = typeof selector === 'string' ? document.querySelector(selector) : selector
    }
    const options = {
      root: rootEl, // be viewport if null
      rootMargin: '0px',
      threshold: 0 // threshold can be also array type, such as [0, 0.2, 0.4, 0.6, 0.8, 1]
    }

    this.observer = new IntersectionObserver(handleObserver, options)
    this.observer.observe(this)
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
  
}

export default LazyImg