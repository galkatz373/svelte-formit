<script>
  import {
    basic,
    validation,
  } from "../../../codes/introduction/getting-started";

  import Title from "../../../components/Title.svelte";
  import Code from "../../../components/Code.svelte";
  import Content from "../../../components/Content.svelte";
  import Prism from "svelte-prism";
</script>

<style lang="scss">

</style>

<Title title={'Getting Started'} />

<Content>To install svelte-formit:</Content>

<Code language="bash">{`npm install svelte-formit`}</Code>

<Content hasMargin>
  First we decalre the hook(function)
  <b>useForm.</b>
  The hook will return some functions we can use.
  <br />
  <br />
  <b>register</b>
  - has the name suggests, it's an action to register our input.
  <br />
  <b>handleSubmit</b>
  - tells the library what to do when we submit the form.
  <br />
  <b>getValues</b>
  - get all form values. getValues it's a store, therefore we add the dollar
  sign beforehand.
  <br />
  We also must add a name attribute to each input we register, and it must be
  unique.
</Content>
<Content>
  <h3>Basic example:</h3>
</Content>

<Code>{basic}</Code>

<Content hasMargin>
  You could pass
  <b>register</b>
  an object to add a validation. The key of each object is the name of the
  validation, and the value is the validation function.
  <br />
  If the validation doesn't pass, then the form won't submit when you click on
  the submit button.
</Content>

<Content>
  <h3>Validation example:</h3>
</Content>

<Code>{validation}</Code>

<Content hasMargin>
  In this example we add validation only for our first input.
  <br />
  We call the validation "required", but we could have called it whatever we
  want.
  <br />
  And we are checking whether value is empty string and if it is, then we return
  a string which will be our error message for this validation. For now we don't
  display the error.
</Content>
