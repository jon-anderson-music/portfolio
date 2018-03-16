const photos = document.querySelectorAll('.gallery-photo');

// Create style tag to dynamically write pseudo elements
const createBgImages = () => {
  let styleContent = '';

  photos.forEach((photo, index) => {
    const { id: url } = photo;
    styleContent += `
    .photo${index + 1}:before {
      background-image: url("${url}");
    }  
    `;
  });

  const styleTag = document.createElement('style');
  styleTag.textContent = styleContent;

  document.body.appendChild(styleTag);
};

createBgImages();
