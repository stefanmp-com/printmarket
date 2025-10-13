import Link from 'next/link'
import Image from 'next/image'

const printProducts = [
  { 
    name: 'BOOK (HARD)', 
    slug: 'book-hard',
    imageUrl: '/images/book.jpg'
  },
  { 
    name: 'MAGAZINE', 
    slug: 'magazine',
    imageUrl: '/images/magazine.jpg'
  },
  { 
    name: 'POSTER', 
    slug: 'poster',
    imageUrl: '/images/poster.jpg'
  },
  { 
    name: 'FLYER', 
    slug: 'flyer',
    imageUrl: '/images/flyer.jpg'
  },
  { 
    name: 'BUSINESS CARD', 
    slug: 'business-card',
    imageUrl: '/images/business-card.jpg'
  },
  { 
    name: 'BROCHURE', 
    slug: 'brochure',
    imageUrl: '/images/brochure.jpg'
  },
  { 
    name: 'STICKER', 
    slug: 'sticker',
    imageUrl: '/images/sticker.jpg'
  },
  { 
    name: 'POSTCARD', 
    slug: 'postcard',
    imageUrl: '/images/postcard.jpg'
  },
  { 
    name: 'CALENDAR', 
    slug: 'calendar',
    imageUrl: '/images/calendar.jpg'
  }
]

const Arrow = () => (
  <span className="text-[2rem] sm:text-[2.5rem] text-black transform rotate-[135deg] transition-transform duration-300 group-hover:rotate-[225deg]" style={{ 
    display: 'inline-block',
    fontFamily: 'Arial',
    fontWeight: 'bold',
  }}>
    ↙
  </span>
)

export default function Marketplace() {
  return (
    <div className="min-h-screen bg-[#FF00CC]">
      {/* Fixed Navigation and Search Container */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-[#FF00CC]">
        <nav className="relative flex justify-center items-center px-4 sm:px-12 py-4 border-b border-black">
          <button className="absolute left-4 sm:left-12 text-black text-sm sm:text-base">Menu</button>
          <Link href="/" className="text-xl sm:text-2xl font-bold text-black">PRINT MARKET</Link>
          <div className="absolute right-4 sm:right-12 flex gap-2 sm:gap-8">
            <button className="text-sm sm:text-base text-black">Denmark</button>
            <button className="text-sm sm:text-base text-black">Account</button>
            <button className="text-sm sm:text-base text-black">Search</button>
          </div>
        </nav>
        
        {/* Search Field */}
        <div className="border-b border-black group bg-[#FF00CC]">
          <div className="w-full bg-[#FF00CC] focus-within:bg-[#ff56dd] transition-colors">
            <div className="container mx-auto px-4 sm:px-12 py-8">
              <input 
                type="text" 
                placeholder="SEARCH PRODUCT"
                className="text-2xl sm:text-3xl text-black bg-transparent text-center max-w-[600px] mx-auto block w-full outline-none placeholder-black focus:text-4xl sm:focus:text-5xl transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Spacer div to match fixed header height */}
      <div className="h-[144px]" />

      {/* Product List - Remove top padding/margin */}
      <div className="bg-[#FF00CC]">
        {printProducts.map((product) => (
          <div key={product.slug} className="group border-b border-black relative">
            <div className="w-full group-hover:bg-[#22fc59] transition-colors">
              <div className="container mx-auto flex items-center px-4 sm:px-12 py-8">
                <span className="ml-0 relative z-10"><Arrow /></span>
                
                {/* Hover Image */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 fixed left-[60px] sm:left-[120px] top-1/2 -translate-y-1/2 z-50">
                  <div className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bg-white rounded-lg shadow-lg overflow-hidden">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>

                <div className="flex-1 flex justify-center items-center">
                  <h3 className="text-xl sm:text-3xl text-black group-hover:italic transition-all max-w-[600px] translate-x-[30px] sm:translate-x-[60px]">
                    {product.name}
                  </h3>
                </div>
                <Link 
                  href={`/quote/${product.slug}`}
                  className="bg-[#686666] text-white px-4 sm:px-6 py-2 rounded-full hover:bg-[#2C2C2C] transition-colors text-sm sm:text-base whitespace-nowrap"
                >
                  Request Quotes
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}