import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MariaStorySection from "@/components/MariaStorySection";
import AlissaSection from "@/components/AlissaSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <MariaStorySection />
        <AlissaSection />
      </main>
    </div>
  );
};

export default Index;
