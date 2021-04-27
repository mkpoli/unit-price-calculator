<script lang="ts">
  import SvgIcon from '@jamescoyle/svelte-icon'
  import { mdiPencilOutline, mdiCheck, mdiClose  } from '@mdi/js'
  
  import { tick } from 'svelte'

  export let value: string

  let editing: boolean = false
  let temp: string
  let input: HTMLInputElement
</script>

<form class="text-container" on:submit={(event) => { editing = false ; value = temp ; event.preventDefault() ; return false }} on:reset={() => { editing = false }}>
  {#if editing}
    <input type="text" bind:value={temp} bind:this={input}>
    <button type="submit"><SvgIcon type="mdi" path={mdiCheck} /></button>
    <button type="reset"><SvgIcon type="mdi" path={mdiClose} /></button>
  {:else}
    <span>{value}</span>
    <button on:click={async () => { editing = true; temp = value; await tick(); input.focus() }}><SvgIcon type="mdi" path={mdiPencilOutline} /></button>
    <slot></slot>
  {/if}
</form>

<style style lang="postcss">
  .text-container {
    display: grid;
    
    grid-template-columns: 1fr 2rem 2rem;

    font-weight: bold;
    text-align: left;
    align-items: center;

    span {
      line-height: 1.5rem;
    }
  }

  button {
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
      color: var(--theme-color);
    }
  }

  button[type="reset"]:focus {
    color: var(--error-color)
  }

  input {
    width: 100%;
  }

  span {
    text-indent: 0.3rem;
  }

</style>
