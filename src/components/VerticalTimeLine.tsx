import * as React from "react";

interface ITimelineRecord{
    date:string,
    name:string,
    description:string
}

interface ITimeLine{
    records:ITimelineRecord[]
}

export const VerticalTimeLine=<T extends ITimeLine>(props:T)=>{
    return(
<section className={"timeline"}>
  <ul>
    {props.records.map(x=>(
    <li>
      <div>
        <h5>{x.date}</h5>         
        {x.name}
      </div>
    </li>
    ))}
    </ul>
</section>
)}