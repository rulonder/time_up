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
                    <h3 className="fnt--dark-gray">
                        {strat.name}              
                    </h3>
                    <p className="fnt--mid-gray">
                        Probaility is {strat.probability.toFixed(4)} 
                    </p>
                    <VerticalTimeLine records={strat.steps} ></VerticalTimeLine>
                </div>
            </div>
        </li>
)}
