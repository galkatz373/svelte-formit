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
    text-align: center;
    &:hover {
      background-color: #ebedf0;
      text-decoration: none;
    }

    @media (max-width: 1000px) {
      font-size: 0.7rem;
      padding: 0.2rem 0;
    }
    @media (max-width: 600px) {
      font-size: 0.5rem;
      padding: 0.2rem 0;
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
    style={`color: ${$isActive('/docs/introduction/getting-started') ? '#3578e5' : '#606770'} `}
    href={$url('/docs/introduction/getting-started')}>
    Getting Started
  </a>
</nav>
