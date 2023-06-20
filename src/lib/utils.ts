import axios from "axios";
import type {Server, ServerStatusResp} from "$lib/types"

export function serverStatus(url: string) {
    return axios.get(url + "/status", ).then(result => {
            let resp: ServerStatusResp = result.data;
            if (resp.online) {
                return "online"
            }

        }).catch((reason) => {
            if (reason["code"] == "ERR_NETWORK") {
                return "offline"
            } else {
                return "error"
            }
        })
}

export function loadServers()  {
    if (localStorage.getItem("servers")) {
        return <Server[]>JSON.parse(<string>localStorage.getItem("servers"));
    }
}