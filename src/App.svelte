<script lang="ts">
  import ItemCard from './lib/ItemCard.svelte'
  import NewCard from './lib/NewCard.svelte'

  let items = [
    {
      name: '商品A',
      value: 0,
      amount: 0
    },
    {
      name: '商品B',
      value: 0,
      amount: 0
    }
  ]

  let unit = 'g';

  $: ranking = [...items].sort((item) => item.value / item.amount)

  const formatUnitPrice = (value: number, amount: number) => {
    const unitPrice = value / amount
    return !isNaN(value / amount) && isFinite(value / amount) ? `${unitPrice}円/${unit}` : ' '
  }

  const numberToLetter = (number: number) => {
    // https://stackoverflow.com/a/67182787/2719898

    number = number + 1
    //Takes any number and converts it into a base (dictionary length) letter combo. 0 corresponds to an empty string.
    //It converts any numerical entry into a positive integer.
    if (isNaN(number)) {return undefined}
    number = Math.abs(Math.floor(number))

    const dictionary = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let index = number % dictionary.length
    let quotient = number / dictionary.length
    let result
    
    if (number <= dictionary.length) {return numToLetter(number)}  //Number is within single digit bounds of our encoding letter alphabet

    if (quotient >= 1) {
        //This number was bigger than our dictionary, recursively perform this function until we're done
        if (index === 0) {quotient--}   //Accounts for the edge case of the last letter in the dictionary string
        result = numberToLetter(quotient)
    }

    if (index === 0) {index = dictionary.length}   //Accounts for the edge case of the final letter; avoids getting an empty string
    
    return result + numToLetter(index)

    function numToLetter(number) {
        //Takes a letter between 0 and max letter length and returns the corresponding letter
        if (number > dictionary.length || number < 0) {return undefined}
        if (number === 0) {
            return ''
        } else {
            return dictionary.slice(number - 1, number)
        }
    }
  }

</script>

<main>
  <div class="main-container">
    <label>
      単位
      <select bind:value={unit}>
        <option value="g">g（グラム）</option>
        <option value="個">個（人前・杯・皿・枚・本・袋・箱）</option>
      </select>
    </label>
    <div class="card-container">
      {#each items as { name, value, amount }, index }
        <ItemCard
          bind:name={name}
          bind:value={value}
          bind:amount={amount}
          on:delete={() => { if (confirm(`本当に「${name}」を削除しますか？`)) { items.splice(index, 1); items = items } }}
          unit={unit}
        />
      {/each}
      <NewCard on:click={() => { console.log('clicked'); items.push({ name: `商品${numberToLetter(items.length)}`, value: 0, amount: 0}); items=items }} />
    </div>
  </div>

  <output>
    <ul>
      {#each ranking as { name, value, amount }}
        <li>{name} {formatUnitPrice(value, amount)}</li>
      {/each}
    </ul>
  </output>
</main>

<style>
  :root {
    --card-width: 16.180339887498948482045868343656381177203091798057628621354486227rem;
    --card-height: 10rem;
    --card-radius: 5px;

    --theme-color: #00aff1;
    --error-color: #ff0032;
  }

  :global(input[type="text"]),
  :global(select) {
    border-radius: 5px;
    border-color: #ccc;
  }

  main {
    display: grid;
    grid-template-columns: 1fr auto;
    padding: 1rem;
  }

  .main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .card-container {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  output {
    width: var(--card-width);
  }
</style>
