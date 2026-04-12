import HeroSlider from '@/components/hero/HeroSlider'
import ProductsSection from '@/components/products/ProductsSection'
import AboutPreview from '@/components/AboutPreview'
import CertificationsPreview from '@/components/CertificationsPreview'
import DistributorCTA from '@/components/DistributorCTA'

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <ProductsSection />
      <AboutPreview />
      <CertificationsPreview />
      <DistributorCTA />
    </>
  )
}
