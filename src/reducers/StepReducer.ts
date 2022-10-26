import { Reducer } from 'react';

export type Step = {
    step: number;
    text: string;
};
  
export enum StepsEnum {
    TEXT = 'TEXT',
    DELETE = 'DELETE',
    ADD = 'ADD'
}
  
export type StepActions = {
    type: string;
    value?: string;
    step?: number;
};

export const stepReducer: Reducer<Step[], StepActions> = (
state,
{ type, value, step }
) => {
	const newState = [...state];

	switch (type) {
		case StepsEnum.TEXT:
			if (!value || !step) throw new Error('Faz o negócio direito');

			const newSteps = newState[step - 1];

			if (newSteps) 
				newSteps.text = value;

			return newState;
		case StepsEnum.ADD:
			newState.push({ step: newState.length + 1, text: '' });
		default:
			return newState;
}
  };