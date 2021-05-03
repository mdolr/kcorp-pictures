document.addEventListener('DOMContentLoaded', () => {
  const canvas = new fabric.Canvas('canvas');
  document.getElementById('canvas').fabric = canvas;

  canvas.setHeight(496);
  canvas.setWidth(496);

  // create a rectangle object
  fabric.Image.fromURL('assets/blue_wall.jpg', (img) => {
    img.scaleToWidth(496);
    img.selectable = false;
    img.id = 'blue_wall';

    canvas.add(img);
  });

  document.getElementsByClassName('upper-canvas')[0].ondragover = (e) => {
    e.preventDefault();
    return false;
  };

  document.getElementsByClassName('upper-canvas')[0].ondrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const image = new Image();

      image.src = event.target.result;

      image.onload = (event) => {
        fabric.Image.fromObject(image, (img) => {
          img.scaleToHeight(496);
          img.scaleToWidth(496);
          img.id = randomID();

          canvas.add(img);

          addLayer(canvas, `Image importée`, img.id);
        });
      };
    };

    reader.readAsDataURL(file);

    return false;
  };

  document.getElementById('download').addEventListener('click', () => {
    var a = document.createElement('a');
    a.href = canvas.toDataURL('image/jpeg', 1.0);
    a.download = 'pp_kcorp.png';

    document.body.appendChild(a);

    a.click();
  });

  document.getElementById('deselect').addEventListener('click', () => {
    canvas.discardActiveObject().renderAll();
  });
});

// https://stackoverflow.com/a/8084248
const randomID = () => {
  return Math.random().toString(36).substring(7);
};

const getObjectById = (canvas, id) => {
  return canvas.getObjects().filter((object) => {
    return object.id == id;
  }).length
    ? canvas.getObjects().filter((object) => {
        return object.id == id;
      })[0]
    : null;
};

const addLayer = (canvas, imageName, imageID) => {
  const container = document.createElement('div');
  container.className = 'box has-text-left';
  container.id = `layer-row-${imageID}`;

  const arrowUpContainer = document.createElement('span');
  arrowUpContainer.className = 'icon';

  arrowUpContainer.addEventListener('click', () => {
    canvas.discardActiveObject().renderAll();
    const item = getObjectById(canvas, imageID);
    canvas.bringForward(item, true);
    canvas.discardActiveObject().renderAll();

    console.log(container, container.previousSibling);

    if (container.previousSibling) {
      const previousSibling = container.previousSibling;
      document.getElementById('layers').removeChild(container);
      document
        .getElementById('layers')
        .insertBefore(container, previousSibling);
    }
  });

  const arrowUp = document.createElement('i');
  arrowUp.className = 'fa fa-arrow-up';

  arrowUpContainer.appendChild(arrowUp);

  const arrowDownContainer = document.createElement('span');
  arrowDownContainer.className = 'icon';

  arrowDownContainer.addEventListener('click', () => {
    canvas.discardActiveObject().renderAll();
    const item = getObjectById(canvas, imageID);
    canvas.sendBackwards(item, true);

    const blueWall = getObjectById(canvas, 'blue_wall');
    canvas.sendToBack(blueWall);
    canvas.discardActiveObject().renderAll();

    if (container.nextSibling) {
      const nextSibling = container.nextSibling;
      document.getElementById('layers').removeChild(container.nextSibling);
      document.getElementById('layers').insertBefore(nextSibling, container);
    }
  });

  const arrowDown = document.createElement('i');
  arrowDown.className = 'fa fa-arrow-down';

  arrowDownContainer.appendChild(arrowDown);

  const arrowsContainer = document.createElement('span');
  arrowsContainer.className = 'icon';

  arrowsContainer.addEventListener('click', () => {
    const item = getObjectById(canvas, imageID);
    canvas.bringToFront(item);

    document.getElementById('layers').removeChild(container);
    document.getElementById('layers').prepend(container);
  });

  const arrows = document.createElement('i');
  arrows.className = 'fa fa-arrows';

  arrowsContainer.appendChild(arrows);

  const trashContainer = document.createElement('span');
  trashContainer.className = 'icon';

  trashContainer.addEventListener('click', () => {
    const item = getObjectById(canvas, imageID);
    canvas.remove(item);
    document.getElementById('layers').removeChild(container);
  });

  const trash = document.createElement('i');
  trash.className = 'fa fa-trash';

  trashContainer.appendChild(trash);

  container.appendChild(arrowUpContainer);
  container.appendChild(arrowDownContainer);
  container.appendChild(arrowsContainer);
  container.appendChild(trashContainer);
  container.appendChild(document.createTextNode(imageName.toString()));

  document.getElementById('layers').prepend(container);
};
