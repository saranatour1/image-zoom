import { MapContainer, ImageOverlay, Rectangle } from "react-leaflet";
import "./App.css";
import "leaflet/dist/leaflet.css";
import { Suspense, useEffect, useRef, useState } from "react";
import { CRS, LatLngBoundsExpression } from "leaflet";
import "./components/Form.css";

function App() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [image, setImage] = useState("https://unsplash.com/photos/-hI5dX2ObAs/download");

  useEffect(() => {
    const imgaeToBeLoaded = new Image();
    imgaeToBeLoaded.src = image;
    imgaeToBeLoaded.onload = () => {
      setHeight(imgaeToBeLoaded.height);
      setWidth(imgaeToBeLoaded.width);
    };
  }, [image]);

  const allBounds: LatLngBoundsExpression[] = [
    [
      [0, 0],
      [2500, 5200],
    ],
  ];

  const [bounds, setBounds] = useState<LatLngBoundsExpression | null>(allBounds[0]);

  useEffect(() => {
    console.log(bounds, "main", allBounds.indexOf(bounds as LatLngBoundsExpression));
  }, [bounds, allBounds]);

  return (
    <>
      <Suspense fallback={<p>Loading ..</p>}>
        {height != 0 && width != 0 && (
          <MapContainer
            center={[height, width]}
            zoom={-2}
            maxBoundsViscosity={1.0}
            maxBounds={[
              [0, 0],
              [height, width],
            ]}
            dragging={true}
            zoomControl={true}
            style={{ minHeight: "100vh", position: "static" }}
            scrollWheelZoom={false}
            minZoom={-1.8}
            crs={CRS.Simple}
            attributionControl={false}
          >
            <ImageOverlay
              url={image}
              bounds={[
                [0, 0],
                [height, width],
              ]}
            />
          </MapContainer>
        )}
      </Suspense>
    </>
  );
}

export default App;
