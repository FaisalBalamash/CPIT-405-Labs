// Create an image element with the provided photo URL.
function createImgElement(photoURL) {
  const imgElem = document.createElement("img");
  imgElem.src = photoURL;
  imgElem.alt = "Photo of a cat";

  // Add a class for styling.
  imgElem.classList.add("resizeable-image");

  // Add a wheel event listener to allow image resizing.
  imgElem.addEventListener("wheel", (event) => {
    event.preventDefault();
    const scaleFactor = 1.1;
    if (event.deltaY < 0) {
      imgElem.width *= scaleFactor;
      imgElem.height *= scaleFactor;
    } else {
      imgElem.width /= scaleFactor;
      imgElem.height /= scaleFactor;
    }
  });

  return imgElem;
}

// Add a delete button to remove the image.
function addDeleteButton(imgElem, photoGalleryDiv) {
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "X";

  // Add a click event listener to remove the image and delete button.
  deleteButton.addEventListener("click", () => {
    imgElem.remove();
    deleteButton.remove();
  });

  // Append the delete button to the photo gallery.
  photoGalleryDiv.appendChild(deleteButton);
}

// Add a photo to the gallery.
function addPhotoToGallery(photoURL, photoGalleryDiv) {
  const imgElem = createImgElement(photoURL);

  // Append the image to the photo gallery.
  photoGalleryDiv.appendChild(imgElem);

  // Add a delete button for the image.
  addDeleteButton(imgElem, photoGalleryDiv);
}

// Listen for the paste event.
document.addEventListener("paste", async (e) => {
  e.preventDefault();
  const items = e.clipboardData.items;
  const photoGalleryDiv = document.getElementById("photo-gallery");

  for (const item of items) {
    if (item.type === "text/plain") {
      item.getAsString((text) => {
        // Add the pasted text (presumably a photo URL) to the photo gallery.
        addPhotoToGallery(text, photoGalleryDiv);
      });
    }
  }
});
