document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('tab-selector-edit').addEventListener('click', () => {
    document.getElementById('tab-selector-edit').className = '';
    document.getElementById('tab-selector-stickers').className = '';
    document.getElementById('tab-selector-tutorial').className = '';

    document.getElementById('edit-tab').className = 'hidden';
    document.getElementById('stickers-tab').className = 'hidden';
    document.getElementById('tutorial-tab').className = 'hidden';

    document.getElementById('edit-tab').className = '';
    document.getElementById('tab-selector-edit').className = 'is-active';
  });

  document
    .getElementById('tab-selector-tutorial')
    .addEventListener('click', () => {
      document.getElementById('tab-selector-edit').className = '';
      document.getElementById('tab-selector-stickers').className = '';
      document.getElementById('tab-selector-tutorial').className = '';

      document.getElementById('edit-tab').className = 'hidden';
      document.getElementById('stickers-tab').className = 'hidden';
      document.getElementById('tutorial-tab').className = 'hidden';

      document.getElementById('tutorial-tab').className = '';
      document.getElementById('tab-selector-tutorial').className = 'is-active';
    });

  document
    .getElementById('tab-selector-stickers')
    .addEventListener('click', () => {
      document.getElementById('tab-selector-edit').className = '';
      document.getElementById('tab-selector-stickers').className = '';
      document.getElementById('tab-selector-tutorial').className = '';

      document.getElementById('edit-tab').className = 'hidden';
      document.getElementById('stickers-tab').className = 'hidden';
      document.getElementById('tutorial-tab').className = 'hidden';

      document.getElementById('stickers-tab').className = '';
      document.getElementById('tab-selector-stickers').className = 'is-active';
    });
});
