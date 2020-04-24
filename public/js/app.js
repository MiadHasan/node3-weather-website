
const weatherFrom = document.querySelector('form');
const message = document.querySelector('#message');


weatherFrom.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const location = document.querySelector('#location').value;
    const url = 'http://localhost:3000/weather?address=' + encodeURIComponent(location);
    
    message.textContent = 'Loading...';

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message.textContent = data.error;
            } else {
                message.innerHTML = 'Location: '+data.location+
                '<br>'+'Temparature: '+data.temparature+'<br>'+
                'Sunrise: '+data.sunRise+'<br>'+'Sunset: '+data.sunSet;
            }
        })
    })
})