<script>
  import { onMount, onDestroy } from "svelte";
  import { useFormContext } from "./useFormContext";
  const { register, unregister } = useFormContext();
  export let name;
  let component;

  onMount(() => {
    register(component);
  });

  onDestroy(() => {
    unregister(name);
  });
</script>

<div {name} bind:this={component}>
  <input />
  <div />
</div>
