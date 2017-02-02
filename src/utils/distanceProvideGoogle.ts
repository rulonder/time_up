import {IDistanceProvider, IDistanceDescription} from "./strategyProvider"
import {ILocation, IDBLocation} from "./ILocation"
import * as google from 'google'

const directionsService = new google
    .maps
    .DirectionsService()

const distanceBetween = async(loc1 : IDBLocation, loc2 : IDBLocation) => {
    const from = new google
        .maps
        .LatLng(loc1.lat, loc1.lng);
    const destination = new google
        .maps
        .LatLng(loc2.lat, loc2.lng);
    const request = {
        origin: from,
        destination: destination,
        travelMode: 'DRIVING'
    };
    return new Promise < IDistanceDescription > (async(resolve, reject) => {
        await timeout(Math.random() * 2000)
        directionsService.route(request, function (response : any, status : string) {
            if (status == 'OK') {
                const result : IDistanceDescription = response
                    .routes[0]
                    .legs
                    .map((a) => ({
                        distance: a.distance.value / 1000.0,
                        time: a.duration.value / 60.0
                    }))
                    .reduce((a, b) => ({
                        distance: (a.distance + b.distance),
                        time: (a.time + b.time)
                    }), {
                        distance: 0,
                        time: 0
                    })
                resolve(result);
            } else {
                reject(status);
            }
        });
    });

}

function timeout(ms : number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function estimatedDistance(location : ILocation) : IDistanceProvider {
    const loc: IDBLocation = {
        lat: location.latitude,
        lng: location.longitude
    }
    const result: IDistanceProvider & {
        loc: IDBLocation
    } = {
        loc,
        distanceBetween: (x, y) => {
            return distanceBetween(x, y)
        },
        distanceTo: (x) => {
            return distanceBetween(loc, x)
        }
    }
    return result
}

export {estimatedDistance}
