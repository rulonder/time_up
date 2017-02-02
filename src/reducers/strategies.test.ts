import test from "ava"
import {strategies} from "./strategies"
import {IStrategy} from "../utils/IStrategies"
test('test strategies update',(t)=>{
    const OK = "OK" as "OK"
    const strategy:IStrategy={
        ecc:"Gregorio",
        name:"test hospital",
        probability:0.1,
        type:"MOTHERSHIP",
        steps:[]
    }
    const beforeState= {
        strategies:[],
        location:{longitude:2,latitude:3},
        statusLocation:OK,
        loading:true
    }
    const expectedState= {
        strategies:[strategy],        
        location:{longitude:2,latitude:3},
        statusLocation:OK,
        loading:true
    }
    const action= {
        values:[strategy],
        type:"SET_STRATEGIES" as "SET_STRATEGIES"
    }        
    const afterState = strategies(beforeState,action)
    t.deepEqual(expectedState,afterState)
})