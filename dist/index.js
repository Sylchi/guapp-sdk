"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guapp = void 0;
const socket_io_client_1 = require("socket.io-client");
const node_net_1 = __importDefault(require("node:net"));
//@ts-ignore
const package_json_1 = __importDefault(require("../package.json"));
class Guapp {
    constructor(apiKey, debugging) {
        this.apiKey = apiKey;
        this.debugging = debugging || false;
    }
    debug(...args) {
        if (this.debugging) {
            console.info(...args);
        }
    }
    gateway({ host, port, head, connectionId }) {
        return __awaiter(this, void 0, void 0, function* () {
            this.debug(host, port, head, connectionId);
            try {
                const svrSocket = node_net_1.default.connect(port, host);
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
                this.socket.emit(`data:${connectionId}`, `HTTP/1.0 200 Connection Established\r\nProxy-agent: guapp (v1.0)\r\n\r\n`);
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    connect() {
        this.socket = (0, socket_io_client_1.io)("http://command.wtfproxy.com:9988", {
            auth: {
                apiKey: this.apiKey,
            },
            extraHeaders: {
                "x-guapp-version": package_json_1.default.version,
            },
        });
        this.socket.on("gateway", this.gateway.bind(this));
    }
    disconnect() {
        this.socket.disconnect();
        this.socket.off("gateway", this.gateway.bind(this));
        this.socket = null;
    }
}
exports.Guapp = Guapp;
