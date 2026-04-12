export const SITE = {
  name: 'Parul Chemicals',
  tagline: 'Leading Manufacturer of Diethyl Phthalate & Triethyl Citrate',
  phone: '+91 94277 84082',
  email: 'parulchemicals2016@gmail.com',
  address: 'Ranjan Society 2, Near Lions Hall, Race Course, Vadodara, Gujarat 390007',
  gstin: '24AADCP9515J1ZI',
}

export const PRODUCTS = [
  {
    id: 'dep',
    name: 'Diethyl Phthalate',
    abbr: 'DEP',
    cas: '84-66-2',
    formula: 'C₁₂H₁₄O₄',
    badge: 'Plasticizer',
    image: '/products/diethylphthalate.webp',
    color: '#00AEEF',
    apps: 'Pharma · Agro · Cosmetics',
    desc: 'Colorless, odorless liquid produced by esterification of phthalic anhydride with ethanol. Used in pharmaceutical coatings, fragrance fixatives, adhesives, inks, and personal care products.',
    features: ['High Purity Grade', 'Excellent Solubility', 'Fragrance Fixative', 'Regulatory Compliant', 'Versatile Solvent'],
    industries: ['Face Care, Deodorants, Fragrances', 'Adhesives, Inks, Paints, Polymers', 'Pharmaceutical Coatings'],
    msds: 'https://parulchemicals.com/wp-content/uploads/2024/02/MSDS-DEP.pdf',
  },
  {
    id: 'tec',
    name: 'Triethyl Citrate',
    abbr: 'TEC',
    cas: '77-93-0',
    formula: 'C₁₂H₂₀O₇',
    badge: 'Plasticizer',
    image: '/products/triethylcitrate.webp',
    color: '#00C9A7',
    apps: 'Pharma · Food · Cosmetics',
    desc: 'Colorless, odorless citric acid ester — non-toxic, biodegradable and approved for food contact. Used in pharmaceutical coatings, PVC plastics, personal care, food flavours and adhesives.',
    features: ['Non-Toxic & Biodegradable', 'FDA/USP/BP Compliant', 'Excellent Film-Forming', 'Low Volatility', 'Odorless & Colorless'],
    industries: ['Face Care, Hair Treatments', 'Food Flavours, Soft Drinks', 'Pharma Coatings, PVC Plastics'],
    msds: 'https://parulchemicals.com/wp-content/uploads/2024/02/parul_chemical_msds.pdf',
  },
]

export const CERTIFICATIONS = [
  { id: 'iso9001',    name: 'ISO 9001:2015',     desc: 'Quality Management System',                    image: '/certificates/iso90012015.webp',  icon: '🏅' },
  { id: 'iso22000',   name: 'ISO 22000:2018',    desc: 'Food Safety Management System',                image: '/certificates/iso220002018.webp', icon: '🍃' },
  { id: 'iso45001',   name: 'ISO 45001:2018',    desc: 'Occupational Health & Safety Management',      image: '/certificates/iso450012018.webp', icon: '⚕️' },
  { id: 'iso9235',    name: 'ISO 9235:2013',      desc: 'Aromatic Natural Raw Materials',               image: '/certificates/iso92352013.webp',  icon: '🌿' },
  { id: 'gmp',        name: 'GMP',               desc: 'Good Manufacturing Practice',                  image: '/certificates/gmp.webp',          icon: '🏭' },
  { id: 'haccp',      name: 'HACCP',             desc: 'Hazard Analysis Critical Control Points',      image: '/certificates/haccp.webp',         icon: '🔬' },
  { id: 'kosher1',    name: 'Kosher (TEC)',       desc: 'Triethyl Citrate — Kosher Certified',          image: '/certificates/kosher1.webp',       icon: '✡️' },
  { id: 'kosher2',    name: 'Kosher (DEP)',       desc: 'Diethyl Phthalate — Kosher Certified',         image: '/certificates/kosher2.webp',       icon: '✡️' },
  { id: 'reg',        name: 'Registration',       desc: 'Government Business Registration Certificate', image: '/certificates/registrationcerti.webp', icon: '📋' },
]

export const TIMELINE = [
  { year: '2009', title: 'Founded',            desc: 'Parul Chemicals established in Vadodara, Gujarat with a vision for precision chemistry.' },
  { year: '2013', title: 'TEC Launch',         desc: 'Launched Triethyl Citrate (TEC) — our flagship food-safe plasticizer.' },
  { year: '2016', title: 'ISO 9001 Certified', desc: 'Achieved ISO 9001:2015 certification, establishing world-class quality management.' },
  { year: '2018', title: 'DEP Launch',         desc: 'Launched Diethyl Phthalate (DEP), expanding into cosmetics & pharma coatings.' },
  { year: '2020', title: 'Food Safety Cert',   desc: 'Awarded ISO 22000:2018 Food Safety Certification — trusted by food industry leaders.' },
  { year: '2023', title: 'Export Expansion',   desc: 'Expanded to export markets, supplying to manufacturers in 8+ countries.' },
]

export const STATS = [
  { val: '15+', label: 'Years of Excellence' },
  { val: '500+', label: 'Clients Served' },
  { val: '9',  label: 'International Certifications' },
  { val: '8+', label: 'Export Countries' },
]

export const NAV = [
  { label: 'Home',           href: '/' },
  { label: 'Products',       href: '/products' },
  { label: 'Certifications', href: '/certifications' },
  { label: 'About',          href: '/about' },
  { label: 'Contact',        href: '/contact' },
]
