// The mothership strategy parameters
interface IBaseStrategy {
    name : string,
    probability : number,
    type : string,
    steps:ITimelineRecord[]
}
interface ITimelineRecord{
    date:string,
    name:string,
    description:string
}
interface IMothershipStrategy extends IBaseStrategy {
    type : "MOTHERSHIP",
    ecc : string
}
interface IDripAndShipStrategy extends IBaseStrategy {
    type : "DRIPANDSHIP",
    ecc : string,
    necc : string
}
type IStrategy = IDripAndShipStrategy | IMothershipStrategy
export {IMothershipStrategy,IDripAndShipStrategy,IStrategy}

