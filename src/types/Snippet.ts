/*
extends means:
The new class is a child. It gets benefits coming with inheritance. 
It has all properties, methods as its parent. It can override some of these and implement new, 
but the parent stuff is already included.

implements means:
The new class can be treated as the same "shape", 
while it is not a child. It could be passed to any method where the Person is required, regardless 
of having different parent than Person
*/

import { Testcase } from './Testcase';
import { Difficulty } from './Difficulty';
import { Comment } from './Comment';
import { Language } from './Language';
import { User } from './User';
import { Like } from '../store/homeState/types';

export interface Snippet {
    id: number;
    title: string;
    description: string;
    code: string;
    user: User;
    language: Language;
    comments: Comment[];
    likes: Like[];
    public: boolean;
    issue: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface CodeSnippet extends Snippet {
    prompt: string;
    hiddenPrompt: string;
    fName: string;
    numArgs: number;
    testcases: Testcase[];
    // 0 easy 1 medium 2 hard
    difficulty: Difficulty;
}
