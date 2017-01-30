import * as React from "react";
import {IStrategy} from '../utils/IStrategies'
import {VerticalTimeLine} from "./VerticalTimeLine"
export interface Iprop{
    strategy:IStrategy
}
    const divStyle = {
        padding: '5px',
        "margin-bottom": "10px",
        "box-shadow": "5px 5px 9px 1px rgba(0,0,0,0.4)"
    };
export const Strategy=(props:Iprop)=>{
    const strat = props.strategy
    return(
        <li>
            <div className="media" >
                <div className="media-body brdr--light-gray" style={divStyle}>
                    <h4 className="m0 p0">
                        {strat.name}              
                    </h4>
                    <p className="m0 p0">
                        Probaility is {strat.probability} 
                    </p>
                    <VerticalTimeLine records={strat.steps} ></VerticalTimeLine>
                </div>
            </div>
        </li>
)}
