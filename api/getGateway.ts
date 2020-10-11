import {DISCORD_API_VERSION} from "./config.ts";

export interface GetGatewayPayload {
    url: string
}

export async function getGateway(): Promise<GetGatewayPayload> {
    return await fetch(`https://discord.com/api/v${DISCORD_API_VERSION}/gateway`)
        .then(response => response.json())
}