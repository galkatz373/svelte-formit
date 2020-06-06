<script>
  import Menu from "../../../components/Menu.svelte";
</script>

<div style="display: flex">
  {#if !/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)}
    <Menu />
  {/if}

  <div style="padding: 1rem; width: 100%">
    {#if /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)}
      <Menu isMobile />
    {/if}
    <slot />
  </div>
</div>
