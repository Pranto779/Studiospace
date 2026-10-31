import Image from "next/image";
import Banner from "./_compponents/Banner";
import FeaturedStudios from "./_compponents/FeaturedStudios";
import StudioCategories from "./_compponents/StudioCategories";
import HostGuarantee from "./_compponents/HostGuarantee";
import Footer from "./_compponents/Footer";
import Feature from "./_compponents/Feature";

export default function Home() {
  return (
    <div>
      <Banner/>
      <Feature></Feature>
      <StudioCategories/>
      <HostGuarantee/>
      <Footer/>

    </div>
  );
}
