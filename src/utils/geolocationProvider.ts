import {ILocation} from "./ILocation"

export {updateLocation}

// Default location at Puerta del Sol
let DEFAULT_LOCATION = {
    longitude: -3.703015,
    latitude: 40.4169325
}

/**
 *  update the location 
 */
function updateLocation (updateLocationStore : (x : ILocation) => void, setStatus : (x : string) => void) {
    // set default value
    setStatus("ERROR")
    updateLocationStore(DEFAULT_LOCATION)
    // retrieve location from geolocation service
    if ("geolocation" in navigator) {
        /* geolocation is available */
        navigator
            .geolocation
            .getCurrentPosition((position)=>{
                updateLocationStore(position.coords)
                setStatus("OK")
            }, () => {
                setStatus("ERROR")
            });
        navigator
            .geolocation
            .watchPosition((position)=>{
                updateLocationStore(position.coords)
                setStatus("OK")
            }, () => {
                setStatus("ERROR")
            })
    } else {
        /* geolocation IS NOT available */
        updateLocationStore(DEFAULT_LOCATION)
    }
}
