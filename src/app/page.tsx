import Banner from "./_compponents/Banner";
import StudioCategories from "./_compponents/StudioCategories";
import HostGuarantee from "./_compponents/HostGuarantee";
import Feature from "./_compponents/Feature";
import HowItWorks from "./how-it-works/page";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Banner/>
     <Suspense fallback={<p>Loading...</p>}>
       <Feature></Feature>
     </Suspense>
      <StudioCategories/>
      <HowItWorks />
      <HostGuarantee/>
    </div>
  );
}
