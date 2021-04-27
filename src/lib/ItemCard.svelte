<script lang="ts">
  import SvgIcon from '@jamescoyle/svelte-icon'
  import { mdiPencilOutline } from '@mdi/js'

  export let name: string
  export let value: number
  export let amount: number
</script>

<div class="card">
  <h3>{ name }<SvgIcon type="mdi" path={mdiPencilOutline} /></h3>
  <input type="text" bind:value={value} />
  <input type="text" bind:value={amount} />
</div>

<style>
  .card {
    width: var(--card-width);
    height: var(--card-height);

    border-radius: 5px;
    box-shadow: 1px 1px 3px 1px #ccc;

    padding: 1rem;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
</style>