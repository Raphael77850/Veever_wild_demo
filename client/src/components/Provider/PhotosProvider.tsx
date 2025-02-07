import { useState } from "react";
import type { Chr } from "../../types/Provider/ProviderType";
import PhotoModal from "./PhotoModal";

export default function PhotosProvider({
  chr,
  photosToDisplay,
}: { chr: Chr; photosToDisplay: string[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="imageGroup">
      {chr &&
        chr.images.length > 0 &&
        photosToDisplay.map((image, index) => (
          <button
            key={`${chr.name} ${index}`}
            type="button"
            onClick={() => handleImageClick(image)}
          >
            <img
              src={`${import.meta.env.VITE_IMAGE_URL}/${image}`}
              alt={chr.name}
            />
          </button>
        ))}
      {selectedImage && (
        <PhotoModal imageSrc={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  );
}
