<script lang="ts">
    import { loadServers } from "$lib/utils";
    import type { PageData } from "./$types";

    export let data: PageData;

    var servers = loadServers();
    var server = servers[Number(data.params.id - 1)];

    console.log(servers);
</script>

<h2 class="text-3xl text-center w-full font-bold">
    {server.name}@{server.url}:{server.port}
</h2>
