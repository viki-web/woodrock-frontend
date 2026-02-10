import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import WeDoSection from "@/components/WeDoSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ProjectsSection from "@/components/ProjectsSection";
import LicensingMapSection from "@/components/LicensingMapSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CtaBannerSection from "@/components/CtaBannerSection";
import FaqSection from "@/components/FaqSection";
import ScrollAnimations from "@/components/ui/ScrollAnimations";
import { getHomepageData } from "@/lib/api";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Woodrock Engineering | Structural Engineering & Post-Frame Design",
  description: "Licensed structural engineering services for commercial, agricultural, and post-frame construction across 30+ states.",
  openGraph: {
    title: "Woodrock Engineering",
    description: "Licensed structural engineering services for commercial, agricultural, and post-frame construction.",
    images: ["/assets/images/logo.png"],
  },
};

export default async function Home() {
  const homepageData = await getHomepageData();

  if (!homepageData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ScrollAnimations />
      <main>
        <HeroSection data={homepageData} />
        <StatsSection data={homepageData} />
        <WeDoSection data={homepageData} />
        <HowItWorksSection data={homepageData} />
        <ProjectsSection data={homepageData} />
        <LicensingMapSection data={homepageData} />
        <TestimonialsSection data={homepageData} />
        <CtaBannerSection data={homepageData} />
        <FaqSection data={homepageData} />
      </main>
    </>
  );
}


