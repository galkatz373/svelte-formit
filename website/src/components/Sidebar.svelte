<script>
  import { url, isActive } from "@sveltech/routify";
</script>

<style lang="scss">
  .container {
    position: relative;
    padding: 0.1rem;
    width: 13%;
    display: flex;
    flex-direction: column;
    border: 0.3px solid lightgray;
  }
  .link {
    padding: 0.2rem 0.8rem;
    outline: none;
    &:hover {
      background-color: #ebedf0;
      text-decoration: none;
    }
  }
</style>

<nav class="container">
  <a
    class="link"
    style={`color: ${$isActive('/docs/introduction/motivation') ? '#3578e5' : '#606770'} `}
    href={$url('/docs/introduction/motivation')}>
    Motivation
  </a>
  <a
    class="link"
    style={`color: ${$isActive('/docs/introduction/installation') ? '#3578e5' : '#606770'} `}
    href={$url('/docs/introduction/installation')}>
    Installation
  </a>
  <a
    class="link"
    style={`color: ${$isActive('/docs/introduction/getting-started') ? '#3578e5' : '#606770'} `}
    href={$url('/docs/introduction/getting-started')}>
    Getting Started
  </a>
</nav>
