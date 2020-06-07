<script>
  import Prism from "svelte-prism";

  export let language = "svelte";
</script>

<div style="width: 90%">
  <Prism {language}>
    <slot />
  </Prism>
</div>
