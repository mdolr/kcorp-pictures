document.addEventListener('DOMContentLoaded', () => {
  const stickers = [
    {
      name: 'Logo Karmine Corp',
      url: 'assets/logo_karmine.png',
      background: 'is-info',
      height: 64,
      width: 64
    }
  ];

  const container = document.getElementById('stickers');
  const canvas = document.getElementById('canvas').fabric;

  stickers.forEach((sticker) => {
    const stickerContainer = document.createElement('article');
    stickerContainer.className = `tile sticker is-child notification ${sticker.background}`;

    const stickerImage = document.createElement('img');
    stickerImage.height = parseInt(sticker.height);
    stickerImage.width = parseInt(sticker.width);
    stickerImage.src = `${sticker.url}`;

    const stickerAddButton = document.createElement('button');
    stickerAddButton.className = 'button is-small';
    stickerAddButton.addEventListener('click', () => {
      fabric.Image.fromURL(sticker.url, (img) => {
        img.scaleToWidth(496);
        canvas.add(img);
      });
    });

    const stickerAddButtonIconContainer = document.createElement('span');
    stickerAddButtonIconContainer.className = 'icon';

    const stickerAddButtonIcon = document.createElement('i');
    stickerAddButtonIcon.className = 'fa fa-plus';

    const stickerAddButtonTextContainer = document.createElement('span');

    const stickerAddButtonText = document.createTextNode('Ajouter le sticker');

    stickerAddButtonTextContainer.appendChild(stickerAddButtonText);
    stickerAddButtonIconContainer.appendChild(stickerAddButtonIcon);

    stickerAddButton.appendChild(stickerAddButtonIconContainer);
    stickerAddButton.appendChild(stickerAddButtonTextContainer);

    stickerContainer.appendChild(stickerImage);
    stickerContainer.appendChild(document.createElement('br'));
    stickerContainer.appendChild(document.createTextNode(`${sticker.name}`));
    stickerContainer.appendChild(document.createElement('br'));
    stickerContainer.appendChild(stickerAddButton);

    container.appendChild(stickerContainer);
  });
});
