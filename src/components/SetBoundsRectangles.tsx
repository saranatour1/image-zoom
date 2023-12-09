import { LatLngBoundsExpression } from "leaflet"
import { useMemo, useState } from "react"
import { Rectangle, useMap } from "react-leaflet"

const innerBounds:LatLngBoundsExpression = [
    [49.505, -2.09],
    [53.505, 2.09],
  ]
  const outerBounds:LatLngBoundsExpression = [
    [50.505, -29.09],
    [52.505, 29.09],
  ]
  
  const redColor = { color: 'red' }
  const whiteColor = { color: 'white' }
  
  function SetBoundsRectangles() {
    const [bounds, setBounds] = useState(outerBounds)
    const map = useMap()
  
    const innerHandlers = useMemo(
      () => ({
        click() {
          setBounds(innerBounds)
          map.fitBounds(innerBounds)
        },
      }),
      [map],
    )
    const outerHandlers = useMemo(
      () => ({
        click() {
          setBounds(outerBounds)
          map.fitBounds(outerBounds)
        },
      }),
      [map],
    )
  
    return (
      <>
        <Rectangle
          bounds={outerBounds}
          eventHandlers={outerHandlers}
          pathOptions={bounds === outerBounds ? redColor : whiteColor}
        />
        <Rectangle
          bounds={innerBounds}
          eventHandlers={innerHandlers}
          pathOptions={bounds === innerBounds ? redColor : whiteColor}
        />
      </>
    )
  }

  export default SetBoundsRectangles;