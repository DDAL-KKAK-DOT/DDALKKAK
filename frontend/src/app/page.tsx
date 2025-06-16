import HeroSection from "./main/components/HeroSection/HeroSection";
import FeaturesSection from "./main/components/FeaturesSection/FeaturesSection";
import DefaultLayout from "@/components/layout/DefaultLayout";
import Footer from "@/components/Footer/Footer";

export default function Main() {
  return (
    <DefaultLayout>
      <main className="space-y-24 pb-24">
        <HeroSection />
        <FeaturesSection />
      </main>
      <Footer />
    </DefaultLayout>
  );
}
