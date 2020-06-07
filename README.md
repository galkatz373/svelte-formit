# svelte-formit

![enter image description here](https://img.shields.io/npm/dw/svelte-formit) ![enter image description here](https://img.shields.io/bundlephobia/minzip/svelte-formit)

**svelte-formit** is a small unopinionated library for handling forms with svelte.
**svelte-formit** is heavily inspired by the **react-hook-form** library

## Installation

```bash
npm install svelte-formit
```

```bash
yarn install svelte-formit
```

## Getting Started

```svelte
    <script>
        import { useForm } from "svelte-formit";
        const { handleSubmit, register } = useForm();

        const onSubmit = data => {
            console.log(data);
        };
    </script>

    <form on:submit={e => handleSubmit(e, onSubmit)}>
        <input use:register name="name" />
        <input use:register type="number" name="age" />
        <button type="submit">Submit</button>
    </form>

```

## Docs

The docs are available [here](https://svelte-formit.now.sh/)
