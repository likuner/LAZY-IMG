
class LazyImg extends HTMLElement {
  private shadow: ShadowRoot = null;
  private img: HTMLImageElement = null;
  private loaded: boolean = false;

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'closed' })
    this.img = document.createElement('img') as HTMLImageElement
    this.shadow.appendChild(this.img)
  }

  static observedAttributes = [
    'src', 'width', 'height'
  ]
  
  attributeChangedCallback(name, oldVal, newVal) {
    console.log('attributeChangedCallback:', name, oldVal, newVal)
    // oldVal !== newVal && this.img.setAttribute(name, newVal)
  }
  
  connectedCallback() {
    this.style.cssText = [
      'display: inline-block',
      'background: #f5f7fa',
    ].join('; ')
    this.img.setAttribute('width', this.hasAttribute('width') ? this.getAttribute('width') : '200')
    this.img.setAttribute('height', this.hasAttribute('height') ? this.getAttribute('height') : '200')
    window.onscroll = () => {
      const { top } = this.getBoundingClientRect()
      console.log("LazyImg -> window.onscroll -> rect", top)
      if(!this.loaded && top < window.innerHeight - 200) {
        this.img.setAttribute('src', this.getAttribute('src'))
        this.loaded = true
        window.onscroll = null
      }
    }
  }

  disconnectedCallback() {}
  
}

export default LazyImg