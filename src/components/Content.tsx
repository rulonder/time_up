import * as React from "react";
import { Spinner } from './Spinner'
import {IStrategy} from '../utils/IStrategies'
import {ILocation} from "../utils/ILocation"
import {Strategy} from "./Strategy"
import {VerticalTimeLine} from "./VerticalTimeLine"
import {Map} from "./Map"

interface IContent{
    location:ILocation,
    strategies:{values:IStrategy[]},
    loading:boolean
}
    const divStyle = {
        position: 'fixed',
        width: '100%',
        height: '200px'
    };
// Main display
export const Content = (props: IContent) => {
    if (props.loading == true) {
        return <Spinner />
    } else {
        return (
            <div>
            <div style={divStyle} className='map-holder'>
                <Map initialCenter={props.location} />
            </div>            
                <ul className="list--unstyled venues-list">
                    {props.strategies.values.map((strat) => (<Strategy strategy={strat} />))}
                </ul>
            </div>
        )
    }
}
