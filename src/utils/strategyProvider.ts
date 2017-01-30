import {getHospitals} from "./firebaseDB"
import {probMotherShip, probDripAndShip} from "./strokeProbabilities"
import {Iecc,Inecc} from "./IHospital"
import {IMothershipStrategy,IDripAndShipStrategy,IStrategy} from "./IStrategies"
import {IDBLocation} from "./ILocation"
import * as _ from "lodash"

export {updateStrategies,IDistanceDescription,IDistanceProvider}

interface IDistanceDescription {
    distance : number,
    time : number
}

interface IDistanceProvider {
    distanceTo : (location : IDBLocation) => Promise<IDistanceDescription>,
    distanceBetween : (from : IDBLocation, to : IDBLocation) => Promise<IDistanceDescription>
}

async function updateStrategies<T extends IDistanceProvider>(distanceProvider : T, strategyStorer:(x:(IDripAndShipStrategy|IMothershipStrategy)[])=>void, setLoadingStatus:(x:boolean)=>void){
    setLoadingStatus(true)
    getHospitals().then((snapshot) => {
        const eccHospitals = snapshot.val()['ecc'] as Iecc[];
        const neccHospitals = snapshot.val()['necc'] as Inecc[];
        computeStrategies(eccHospitals,neccHospitals,distanceProvider).then((strategies)=>{
        // update the store
            strategyStorer(strategies)
            setLoadingStatus(false)
        })
    })
}

async function generateCombination<T1 extends Iecc, T2 extends Inecc,T extends IDistanceProvider>(ecc : T1, necc : T2, distanceProvider : T) {
    const nEcc2Ecc = await distanceProvider.distanceBetween(ecc.position,necc.position)
    return Object.assign({},{ecc: ecc, necc: necc},{nEcc2Ecc})
}

async function addDistance<T1 extends Iecc|Inecc,T extends IDistanceProvider>(hospital : T1, distanceProvider : T){
    const distance = await distanceProvider.distanceTo(hospital.position)
    return Object.assign({},hospital,{distance})
}

async function computeStrategies<T extends IDistanceProvider>(ecc : Array < Iecc >, necc : Array < Inecc >, distanceProvider : T) {
    // compute distances
    const eccWithDistance = await Promise.all(ecc.map( async (x)=>await addDistance(x,distanceProvider)))
    const neccWithDistance = await Promise.all(necc.map(async (x)=>await addDistance(x,distanceProvider)))
    // for each hospital get the distances
    const combinations = await Promise.all(eccWithDistance.map(x => neccWithDistance.map(async (y) => await generateCombination(x,y,distanceProvider))).reduce((x, y) => x.concat(y), []))
    // get mothership estrategy probabilities
    const mothershipProbabilities:IMothershipStrategy[] = eccWithDistance.map(hospital => {
        const prob = probMotherShip(hospital.distance.time, hospital.door2Groin)
        const strategy:IMothershipStrategy = {
            ecc: hospital.name,
            name: "Mothership to "+hospital.name,
            probability: prob,
            steps:[{name:hospital.name,date:Math.floor(hospital.distance.time)+"minutes",description:"Mothership"}],
            type:"MOTHERSHIP"
        }
        return strategy
    })
    // get the drip and ship strategy probabilites
    const dripAndShipProbabilities = combinations.map(combination => {
        const time2NECC = combination.necc.distance.time
        const nECC2ECC = combination.nEcc2Ecc.time
        const door2Needle = combination.necc.door2Needle
        const needle2Door = combination.necc.needle2Door
        const door2Groin = combination.ecc.door2Groin
        const prob = probDripAndShip(time2NECC, nECC2ECC, door2Needle, needle2Door,door2Groin)
        const time2Ecc = time2NECC + nECC2ECC + door2Needle + needle2Door;
        const strategy:IDripAndShipStrategy = {
            ecc: combination.ecc.name,
            necc: combination.necc.name,
            name: "Drip and ship through "+combination.necc.name+" to "+combination.ecc.name,
            steps:[
                {name:combination.necc.name,date:Math.floor(time2NECC)+"minutes",description:"Drip"},
                {name:combination.ecc.name,date:Math.floor(time2Ecc)+"minutes",description:"Ship"},
                ],
            probability: prob,
            type:"DRIPANDSHIP"
        }
        return strategy        
    })
    // order strategies
    const result = _.concat<(IDripAndShipStrategy|IMothershipStrategy)>(dripAndShipProbabilities,mothershipProbabilities)
    return _.sortBy(result,'probablilty',).reverse()
}