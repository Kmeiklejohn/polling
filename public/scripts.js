let time = Date.now();

const fetchData = () => {
    fetch("/latest", {
            method: 'POST',
            body: JSON.stringify({
                "after": time,

            }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
        .then(response => {
            time = response.latestPost
            console.log(response)
            if (response.latestPost > time) {
                time = response.latestPost
                response.images.forEach(image => {
                    const img = document.createElement('img')
                    img.src = image
                    const photos = document.getElementById('photos')
                    photos.appendChild(img)
                });
            }
            
            setTimeout(fetchData, 5000)
        })
}
fetchData()
