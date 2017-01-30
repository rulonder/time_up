import test from "ava"
import {location} from './location'

test('test location update',(t)=>{
    const OK = "OK" as "OK"
    const beforeState= {
        value:{longitude:2,latitude:3},
        status:"ERROR" as "ERROR"
    }
    const expectedState= {
        value:{longitude:1,latitude:0},
        status:"ERROR" as "ERROR"
    }
    const action= {
        location:{longitude:1,latitude:0},
        type:"SET_LOCATION" as "SET_LOCATION"
    }        
    const afterState = location(beforeState,action)
    t.deepEqual(expectedState,afterState)
})