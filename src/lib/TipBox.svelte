<script lang="ts">
  import SvgIcon from '@jamescoyle/svelte-icon'
  import { mdiInformationOutline } from '@mdi/js'
  
  let hidden: boolean
</script>

<div class="tip" on:click|once={() => {hidden = true}} class:hidden={hidden}><SvgIcon type="mdi" path={mdiInformationOutline}></SvgIcon>「1*2+(3/4)^2」みたいな数式も使えますよ。</div>

<style style lang="postcss">
  .tip {
    position: fixed;
    /* width: clamp(10rem, 20rem, 100vw - 1rem); */
    max-width: calc(100vw - 1rem);
    /* height: 3rem; */
    right: 1rem;
    bottom: 1rem;

    padding: 1rem;

    color: #000;

    display: flex;
    justify-content: center;

    background: #e6f8ff;
    border: 1px solid var(--theme-color);
    border-radius: 5px;

    @media only screen and (max-width: 720px) {
      left: 0;
      right: 0;
      bottom: 0;
      max-width: none;
      border-radius: 0;
      border-left: none;
      border-right: none;
      border-bottom: none;
    }
  }

  .tip.hidden {
    display: none;
  }
</style>