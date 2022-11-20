import { Reducer } from 'react';
import { Home_appliance as HomeAppliance } from '@prisma/client';

export enum ApplianceEnum {
  FILTER = 'FILTER',
  DELETE = 'DELETE'
}

export type ApplianceActions = {
  type: ApplianceEnum;
  id: number;
};

export const applianceReducer: Reducer<
  [HomeAppliance[], HomeAppliance[]],
  ApplianceActions
> = (state, { type, id }) => {
  const newState: [HomeAppliance[], HomeAppliance[]] = structuredClone(state);
  const index = newState[0].findIndex((el) => el.id === id);

  switch (type) {
    case ApplianceEnum.FILTER:
      const [removedList] = newState[0].splice(index, 1);
      removedList && newState[1].push(removedList);

      return newState;

    case ApplianceEnum.DELETE:
      const [removedSelect] = newState[1].splice(index, 1);
      removedSelect && newState[0].push(removedSelect);

      return newState;

    default:
      return newState;
  }
};
