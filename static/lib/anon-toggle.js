'use strict';

define('forum/anon-toggle', ['hooks', 'postData'], function (hooks, postData) {
  const anonCheckbox = document.createElement('label');
  anonCheckbox.innerHTML = `
    <input type="checkbox" id="anon-post-toggle" /> פרסם באופן אנונימי
  `;
  anonCheckbox.style.display = 'block';
  anonCheckbox.style.margin = '10px 0';

  hooks.on('action:composer.loaded', function (data) {
    const composerEl = document.querySelector('.composer');
    if (composerEl && !document.getElementById('anon-post-toggle')) {
      composerEl.querySelector('.composer-footer').prepend(anonCheckbox);
    }
  });

  hooks.on('filter:composer.formatPostData', function (hookData) {
    const checkbox = document.getElementById('anon-post-toggle');
    if (checkbox && checkbox.checked) {
      hookData.data.isAnonymous = true;
    }
    return hookData;
  });
});
