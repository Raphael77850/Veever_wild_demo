import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import type { Chr } from "../../types/Provider/ProviderType";
import "./Provider.css";
import DescriptionProvider from "../../components/Provider/DescriptionProvider";
import PhotosProvider from "../../components/Provider/PhotosProvider";
import SummaryProvider from "../../components/Provider/SummaryProvider";

export default function Provider() {
  const navigate = useNavigate();
  const chr = useLoaderData() as Chr;
  const [photosToDisplay, setPhotosToDisplay] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    try {
      const filteredPhotos = filterPhotosByDevice(chr.images, isMobile);
      setPhotosToDisplay(filteredPhotos);
    } catch (error) {
      setError("Erreur lors de la récupération des photos.");
    } finally {
      setLoading(false);
    }
  }, [chr.images]);

  const filterPhotosByDevice = (
    images: { link: string }[],
    isMobile: boolean,
  ): string[] => {
    return images
      .filter(
        (image) =>
          (isMobile && image.link.includes("mobile")) ||
          (!isMobile && image.link.includes("desktop")),
      )
      .map((image) => image.link);
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  if (!chr) return <p>Aucun prestataire trouvé.</p>;

  return (
    <section className="provider">
      <button type="button" onClick={() => navigate(-1)}>
        ← Retour
      </button>
      <PhotosProvider chr={chr} photosToDisplay={photosToDisplay} />
      <h1>{chr.name}</h1>
      <SummaryProvider chr={chr} />
      <DescriptionProvider chr={chr} />
    </section>
  );
}
