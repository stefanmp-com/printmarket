import Link from 'next/link'
import Image from 'next/image'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FF00CC]">
      {/* Navigation */}
      <nav className="relative flex justify-center items-center px-12 py-4 border-b border-black">
        <button className="absolute left-12 text-black">Menu</button>
        <h1 className="text-2xl font-bold text-black">PRINT MARKET</h1>
        <div className="absolute right-12 flex gap-8">
          <button className="text-black">Denmark</button>
          <button className="text-black">Account</button>
          <button className="text-black">Search</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="min-h-[80vh] flex flex-col justify-center items-center relative px-4">
        <h1 className="text-7xl md:text-8xl font-bold text-black text-center mb-8 relative z-10">
          Print Smarter
          <br />
          Quote Faster
        </h1>
        <p className="text-2xl md:text-3xl text-black text-center max-w-2xl mb-12 relative z-10">
          Connect instantly with trusted print shops. Get competitive quotes in minutes, not days.
        </p>
        <Link 
          href="/marketplace"
          className="bg-black text-white text-xl px-12 py-4 rounded-full hover:bg-[#2C2C2C] transition-colors relative z-10"
        >
          Get Print Quotes →
        </Link>

        {/* Floating Mockups */}
        <div className="absolute right-[10%] top-[20%] rotate-12 opacity-80">
          <Image src="/images/flyer.jpg" width={300} height={400} alt="Flyer mockup" className="shadow-2xl rounded-md" />
        </div>
        <div className="absolute left-[10%] bottom-[20%] -rotate-12 opacity-80">
          <Image src="/images/magazine.jpg" width={300} height={400} alt="Magazine mockup" className="shadow-2xl rounded-md" />
        </div>
      </div>

      {/* Social Proof */}
      <div className="bg-black text-white py-8">
        <div className="container mx-auto flex justify-center items-center gap-12 text-center">
          <div>
            <h3 className="text-4xl font-bold mb-2">500+</h3>
            <p>Print Shops</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold mb-2">24h</h3>
            <p>Average Response</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold mb-2">10k+</h3>
            <p>Projects Quoted</p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-24 px-4">
        <h2 className="text-5xl font-bold text-black text-center mb-16">How It Works</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl">
          <div className="text-center">
            <div className="text-6xl mb-6">1</div>
            <h3 className="text-2xl font-bold mb-4">Select Product</h3>
            <p>Choose from our range of print products</p>
          </div>
          <div className="text-center">
            <div className="text-6xl mb-6">2</div>
            <h3 className="text-2xl font-bold mb-4">Request Quotes</h3>
            <p>Get competitive quotes from verified printers</p>
          </div>
          <div className="text-center">
            <div className="text-6xl mb-6">3</div>
            <h3 className="text-2xl font-bold mb-4">Print & Deliver</h3>
            <p>Accept the best quote and get printing</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-black text-white py-24 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-5xl font-bold mb-8">Ready to Start?</h2>
          <p className="text-xl mb-12">Join hundreds of businesses getting better print quotes daily</p>
          <Link 
            href="/marketplace"
            className="bg-[#FF00CC] text-black text-xl px-12 py-4 rounded-full hover:bg-[#ff56dd] transition-colors inline-block"
          >
            Browse Print Products →
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-black py-12">
        <div className="container mx-auto text-center">
                          <p className="text-black">© 2025 Print Market. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}