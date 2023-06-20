<script lang="ts">
    import type { LayoutData } from "./$types";
    import Sidebar from "$lib/components/sidebar.svelte";

    export let data: LayoutData;
</script>

<div class="flex h-full w-full flex-row gap-5">
    <Sidebar />
    <div class="m-5 w-full"><slot /></div>
</div>
