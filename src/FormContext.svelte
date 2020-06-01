<script>
  import { setContext } from "svelte";
  import { key } from "./useForm";

  setContext(key, $$props);
</script>

<slot />
