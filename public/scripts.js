let time = Date.now();
const photos = document.getElementById('photos')
let errorCount = 0

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
            console.log(response.latestPost)
            console.log(time)
          
                response.images.forEach(image => {
                    let img = document.createElement('img')
                    console.log(photos)
                    img.src = `uploads/${image}`;
                    photos.appendChild(img)
                });
            
            
            setTimeout(fetchData, 5000)
        }).catch(error => {
            errorCount++
            if(errorCount === 2){
                alert("Server is down")
            }else {
            setTimeout(fetchData, 5000)

            }
        })
        
}
fetchData()
