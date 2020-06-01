import { ITrainer } from "./ITrainer";

export interface ITrainingOffer {
    trainer: ITrainer;
    price: number;
    comment?: string;
}

export interface ITraining {
    title: string;
    description: string;

    minPrice: number;
    maxPrice?: number;

    // ...

    trainerOffers: Array<ITrainingOffer>;
}
