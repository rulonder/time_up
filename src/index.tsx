import * as React from "react";
import * as ReactDOM from "react-dom";
import {Footer} from './components/Footer'
import {Content} from './components/Content'
import {store} from './store'
import {updateLocation} from './utils/geolocationProvider'
import {IState} from "./utils/Istore"
import {updateStrategies} from './utils/strategyProvider'
import {estimatedDistance} from "./utils/distanceProvideGoogle"
import {clearStrategies, setStrategies} from "./actions/strategies"
import {setLocation, setLocationStatus} from "./actions/location"
import {setLoadingStatus} from "./actions/loading"

const refresh = () => {
    const isLoading = store
        .getState()
        .loading
        .value
    // do not update if already loading
    if (!isLoading) {
        // const distanceEstimator =
        // estimatedDistance(store.getState().location.value,60)
        const distanceEstimator = estimatedDistance(store.getState().location.value)
        // init location service
        updateStrategies(distanceEstimator, setStrategies, setLoadingStatus)
    }
}

const render = () => {
    const state : IState = store.getState()
    ReactDOM.render((
        <div className='full'>
            <div className='colWrapper'>
                <div className='middleExpandable'>
                    <Content
                        strategies={state.strategies}
                        loading={state.loading.value}
                        location={state.location.value}/>
                </div>
            </div>
            <div className='footer'>
                <Footer refresh={refresh} status={state.location.status}/>
            </div>
        </div>
    ), document.getElementById('root'))
}

// init location service
updateLocation(setLocation, setLocationStatus)

render()
// very unefficient but valid for this simple app
store.subscribe(render)