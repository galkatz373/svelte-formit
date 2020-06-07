export const basic = `
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
`

export const validation = `
    <script>
        import { useForm } from "svelte-formit";
        const { handleSubmit, register } = useForm();
    
        const onSubmit = data => {
          console.log(data);
        };
    </script>

    <form on:submit={e => handleSubmit(e, onSubmit)}>
        <input use:register={{required: value => value === "" && "error"}} name="name" />
        <input use:register type="number" name="age" />
        <button type="submit">Submit</button>
    </form>
`
