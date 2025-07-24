export const manifest = {
  wagon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAApSURBVKXBAQEAAAiDMKR/5xuC7WAjkEgiiSSSSCKJJJJIIokkkkgiiR5WbwIeFJRVdgAAAABJRU5ErkJggg==',
  node: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAAqSURBVKXBAQEAMAyDMI7yOt9FkLxtRyCRRBJJJJFEEkkkkUQSSSSRRBJ9YpoCn/BE/O4AAAAASUVORK5CYII=',
};

export const images = {};

export function loadImages() {
  const promises = [];
  for (const [key, url] of Object.entries(manifest)) {
    const img = new Image();
    images[key] = img;
    promises.push(new Promise(resolve => {
      img.onload = resolve;
      img.src = url;
    }));
  }
  return Promise.all(promises);
}
