<script>
  import Sidebar from "../../../components/Sidebar.svelte";
</script>

<div style="display: flex">
  <Sidebar />
  <div style="padding: 2rem 1rem">
    <slot />
  </div>
</div>
