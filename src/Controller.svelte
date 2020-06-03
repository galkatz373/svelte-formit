<script>
  import { onMount, onDestroy } from "svelte";
  import { useFormContext } from "./useFormContext";
  const { register, unregister } = useFormContext();
  export let name;
  export let validate = {};
  let component;

  onMount(() => {
    register(component, validate);
  });

  onDestroy(() => {
    unregister(name);
  });
</script>

<span {name} bind:this={component}>
  <slot />
</span>
