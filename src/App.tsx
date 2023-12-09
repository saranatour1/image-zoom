import { MapContainer, TileLayer, useMap ,Marker, Popup, MapContainerProps, ImageOverlay } from 'react-leaflet'
import './App.css'
import "leaflet/dist/leaflet.css"
import { useEffect, useRef } from 'react';
import { CRS ,Map} from 'leaflet';

function App() {
  const mapRef = useRef<Map|null>(null);
  const width = 5200;
  const height = 2500;

  useEffect(()=>{

  },[])



  return (
<MapContainer center={[width,height]}  zoom={-2}  maxBoundsViscosity={1.0}  maxBounds={[[0, 0], [height, width]]}
dragging={false}
zoomControl={false}
        style={{ height: "100vh" }} scrollWheelZoom={false} ref={mapRef} minZoom={-1.8}  crs={CRS.Simple} attributionControl={false}>
  <ImageOverlay url='https://unsplash.com/photos/-hI5dX2ObAs/download' bounds={[[0, 0], [height, width]]}  />
  {/* <SetBoundsRectangles/> */}
</MapContainer>
  )
}

export default App
