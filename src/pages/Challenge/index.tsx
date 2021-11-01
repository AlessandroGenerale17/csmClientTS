import Editor from '../../components/Editor';

export default function Question() {
    return (
        <div>
            <div>
                <h2>Question</h2>
                {/*<Editor />*/}
                <p>Some text about question MD format</p>
            </div>
            {/* <Editor
                type='code'
                className='editor-newSnippet'
                codeToInject={snippet.code}
                handleCodeChange={handleCodeChange}
                performDispatch={performDispatch}
                displayOutput={() => {}}
            /> */}
        </div>
    );
}
