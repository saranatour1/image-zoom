import { MapContainer, ImageOverlay } from "react-leaflet";
import "./App.css";
import "leaflet/dist/leaflet.css";
import { Suspense, useRef } from "react";
import { CRS } from "leaflet";
import useImageSize from "./hooks/useImageSize";

function App() {
  const image = useRef("https://unsplash.com/photos/-hI5dX2ObAs/download");
  const { width, height } = useImageSize({ imageUrl: image.current });

  return (
    <>
      <Suspense fallback={<p>Loading ..</p>}>
        {height !== 0 && width !== 0 && (
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
              url={image.current}
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
