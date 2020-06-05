<script>
  import { isActive, url } from "@sveltech/routify";

  const links = [
    ["index", "Home"],
    ["./docs", "docs"],
  ];
</script>

<style lang="scss">
  .container {
    position: sticky;
    top: 0;
    left: 0;
    background: white;
    color: #1c1e21;
    padding: 0.5rem 1rem;
    display: flex;
    z-index: 1;
    border: 1px solid lightgray;

    .title {
      color: #1c1e21;
      &:hover {
        text-decoration: none;
      }
      font-weight: bold;
    }

    .link {
      color: #1c1e21;
      margin-left: 2rem;
      &:hover {
        color: #3578e5;
        text-decoration: none;
      }
    }
  }
</style>

<div class="container">
  <a href={$url('/')} class="title">Svelte-Formit</a>
  <a href={$url('/docs/introduction/getting-started')} class="link">Docs</a>
</div>
