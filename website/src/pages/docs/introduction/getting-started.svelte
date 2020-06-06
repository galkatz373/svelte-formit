<script>
  import Title from "../../../components/Title.svelte";
  import Code from "../../../components/Code.svelte";
  import Content from "../../../components/Content.svelte";
</script>

<style lang="scss">

</style>

<Title title={'Getting Started'} />

<Content>To install svelte-formit:</Content>

<Code>npm install svelte-formit</Code>

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

<iframe
  src="https://codesandbox.io/embed/basic-x7fpe?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%;margin-top:1rem; height:500px; border:0; border-radius: 4px;
  overflow:hidden;"
  title="basic"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media;
  geolocation; gyroscope; hid; microphone; midi; payment; usb; vr;
  xr-spatial-tracking"
  sandbox="allow-autoplay allow-forms allow-modals allow-popups
  allow-presentation allow-same-origin allow-scripts" />
