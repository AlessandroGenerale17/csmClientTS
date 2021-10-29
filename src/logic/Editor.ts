export default class Editor {
    lineWrapping: boolean = true;
    lint: boolean = true;
    lineNumbers: boolean = true;
    tabIndex: number = 2;
    height: string;
    theme: string = 'dark';
    fn: (...args: any[]) => any = () => 0;

    /**
     * @param {string} theme - light or dark
     * @param {number} height - e.g. 100-200-300 etc...
     */
    constructor(height: number) {
        this.lineWrapping = true;
        this.height = `${height}px`;
    }

    /**
     * @param {string} hiddenPrompt  - code before function declaration
     * @param {string} userInput - code entered by the user
     * @param {string} fnName - name of function to call
     */
    setUserFn = (hiddenPrompt: string, userInput: string, fnName: string) => {
        // eslint-disable-next-line no-new-func
        this.fn = new Function(
            `${hiddenPrompt}${userInput} return ${fnName};`
        )();
    };

    /**
     * @param {any} args - arguments passed by test case
     */
    runFn = (args: any[]) => this.fn(...args);
}

/**
  function {
    // hidden
    const c = 1;
    // prompt
    function add(a) {
        return a + c;
    }

    return add
  }
 
 */
