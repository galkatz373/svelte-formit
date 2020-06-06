<script>
  export let title;
</script>

<style lang="scss">
  h1 {
    @media (max-width: 1000px) {
      font-size: 1.4rem;
    }
    @media (max-width: 600px) {
      font-size: 2rem;
    }
  }
</style>

<h1>{title}</h1>
