<script lang="ts">
  export let value: string
</script>

<label>
  単位
  <select bind:value={value}>
    <option value="g">g（グラム）</option>
    <option value="個">個（人前・杯・皿・枚・本・袋・箱）</option>
  </select>
</label>

<style>
  @media only screen and (max-width: 720px) {
    label {
      width: var(--card-width);
    }

    select {
      width: 100%;
    }
  }
</style>

