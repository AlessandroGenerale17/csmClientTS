import React from 'react';
import { SelectChangeEvent } from '@mui/material/Select';

export type OnChangeInput = React.ChangeEvent<HTMLInputElement>;
export type OnChangeInputArea = React.ChangeEvent<HTMLTextAreaElement>;
export type OnChangeSelect = SelectChangeEvent;
export type OnSubmit = React.FormEvent;
export type OnClick = React.MouseEvent<HTMLButtonElement>;
export type OnClickFormDiv = React.MouseEvent<HTMLDivElement>;
export type Keyboard = React.KeyboardEvent;

export type OnChange = OnChangeInput | OnChangeInputArea | OnChangeSelect;
