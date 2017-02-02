import {location} from './reducers/location'
import {strategies} from './reducers/strategies'
import {loading} from "./reducers/loading"
import {createStore,combineReducers,compose,applyMiddleware} from "redux"
import {IStrategy} from "./utils/IStrategies"
import {IState } from "./utils/IStore"


const reducers = combineReducers<IState>({
    location,
    loading,
    strategies
})

interface MyWindow extends Window {
    devToolsExtension:Function;
}
declare var window: MyWindow;
// Add the dev tools for redux debuging
const store = createStore<IState>(reducers,{strategies:{values:[]},location:{value:{latitude:0.0,longitude:0.0},status:"ERROR"},loading:{value:false}}, 
  compose(window.devToolsExtension ? window.devToolsExtension() : (f:any) => f))

export {store}
