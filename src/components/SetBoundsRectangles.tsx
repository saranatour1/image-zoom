import { LatLngBoundsExpression } from "leaflet"
import { useMemo, useState } from "react"
import { Rectangle, useMap } from "react-leaflet"
import Point from "./Point"

  const redColor = { color: 'red' }
  const whiteColor = { color: 'white' }
  
  interface FormData {
    point1: number;
    point2: number;
    point3: number;
    point4: number;
}
  interface Props{
    width: number;
    height:number;
    points?:FormData;
  }


  function SetBoundsRectangles({width, height , points}:Props) {
    

    
    return (
      <>
        {allBounds.map((item,idx)=>
          <Point
            key={idx}
            bounds={item}
            active={bounds === item}
            setBounds={setBounds}
          />
        )}
        
      </>
    )
  }

  export default SetBoundsRectangles;