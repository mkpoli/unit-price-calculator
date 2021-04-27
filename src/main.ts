import App from './App.svelte'
import 'sanitize.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/typography.css';

const app = new App({
  target: document.getElementById('app')
})

export default app
