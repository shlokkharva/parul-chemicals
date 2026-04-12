const express = require('express');
const path    = require('path');
const crypto  = require('crypto');
const app  = express();
const PORT = process.env.PORT || 3000;

// ── View engine ────────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ── In-Memory Distributor Store ────────────────────────────
// In production: replace with a real database (MongoDB / MySQL)
let distributors = []; // all registration requests
let loggedInDistributor = null; // simple session stub

function generatePassword(len = 8) {
  return crypto.randomBytes(len).toString('base64').replace(/[^a-zA-Z0-9]/g, '').substring(0, len);
}

// ── Shared site data ───────────────────────────────────────
const siteData = {
  siteName : 'Parul Chemicals',
  tagline  : 'Precision Chemistry',
  phone    : '+91 94277 84082',
  email    : 'parulchemicals2016@gmail.com',
  address  : 'Ranjan Society 2, Near Lions Hall, Race Course, Vadodara, Gujarat 390007',
  products : [
    {
      id: 'tec', name: 'Triethyl Citrate', abbr: 'TEC',
      cas: '77-93-0', formula: 'C₁₂H₂₀O₇', badge: 'Plasticizer',
      apps: 'Pharma · Food · Cosmetics',
      msds: 'https://parulchemicals.com/wp-content/uploads/2024/02/parul_chemical_msds.pdf',
      desc: 'Colorless, odorless citric acid ester — non-toxic, biodegradable and approved for food contact. Used in pharmaceutical coatings, PVC plastics, personal care, food flavours and adhesives. Shelf life: 24 months.',
      features: ['Non-Toxic & Biodegradable','FDA/USP/BP Compliant','Excellent Film-Forming','Low Volatility','Odorless & Colorless'],
      industries: ['Face Care, Deodorants, Hair Treatments','Food Flavours, Soft Drinks','Adhesives, Inks, Plastics, Polymers']
    },
    {
      id: 'fscalcival', name: 'F.S. Calcival', abbr: 'FS CALCIVAL',
      cas: null, formula: null, badge: 'Animal Nutrition',
      apps: 'Dairy · Livestock · Veterinary',
      desc: 'Not just calcium — a multi-vitamin and calcium formulation that enhances energy, bolsters immunity and significantly increases milk production in dairy cattle. Results visible in 10–20 days.',
      features: ['Increases Milk Production','Boosts Immunity','Multi-Vitamin Complex','Herbal & Mineral Formula','Vet Approved']
    },
    {
      id: 'dep', name: 'Diethyl Phthalate', abbr: 'DEP',
      cas: '84-66-2', formula: 'C₁₂H₁₄O₄', badge: 'Plasticizer',
      apps: 'Pharma · Agro · Cosmetics',
      msds: 'https://parulchemicals.com/wp-content/uploads/2024/02/MSDS-DEP.pdf',
      desc: 'Colorless, odorless liquid produced by esterification of phthalic anhydride with ethanol. Used in pharmaceutical coatings, fragrance fixatives, adhesives, inks, and personal care.',
      features: ['High Purity Grade','Excellent Solubility','Fragrance Fixative','Regulatory Compliant','Versatile Solvent'],
      industries: ['Face Care, Deodorants, Fragrances','Food Supplements, Beverages','Adhesives, Inks, Paints, Polymers']
    }
  ],
  packSizes: [
    { size:'1 Litre',  pack:'Plastic Jar',              icon:'🧴' },
    { size:'2 Litre',  pack:'Plastic Jar',              icon:'🫙' },
    { size:'5 Litre',  pack:'Plastic Jar / Steel Barni',icon:'🪣' },
    { size:'10 Litre', pack:'Steel Barni',              icon:'🛢️' },
    { size:'20 Litre', pack:'Plastic Can / Carbo',      icon:'🏭' }
  ],
  brochures: [
    { lang:'English',  url:'https://parulchemicals.in/wp-content/uploads/2024/12/FS-Calcival-Brochure-Design-Final-English.pdf' },
    { lang:'Gujarati', url:'https://parulchemicals.in/wp-content/uploads/2024/12/FS_Calcival_Brochure_Gujarati.pdf' },
    { lang:'Hindi',    url:'https://parulchemicals.in/wp-content/uploads/2025/02/brochure-hindi.pdf' },
    { lang:'Marathi',  url:'https://parulchemicals.in/wp-content/uploads/2025/02/Brouchermarathi.pdf' }
  ],
  nav: [
    { label:'Home',           href:'/' },
    { label:'Products',       href:'/products' },
    { label:'F.S. Calcival',  href:'/fscalcival' },
    { label:'Certifications', href:'/certifications' },
    { label:'Why Us',         href:'/why-us' },
    { label:'Buy Product',    href:'/buy' },
    { label:'Contact',        href:'/contact' }
  ]
};

// ═══════════════════════════════════════════════════
//  PUBLIC ROUTES
// ═══════════════════════════════════════════════════

app.get('/', (req, res) =>
  res.render('index', { ...siteData, page:'home', title:'Home — Parul Chemicals' }));

app.get('/products', (req, res) =>
  res.render('products', { ...siteData, page:'products', title:'Products — Parul Chemicals' }));

app.get('/fscalcival', (req, res) =>
  res.render('fscalcival', { ...siteData, page:'fscalcival', title:'F.S. Calcival — Parul Chemicals' }));

app.get('/certifications', (req, res) =>
  res.render('certifications', { ...siteData, page:'certifications', title:'Certifications — Parul Chemicals' }));

app.get('/why-us', (req, res) =>
  res.render('why-us', { ...siteData, page:'why-us', title:'Why Parul Chemicals' }));

app.get('/contact', (req, res) =>
  res.render('contact', { ...siteData, page:'contact', title:'Contact Us — Parul Chemicals', sent: req.query.sent === '1' }));

app.post('/contact', (req, res) => {
  const { name, email, company, product, message } = req.body;
  console.log('\n📩 New Inquiry:', { name, email, company, product, message });
  res.redirect('/contact?sent=1');
});

// ═══════════════════════════════════════════════════
//  BUY PRODUCT — DISTRIBUTOR PORTAL
// ═══════════════════════════════════════════════════

// GET /buy  — shows two-tab interface (register + login)
app.get('/buy', (req, res) => {
  const tab      = req.query.tab || 'register';   // 'register' | 'login'
  const success  = req.query.success === '1';     // after registration
  const error    = req.query.error  || null;      // login error
  const distId   = req.query.distId || null;      // after admin approval redirect

  // Find distributor if logged in by query param (demo session)
  const dist = distId ? distributors.find(d => d.id === distId) : null;

  res.render('buy', {
    ...siteData,
    page      : 'buy',
    title     : 'Buy Product — Parul Chemicals',
    tab, success, error, dist
  });
});

// POST /buy/register — submit distributor application
app.post('/buy/register', (req, res) => {
  const { name, phone, email, company, location, product, quantity } = req.body;

  // Validate phone uniqueness
  if (distributors.find(d => d.phone === phone)) {
    return res.redirect('/buy?tab=register&error=phone_exists');
  }

  const newDist = {
    id        : crypto.randomUUID(),
    name, phone, email, company, location, product, quantity,
    status    : 'pending',     // pending | approved | rejected
    appliedAt : new Date().toISOString(),
    approvedAt: null,
    distId    : phone,         // Login ID = phone number
    password  : null           // generated on approval
  };

  distributors.push(newDist);
  console.log('\n📋 New Distributor Request:', { name, phone, company });
  res.redirect('/buy?tab=register&success=1');
});

// POST /buy/login — distributor login with phone + password
app.post('/buy/login', (req, res) => {
  const { phone, password } = req.body;
  const dist = distributors.find(d => d.phone === phone && d.password === password);

  if (!dist) {
    return res.redirect('/buy?tab=login&error=invalid_credentials');
  }
  if (dist.status === 'pending') {
    return res.redirect('/buy?tab=login&error=pending');
  }
  if (dist.status === 'rejected') {
    return res.redirect('/buy?tab=login&error=rejected');
  }

  // Approved — go to distributor dashboard
  res.redirect(`/distributor/${dist.id}`);
});

// GET /distributor/:id — approved distributor dashboard
app.get('/distributor/:id', (req, res) => {
  const dist = distributors.find(d => d.id === req.params.id && d.status === 'approved');
  if (!dist) return res.redirect('/buy?tab=login&error=invalid_credentials');
  res.render('distributor-dashboard', { ...siteData, page:'buy', title:'Distributor Portal', dist });
});

// ═══════════════════════════════════════════════════
//  ADMIN PANEL  (secret URL: /admin)
// ═══════════════════════════════════════════════════

// GET /admin — admin dashboard
app.get('/admin', (req, res) => {
  const flash = req.query.flash || null;
  const generatedFor = req.query.generatedFor || null;
  const genDist = generatedFor ? distributors.find(d => d.id === generatedFor) : null;

  res.render('admin', {
    ...siteData,
    page         : 'admin',
    title        : 'Admin Panel — Parul Chemicals',
    distributors,
    flash,
    genDist
  });
});

// POST /admin/approve/:id — approve a distributor & generate credentials
app.post('/admin/approve/:id', (req, res) => {
  const dist = distributors.find(d => d.id === req.params.id);
  if (!dist) return res.redirect('/admin?flash=not_found');

  dist.status     = 'approved';
  dist.approvedAt = new Date().toISOString();
  dist.password   = generatePassword(9);   // auto-generated password

  console.log(`\n✅ Distributor APPROVED: ${dist.name} | ID: ${dist.phone} | Pass: ${dist.password}`);
  res.redirect(`/admin?flash=approved&generatedFor=${dist.id}`);
});

// POST /admin/reject/:id — reject a distributor
app.post('/admin/reject/:id', (req, res) => {
  const dist = distributors.find(d => d.id === req.params.id);
  if (!dist) return res.redirect('/admin?flash=not_found');

  dist.status = 'rejected';
  console.log(`\n❌ Distributor REJECTED: ${dist.name}`);
  res.redirect('/admin?flash=rejected');
});

// POST /admin/delete/:id — delete a record
app.post('/admin/delete/:id', (req, res) => {
  distributors = distributors.filter(d => d.id !== req.params.id);
  res.redirect('/admin?flash=deleted');
});

// 404
app.use((req, res) =>
  res.status(404).render('index', { ...siteData, page:'home', title:'404 — Parul Chemicals' }));

// Start
app.listen(PORT, () => {
  console.log(`\n🚀 Parul Chemicals running at http://localhost:${PORT}`);
  console.log(`   Admin panel → http://localhost:${PORT}/admin`);
  console.log(`   Press Ctrl+C to stop\n`);
});
