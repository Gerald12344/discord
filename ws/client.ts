import {getGateway, DISCORD_API_VERSION} from "../api/mod.ts";
import {IReadyRaw, Ready} from "../types/mod.ts";

import {HelloPacket, IPacket, HeartbeatPacket} from "./packets.ts";
import {Connection} from "./connection.ts";

const gatewayParams = `?v=${DISCORD_API_VERSION}&encoding=json`

function sleep(seconds: number) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
}

async function handleEvent(eventType: string, data: Object, conn: Connection) {
    switch (eventType) {
        case "READY": {
            const ready = new Ready(data as IReadyRaw)
            conn.onready(ready)
        }
    }
}

async function onMessage(message: MessageEvent, conn: Connection): Promise<void> {
    const basePacket: IPacket = JSON.parse(message.data)
    conn.last_s = basePacket.s

    switch (basePacket.op) {
        case 0: {
            await handleEvent(basePacket.t!, basePacket.d, conn)
            break
        }
        case 10: {
            const packet = basePacket as HelloPacket

            setInterval(() => {
                new HeartbeatPacket(conn.last_s, conn).send()
            }, packet.d.heartbeat_interval)

            // TODO: Abstract into Identify packet and make properties dynamic
            conn.ws.send(JSON.stringify({
                "op": 2,
                "d": {
                    "token": conn.token,
                    "intents": 513, // TODO: Intents
                    "properties": {
                        "$os": "linux",
                        "$browser": "discord",
                        "$device": "discord"
                    }
                }
            }))

            break
        }
    }
}

// TODO: Switch to Get Gateway Bot
export async function connect(token: string, onready: (ready: Ready) => void): Promise<void> {
    const wsURI = (await getGateway()).url
    const ws = new WebSocket(wsURI + gatewayParams)

    const connection = new Connection(ws, token, onready)

    ws.onmessage = async (message: MessageEvent) => await onMessage(message, connection)
    ws.onclose = (close: CloseEvent) => console.log(close.reason)

}