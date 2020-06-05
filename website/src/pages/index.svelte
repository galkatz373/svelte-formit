<script>
  import { goto } from "@sveltech/routify";

  import Header from "../components/Header.svelte";
</script>

<style lang="scss">
  div {
    overflow-y: visible;
  }

  .banner {
    background: #3578e5;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;

    @media (max-width: 1000px) {
      padding: 1rem 0;
    }
    @media (max-width: 600px) {
      padding: 0.3rem 0;
    }
    .line {
      margin-bottom: 1rem;
      text-align: center;
      @media (max-width: 1000px) {
        font-size: 1rem;
      }
      @media (max-width: 600px) {
        font-size: 0.8rem;
      }
    }
    .title {
      font-weight: bold;
      font-size: 2.5rem;

      @media (max-width: 1000px) {
        font-size: 1.7rem;
      }
      @media (max-width: 600px) {
        font-size: 1.3rem;
      }
    }

    .getting-started {
      border: 1px solid white;
      padding: 0.5rem 1rem;
      cursor: pointer;
      font-weight: bold;

      &:hover {
        background: white;
        color: #1c1e21;
      }
    }
  }
</style>

<div class="banner">
  <div class="title line">Svelte-Formit</div>
  <div class="line" style="font-size: 1.2rem">
    Lightweight unopinionated form library for svelte
  </div>
  <div
    on:click={() => $goto('/docs/introduction/getting-started')}
    class="line getting-started">
    Get Started
  </div>
</div>
