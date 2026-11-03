import FeaturedStudios, { Istudio } from "./FeaturedStudios";

const Feature = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/features`);

  if (!res.ok) {
    throw new Error("Failed to fetch studios");
  }

  const data: Istudio[] = await res.json();

  return <FeaturedStudios studios={data} />;
};

export default Feature;