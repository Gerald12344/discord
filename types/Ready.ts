import {IUser, User} from "./User.ts";
import {IUnavailableGuild, UnavailableGuild} from "./UnavailableGuild.ts";

export interface IReadyRaw {
    v: number
    user: IUser
    private_channels: Array<null>
    guilds: Array<IUnavailableGuild>
    session_id: string,
    shard: Array<number>
}

interface IReady {
    v: number
    user: User
    private_channels: Array<null>
    guilds: Array<UnavailableGuild>
    session_id: string,
    shard?: Array<number>
}

export class Ready implements IReady {
    guilds: Array<UnavailableGuild>;
    private_channels: Array<null>;
    session_id: string;
    shard: Array<number>;
    user: User;
    v: number;

    constructor(data: IReadyRaw) {
        this.guilds = data.guilds.map((guild) => new UnavailableGuild(guild))
        this.private_channels = data.private_channels
        this.session_id = data.session_id
        this.shard = data.shard
        this.user = new User(data.user)
        this.v = data.v
    }
}