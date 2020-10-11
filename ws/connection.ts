import {Ready} from "../types/Ready.ts";

export class Connection {
    last_s: number | null = null

    ws: WebSocket
    token: string
    onready: (ready: Ready) => void

    constructor(ws: WebSocket, token: string, onready: (ready: Ready) => void) {
        this.ws = ws
        this.token = token
        this.onready = onready
    }
}