<script lang="ts">
    import { Server } from "$lib/types";
    import { onMount } from "svelte";
    import { serverStatus } from "$lib/utils";

    var servers: Server[] = [];

    function saveServers() {
        for (var s of servers) {
            s.status = "connecting";
        }
        localStorage.setItem("servers", JSON.stringify(servers));
    }

    function loadServers() {
        if (localStorage.getItem("servers")) {
            servers = JSON.parse(<string>localStorage.getItem("servers"));
        }
    }

    function serverStatusWorker() {
        for (var server of servers) {
            let server_url =
                server.protocol + "://" + server.url + ":" + server.port;
            serverStatus(server_url).then((res) => {
                server.status = <string>res;
                servers = servers;
            });
        }
    }

    onMount(() => {
        loadServers();
        serverStatusWorker();
        setInterval(serverStatusWorker, 5000);
    });
</script>

<div class="flex flex-col gap-3 m-auto max-w-2xl mt-10">
    <h2 class="text-4xl font-bold text-center">C&C Servers</h2>
    <div class="flex flex-col gap-1 p-4 shadow-md rounded-box bg-base-200">
        <form
            class="join join-verticle"
            action={"/servers/edit/" + (servers.length + 1).toString()}
            on:submit={() => {
                let s = new Server();
                // Set server id to last elements id + 1 or 1 if no servers exist
                if (servers.length > 0) {
                    s.id = (
                        Number(servers[servers.length - 1].id) + 1
                    ).toString();
                } else {
                    s.id = "1";
                }
                s.name = "";
                s.protocol = "http";
                s.url = "localhost";
                s.port = "8080";
                s.username = "";
                s.password = "";
                servers.push(s);
                saveServers();
                return true;
            }}
        >
            <select class="select join-item max-w-xs" name="protocol">
                <option value="http">HTTP</option>
                <option value="https">HTTPS</option>
            </select>
            <span class="join-item p-2 text-center font-bold text-lg">://</span>
            <input
                class="input join-item w-full"
                type="text"
                name="url"
                autocomplete="off"
                placeholder="Server url"
            />
            <span class="join-item p-2 text-center font-bold text-lg">:</span>
            <input
                class="input join-item w-20"
                type="text"
                name="port"
                placeholder="Port"
            />
            <button class="join-item btn btn-primary"
                ><i class="fa-solid fa-plus" />Add</button
            >
        </form>
        {#if servers.length > 0}
            <div class="divider">Existing Servers</div>
            <div class="flex flex-col gap-3">
                {#each servers as server, i}
                    <a
                        href={"/servers/control/" + server["id"]}
                        class="p-4 flex flex-row items-center rounded-box shadow-sm bg-base-100"
                    >
                        <div class="flex flex-col">
                            <h2 class="font-bold text-lg">
                                {server.name}
                            </h2>
                            <p class="text-sm">
                                {server.protocol}://{server.url}:{server.port}
                            </p>
                        </div>
                        <div class="ml-auto flex flex-row gap-1 items-center">
                            <i
                                class="fa-solid fa-signal mx-4"
                                class:fa-fade={server.status in
                                    ["connecting", ""]}
                                class:text-gray-600={server.status == "offline"}
                                class:text-error={server.status == "error"}
                                class:text-warning={server.status == "warn"}
                                class:text-success={server.status == "online"}
                            />
                            <a
                                class="btn btn-circle btn-ghost"
                                href={"/servers/edit/" + server.id}
                                ><i class="fa-solid fa-pen fa-lg" /></a
                            >
                            <button
                                on:click|preventDefault={() => {
                                    servers.splice(i, 1);
                                    servers = servers;
                                    saveServers();
                                }}
                                class="btn btn-ghost btn-circle ml-auto"
                                ><i
                                    class="fa-solid fa-trash fa-lg text-error"
                                /></button
                            >
                        </div>
                    </a>
                {/each}
            </div>
        {/if}
    </div>
</div>
