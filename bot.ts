import {connect} from "./ws/client.ts";
import {Ready} from "./types/Ready.ts";

export class Bot {
    onready: (ready: Ready) => void = () => {}

    async login(token: string) {
        await connect(token, this.onready)
    }

    onReady(callback: (ready: Ready) => void) {
        this.onready = callback
    }
}