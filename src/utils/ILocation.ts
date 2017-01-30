export {ILocation,IPosition,IDBLocation}

interface ILocation {
    latitude : number,
    longitude : number
}

interface IPosition {
    value:ILocation,
    status:"ERROR"|"OK"
}

interface IDBLocation{
    lat:number,
    lng:number
}