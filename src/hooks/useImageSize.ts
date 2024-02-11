import { useEffect, useState } from "react";
interface Props {
  imageUrl?: string | undefined;
}

function useImageSize({ imageUrl = "https://unsplash.com/photos/-hI5dX2ObAs/download" }: Props) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    let isMounted = true;

    if (imageUrl) {
      const image = new Image();
      image.src = imageUrl;

      const loadImage = () => {
        if (isMounted) {
          setDimensions({ width: image.width, height: image.height });
        }
      };

      image.onload = loadImage;

      return () => {
        isMounted = false;
        image.onload = null;
      };
    }

    return () => {
      isMounted = false;
    };
  }, [imageUrl]);

  return { width: dimensions.width, height: dimensions.height };
}

export default useImageSize;
