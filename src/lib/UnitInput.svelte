<script lang="ts">
  export let value: number
  export let unit: string
</script>

<label>
  <input type="text" bind:value={value} /><span>{ unit }</span>
</label>

<style>
  label {
    display: grid;
    grid-template-columns: 1fr 2rem;
  }
</style>