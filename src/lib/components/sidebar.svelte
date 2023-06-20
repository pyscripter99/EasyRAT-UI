<div class="bg-base-200 w-80 left-0 h-full">
    <h2 class="text-xl font-bold text-center m-3">Clients</h2>
    <div class="flex flex-col gap-3">
        {#each [1, 2, 3] as client}
            <a
                href={"/servers/control/" + 1 + "/client/" + client}
                class="rounded-box bg-base-300 mx-4 p-4"
            >
                <h3>Client</h3>
            </a>
        {/each}
    </div>
</div>
