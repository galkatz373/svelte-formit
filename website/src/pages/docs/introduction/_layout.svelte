<script>
  import Sidebar from "../../../components/Sidebar.svelte";
</script>

<div style="display: flex">
  <Sidebar />
  <div style="padding: 1rem 1rem">
    <slot />
  </div>
</div>
