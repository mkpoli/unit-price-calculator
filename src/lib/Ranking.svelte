<script lang="ts">
  import SvgIcon from "@jamescoyle/svelte-icon"
  import { mdiThumbDownOutline, mdiCrownOutline } from '@mdi/js'

  interface Item {
    name: string,
    value: number,
    amount: number
  }

  export let items: Item[]
  export let unit: string

  const formatUnitPrice = (value: number, amount: number, unit: string) => {
    const unitPrice = value / amount
    return !isNaN(value / amount) && isFinite(value / amount) ? `${parseFloat(unitPrice.toFixed(8))}円/${unit}` : ' '
  }

  const calculatePrice = (value: number, amount: number) => {
    const unitPrice = value / amount
    return !isNaN(value / amount) && isFinite(value / amount) ? unitPrice : NaN
  }

  class PriceMap extends Map<number, number[]> {
    get(k: number): number[] {
      if (this.has(k)) {
        return super.get(k)
      } else {
        const v = []
        this.set(k, v)
        return v
      }
    }
  }

  function createPriceMap(prices: number[]): PriceMap {
    const priceMap = prices.reduce((map: PriceMap, price: number, index: number) => {
      map.get(price).push(index)
      return map
    }, new PriceMap())
    return new PriceMap([...priceMap.entries()].filter(([value,]) => !isNaN(value)).sort(([valA,], [valB,]) => valA - valB))
  }

  $: prices = items.map(({ value, amount }) => calculatePrice(value, amount))
  $: priceMap = createPriceMap(prices)

  $: rankingMap = [...priceMap.entries()].reduce((acc, [value, indices], ranking) => {
    for (const index of indices) {
      acc[index] = ranking + 1
    }
    return acc
  }, {})
</script>

<ul>
  {#each items as { name, value, amount }, index}
    <li>
      <div class="result-icon">
        {#if index in rankingMap}
          {#if rankingMap[index] == 1}
            <span class="best-icon"><SvgIcon type="mdi" path={mdiCrownOutline}/></span>
          {:else if priceMap.size > 2 && rankingMap[index] == priceMap.size}
            <span class="worst-icon"><SvgIcon type="mdi" path={mdiThumbDownOutline} size="20"/></span>
          {/if}
        {/if}
      </div>
      <span>{name}</span><span>{formatUnitPrice(value, amount, unit)}</span>
      <div>
        {#if index in rankingMap}
          <span class="ranking-number">{rankingMap[index]}</span>
        {/if}
      </div>
      <div class="bar">
        <div class="bar-content" style="width: {priceMap.size >= 1 && index in rankingMap ? prices[index] / [...priceMap.entries()].pop()[0] * 100 : 0}%;"></div>
      </div>
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
    grid-template-columns: 2rem 0.75fr 1.25fr 2rem;

    list-style: none;
  }

  .result-icon {
    margin: auto 0;
    left: -2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .best-icon {
    color: #ddb752;
    filter: drop-shadow(0 0 1px #e7dbb7)
  }

  .worst-icon {
    color: #ccc;
  }

  .ranking-number {
    color: var(--theme-color);
    font-weight: bold;
    text-align: center;
    width: 100%;
    display: inline-block;
  }

  .bar {
    position: absolute;
    top: 0;
    left: 2.5rem;
    right: 2.5rem;
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
