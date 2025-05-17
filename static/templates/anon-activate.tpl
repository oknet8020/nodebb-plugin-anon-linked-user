<div class="anon-identity-settings">
  <h2>הפעלת זהות אנונימית</h2>
  <button class="btn btn-primary" id="activate-anon">הפעל</button>
  <div id="anon-result"></div>
</div>

<script>
document.getElementById('activate-anon').addEventListener('click', async function () {
  const res = await fetch('/api/user/anon-activate', { method: 'POST' });
  const data = await res.json();
  document.getElementById('anon-result').innerText = data.message || data.error || 'בוצע';
});
</script>
