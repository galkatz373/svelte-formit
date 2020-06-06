<style lang="scss">
  .code {
    display: flex;
    width: fit-content;
    text-align: center;
    border-radius: 6px;
    padding: 1rem;
    background: rgb(41, 45, 62);
    color: rgb(191, 199, 213);
    margin-top: 1rem;

    @media (max-width: 1000px) {
      padding: 0.5rem;
    }
    @media (max-width: 600px) {
      padding: 0.5rem;
    }
  }
</style>

<div class="code">
  <slot />
</div>
