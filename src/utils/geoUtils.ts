function toRad(x:number) {
   return x * Math.PI / 180
}

export function distance_harver(p1:Array<number>,p2:Array<number>){
    const lat2 = toRad(p2[1]) 
    const lon2 = toRad(p2[0]) 
    const lat1 = toRad(p1[1]) 
    const lon1 = toRad(p1[0])
    const R = 6371.0 // km 
    const dLat = lat2-lat1
    const dLon = lon2-lon1 
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                Math.cos(lat1) * Math.cos(lat2) * 
                Math.sin(dLon/2) * Math.sin(dLon/2);  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
}
