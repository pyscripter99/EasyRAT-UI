<script>
    import { appWindow } from "@tauri-apps/api/window";

    let maximized = false;
    $: appWindow.isMaximized().then((val) => {
        maximized = val;
    });

    function minimize() {
        appWindow.minimize();
    }

    function toggleMaximize() {
        appWindow.toggleMaximize();
    }

    function close() {
        appWindow.close();
    }
</script>

<div class="navbar h-12 bg-base-300" data-tauri-drag-region>
    <div class="navbar-start" data-tauri-drag-region>
        <div class="dropdown">
            <label tabindex="0" class="btn btn-ghost btn-circle">
                <i class="fa-solid fa-bars fa-lg" />
            </label>
            <ul
                tabindex="0"
                class="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-300 rounded-box w-52"
            >
                <li><a href="/"><i class="fa-solid fa-server" />Servers</a></li>
                <li>
                    <a href="/settings"
                        ><i class="fa-solid fa-gear" />Settings</a
                    >
                </li>
            </ul>
        </div>
    </div>
    <div class="navbar-center">
        <div class="flex-0 px-2" data-tauri-drag-region>
            <div
                class="font-title text-primary inline-flex transition-all duration-200 text-3xl font-bold select-none"
                data-tauri-drag-region
            >
                <span class="normal-case" data-tauri-drag-region>Easy</span>
                <span class="text-base-content uppercase" data-tauri-drag-region
                    >RAT</span
                >
            </div>
        </div>
    </div>
    <div class="navbar-end flex flex-row gap-1" data-tauri-drag-region>
        <button
            on:click={toggleMaximize}
            class="btn btn-success btn-sm btn-circle"
        >
            <label class="swap">
                <input type="checkbox" bind:checked={maximized} />
                <i
                    class="swap-on fa-solid fa-down-left-and-up-right-to-center fa-lg"
                />
                <i
                    class="swap-off fa-solid fa-up-right-and-down-left-from-center fa-lg"
                />
            </label>
        </button>
        <button on:click={minimize} class="btn btn-warning btn-sm btn-circle"
            ><i class="fa-solid fa-minus fa-lg" /></button
        >
        <button on:click={close} class="btn btn-error btn-sm btn-circle"
            ><i class="fa-solid fa-xmark fa-lg" /></button
        >
    </div>
</div>
