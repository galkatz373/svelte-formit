<script>
  export let title;
</script>

<style lang="scss">
  .my-class {
  }
  h1 {
    @media (max-width: 1000px) {
      font-size: 1.4rem;
    }
    @media (max-width: 600px) {
      font-size: 1rem;
    }
  }
</style>

<h1>{title}</h1>
