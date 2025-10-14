import ItineraryCard from "./ItineraryCard.tsx";
const itineraries = [
  {
    id: 1,
    title: "Séjour en couple",
    imageSrc: "../assets/images/hotel-piscine.jpg",
  },
  {
    id: 2,
    title: "Séjour entre amis",
    imageSrc: "../assets/images/musee.jpg",
  },
  {
    id: 3,
    title: "Séjour en famille",
    imageSrc: "../assets/images/hdv-bdx.jpg",
  },
];

const ItinerarySection = () => {
  const handleReserve = (title: string) => {
    alert(`Réservation de l'itinéraire ${title}`);
  };

  return (
    <section className="itineraries-section">
      <h2 className="section-title">Itinéraires du moment</h2>
      <article className="cards-container">
        {itineraries.map((item) => (
          <ItineraryCard
            key={item.id}
            title={item.title}
            imageSrc={item.imageSrc}
            onReserve={() => handleReserve(item.title)}
          />
        ))}
      </article>
    </section>
  );
};

export default ItinerarySection;
