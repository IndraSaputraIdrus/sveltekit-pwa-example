<div
    class="font-(family-name:--font-comfortaa) h-dvh grid place-content-center bg-white text-black gap-8 px-5"
>
    <h1 class="text-center text-3xl font-semibold">Welcome to SvelteKit</h1>

    <div class="flex items-center justify-center gap-8">
        {#each ["login", "register"] as label (label)}
            <button
                class={[
                    label === "login" ? "bg-[#8bd3dd]" : "bg-[#faae2b]",
                    "px-4 py-2",
                    "rounded-md",
                    "border border-black",
                    "shadow-(--brutal)",
                ]}
            >
                {label}
            </button>
        {/each}
    </div>

    <div
        class="border border-black bg-[#f2f7f5] shadow-(--brutal) p-5 rounded-lg space-y-5"
    >
        <p class="text-base opacity-90 max-w-xs">
            Visit <a
                class="text-indigo-400 underline hover:no-underline"
                href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a
            > to read the documentation
        </p>
    </div>
</div>
