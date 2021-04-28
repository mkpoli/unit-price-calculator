<script lang="ts">
  import mexp from 'math-expression-evaluator';

  export let value: number
  export let unit: string
  let realValue: string = `${value}`

  function onInput() {
    try {
      const result = mexp.eval(realValue)
      value = result 
    } catch {
      value = NaN
    }
  }

</script>

<label>
  <input type="text" bind:value={realValue} on:input={onInput} title={`${value}`} /><span>{ unit }</span>
</label>

<style>
  label {
    display: grid;
    grid-template-columns: 1fr 2rem;
    align-items: center;
  }
</style>