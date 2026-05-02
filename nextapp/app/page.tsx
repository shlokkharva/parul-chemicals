import HeroSlider from '@/components/hero/HeroSlider'
import ProductsSection from '@/components/products/ProductsSection'
import TechnicalInsights from '@/components/TechnicalInsights'
import CertificationsPreview from '@/components/CertificationsPreview'
import DistributorCTA from '@/components/DistributorCTA'
import GlobalPartners from '@/components/GlobalPartners'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <ProductsSection />
      <TechnicalInsights />
      <CertificationsPreview />
      <GlobalPartners />
      <DistributorCTA />
      <Testimonials />
      <FAQ />
    </>
  )
}
