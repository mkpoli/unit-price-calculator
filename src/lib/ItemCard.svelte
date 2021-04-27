<script lang="ts">
  import SvgIcon from '@jamescoyle/svelte-icon'
  import {
    mdiPencilOutline,
    mdiDeleteOutline
   } from '@mdi/js'

  export let name: string
  export let value: number
  export let amount: number
  export let unit: string

  import { createEventDispatcher } from 'svelte';
  import UnitInput from './UnitInput.svelte';
  const dispatch = createEventDispatcher()
</script>

<div class="card">
  <h3>{ name }<SvgIcon type="mdi" path={mdiPencilOutline} /></h3>
  <UnitInput bind:value={value} unit={unit} />
  <UnitInput bind:value={amount} unit="円" />
  <button on:click={() => {dispatch('delete')}}><SvgIcon type="mdi" path={mdiDeleteOutline}/></button>
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