import {Connection} from "./connection.ts";

export interface IPacket {
    op: number
    t: string | null,
    s: number | null,
    d: any
}

abstract class Packet implements IPacket {
    d: any;
    op: number;
    s: number | null;
    t: string | null;
    conn: Connection;

    protected constructor(op: number, d: any, s: number | null, t: string | null, conn: Connection) {
        this.op = op
        this.d = d
        this.s = s
        this.t = t
        this.conn = conn
        conn.last_s = s
    }

    send(): void {
        this.conn.ws.send(JSON.stringify({
            op: this.op,
            d: this.d,
            s: this.s,
            t: this.t
        }))
    }
}

interface HelloData {
    heartbeat_interval: number
}

export interface HelloPacket extends IPacket {
    d: HelloData
}

interface IHeartbeatPacket extends IPacket {
    d: number | null
}

export class HeartbeatPacket extends Packet implements IHeartbeatPacket {
    constructor(d: number | null, conn: Connection) {
        super(1, d, null, null, conn);
    }
}

