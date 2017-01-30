import {IStrategy} from "../utils/IStrategies"

type IACTIONSET = "SET_STRATEGIES"
type IACTIONCLEAR = "CLEAR_STRATEGIES"
const ACTIONSET :IACTIONSET= "SET_STRATEGIES"
const ACTIONCLEAR :IACTIONCLEAR = "CLEAR_STRATEGIES"

export {strategies,IActionClear,IActionSet}

type IAction = IActionClear|IActionSet

function strategies (state:any={values:[]},action:IAction){
    switch(action.type ){
    case"SET_STRATEGIES":
        return ({
            ...state,
            values : action.values,
        })    
    case "CLEAR_STRATEGIES":
        return ({
            ...state,
            values : []
        })
    default:
        return state
    } 
}

interface IActionSet {
    type:IACTIONSET,
    values:IStrategy[]
}
interface IActionClear {
    type:IACTIONCLEAR
}



