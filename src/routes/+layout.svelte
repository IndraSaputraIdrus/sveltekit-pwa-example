<script lang="ts">
    import "./layout.css";
    import favicon from "$lib/assets/favicon.svg";
    import "@fontsource-variable/comfortaa";

    let { children } = $props();

    async function detectSWUpdate() {
        const registration = await navigator.serviceWorker.ready;

        registration.addEventListener("updatefound", () => {
            const newSW = registration.installing;
            newSW?.addEventListener("statechange", () => {
                if (newSW.state === "installed") {
                    if (confirm("New update available, Reload to update?")) {
                        newSW.postMessage({ type: "SKIP_WAITING" });
                        window.location.reload();
                    }
                }
            });
        });
    }

    $effect(() => {
        detectSWUpdate();
    });
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
