export interface IUnavailableGuild {
    id: string
    unavailable: boolean // TODO: Make one Guild
}

export class UnavailableGuild implements IUnavailableGuild{
    id: string;
    unavailable: boolean;

    constructor(data: IUnavailableGuild) {
        this.id = data.id
        this.unavailable = data.unavailable
    }
}