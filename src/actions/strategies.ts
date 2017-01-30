import {store} from '../store'
import {IActionSet, IActionClear} from "../reducers/strategies"
import {IStrategy} from "../utils/IStrategies"

export {setStrategies, clearStrategies}

function setStrategies(strategies : IStrategy[]) {
    const action : IActionSet = {
        type: "SET_STRATEGIES",
        values:strategies
    }
    store.dispatch(action);
}

function clearStrategies() {
    const action : IActionClear = {
        type: "CLEAR_STRATEGIES"
    }
    store.dispatch(action);
}
