document.addEventListener('DOMContentLoaded', () => {
  const canvas = new fabric.Canvas('canvas');
  canvas.setHeight(496);
  canvas.setWidth(496);

  // create a rectangle object
  fabric.Image.fromURL('assets/blue_wall.jpg', (img) => {
    img.scaleToWidth(496);
    img.selectable = false;
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
          canvas.add(img);
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
});

/*

  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  canvas.ondragover = (e) => {
    e.preventDefault();
    return false;
  };

  canvas.ondrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const image = new Image();

      image.src = event.target.result;

      image.onload = (event) => {
        context.height = canvas.height = image.height;
        context.width = canvas.width = image.width;

        if (image.height >= 496 || image.width >= 496) {
          context.drawImage(
            image,
            0,
            0,
            496,
            496,
            0,
            0,
            image.width,
            image.height
          );
        } else {
          context.drawImage(image, 0, 0);
        }
      };
    };

    reader.readAsDataURL(file);

    return false;
  };
});*/

/*var context,
  image,
  canvas = null;

document.addEventListener('DOMContentLoaded', () => {
  /* Image input
   * https://jsfiddle.net/JKirchartz/E4yRv/
   */
