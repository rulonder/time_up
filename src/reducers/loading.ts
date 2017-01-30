import {ILocation,IPosition} from "../utils/ILocation"

interface ISetStatusAction{
    type : "SET_LOADING_STATUS",
    loading: boolean
}

type Iaction =ISetStatusAction

function loading (state:any={value:false},action:Iaction){
    switch(action.type ){
    case "SET_LOADING_STATUS":
        return ({
            ...state,
            value : action.loading
        })
    default:
        return state
    } 
}

export {loading,ISetStatusAction}
