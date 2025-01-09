import { createElement } from '../utils/index';

class globalTemplate {
    private static element: DocumentFragment;
    static getTemplate(): string {
        return `
        <div class="playlists-modal"></div>
        <div class="over-wrapper" style="position: relative; overflow: hidden;">
            <header id="header" class="header flex"></header>
            <div class="content-wrap flex">
                <aside id="aside" class="aside"></aside>
                <main id="main" class="main"></main>
            </div>
            <footer id="footer" class="footer"></footer>
        </div>
        <script src="dist/bundle.js"></script>
        `
    }

    static getElement(): DocumentFragment {
        this.element ??= createElement(this.getTemplate());
        return this.element;
      }
    
    static removeElement(): void {
        this.element = null;
    }
}
export default globalTemplate;