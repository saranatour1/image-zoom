import { useEffect, useRef } from "react";

interface Props {
  containerRef: HTMLDivElement;
  idx: number;
  setBounds: (i: number) => void;
  item: string;
}

function PointToObserve({ containerRef, idx, setBounds, item }: Props) {
  const pointRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const pointObserverOptions = { root: containerRef, threshold: 0.05 };

    const videoObserver = new IntersectionObserver((event) => {
        console.log(event, "hf")
      if (event[0].isIntersecting && event[0].intersectionRatio >= 0.045095) {
        setBounds(idx);
      }
      // console.log(event[0].isIntersecting)
    }, pointObserverOptions);

    videoObserver.observe(pointRef.current!);
  }, []);

  return (
    <div
      ref={pointRef}
      style={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        placeContent: "center",
        scrollSnapAlign: "start",
      }}
    >
      <h1>{item}</h1>
    </div>
  );
}

export default PointToObserve;
