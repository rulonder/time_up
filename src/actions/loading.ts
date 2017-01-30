import {store} from '../store'
import {ISetStatusAction} from '../reducers/loading'
export {setLoadingStatus}

function setLoadingStatus(loading:boolean){
    const action : ISetStatusAction = {
        type: "SET_LOADING_STATUS",
        loading
    }
    store.dispatch(action);
}
