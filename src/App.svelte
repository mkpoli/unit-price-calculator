<script lang="ts">
  import ItemCard from './lib/ItemCard.svelte'
  import NewCard from './lib/NewCard.svelte'
  import Ranking from './lib/Ranking.svelte';
  import TipBox from './lib/TipBox.svelte';
  import UnitSelector from './lib/UnitSelector.svelte';

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

  let nameCount = 2;

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
  <UnitSelector bind:value={unit}/>
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
    <NewCard on:click={() => {
      items.push({ name: `商品${numberToLetter(nameCount)}`, value: 0, amount: 0})
      nameCount += 1
      items = items
    }}/>
  </div>

  <h2>結果</h2>

  <output>
    <Ranking items={items} unit={unit} />
  </output>
</main>
<TipBox></TipBox>

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
    border-radius: 5px !important;
    border-color: #ccc;
    /* appearance: none; */
  }

  :global(input[type="text"]):focus,
  :global(select):focus {
    outline: none;
    border-color: var(--theme-color);
    box-shadow: 0 0 1px 0px var(--theme-color);
  }

  main {
    padding: 1rem;
    max-width: 1024px;
    margin: 0 auto;

    display: grid;
    grid-template: 1fr auto / 1fr 1fr;
    grid-auto-flow: column;
    gap: 0 1rem;
    place-items: center;

    @media only screen and (max-width: 720px) {
      grid-template: auto 1fr auto 1fr / 1fr;
      gap: 1rem;
    }
  }

  .card-container {
    display: grid;
    grid-template-columns: var(--card-width) var(--card-width);
    gap: 1rem;
    flex-wrap: wrap;
    margin: 0 auto;

    @media only screen and (max-width: 720px) {
      grid-template-columns: 1fr;
    }
  }

  output {
    max-width: 22rem;
    width: 100%;
    height: 100%;
  }
</style>
