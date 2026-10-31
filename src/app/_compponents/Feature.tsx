import FeaturedStudios, { Istudio } from "./FeaturedStudios";

const Feature = async () => {
  const res = await fetch("http://localhost:8000/features");

  if (!res.ok) {
    throw new Error("Failed to fetch studios");
  }

  const data: Istudio[] = await res.json();
console.log(data.length);

  return <FeaturedStudios studios={data} />;
};

export default Feature;