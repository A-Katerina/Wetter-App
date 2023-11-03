// @ts-ignore
import {computed, ref, watch} from 'vue';
export interface Weather{clouds: {all: number},
                        wind: {speed: number},
                        name: string,
                        main: {temp: number},
                        weather: [{description: string, icon: string, id: number}]
                    }

const key = '4467c4cc8f7179f171230e647dc618c5';


export const name = ref();
export const locName = ref();
export const background = ref();
export const lon = ref();
export const lat = ref();
// export const inputName = ref();
//
// export function focusInput(){
//     console.log(inputName.value);
//     inputName.value.focus();
// }

const options = {
    enableHighAccuracy: true,
};


    function error() {
        alert('Please allow location access to continue using this site! ');
    }

navigator.geolocation.getCurrentPosition(showPosition, error, options);
export const store = ref<Weather>();
async function showPosition(position: GeolocationPosition){

    const response = await fetch(
        'https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&appid=f1f6e4be70999f85c9de0ab1d2601006&units=metric'
    )
        .then(resp => {
            if (!resp.ok) {
                locError.value ="Couldn't find location, try again!";
                return new Error("Couldn't find location, try again!");
            }
            locError.value = undefined;
            return resp.json();
        })
        .catch(error => {
            console.log('error', error);
        });

    console.log('response', response);
    store.value = response;
    locName.value = store.value?.name;
    console.log('store', store.value);
    console.log('store in fetch', store.value);
    background.value = store.value?.weather[0].id;
    console.log('bg', background.value);
}

function getCoords(): Promise<GeolocationPosition> {
    return new Promise(function(resolve, reject){
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })
}

export const test = ref();
export const test2 = ref();

navigator.geolocation.getCurrentPosition(async pos => {
   test.value = await pos.coords.latitude;
})

console.log('test', test.value);

navigator.geolocation.getCurrentPosition(pos => { test2.value = pos.coords.latitude});
console.log('test2', test2.value);

const position = await getCoords();
// @ts-ignore
const latitude = position.coords.latitude;
function setCoords(){
    lat.value = position.coords.latitude;
}

setCoords();
console.log('set coordinates', lat.value);
console.log('promise lat', latitude);

function coordinates(geoLocLat: number, geoLocLon: number){
    lat.value = geoLocLat;
    lon.value = geoLocLon;

}

navigator.geolocation.getCurrentPosition((position) => {
    coordinates(position.coords.latitude, position.coords.longitude);
    console.log('ausgabe lat', lat.value);
});


const coord = computed(() => {
    navigator.geolocation.getCurrentPosition(position => {
        lat.value = position.coords.latitude;
        return lat.value;
    });
})

export const locError = ref();

/*
function checkName() {
    if (name.value) { /!*name.value != undefined*!/
        return name.value;
    } else {
    navigator.geolocation.getCurrentPosition(resp => console.log(resp));
/!*    name.value = 'Vienna'*!/
        return 'Vienna';
    }
}
*/

export async function fetchWeatherData() {

    return fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=' + name.value + '&appid=f1f6e4be70999f85c9de0ab1d2601006&units=metric'
    )
        .then(resp => {
            if (!resp.ok) {
                return new Error("Couldn't find location, try again!");
            }
            return resp.json();
        })
        .catch(error => {
            console.log('error', error);
        });
}


/*async function fetchYesNo(){
    return fetch ('https://yesno.wtf/api').then(resp => {return resp.json()});

}

const abc = await fetchYesNo().then(resp => resp);
const a = ref(abc.answer);

console.log(a.value);*/

const x = ref(10)
const y = ref(30)

watch(
    () => x.value + y.value,
    (sum) => {
        console.log(`sum of x + y is: ${sum}`)
    }
)


/*export function checkClouds(bg: number){
    if(bg >= 801 && bg <= 804){
        return true;
    }
}

export function checkAtmosphere(bg: number){
    if(bg >= 701 && bg <= 781){
        return true;
    }
}

export function checkClear(bg: number){
    if(bg == 800){
        return true;
    }
}

export function checkThunderstorm(bg: number){
    if(bg >= 200 && bg <= 232) {
        return true;
    }
}

export function checkSnow(bg: number){
    if(bg >= 600 && bg <= 622){
        return true;
    }
}

export function checkRain(bg: number){
    if(bg >= 300 && bg <= 321 || bg >= 500 && bg <= 531 ){
        return true;
    }
}*/

export function Klasse(bg: number){
    if(bg >= 801 && bg <= 804){
        return 'clouds';
    } else if(bg >= 701 && bg <= 781){
        return 'atmosphere';
    } else if(bg == 800){
        return 'clear';
    } else if(bg >= 200 && bg <= 232) {
        return 'thunderstorm';
    } else if(bg >= 600 && bg <= 622){
        return 'snow';
    } else if(bg >= 300 && bg <= 321 || bg >= 500 && bg <= 531 ){
        return 'rain';
    }
}




