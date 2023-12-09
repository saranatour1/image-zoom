import { MapContainer, ImageOverlay, Rectangle } from "react-leaflet";
import "./App.css";
import "leaflet/dist/leaflet.css";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { CRS, LatLngBoundsExpression, Map } from "leaflet";
import "./components/Form.css";

import Point from "./components/Point";
import PointToObserve from "./components/PointToObserve";
function App() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [image, setImage] = useState(
    "https://unsplash.com/photos/-hI5dX2ObAs/download"
  );

  useEffect(() => {
    const imgaeToBeLoaded = new Image();
    imgaeToBeLoaded.src = image;
    imgaeToBeLoaded.onload = () => {
      setHeight(imgaeToBeLoaded.height);
      setWidth(imgaeToBeLoaded.width);
    };
  }, [image]);

  const someText: string[] = [
    "start",
    "Hiiiii 1",
    "Hiiiii 2",
    "Hiiiii 3",
    "Hiiii 4",
    "finish",
  ];

  const innerBounds: LatLngBoundsExpression = [
    [height - 200, width - 200], // y x
    [height - 900, width - 900], // y x
  ];

  const innerBounds1: LatLngBoundsExpression = [
    [height - 1200, width - 200], // y x
    [height - 900, width - 1900], // y x
  ];

  const innerBounds2: LatLngBoundsExpression = [
    [height - 1500, width - 1800], // y x
    [height - 1800, width - 1900], // y x
  ];

  const outerBounds: LatLngBoundsExpression = [
    [height - 1600, width - 1600],
    [-height + 1000, -width + 1000],
  ];

  const allBounds: LatLngBoundsExpression[] = [
    [
      [0, 0],
      [2500, 5200],
    ],
    innerBounds,
    innerBounds1,
    innerBounds2,
    outerBounds,
    [
      [0, 0],
      [2500, 5200],
    ],
  ];

  const [bounds, setBounds] = useState<LatLngBoundsExpression | null>(
    allBounds[0]
  );

  useEffect(() => {
    console.log(bounds, "main" ,allBounds.indexOf(bounds as LatLngBoundsExpression));
  }, [bounds ,allBounds]);

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
            dragging={false}
            zoomControl={false}
            style={{ height: "100vh", position: "fixed", top: 0, left: 0 }}
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

            {bounds && <Point bounds={bounds as LatLngBoundsExpression} />}
          </MapContainer>
        )}

        <div
          ref={containerRef}
          style={{
            margin: 0,
            padding: 0,
            scrollSnapType: "y mandatory",
            overflowY: "auto",
            position: "sticky",
            top: 0,
            left: 0,
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            alignItems: "center",
            justifyContent: "space-evenly",
            flex: 1,
          }}
        >
          {someText.map((item: string, idx: number) => (
            <PointToObserve
              containerRef={containerRef.current as HTMLDivElement}
              idx={idx}
              setBounds={(idx) => setBounds(allBounds[idx])}
              key={idx}
              item={item}
            />
          ))}
        </div>
      </Suspense>
    </>
  );
}

export default App;
