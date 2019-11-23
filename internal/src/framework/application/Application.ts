class Application {
    /**
     * Root element of application.
     */
    get root(): HTMLDivElement {
        let root: HTMLDivElement = document.querySelector('#root');
        if (!root) {
            root = document.createElement('div');
            root.id = 'root';

            document.body.insertAdjacentElement('afterbegin', root);
        }

        return root;
    }
}

export default new Application();