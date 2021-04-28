<script lang="ts">
  export let ranking: { name: string, value: number, amount: number }[]
  export let unit: string

  const formatUnitPrice = (value: number, amount: number) => {
    const unitPrice = value / amount
    return !isNaN(value / amount) && isFinite(value / amount) ? `${parseFloat(unitPrice.toFixed(8))}円/${unit}` : ' '
  }

  const calculatePrice = (value: number, amount: number) => {
    const unitPrice = value / amount
    return !isNaN(value / amount) && isFinite(value / amount) ? unitPrice : 0
  }

  $: maxmium = Math.max(...ranking.map(({value, amount}) => calculatePrice(value, amount)))

</script>

<ul>
  {#each ranking as { name, value, amount }}
    <li>
      <span>{name}</span><span>{formatUnitPrice(value, amount)}</span>
      <div class="bar"><div class="bar-content" style="width: {maxmium == 0 ? 0 : calculatePrice(value, amount) / maxmium * 100}%;"></div></div>
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
    grid-template-columns: 1fr 1fr;

    list-style: none;
  }

  .bar {
    position: absolute;
    top: 0;
    left: 0;
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
