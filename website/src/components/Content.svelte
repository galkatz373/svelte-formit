<style lang="scss">
  .container {
    color: rgb(56, 54, 54);
    width: 80%;
    font-size: 1.1rem;
    @media (max-width: 1000px) {
      width: 90%;
    }
    @media (max-width: 600px) {
      width: 100%;
    }
  }
</style>

<div class="container">
  <slot />
</div>
