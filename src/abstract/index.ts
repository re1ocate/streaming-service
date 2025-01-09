export abstract class AbstractComponent {
    protected static element: HTMLCollection;

    static renderComponent(container: HTMLElement | null, fragment: DocumentFragment): void {
        container.appendChild(fragment);
        this.element = container.children;
    }
}