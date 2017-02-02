import {IStrategy} from "./IStrategies"
import{IPosition}from"./ILocation"

export interface IState {
    location:IPosition,
    strategies: {values:IStrategy[]},
    loading:{value:boolean},
}