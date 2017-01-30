import {ILocation,IPosition} from "../utils/ILocation"

interface ISetStatusAction{
    type : "SET_STATUS",
    status: "OK"|"ERROR"
}

interface ISetLocationAction {
    type:"SET_LOCATION",
    location:ILocation
}
type Iaction =ISetStatusAction|ISetLocationAction

const location= (state:IPosition={value:{latitude:0.0,longitude:0.0},status:"ERROR"},action:Iaction)=>{
    switch(action.type ){
    case "SET_LOCATION":
        return ({
            ...state,
            value : {latitude:action.location.latitude,longitude:action.location.longitude}
        })
    case "SET_STATUS":
        return({
            ...state,
            status : action.status
        })
    default:
        return state
    } 
}

export {location,ISetStatusAction,ISetLocationAction}

