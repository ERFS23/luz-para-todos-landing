import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MariaStorySection from "@/components/MariaStorySection";
import AlissaSection from "@/components/AlissaSection";
import OfferingsSection from "@/components/OfferingsSection";
import MathSection from "@/components/MathSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <OfferingsSection />
        <MathSection />
        <MariaStorySection />
        <AlissaSection />
      </main>
    </div>
  );
};

export default Index;
