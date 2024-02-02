import { io } from "socket.io-client";
import type { Socket } from "socket.io-client";
import net from "node:net";
//@ts-ignore
import pkg from "../package.json";

export class Guapp {
  private socket: Socket;
  private apiKey: string;
  private debugging: boolean;

  constructor(apiKey: string, debugging?: boolean) {
    this.apiKey = apiKey;
    this.debugging = debugging || false;
  }

  private debug(...args: any[]) {
    if (this.debugging) {
      console.info(...args);
    }
  }

  private async gateway({ host, port, head, connectionId }) {
    this.debug(host, port, head, connectionId);
    try {
      const svrSocket = net.connect(port, host);
      svrSocket.on("data", (data) => {
        this.debug("serverdata", data);
        this.socket.emit(`data:${connectionId}`, data);
      });
      this.debug(connectionId);
      this.socket.on(`data:${connectionId}`, (data) => {
        this.debug("clientdata", data);
        svrSocket.write(data);
      });
      svrSocket.write(head);
      this.socket.emit(
        `data:${connectionId}`,
        `HTTP/1.0 200 Connection Established\r\nProxy-agent: guapp (v1.0)\r\n\r\n`
      );
    } catch (err) {
      console.error(err);
    }
  }

  public connect() {
    this.socket = io("http://command.wtfproxy.com:9988", {
      auth: {
        apiKey: this.apiKey,
      },
      extraHeaders: {
        "x-guapp-version": pkg.version,
      },
    });

    this.socket.on("gateway", this.gateway.bind(this));
  }

  public disconnect() {
    this.socket.disconnect();
    this.socket.off("gateway", this.gateway.bind(this));
    this.socket = null;
  }
}
