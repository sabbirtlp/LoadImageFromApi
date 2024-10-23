const imageContainer = document.getElementById('image-container'); 

const loadImage = () => {
    const URL = 'https://picsum.photos/v2/list'; 
    fetch(URL)
    .then(res => res.json())
    .then(data => showImages(data))
}

const showImages = (data) => {
    data.forEach(image => {
        console.log(image);
        
        const imageBox = document.createElement('div');
        imageBox.classList.add('image-box'); 
        
        const img = document.createElement('img'); 
        img.src = image.download_url;
        img.alt = "Image";
        
        const downloadButton = document.createElement('button'); 
        downloadButton.classList.add('download-button');
        downloadButton.innerHTML = 'Download Image';

        // Add click event to download the image as a blob
        downloadButton.addEventListener('click', () => {
            fetch(image.download_url)
                .then(response => response.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = 'image.jpg';  // You can set the image name here
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);  // Cleanup the URL object
                })
                .catch(() => alert('Error downloading the image.'));
        });
        
        imageBox.appendChild(img);
        imageBox.appendChild(downloadButton);
        imageContainer.appendChild(imageBox);
    });
}

loadImage();
