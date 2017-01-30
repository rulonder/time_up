import {store} from '../store'
import {ILocation} from "../utils/ILocation"
import {ISetStatusAction,ISetLocationAction} from '../reducers/location'

export {setLocation,setLocationStatus}

/**
 * set the current location
 * 
 * @param {ILocation} location
 */
function setLocation(location:ILocation){
    const action : ISetLocationAction = {
        type: "SET_LOCATION",
        location
    }
    store.dispatch(action);
}

function setLocationStatus(status:"ERROR"|"OK"){
    const action : ISetStatusAction = {
        type: "SET_STATUS",
        status
    }
    store.dispatch(action);
}
