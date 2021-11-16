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

    setArguments = (args: string) => {
        const parsedArguments = JSON.parse(args).map((arg: any) =>
            Array.isArray(arg) ? JSON.stringify(arg) : arg
        );
        return parsedArguments;
    };

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
            `${hiddenPrompt}${userInput}\n\treturn ${fnName}(${this.setArguments(
                args
            )})`
        );
    };

    runFn = () => this.fn();

    equal = (a: any, b: any) => {
        const condition = typeof a === 'number' && typeof b === 'number';
        const condition2 = typeof a === 'string' && typeof b === 'string';
        const condition3 = typeof a === 'boolean' && typeof b === 'boolean';
        const condition4 = typeof a === 'undefined' && typeof b === 'undefined';
        const condition5 = a === null && b === null;
        const condition6 = Array.isArray(a) && Array.isArray(b);
        const condition7 = a.length !== b.length;
        const condition8 = typeof a === 'object' && typeof b === 'object';

        if (condition) return a === b;
        if (condition2) return a === b;
        if (condition3) return a === b;
        if (condition4) return true;
        if (condition5) return true;
        if (condition6) {
            if (condition7) {
                return false;
            } else {
                for (let i = 0; i < a.length; i++) {
                    if (!this.equal(a[i], b[i])) return false;
                }
                return true;
            }
        }
        if (condition8) {
            const keys_a = Object.keys(a);
            const keys_b = Object.keys(b);
            for (let key of keys_a) {
                if (!this.equal(a[key], b[key])) return false;
            }
            for (let key of keys_b) {
                if (!this.equal(a[key], b[key])) return false;
            }
            return true;
        }
        return false;
    };
}
