declare class LazyImg extends HTMLElement {
    private shadow;
    private img;
    private loaded;
    constructor();
    static observedAttributes: string[];
    attributeChangedCallback(name: any, oldVal: any, newVal: any): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    get isInViewport(): boolean;
    get isSupportIntersectionObserver(): boolean;
    setImgSrc: (...args: any[]) => void;
    createIntersectionObserver: () => void;
    handleEmit: (eventName: string) => void;
    handleLoad: () => void;
    handleError: () => void;
    removeScrollListener: () => void;
}
export default LazyImg;
