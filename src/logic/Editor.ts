export default class Editor {
    lineWrapping: boolean = true;
    lint: boolean = true;
    lineNumbers: boolean = true;
    tabIndex: number = 2;
    height: string;
    theme: string = 'dark';
    fn: Function;

    /**
     * @param {string} theme - light or dark
     * @param {number} height - e.g. 100-200-300 etc...
     */
    constructor(height: number) {
        this.height = `${height}px`;
        this.fn = () => {};
    }

    /**
     * @param {string} hiddenPrompt  - code before function declaration
     * @param {string} userInput - code entered by the user
     * @param {string} fnName - name of function to call
     * @param {string} args - arguments passed to fn as string '[1, 2]'
     */
    setUserFn = (
        hiddenPrompt: string,
        userInput: string,
        fnName: string,
        args: string
    ) => {
        // eslint-disable-next-line no-new-func
        this.fn = new Function(
            `${hiddenPrompt}${userInput}\n\treturn ${fnName}(${args})`
        );
    };

    runFn = () => this.fn();
}
