import HeroSection from "../components/homepage/HeroSection";
import NavigationBar from "../components/homepage/NavigationBar";
import TrustSection from "../components/homepage/TrustSection";
import ServicesSection from "../components/homepage/ServicesSection";
import TestimonialSection from "../components/homepage/TestimonialSection";
import CTASection from "../components/homepage/CTASection";
import Footer from "../components/homepage/Footer";

export default function HomePage() {
  return (
    <div className="bg-linear-to-r from-green-50 via-lime-50 to-white min-h-[75vh] flex flex-col">
      <NavigationBar />
      <HeroSection />
      <TrustSection />
      <ServicesSection />
      <TestimonialSection />
      <CTASection />
      <Footer />
    </div>
  )
}
