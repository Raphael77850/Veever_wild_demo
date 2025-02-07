import type { Chr } from "../../types/Provider/ProviderType";

export default function DescriptionProvider({ chr }: { chr: Chr }) {
  return (
    <article className="descriptionProvider">
      <h2>À propos</h2>
      <p>{chr.description}</p>
    </article>
  );
}
