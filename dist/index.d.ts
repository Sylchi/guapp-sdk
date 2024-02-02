export declare class Guapp {
    private socket;
    private apiKey;
    private debugging;
    constructor(apiKey: string, debugging?: boolean);
    private debug;
    private gateway;
    connect(): void;
    disconnect(): void;
}
