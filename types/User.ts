export interface IUser {
    id: string
    username: string
    discriminator: string
    avatar: string | null
    bot?: boolean
    system?: boolean
    mfa_enabled?: boolean
    locale?: string
    verified?: boolean
    email?: string
    flags?: number  // TODO: https://discord.com/developers/docs/resources/user#user-object-user-flags
    premium_type?: number // TODO: https://discord.com/developers/docs/resources/user#user-object-premium-types
    public_flags?: number  // TODO: https://discord.com/developers/docs/resources/user#user-object-user-flags
}

export class User implements IUser {

    constructor(data: IUser) {
        this.avatar = data.avatar
        this.bot = data.bot
        this.discriminator = data.discriminator
        this.email = data.email
        this.flags = data.flags
        this.id = data.id
        this.locale = data.locale
        this.mfa_enabled = data.mfa_enabled
        this.premium_type = data.premium_type
        this.public_flags = data.public_flags
        this.system = data.system
        this.username = data.username
        this.verified = data.verified
    }

    id: string
    username: string
    discriminator: string
    avatar: string | null
    bot?: boolean
    system?: boolean
    mfa_enabled?: boolean
    locale?: string
    verified?: boolean
    email?: string
    flags?: number  // TODO: https://discord.com/developers/docs/resources/user#user-object-user-flags
    premium_type?: number // TODO: https://discord.com/developers/docs/resources/user#user-object-premium-types
    public_flags?: number  // TODO: https://discord.com/developers/docs/resources/user#user-object-user-flags
}