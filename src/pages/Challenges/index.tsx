import Table from '../../components/Tables/Snippets';

export default function index() {
    const list = [
        {
            id: 1,
            title: 'hello',
            description: 'hello',
            code: 'heyyy',
            userId: 1,
            language: 'JavaScript',
            createdAt: new Date(),
            updatedAt: new Date(),

            prompt: 'heyy',
            hiddenPrompt: 'heyy',
            fName: 'heyy',
            testCases: [],
            difficulty: 1
        }
    ];

    return (
        <div>
            <h1>Challenges</h1>
            <Table type='code' list={list} />
        </div>
    );
}
