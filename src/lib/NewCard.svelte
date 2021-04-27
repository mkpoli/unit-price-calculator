<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher()

  import SvgIcon from '@jamescoyle/svelte-icon'
  import { mdiPlus } from '@mdi/js'
</script>

<div class="card" on:click={() => { dispatch('click') }}>
  <SvgIcon type="mdi" path={mdiPlus} />
</div>

<style>
  .card {
    width: var(--card-width);
    height: var(--card-height);

    border-radius: var(--card-radius);
    /* box-shadow: 1px 1px 3px 1px #ccc; */

    color: #aaa;
    border-color: #aaa;
    border-style: dashed;

    padding: 1rem;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card:hover {
    color: #000;
  }
</style>