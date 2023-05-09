'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderError = (msg) => countriesContainer.insertAdjacentText('beforeend',msg);

// const getCountryData = (country) => {

//     const request = new XMLHttpRequest();
//     request.open('GET',`https://restcountries.com/v2/name/${country}`);
//     request.send();
    
//     request.addEventListener('load',function() {
//         const [data] = JSON.parse(this.responseText);
    
//         const html = `
//                 <article class="country">
//                 <img class="country__img" src="${data.flag}" />
//                 <div class="country__data">
//                 <h3 class="country__name">${data.name}</h3>
//                 <h4 class="country__region">${data.region}</h4>
//                 <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
//                 <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//                 <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//                 </div>
//             </article>`
//             countriesContainer.insertAdjacentHTML("beforeend",html)
//             countriesContainer.style.opacity = 1;
//     })

// }

// getCountryData('israel');
// getCountryData('usa');

const renderCountry = (data,className = '') => {
    const html = `
            <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
            </div>
        </article>`
        countriesContainer.insertAdjacentHTML("beforeend",html)
}
/*
const getCountryAndNeighbour = (country) => {

    // AJAX call country 1
    const request = new XMLHttpRequest();
    request.open('GET',`https://restcountries.com/v2/name/${country}`);
    request.send();
    
    request.addEventListener('load',function() {
        const [data] = JSON.parse(this.responseText);
        
        // Render country 1
        
        renderCountry(data)  
        
        // Get neighbour country 2
        const [neighbour] = data.borders;
        
        if(!neighbour) return;

        const request2 = new XMLHttpRequest();
        request2.open('GET',`https://restcountries.com/v2/alpha/${neighbour}`);
        request2.send();

        request2.addEventListener('load',function(){
            const data2 = JSON.parse(this.responseText);
            console.log(data2);

            renderCountry(data2,'neighbour')
        })
    })

}

getCountryAndNeighbour('israel');
*/

const getJson = (url,errorMsg = 'Somthing went wrong') => {
    return fetch(url).then((response) => {
        if (!response.ok) {
            throw new Error(`${errorMsg} (${response.status})`)
        }
        return response.json();
    })
}
const getCountryData2 = (country) => {
    // Country 1
    getJson(`https://restcountries.com/v2/name/${country}`,'Somthing went wrong')
    .then(data => {
        renderCountry(data[0]);
        const neighbour = data[0].borders[0];

        if(!neighbour) throw new Error('No neighbour found')

        if (!neighbour) return;
        
        // Country 2
        return getJson(`https://restcountries.com/v2/alpha/${neighbour}`,'Country not found');
    })
        .then(data => renderCountry(data,'neighbour'))
        .catch(err => renderError(`Somthing went wrong 💥💥💥💥 ${err.message},try again!`))
        .finally(() => countriesContainer.style.opacity = 1)
}

btn.addEventListener('click', () => {
    getCountryData2('israel');
});


// getCountryData2('israe2l');

//------------------------------------------------------------------------------------

/*

// Coding Challenge #1

// In this challenge you will build a function 'whereAmI' which renders a country 
// only based on GPS coordinates. For that, you will use a second API to geocode 
// coordinates. So in this challenge, you’ll use an API on your own for the first time �
// Your tasks:
// PART 1
// 1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat') 
// and a longitude value ('lng') (these are GPS coordinates, examples are in test 
// data below).

// 2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means 
// to convert coordinates to a meaningful location, like a city and country name. 
// Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call 
// will be done to a URL with this format: 
// https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and 
// promises to get the data. Do not use the 'getJSON' function we created, that 
// is cheating �
// 3. Once you have the data, take a look at it in the console to see all the attributes 
// that you received about the provided location. Then, using this data, log a 
// message like this to the console: “You are in Berlin, Germany”
// 4. Chain a .catch method to the end of the promise chain and log errors to the 
// console
// 5. This API allows you to make only 3 requests per second. If you reload fast, you 
// will get this error with code 403. This is an error with the request. Remember, 
// fetch() does not reject the promise in this case. So create an error to reject 
// the promise yourself, with a meaningful error message
// PART 2
// 6. Now it's time to use the received data to render a country. So take the relevant 
// attribute from the geocoding API result, and plug it into the countries API that 
// we have been using.
// 7. Render the country and catch any errors, just like we have done in the last 
// lecture (you can even copy this code, no need to type the same code)

// Test data:
// § Coordinates 1: 52.508, 13.381 (Latitude, Longitude)
// § Coordinates 2: 19.037, 72.873
// § Coordinates 3: -33.933, 18.474
// GOOD LUCK �

const whereAmI = (lat,lng) => {
    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=134837791627675411575x43557`)
    .then(response =>{
        if(!response.ok) throw new Error(`Problem with geoCoding ${response.status}`);
        return response.json()
    })
    .then(data => {
        console.log(`You are in ${data.city}, ${data.country}`)
        return fetch(`https://restcountries.com/v2/name/${data.country}`)
    })
    .then(response => {
        if(!response.ok) throw new Error('Country not found')
        return response.json()
    })
    .then(data => renderCountry(data[0],''))
    .catch(err => renderError(`${err.message}💥`))
    .finally(() => countriesContainer.style.opacity = 1)

}
whereAmI('52.508','13.381');

//---------------------------------------------------------------------------------------

// Part 2

// Event loop practice

console.log('Test start');//Executed first
setTimeout(() => console.log('0 sec timer'),0);//Executed last
Promise.resolve('Resolved promise 1')//
.then(res => console.log(res));//Executed third
Promise.resolve('Resolved promise 2')
.then(res => {
    for (let i = 0; i < 100000; i++){}
    console.log(res);//Executed fourth            
})
console.log('Test end');//Executed second

//---------------------------------------------------------------------------

const lotteryPromise = new Promise((resolve,reject) => {
    console.log('Lottery draw is happening 🔮');
    setTimeout(() => {
        if(Math.random() >= 0.5) {
            resolve('You win 💰');
        } else {
            reject('You lost your money 💩')
        }
    },2000)
})

lotteryPromise.then(res => console.log(res))
.catch(err => console.error(err))

// Promisifying setTimout
const wait = ((seconds) => {
    return new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000);
    })
})

// This is instead of callback hell
wait(2).then(() => {
    console.log('I waited for 2 seconds');
    return wait(1);
})
.then(() => {
    console.log('1 second passed')
    return wait(1);
})
.then(() => {
    console.log('2 second passed')
    return wait(1);
})
.then(() => {
    console.log('3 second passed')
    return wait(1);
})
.then(() => {
    console.log('4 second passed')
    return wait(1);
})

Promise.resolve('abc').then(x => console.log(x))
Promise.reject('abc').catch(x => console.error(x))

//------------------------------------------------------------------------------------------




const getPosition = (() => {
    return new Promise((resolve,reject) => {
        navigator.geolocation.getCurrentPosition(resolve,reject);
    });
});

const whereAmIPromisify = () => {
    getPosition().then(pos => {
        const {latitude: lat,longitude:lng} = pos.coords;
        
        return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=134837791627675411575x43557`)
    })
    .then(response =>{
        if(!response.ok) throw new Error(`Problem with geoCoding ${response.status}`);
        return response.json()
    })
    .then(data => {
        console.log(`You are in ${data.city}, ${data.country}`)
        return fetch(`https://restcountries.com/v2/name/${data.country}`)
    })
    .then(response => {
        if(!response.ok) throw new Error('Country not found')
        return response.json()
    })
    .then(data => renderCountry(data[0],''))
    .catch(err => renderError(`${err.message}💥`))
    .finally(() => countriesContainer.style.opacity = 1)
    
}
btn.addEventListener('click',whereAmIPromisify)

getPosition().then(pos => console.log(pos));

//-----------------------------------------------------------------------------------------

// Coding Challenge #2

// For this challenge you will actually have to watch the video! Then, build the image 
// loading functionality that I just showed you on the screen.
// Your tasks:
// Tasks are not super-descriptive this time, so that you can figure out some stuff by 
// yourself. Pretend you're working on your own �
// PART 1
// 1. Create a function 'createImage' which receives 'imgPath' as an input. 
// This function returns a promise which creates a new image (use 
// document.createElement('img')) and sets the .src attribute to the 
// provided image path


// 2. When the image is done loading, append it to the DOM element with the 
// 'images' class, and resolve the promise. The fulfilled value should be the 
// image element itself. In case there is an error loading the image (listen for 
// the'error' event), reject the promise
// 3. If this part is too tricky for you, just watch the first part of the solution
// PART 2
// 4. Consume the promise using .then and also add an error handler
// 5. After the image has loaded, pause execution for 2 seconds using the 'wait'
// function we created earlier
// 6. After the 2 seconds have passed, hide the current image (set display CSS 
// property to 'none'), and load a second image (Hint: Use the image element 
// returned by the 'createImage' promise to hide the current image. You will 
// need a global variable for that �)
// 7. After the second image has loaded, pause execution for 2 seconds again
// 8. After the 2 seconds have passed, hide the current image
// Test data: Images in the img folder. Test the error handler by passing a wrong 
// image path. Set the network speed to “Fast 3G” in the dev tools Network tab, 
// otherwise images load too fast
// GOOD LUCK �


// Solution A
const img = new Image('1000','563.5');

const getImg = (setImg,seconds,display) => {
    return new Promise((resolve,reject) => {
        resolve(setTimeout(() => {
            countriesContainer.style.display = display;
            img.src = setImg;
        },seconds * 1000)),
        reject(console.log('Something went wrong'))
    })
}

const createImage = () => {
    img.src = 'img/img-1.jpg';
    countriesContainer.appendChild(img);
    countriesContainer.style.opacity = 1;
    getImg('',2,'none')
    .then(() =>  getImg('img/img-2.jpg',4,'block'))
    .then(() => getImg('',6,'none'))
    .then(() => getImg('img/img-3.jpg',8,'block'))
    .catch(err => new Error(`Image not found ${err.message}`))
}
createImage();

// Solution B

// const wait2 = (seconds) => {
//     return new Promise((resolve) => {
//         setTimeout(resolve,seconds * 1000)
//     })
// }

// const imgContainer = document.querySelector('.images');

// let currentImg;

// const createImage2 = (imgPath) => {
//     return new Promise((resolve,reject) => {
//         const img = document.createElement('img');
//         img.src = imgPath;

//         img.addEventListener('load',() => {
//             imgContainer.append(img);
//             resolve(img);
//         })

//         img.addEventListener('error',() => {
//             reject(new Error('Image not found'));
//         })
//     })
// }

// createImage2('img/img-1.jpg')
// .then(img => {
//     currentImg = img
//     console.log('Image 1 loaded');
//     return wait2(2)   
// })
// .then(() => {
//     currentImg.style.display = 'none'
//     return createImage2('img/img-2.jpg')   
// })
// .then(img => {
//     currentImg = img
//     console.log('Image 2 loaded');
//     return wait2(2)   
// })
// .then(() => currentImg.style.display = 'none')
// .catch(err => console.error(err))


//-----------------------------------------------------------------------------



// Part 3
// Async/await

const getPosition = (() => {
    return new Promise((resolve,reject) => {
        navigator.geolocation.getCurrentPosition(resolve,reject);
    });
});

const whereAmIAsync = async () => {
    try {
        // Geo location
        
        const pos = await getPosition();
        const {latitude: lat,longitude:lng} = pos.coords;
    
        // Reverse geocoding
        const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=134837791627675411575x43557`);

        if(!resGeo.ok) throw new Error('Problem getting location data');
        const dataGeo = await resGeo.json();
        
        // country data
        const res = await fetch(`https://restcountries.com/v2/name/${dataGeo.country}`);

        if(!res.ok) throw new Error('Problem getting country');
        const data = await res.json();

        renderCountry(data[0]);
        countriesContainer.style.opacity = 1;   
        return `You are in ${dataGeo.city},${dataGeo.country}`  
    }catch(err) {
        renderError('Somthing went wrong')
        console.log(err.message);
        countriesContainer.style.opacity = 1;
        
        throw err;
    }
}

console.log('1:Will get location');
// This 2 lines will be executed second because it's a promise
// const city = whereAmIAsync();
// console.log(city);

// this will be executed third because we return a value
// const city = whereAmIAsync().then(city => console.log(city))
//                             .catch(err => console.error(`${err.message}`))
//                             .finally(() => console.log('3:Finished  getting location'))
// console.log('4:Finished');

// Same as above just using async
(async () => {
    try{
        const city = await whereAmIAsync();
        console.log(city);
        console.log('Finished  getting location');
    }catch(err) {
        console.error('Some problem');
    }
})();


//----------------------------------------------------------------------------------

const get3Countries = async (c1,c2,c3) => {
    try {
        //Will make the 3 requests at the same time instead of going one by one
        //* If one promise rejects all others will fail as well
        const data = await Promise.all([
            getJson(`https://restcountries.com/v2/name/${c1}`),
            getJson(`https://restcountries.com/v2/name/${c2}`),
            getJson(`https://restcountries.com/v2/name/${c3}`)
        ])
        console.log(data.map(d => d[0].capital));
        data.forEach((country => {
            console.log(`You are in ${country[0].capital},${country[0].name}`);
        }))
        
    } catch(err) {
        console.error(err);
    }
}
get3Countries('israel','canada','germany')
*/


//Promise.race
// (async () => {
//     // The first result of the array will be the resolve
//     const res = await Promise.race([
//         getJson('https://restcountries.com/v2/name/italy'),
//         getJson('https://restcountries.com/v2/name/egypt'),
//         getJson('https://restcountries.com/v2/name/mexico')
//     ]);
//     console.log(res[0]);
// })();

const timeout = (sec) => new Promise((_,reject) => {
    setTimeout(() => reject(new Error('Request took too long!')), sec * 1000)
})

Promise.race([
    getJson('https://restcountries.com/v2/name/tanzania'),
    timeout(0.19)
]).then(res => console.log(res[0]))
  .catch(err => console.error(err))

// Promise.allSettled
Promise.allSettled([
    Promise.resolve('Success'),
    Promise.reject('Error'),
    Promise.resolve('Success'),
]).then(res => console.log(res))

// Promise.any [ES2021] will return only resolved promise
Promise.any([
    Promise.resolve('Success'),
    Promise.reject('Error'),
    Promise.resolve('Success'),
]).then(res => console.log(res))

//-------------------------------------------------------------------------------------

// Coding Challenge #3

// Your tasks:
// PART 1
// 1. Write an async function 'loadNPause' that recreates Challenge #2, this time 
// using async/await (only the part where the promise is consumed, reuse the 
// 'createImage' function from before)
// 2. Compare the two versions, think about the big differences, and see which one 
// you like more
// 3. Don't forget to test the error handler, and to set the network speed to “Fast 3G”
// in the dev tools Network tab
// PART 2
// 1. Create an async function 'loadAll' that receives an array of image paths 
// 'imgArr'
// 2. Use .map to loop over the array, to load all the images with the 
// 'createImage' function (call the resulting array 'imgs')
// 3. Check out the 'imgs' array in the console! Is it like you expected?
// 4. Use a promise combinator function to actually get the images from the array �
// 5. Add the 'parallel' class to all the images (it has some CSS styles)
// Test data Part 2: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img3.jpg']. To test, turn off the 'loadNPause' function
// GOOD LUCK �

const wait2 = (seconds) => {
    return new Promise((resolve) => {
        setTimeout(resolve,seconds * 1000)
    })
}

const imgContainer = document.querySelector('.images');

let currentImg;

const createImage2 = (imgPath) => {
    return new Promise((resolve,reject) => {
        const img = document.createElement('img');
        img.src = imgPath;

        img.addEventListener('load',() => {
            imgContainer.append(img);
            resolve(img);
        })

        img.addEventListener('error',() => {
            reject(new Error('Image not found'));
        })
    })
}

const loadNPause = async () => {
    try{
        await createImage2('img/img-1.jpg');
     
        await wait2(2).then(() => {
            imgContainer.innerHTML = '';
            imgContainer.style.display = 'none'
        })
        await wait2(2)
        
        await createImage2('img/img-2.jpg').then(imgContainer.style.display = 'block');

    } catch(err) {
        console.error(err);
    }
}

loadNPause()


