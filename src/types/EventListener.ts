import React from 'react';

export type OnChangeInput = React.ChangeEvent<HTMLInputElement>;
export type OnChangeInputArea = React.ChangeEvent<HTMLTextAreaElement>;
export type OnSubmit = React.FormEvent;

export type OnChange = OnChangeInput | OnChangeInputArea;
