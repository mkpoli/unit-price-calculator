<script lang="ts">
  import SvgIcon from '@jamescoyle/svelte-icon'
  import { mdiDeleteOutline } from '@mdi/js'

  export let name: string
  export let value: number
  export let amount: number
  export let unit: string

  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  import EditableTitle from './EditableTitle.svelte'
  import UnitInput from './UnitInput.svelte'
</script>

<div class="card">
  <EditableTitle bind:value={name}>
    <button type="button" on:click={() => {dispatch('delete')}}><SvgIcon type="mdi" path={mdiDeleteOutline}/></button>
  </EditableTitle>
  <UnitInput bind:value={amount} unit={unit} />
  <UnitInput bind:value={value} unit="円" />
</div>

<style style lang="postcss">
  .card {
    width: var(--card-width);
    min-height: var(--card-height);

    border-radius: 5px;
    box-shadow: 1px 1px 3px 1px #ccc;

    padding: 1rem;

    display: grid;
    grid-template-rows: auto 2rem 2rem;
    place-items: center;
    justify-content: center;
    gap: 0.5rem;
    text-align: center;
  }

  :global(.card > *) {
    min-height: 2rem;
    width: 100%;
  }

  button {
    /* position: absolute;
    top: 1rem;
    right: 1rem; */

    padding: 0;

    appearance: none;
    background: none;
    border: none;
    color: #aaa;

    &:hover {
      color: #000
    }

    &:focus {
      outline: none;
      color: var(--error-color);
    }
  }
</style>