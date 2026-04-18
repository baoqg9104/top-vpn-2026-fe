import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, Zap, Globe, Star, Check, X, Award, Clock, Users, Lock, 
  Menu, ChevronRight, CheckCircle2, ShieldCheck
} from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { cn } from './lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { vpnData } from './data/vpn-data';

type ComparisonRow = {
  price: number;
  freeTrial?: boolean;
  servers: string;
  connections: string;
  streaming?: boolean;
  noLogs?: boolean;
  support: boolean;
  guarantee: string;
};

type ComparisonCellValue = ComparisonRow[keyof ComparisonRow];

type ComparisonFeature = {
  label: string;
  key: keyof ComparisonRow;
  format: (value: ComparisonCellValue) => ReactNode;
};

const comparisonFeatures: ComparisonFeature[] = [
  { label: "Monthly Price", key: "price", format: (v) => `$${v}/mo` },
  { label: "Free Trial", key: "freeTrial", format: () => <Check className="w-5 h-5 text-success mx-auto" /> },
  { label: "Server Countries", key: "servers", format: (v) => v },
  { label: "Simultaneous Connections", key: "connections", format: (v) => v },
  { label: "Streaming Support", key: "streaming", format: () => <Check className="w-5 h-5 text-success mx-auto" /> },
  { label: "No-Logs Policy", key: "noLogs", format: () => <Check className="w-5 h-5 text-success mx-auto" /> },
  { label: "24/7 Support", key: "support", format: (v) => v ? <Check className="w-5 h-5 text-success mx-auto" /> : <X className="w-5 h-5 text-gray-400 mx-auto" /> },
  { label: "Money-back Guarantee", key: "guarantee", format: (v) => v }
];

const comparisonData: Record<string, ComparisonRow> = {
  expressvpn: { price: 6.67, servers: "94", connections: "8", guarantee: "30 days", support: true },
  nordvpn: { price: 3.99, servers: "60", connections: "6", guarantee: "30 days", support: true },
  surfshark: { price: 2.49, servers: "100", connections: "Unlimited", guarantee: "30 days", support: true },
  cyberghost: { price: 2.19, servers: "91", connections: "7", guarantee: "45 days", support: true },
  protonvpn: { price: 4.99, servers: "60+", connections: "10", guarantee: "30 days", support: false },
};

// --- COMPONENTS ---

const StarRating = ({ rating, count }: { rating: number, count: string }) => {
  return (
    <div className="flex items-center space-x-1">
      <div className="flex text-highlight">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} className={cn("w-4 h-4", i <= Math.round(rating) ? "fill-current" : "fill-transparent border-current")} />
        ))}
      </div>
      <span className="text-sm font-medium text-text-primary ml-1">{rating}</span>
      <span className="text-xs text-text-secondary">({count})</span>
    </div>
  );
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans text-text-primary bg-white selection:bg-primary/10">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="#" className="flex items-center gap-2">
                <Shield className="w-8 h-8 text-primary" />
                <span className="font-bold text-xl tracking-tight bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                  TopVPN
                </span>
              </a>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#reviews" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">Reviews</a>
              <a href="#compare" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">Compare</a>
              <a href="#guides" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">Guides</a>
              <a href="#blog" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">Blog</a>
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <Button variant="outline" className="font-medium">Best Deals</Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-text-secondary hover:text-primary p-2"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-b border-gray-100 bg-white"
            >
              <nav className="flex flex-col px-4 py-4 space-y-4">
                <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium text-text-secondary">Reviews</a>
                <a href="#compare" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium text-text-secondary">Compare</a>
                <a href="#guides" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium text-text-secondary">Guides</a>
                <a href="#blog" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium text-text-secondary">Blog</a>
                <Button variant="outline" className="w-full justify-center">Best Deals</Button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="relative overflow-hidden py-12 lg:py-20 bg-linear-to-br from-blue-50/50 via-white to-purple-50/50">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
              
              {/* Left Content */}
              <div className="w-full lg:w-[60%] flex flex-col items-center lg:items-start text-center lg:text-left">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-semibold flex items-center gap-2 mb-6"
                >
                  <span className="text-amber-500">⭐</span> Trusted by 2M+ users worldwide
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 text-text-primary"
                >
                  Find Your Perfect <br className="hidden sm:block" />
                  <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">VPN</span> in 2026
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg sm:text-xl text-text-secondary mb-8 max-w-2xl"
                >
                  Expert reviews, real speed tests, and honest comparisons of the top VPN services. Stay secure, stream freely, and browse privately.
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col sm:flex-row items-center gap-6 mb-10 w-full sm:w-auto"
                >
                  <Button size="lg" variant="gradient" className="w-full sm:w-auto text-lg gap-2 shadow-lg shadow-primary/25">
                    Compare Top VPNs Now <ChevronRight className="w-5 h-5" />
                  </Button>
                </motion.div>

                <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 0.4 }}
                   className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-8 text-sm font-medium text-text-secondary border-t border-gray-200 pt-8 w-full"
                >
                  <div className="flex items-center gap-2">
                     <ShieldCheck className="w-5 h-5 text-success" />
                     <span>30-day money-back</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <Zap className="w-5 h-5 text-primary" />
                     <span>Lightning fast</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <Globe className="w-5 h-5 text-secondary" />
                     <span>Global servers</span>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 text-sm text-text-secondary font-medium"
                >
                  🏆 Featured on CNET, PCMag, TechRadar
                </motion.div>
              </div>

              {/* Right Stats Card */}
              <div className="w-full lg:w-[40%]">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                  className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl p-6 sm:p-8"
                >
                  <div className="grid grid-cols-2 gap-4 sm:gap-6">
                    <div className="bg-white/80 rounded-xl p-4 sm:p-6 text-center border border-gray-100 shadow-sm">
                      <div className="text-3xl font-bold tracking-tight text-primary mb-1">50+</div>
                      <div className="text-xs sm:text-sm font-medium text-text-secondary uppercase tracking-wider">VPNs Tested</div>
                    </div>
                    <div className="bg-white/80 rounded-xl p-4 sm:p-6 text-center border border-gray-100 shadow-sm">
                      <div className="text-3xl font-bold tracking-tight text-secondary bg-clip-text bg-linear-to-br from-secondary to-purple-400 mb-1">2M+</div>
                      <div className="text-xs sm:text-sm font-medium text-text-secondary uppercase tracking-wider">Happy Users</div>
                    </div>
                    <div className="bg-white/80 rounded-xl p-4 sm:p-6 text-center border border-gray-100 shadow-sm">
                      <div className="text-3xl font-bold tracking-tight text-text-primary mb-1">100+</div>
                      <div className="text-xs sm:text-sm font-medium text-text-secondary uppercase tracking-wider">Countries</div>
                    </div>
                    <div className="bg-white/80 rounded-xl p-4 sm:p-6 text-center border border-gray-100 shadow-sm">
                      <div className="text-3xl font-bold tracking-tight text-highlight mb-1 flex justify-center items-center gap-1">
                        4.9<Star className="w-5 h-5 fill-current" />
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-text-secondary uppercase tracking-wider">Avg Rating</div>
                    </div>
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* TOP VPNS SECTION */}
        <section id="reviews" className="py-12 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
              <Badge variant="secondary" className="mb-4">Top Picks 2026</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">The Best VPN Services of 2026</h2>
              <p className="text-lg text-text-secondary">After testing 50+ VPNs, these are our top recommendations based on speed, security, and value for money.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vpnData.slice(0, 3).map((vpn, idx) => (
                <motion.div
                  key={vpn.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="h-full flex flex-col relative transition-all duration-200 hover:shadow-lg hover:border-gray-200 overflow-hidden">
                    {vpn.id === "expressvpn" && (
                      <div className="absolute top-0 inset-x-0 h-1 bg-highlight"></div>
                    )}
                    {vpn.id === "nordvpn" && (
                       <div className="absolute top-0 inset-x-0 h-1 bg-primary"></div>
                    )}
                    {vpn.id === "surfshark" && (
                       <div className="absolute top-0 inset-x-0 h-1 bg-teal-500"></div>
                    )}
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start mb-4">
                        <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold", vpn.color)}>
                          {vpn.name.charAt(0)}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold">{vpn.name}</h3>
                      <StarRating rating={vpn.rating} count={vpn.reviews} />
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul className="space-y-3 mb-6">
                        {vpn.features.map((feature, i) => (
                          <li key={i} className="flex items-start text-sm text-text-secondary">
                            <CheckCircle2 className="w-5 h-5 text-success mr-2 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto flex items-end">
                        <span className="text-4xl font-extrabold tracking-tight">${vpn.price}</span>
                        <span className="text-text-secondary mb-1 ml-1">/mo</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant={"outline"} className="w-full">
                        Visit {vpn.name} <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
               <a href="#compare" className="inline-flex items-center font-medium text-primary hover:text-blue-700 transition-colors">
                  Still not sure? See Full Comparison Table <ChevronRight className="w-4 h-4 ml-1" />
               </a>
            </div>
          </div>
        </section>

        {/* COMPARISON SECTION */}
        <section id="compare" className="py-12 lg:py-20 bg-bg-alt border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="outline" className="mb-4 shadow-sm bg-white">Detailed Comparison</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Compare VPNs Side-by-Side</h2>
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-100">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50/50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-6 font-semibold text-text-secondary w-1/4">Features</th>
                    {vpnData.map(vpn => (
                      <th key={vpn.id} className={cn("px-6 py-6 text-center w-[15%]", vpn.id === "expressvpn" && "bg-blue-50/50")}>
                        <div className="font-bold text-lg text-text-primary">{vpn.name}</div>
                        {vpn.id === "expressvpn" && <Badge variant="default" className="mt-2 text-[10px] scale-90">Best Overall</Badge>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 object-center">
                  {comparisonFeatures.map((feat) => (
                    <tr key={feat.key} className="hover:bg-gray-50/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-text-primary sticky left-0 bg-inherit">{feat.label}</td>
                      {vpnData.map(vpn => (
                        <td key={`${vpn.id}-${feat.key}`} className={cn("px-6 py-4 text-center font-medium", vpn.id === "expressvpn" && "bg-blue-50/50")}>
                           {feat.format(comparisonData[vpn.id][feat.key])}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                     <td className="px-6 py-6 font-medium text-text-primary"></td>
                     {vpnData.map(vpn => (
                        <td key={`${vpn.id}-cta`} className={cn("px-6 py-6 text-center", vpn.id === "expressvpn" && "bg-blue-50/50")}>
                           <Button variant={vpn.id === "expressvpn" ? "default" : "outline"} size="sm" className="w-full">Get {vpn.name}</Button>
                        </td>
                      ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-6">
              {vpnData.map((vpn) => (
                <Card key={`mobile-${vpn.id}`} className={cn(vpn.id === "expressvpn" && "ring-2 ring-primary border-transparent")}>
                  <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
                     <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-bold">{vpn.name}</h3>
                        {vpn.id === "expressvpn" && <Badge variant="default">Best Overall</Badge>}
                     </div>
                     <div className="text-3xl font-extrabold">${vpn.price}<span className="text-sm font-normal text-text-secondary">/mo</span></div>
                  </CardHeader>
                  <CardContent className="pt-4 px-0">
                     <ul className="divide-y divide-gray-100">
                        {comparisonFeatures.filter(f => f.key !== 'price').map((feat) => (
                           <li key={feat.key} className="flex justify-between py-3 px-6 text-sm">
                              <span className="text-text-secondary">{feat.label}</span>
                              <span className="font-medium inline-flex items-center">{feat.format(comparisonData[vpn.id][feat.key])}</span>
                           </li>
                        ))}
                     </ul>
                  </CardContent>
                  <CardFooter className="pt-4 border-t border-gray-100 bg-gray-50/50">
                     <Button variant={vpn.id === "expressvpn" ? "default" : "outline"} className="w-full">Get {vpn.name}</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* TRUST SECTION */}
        <section className="py-12 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Why Trust Our VPN Reviews?</h2>
              <p className="text-lg text-text-secondary">Our editorial team follows strict testing methodologies to provide unbiased, accurate, and up-to-date recommendations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {[
                { icon: Shield, title: "Independent Testing", desc: "We purchase all VPNs ourselves and test them rigorously on multiple platforms." },
                { icon: Award, title: "Expert Reviews", desc: "Our team has over 10 years of experience in cybersecurity and digital privacy." },
                { icon: Clock, title: "Updated Daily", desc: "Prices, features, and server lists are checked and updated constantly." },
                { icon: Users, title: "2M+ Readers", desc: "Millions of users rely on our recommendations to secure their online lives." },
                { icon: Lock, title: "Privacy First", desc: "We don't accept paid rankings. Our top slots are earned, not bought." },
                { icon: Globe, title: "Global Coverage", desc: "Tests conducted from 20+ countries to ensure reliable speeds worldwide." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-blue-50 flex flex-col items-center justify-center text-primary">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Proof Banner */}
            {/* <div className="bg-bg-alt rounded-2xl p-8 text-center border border-gray-100 mb-20">
              <p className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-6">Featured on Leading Tech Publications</p>
              <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
                <span className="text-2xl font-black tracking-tighter">CNET</span>
                <span className="text-2xl font-serif font-bold italic border-b-2 border-current px-1">PCMag</span>
                <span className="text-2xl font-sans font-bold flex bg-black text-white px-2 py-0.5 transform -skew-x-12">TechRadar</span>
                <span className="text-2xl font-serif tracking-widest font-bold">W I R E D</span>
              </div>
            </div> */}

            {/* FAQs Grid */}
            <div className="max-w-4xl mx-auto mt-20">
               <h3 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                     { q: "Are VPNs legal?", a: "Yes, using a VPN is perfectly legal in most countries. They are standard security tools used by businesses and individuals worldwide." },
                     { q: "Will a VPN slow down my internet?", a: "High-quality VPNs have minimal impact on speed. With fast protocols like WireGuard, drop-off is often unnoticeable (under 10%)." },
                     { q: "Can I use a VPN for streaming?", a: "Yes! The top VPNs on our list can reliably bypass geo-blocks, allowing access to US Netflix, BBC iPlayer, Hulu, and more." },
                     { q: "What is a no-logs policy?", a: "It means the provider does not track, store, or share your browsing activity, ensuring your true online anonymity." }
                  ].map((faq, i) => (
                     <div key={i} className="bg-bg-alt rounded-xl p-6 border border-gray-100">
                        <h4 className="font-semibold text-lg mb-2">{faq.q}</h4>
                        <p className="text-text-secondary text-sm leading-relaxed">{faq.a}</p>
                     </div>
                  ))}
               </div>
            </div>
          </div>
        </section>

        {/* CTA CLOSING SECTION */}
        <section className="py-20 lg:py-32 bg-linear-to-r from-primary to-secondary text-white relative overflow-hidden">
           {/* Decorative circles */}
           <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
              <div className="absolute bottom-[-10%] right-[-5%] w-160 h-160 rounded-full bg-white/5 blur-3xl"></div>
           </div>

           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <div className="w-20 h-20 mx-auto bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-8 border border-white/20">
                 <Shield className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">Ready to Secure Your Online Privacy?</h2>
              <p className="text-lg sm:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                 Join 2 million+ users who trust our VPN recommendations. Start browsing safely today with a risk-free trial.
              </p>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block mb-10">
                 <Button size="lg" className="bg-white text-primary hover:bg-gray-50 h-14 px-10 text-lg rounded-xl shadow-xl shadow-primary/20 font-bold">
                    Compare Top VPNs Now <ChevronRight className="w-5 h-5 ml-2" />
                 </Button>
              </motion.div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm font-medium text-blue-100">
                  <div className="flex items-center gap-2">
                     <CheckCircle2 className="w-5 h-5" /> 30-day money-back
                  </div>
                  <div className="flex items-center gap-2">
                     <CheckCircle2 className="w-5 h-5" /> No credit card required
                  </div>
                  <div className="flex items-center gap-2">
                     <Lock className="w-5 h-5" /> SSL Secure Checkout
                  </div>
              </div>
           </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-900 set text-gray-300 py-12 lg:py-16 border-t border-gray-800">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-12">
               
               <div className="lg:col-span-2">
                  <a href="#" className="flex items-center gap-2 mb-6">
                     <Shield className="w-6 h-6 text-blue-400" />
                     <span className="font-bold text-xl tracking-tight text-white">TopVPN</span>
                  </a>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
                     We are dedicated to helping internet users around the world protect their privacy and security online through honest, independent VPN reviews.
                  </p>
                  <div className="flex gap-4">
                     <a href="#" className="text-gray-400 hover:text-white transition-colors"><FontAwesomeIcon icon={faXTwitter} className='text-2xl' /></a>
                     <a href="#" className="text-gray-400 hover:text-white transition-colors"><FontAwesomeIcon icon={faGithub} className='text-2xl' /></a>
                     <a href="#" className="text-gray-400 hover:text-white transition-colors"><FontAwesomeIcon icon={faLinkedin} className='text-2xl' /></a>
                  </div>
               </div>
               
               <div>
                  <h4 className="font-semibold text-white mb-4">Product</h4>
                  <ul className="space-y-3 text-sm">
                     <li><a href="#" className="hover:text-blue-400 transition-colors">VPN Reviews</a></li>
                     <li><a href="#" className="hover:text-blue-400 transition-colors">Compare VPNs</a></li>
                     <li><a href="#" className="hover:text-blue-400 transition-colors">Best VPN for Netflix</a></li>
                     <li><a href="#" className="hover:text-blue-400 transition-colors">Best Cheap VPNs</a></li>
                     <li><a href="#" className="hover:text-blue-400 transition-colors">Deals & Coupons</a></li>
                  </ul>
               </div>

               <div>
                  <h4 className="font-semibold text-white mb-4">Resources</h4>
                  <ul className="space-y-3 text-sm">
                     <li><a href="#" className="hover:text-blue-400 transition-colors">What is a VPN?</a></li>
                     <li><a href="#" className="hover:text-blue-400 transition-colors">Setup Guides</a></li>
                     <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Blog</a></li>
                     <li><a href="#" className="hover:text-blue-400 transition-colors">Speed Test Tool</a></li>
                     <li><a href="#" className="hover:text-blue-400 transition-colors">IP Leak Test</a></li>
                  </ul>
               </div>

               <div>
                  <h4 className="font-semibold text-white mb-4">Company</h4>
                  <ul className="space-y-3 text-sm">
                     <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
                     <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
                     <li><a href="#" className="hover:text-blue-400 transition-colors">Our Methodology</a></li>
                     <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                     <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                  </ul>
               </div>

            </div>

            <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
               <p className="text-xs text-gray-500">
                  © 2026 TopVPN Reviews. All rights reserved. 
               </p>
               <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Globe className="w-4 h-4" />
                  <select className="bg-transparent border-none focus:ring-0 cursor-pointer">
                     <option value="en">English (US)</option>
                  </select>
               </div>
            </div>
         </div>
      </footer>

    </div>
  );
}
