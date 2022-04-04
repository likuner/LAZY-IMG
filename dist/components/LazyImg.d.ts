declare class LazyImg extends HTMLElement {
    private shadow;
    private img;
    private loaded;
    constructor();
    static observedAttributes: string[];
    attributeChangedCallback(name: any, oldVal: any, newVal: any): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    setImgSrc: (...args: any[]) => void;
    handleLoad: (e: any) => void;
    handleError: (e: any) => void;
    removeScrollListener: () => void;
}
export default LazyImg;
