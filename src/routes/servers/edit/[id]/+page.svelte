<script lang="ts">
    import type { PageData } from "../$types";
    import { page } from "$app/stores";
    import { Server } from "$lib/types";
    import { onMount } from "svelte";
    import { writable, get } from "svelte/store";

    export let data: PageData;

    var servers = writable<Server[]>([]);
    var server: Server = new Server();

    function saveServers() {
        let js = JSON.stringify(get(servers));
        localStorage.setItem("servers", js);
    }

    function loadServers() {
        if (localStorage.getItem("servers")) {
            servers.update((_) => {
                return JSON.parse(<string>localStorage.getItem("servers"));
            });
        }
    }

    function save() {
        get(servers).splice(Number(server.id) - 1, 1, server);
        servers = servers;
        saveServers();
    }

    function saveBtn() {
        save();
        window.location.href = "/";
    }

    function connectBtn() {
        save();
        window.location.href = "/servers/control/" + server.id;
    }

    onMount(() => {
        loadServers();
        server = get(servers).filter((s) => {
            return s.id == data.params.id;
        })[0];
        if ($page.url.searchParams.has("url")) {
            // Set server values from url args, but if editing, not creating values already exist.
            server.protocol = <string>$page.url.searchParams.get("protocol");
            server.url = <string>$page.url.searchParams.get("url");
            server.port = <string>$page.url.searchParams.get("port");
        }
    });
</script>

<div class="flex flex-col gap-3 m-auto max-w-2xl mt-10">
    <h2 class="text-4xl font-bold text-center">Edit Server</h2>
    <div class="flex flex-col gap-1 p-4 shadow-md rounded-box bg-base-200">
        <form class="flex flex-col gap-3" on:submit|preventDefault={save}>
            <input
                type="text"
                class="input w-full"
                placeholder="Server name"
                bind:value={server.name}
            />
            <div class="join join-verticle">
                <select
                    class="select join-item max-w-xs"
                    bind:value={server.protocol}
                >
                    <option value="http">HTTP</option>
                    <option value="https">HTTPS</option>
                </select>
                <span class="join-item p-2 text-center font-bold text-lg"
                    >://</span
                >
                <input
                    class="input join-item w-full"
                    type="text"
                    placeholder="Server url"
                    bind:value={server.url}
                />
                <span class="join-item p-2 text-center font-bold text-lg"
                    >:</span
                >
                <input
                    class="input join-item w-20"
                    type="text"
                    placeholder="Port"
                    bind:value={server.port}
                />
            </div>
            <input
                type="text"
                class="input"
                placeholder="Username"
                bind:value={server.username}
            />
            <input
                type="text"
                class="input"
                placeholder="Password"
                bind:value={server.password}
            />
            <div class="join join-horazontal">
                <button
                    on:click={saveBtn}
                    class="btn btn-primary btn-outline w-1/2 join-item"
                    >Save</button
                >
                <button
                    on:click={connectBtn}
                    class="btn btn-primary w-1/2 join-item">Connect</button
                >
            </div>
        </form>
    </div>
</div>
