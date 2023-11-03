import {ref} from "vue";
import {background, locName, store} from "@/assets/Weather";

export const name = ref();
export const locError = ref();
// const fetchForeCast = await fetchForecast().then(resp => resp);
export const storeForecast = ref();
export const complete = ref(false);
/*
export const storeForecast = ref();*/

export async function fetchForecast() {
    return fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + name.value + '&appid=f1f6e4be70999f85c9de0ab1d2601006&units=metric')
        .then(resp => {if(!resp.ok){
            return new Error("Couldn't find location, try again!");
        }
        return resp.json();
        })
        .catch(error => {
            console.log('error', error);
        });/*.then(resp => {
            storeForecast.value = resp,
            console.log('store', storeForecast.value);})*/
}



navigator.geolocation.getCurrentPosition(showPosition);

async function showPosition(position: GeolocationPosition){
    complete.value = false;
    const response = await fetch(
        'https://api.openweathermap.org/data/2.5/forecast?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&appid=f1f6e4be70999f85c9de0ab1d2601006&units=metric'
    )
        .then(resp => {
            if (!resp.ok) {
                locError.value = "Couldn't find location, try again!";
                return new Error("Couldn't find location, try again!");
            }
            locError.value = undefined;
            return resp.json();
        })
        .catch(error => {
            console.log('error', error);
        });

    console.log('response', response);
    storeForecast.value = response;
    complete.value = true;
    console.log('store', storeForecast.value);
    console.log('store in fetch', storeForecast.value);
}


/*fetch('https://api.openweathermap.org/data/2.5/forecast?lat=48.2433&lon=16.356&appid=f1f6e4be70999f85c9de0ab1d2601006')
        .then(resp => { resp.json(),
            console.log(resp);
            return resp;
            console.log(resp);
        });*/




export function getForecast(){
const time = ref();
fetchForecast().then(response => { if( !(response instanceof Error) ) {storeForecast.value = response,
                                                                       locError.value = undefined,
                                                                       name.value = undefined}
                                                                       else {
                                                                           locError.value = response.message,
                                                                           name.value = undefined;
                                                                       }
                                                                       console.log(locError.value)});

}
