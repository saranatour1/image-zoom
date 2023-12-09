import { LatLngBoundsExpression } from "leaflet";
import {  useEffect } from "react";
import { Rectangle, useMap } from "react-leaflet";

const whiteColor = { color: 'red' }
interface Props {
    bounds:LatLngBoundsExpression;
    active?: boolean;
    setBounds?: ()=>void ;
    otherBounds?: LatLngBoundsExpression;
}


function Point({bounds}:Props) {
    const map = useMap()
    
    useEffect(()=>{
        if(bounds){
          map.fitBounds(bounds)
        }
    },[bounds])


    return (
        <Rectangle
          bounds={bounds}
          pathOptions={whiteColor}
          
        />
    );
}

export default Point;