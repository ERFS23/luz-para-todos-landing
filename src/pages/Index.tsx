import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MariaStorySection from "@/components/MariaStorySection";
import AlissaSection from "@/components/AlissaSection";
import OfferingsSection from "@/components/OfferingsSection";
import MathSection from "@/components/MathSection";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import UrgencySection from "@/components/UrgencySection";
import FAQSection from "@/components/FAQSection";
import FinalCTASection from "@/components/FinalCTASection";
import DonationForm from "@/components/DonationForm";
import AdminPanel from "@/components/AdminPanel";

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
        <TestimonialCarousel />
        <UrgencySection />
        <FAQSection />
        <FinalCTASection />
        <DonationForm />
      </main>
      <AdminPanel />
    </div>
  );
};

export default Index;
