<script>
  import { key } from "./useForm";
  import { getContext } from "svelte";
  export let name;
  const { errors } = getContext(key);
</script>

{#if $errors[name]}
  <slot error={$errors[name].message}>
    <div>{$errors[name].message}</div>
  </slot>
{/if}
