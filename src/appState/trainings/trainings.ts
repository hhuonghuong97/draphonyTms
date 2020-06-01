import { IAppState } from "../reducer";

export enum TrainingsActionType {
    dataFetched = "trainings.dataFetched"
}


export type TrainingsAction = {
    type: TrainingsActionType.dataFetched;
};


export const trainings = (state: IAppState, action: TrainingsAction): IAppState => {
    return state;
}
