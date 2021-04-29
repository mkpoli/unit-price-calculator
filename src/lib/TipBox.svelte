<script lang="ts">
  import SvgIcon from '@jamescoyle/svelte-icon'
  import { mdiInformationOutline } from '@mdi/js'
  
  let hidden: boolean
  import { fade } from 'svelte/transition';

  const messages = [
    '「1*2+(3/4)^2」みたいな数式も使えますよ。',
    '何かご意見があれば、<a href="https://github.com/mkpoli/unit-price-calculator/issues" target="_blank">Github Issue</a>までどうぞ'
  ]

  let currentMessage: number = 0

  setInterval(() => {
    currentMessage += 1
    if (currentMessage >= messages.length) {
      currentMessage = 0
    }
    console.log(currentMessage)
  }, 5000);
</script>

{#key currentMessage}
<div
  class="tip"
  on:click|once={() => {hidden = true}}
  class:hidden={hidden}
  transition:fade
>
  <SvgIcon type="mdi" path={mdiInformationOutline}></SvgIcon>
  <span>{@html messages[currentMessage]}</span>
</div>
{/key}

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

    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: center;
    gap: 0.5rem;

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