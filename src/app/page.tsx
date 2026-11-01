import Banner from "./_compponents/Banner";
import StudioCategories from "./_compponents/StudioCategories";
import HostGuarantee from "./_compponents/HostGuarantee";
import Feature from "./_compponents/Feature";
import HowItWorks from "./how-it-works/page";

export default function Home() {
  return (
    <div>
      <Banner/>
      <Feature></Feature>
      <StudioCategories/>
      <HowItWorks />
      <HostGuarantee/>
    </div>
  );
}
