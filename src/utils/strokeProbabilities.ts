// This module handles the probabilities computations as described in the paper
// "Drip and Ship Versus Direct to Comprehensive Stroke Center, Conditional
// Probability Modeling" Reference values
const REPERFUSION = 30
const POST_ALTEPLASE = 70
const AMBULANCE2MEDICAL = 30
// probability model for the mothership model, times in minutes
export const probMotherShip = (time2ECC : number, door2Groin : number) => {
    return 0.74 * (0.75 - 0.0006 * (AMBULANCE2MEDICAL + time2ECC + door2Groin + REPERFUSION)) + 0.26 * 0.30
}
// probability model for the drip and ship model, times in minutes
export const probDripAndShip = (time2NECC : number, nECC2ECC : number, door2Needle : number, needle2Door : number, door2Groin : number) => {
    return 0.18 * (0.75 - 0.0006 * (AMBULANCE2MEDICAL + time2NECC + door2Needle + needle2Door + POST_ALTEPLASE)) + 0.82 * (0.74 * (0.75 - 0.0006 * (AMBULANCE2MEDICAL + time2NECC + door2Needle + needle2Door + nECC2ECC + door2Groin + REPERFUSION)) + 0.26 * 0.30)
}

// test values
const door2Groin = 90
// nECC values
const door2Needle = 60
const needle2Door = 15
