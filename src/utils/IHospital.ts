  // base hospital
interface IHospitalBase {
    name : string,
    position : {
        lng: number,
        lat: number
    }
}
// the Ecc hospital definition
interface Iecc extends IHospitalBase{
    door2Groin : number
}
// the non Ecc hospital definition
interface Inecc extends IHospitalBase{
    door2Needle : number,
    needle2Door : number
}

export {Iecc,Inecc}