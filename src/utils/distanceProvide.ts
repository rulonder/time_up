import {IDistanceProvider} from "./strategyProvider"
import {ILocation,IDBLocation} from "./ILocation"
import {distance_harver} from "./geoUtils"

const distanceBetween= async (loc1:IDBLocation,loc2:IDBLocation,meanSpeed:number)=>{
    const p1=[loc1.lng,loc1.lat]
    const p2=[loc2.lng,loc2.lat]
    const distance = distance_harver(p1,p2)
    // time in minutes
    const time = distance/meanSpeed * 60.0
    return {distance,time}
}

function estimatedDistance(location:ILocation, meanSpeed:number){
    const loc:IDBLocation = {lat:location.latitude,lng:location.longitude}
    const speed = meanSpeed
    const result:IDistanceProvider&{loc:IDBLocation,speed:number}={
        loc,
        speed,
        distanceBetween:(x,y)=>{return distanceBetween(x,y,speed)},
        distanceTo:(x)=>{return distanceBetween(loc,x,speed)}
    }
    return result
}

export {estimatedDistance}
