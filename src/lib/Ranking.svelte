<script lang="ts">
  import SvgIcon from "@jamescoyle/svelte-icon"
  import { mdiThumbDownOutline, mdiCrownOutline } from '@mdi/js'

  interface Item { name: string, value: number, amount: number }

  export let items: Item[]
  export let unit: string

  const formatUnitPrice = (value: number, amount: number) => {
    const unitPrice = value / amount
    return !isNaN(value / amount) && isFinite(value / amount) ? `${parseFloat(unitPrice.toFixed(8))}円/${unit}` : ' '
  }

  const calculatePrice = (value: number, amount: number, fallback: number=0) => {
    const unitPrice = value / amount
    return !isNaN(value / amount) && isFinite(value / amount) ? unitPrice : fallback
  }

  interface MinMax {
    min?: {
      index: number,
      value: number,
    },
    max?: {
      index: number,
      value: number,
    }
  }

  function getMinMax(items: Item[]) {
    return items.reduce((acc: MinMax, ele: Item, ind: number) => {
      const price = calculatePrice(ele.value, ele.amount, NaN)

      if (isNaN(price)) {
        return acc
      }
      
      if (price > acc.max.value) {
        acc.max = {
          index: ind,
          value: price
        }
      }

      if (price < acc.min.value) {
        acc.min = {
          index: ind,
          value: price
        }
      }

      return acc
    }, {
      min: {
        index: -1,
        value: Infinity
      },
      max: {
        index: -1,
        value: -Infinity
      }
    })
  }

  $: minmax = getMinMax(items)

</script>

<ul>
  {#each items as { name, value, amount }, index}
    <li>
      <div class="result-icon">
        {#if index == minmax.min.index}
          <span class="best-icon"><SvgIcon type="mdi" path={mdiCrownOutline}/></span>
        {:else if index == minmax.max.index && items.length > 2}
          <span class="worst-icon"><SvgIcon type="mdi" path={mdiThumbDownOutline} size="20"/></span>
        {/if}
      </div>
      <span>{name}</span><span>{formatUnitPrice(value, amount)}</span>
      <div class="bar"><div class="bar-content" style="width: {minmax.max.value == -Infinity ? 0 : calculatePrice(value, amount) / minmax.max.value * 100}%;"></div></div>
    </li>
  {/each}
</ul>

<style>
  ul {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;

    padding: 0;
    margin: 0;
  }

  li {
    position: relative;
    padding: 0.4rem;

    display: grid;
    gap: 0.5rem;
    grid-template-columns: 2rem 1fr 1fr;

    list-style: none;
  }

  .result-icon {
    margin: auto 0;
    left: -2rem;
  }

  .best-icon {
    color: #ddb752;
    filter: drop-shadow(0 0 1px #e7dbb7)
  }

  .worst-icon {
    color: #ccc;
  }

  .bar {
    position: absolute;
    top: 0;
    left: 2.5rem;
    right: 0;
    bottom: 0;
    background-color: #f8f8f8;
    z-index: -1;
    overflow: hidden;
    border-radius: 5px;
  }

  .bar-content {
    background-color: #ccf2ff;
    height: 100%;
  }
</style>
