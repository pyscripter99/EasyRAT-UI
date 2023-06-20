export class Server {
    id: string;
    name: string;
    protocol: string;
    url: string;
    port: string;
    username: string;
    password: string;
    status: string;
}

export class ServerStatusResp {
    online: boolean;
    status: string;
}