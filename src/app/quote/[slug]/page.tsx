'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useQuote } from '../../../contexts/QuoteContext'

const getProductName = (slug: string) => {
  return slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

export default function QuoteRequest() {
  // Get params using the useParams hook
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : Array.isArray(params.slug) ? params.slug[0] : '';
  const productName = getProductName(slug);
  
  // Quote context for bulk quote functionality
  const { addToQuote, isInQuote, quoteItems } = useQuote();

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    quantity: '',
    size: '',
    customWidth: '',
    customHeight: '',
    paperType: '',
    email: '',
    phone: '',
    notes: '' as string,
    designFile: null as File | null,
    deadline: null as Date | null,
    customQuantity: '' as string,
    colorOption: '',
    spotColors: '',
  })

  // Handle selections
  const handleSelect = (field: string, value: string | Date) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Validate before moving to next step
  const canProceed = () => {
    switch(step) {
      case 1:
        if (formData.quantity === 'Custom') {
          return formData.customQuantity && formData.size;
        }
        if (formData.size === 'Custom Size') {
          return formData.quantity && formData.customWidth && formData.customHeight;
        }
        return formData.quantity && formData.size;
      case 2:
        return formData.paperType && formData.deadline && formData.colorOption;
      case 3:
        // Require email and validate format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const isEmailValid = emailRegex.test(formData.email)
        return isEmailValid;
      default:
        return true;
    }
  }

  // Handle form submission
  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log('Submitting quote request:', formData)
    // Show success message or redirect
  }

  // Handle adding to bulk quote
  const handleAddToBulkQuote = () => {
    const productData = {
      name: productName,
      slug: slug,
      imageUrl: `/images/${slug}.jpg`,
      quantity: formData.quantity,
      size: formData.size,
      customWidth: formData.customWidth,
      customHeight: formData.customHeight,
      paperType: formData.paperType,
      colorOption: formData.colorOption,
      notes: formData.notes,
      deadline: formData.deadline ? formData.deadline.toISOString().split('T')[0] : undefined,
      customFields: {
        ...(formData.spotColors && { spotColors: formData.spotColors })
      }
    }
    
    addToQuote(productData)
    
    // Show success message
    alert('Added to bulk quote! You can continue adding more products or review your quote.')
  }

  // Add error states
  const [errors, setErrors] = useState({
    email: '',
    phone: ''
  })

  return (
    <div className="min-h-screen bg-[#FF00CC]">
      {/* Navigation */}
      <nav className="relative flex justify-center items-center px-4 md:px-12 py-3 md:py-4 border-b border-black">
        <Link href="/" className="text-xl md:text-2xl font-bold text-black hover:opacity-80 transition-opacity">
          PRINT MARKET
        </Link>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Add Product Context */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-black">{productName}</h1>
          <p className="text-black mt-1 text-sm md:text-base">Request a quote for your project</p>
        </div>

        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-8 max-w-md mx-auto">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="flex items-center">
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm ${
                step >= num ? 'bg-black text-white' : 'bg-white text-black'
              }`}>
                {num}
              </div>
              {num < 4 && (
                <div className={`h-1 w-10 md:w-14 lg:w-20 ${
                  step > num ? 'bg-black' : 'bg-white'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Basic Details */}
        {step === 1 && (
          <div className="bg-white rounded-2xl p-5 md:p-8 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-black">Tell us about your {productName}</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm md:text-base text-black font-medium mb-2">Quantity</label>
                <select 
                  value={formData.quantity}
                  onChange={(e) => handleSelect('quantity', e.target.value)}
                  className="w-full p-3 text-sm md:text-base border border-black rounded-full text-black bg-white"
                >
                  <option value="" className="text-black">Select quantity</option>
                  <option value="100" className="text-black">100</option>
                  <option value="250" className="text-black">250</option>
                  <option value="500" className="text-black">500</option>
                  <option value="1000" className="text-black">1,000</option>
                  <option value="2500" className="text-black">2,500</option>
                  <option value="5000" className="text-black">5,000</option>
                  <option value="Custom" className="text-black">Custom Quantity</option>
                </select>
                
                {formData.quantity === 'Custom' && (
                  <div className="mt-4">
                    <label className="block text-xs md:text-sm text-black font-medium mb-1">Enter quantity</label>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={formData.customQuantity || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, customQuantity: e.target.value }))}
                      placeholder="e.g. 750"
                      className="w-full py-2 px-3 md:p-3 text-sm border border-black rounded-full text-black bg-white"
                    />
                    <p className="text-xs text-gray-600 mt-1 ml-1">Enter the exact number of copies you need.</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm md:text-base text-black font-medium mb-2">Size</label>
                <select 
                  value={formData.size}
                  onChange={(e) => handleSelect('size', e.target.value)}
                  className="w-full p-3 text-sm md:text-base border border-black rounded-full text-black bg-white"
                >
                  <option value="" className="text-black">Select size</option>
                  <option value="A4 (210x297mm)" className="text-black">A4 (210x297mm)</option>
                  <option value="A5 (148x210mm)" className="text-black">A5 (148x210mm)</option>
                  <option value="A6 (105x148mm)" className="text-black">A6 (105x148mm)</option>
                  <option value="DL (99x210mm)" className="text-black">DL (99x210mm)</option>
                  <option value="Custom Size" className="text-black">Custom Size</option>
                  <option value="Not Sure" className="text-black">Not Sure (Get Recommendations)</option>
                </select>
                
                {formData.size === 'Custom Size' && (
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs md:text-sm text-black font-medium mb-1">Width (mm)</label>
                      <input
                        type="number"
                        min="10"
                        max="1000"
                        step="5"
                        value={formData.customWidth}
                        onChange={(e) => setFormData(prev => ({ ...prev, customWidth: e.target.value }))}
                        placeholder="e.g. 100"
                        className="w-full py-2 px-3 md:p-3 text-sm border border-black rounded-full text-black bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs md:text-sm text-black font-medium mb-1">Height (mm)</label>
                      <input
                        type="number"
                        min="10"
                        max="1000"
                        step="5"
                        value={formData.customHeight}
                        onChange={(e) => setFormData(prev => ({ ...prev, customHeight: e.target.value }))}
                        placeholder="e.g. 150"
                        className="w-full py-2 px-3 md:p-3 text-sm border border-black rounded-full text-black bg-white"
                      />
                    </div>
                  </div>
                )}
                
                {formData.size === 'Not Sure' && (
                  <div className="mt-3 bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                    <p className="text-xs md:text-sm text-yellow-800">
                      <span className="font-medium">Note:</span> Not having exact size specifications may extend the quote process. Our team will contact you to discuss size options.
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={() => canProceed() && setStep(2)}
                className={`w-full py-3 md:py-4 rounded-full transition-colors mt-6 text-sm md:text-base overflow-hidden whitespace-nowrap
                  ${canProceed() 
                    ? 'bg-black text-white hover:bg-[#00FF4C] hover:text-black' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Specifications */}
        {step === 2 && (
          <div className="bg-white rounded-2xl p-5 md:p-8 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-black">Specifications for {productName}</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm md:text-base text-black font-medium mb-2">Paper Type</label>
                <select 
                  value={formData.paperType}
                  onChange={(e) => handleSelect('paperType', e.target.value)}
                  className="w-full p-3 text-sm md:text-base border border-black rounded-full text-black bg-white"
                >
                  <option value="" className="text-black">Select paper type</option>
                  <option value="matte-90" className="text-black">Matte 90gsm</option>
                  <option value="matte-130" className="text-black">Matte 130gsm</option>
                  <option value="matte-170" className="text-black">Matte 170gsm</option>
                  <option value="glossy-130" className="text-black">Glossy 130gsm</option>
                  <option value="glossy-170" className="text-black">Glossy 170gsm</option>
                  <option value="glossy-250" className="text-black">Glossy 250gsm</option>
                  <option value="recycled-100" className="text-black">Recycled 100gsm</option>
                  <option value="cardstock-300" className="text-black">Card Stock 300gsm</option>
                  <option value="not-sure" className="text-black">Not Sure (Get Recommendations)</option>
                </select>
                
                {formData.paperType === 'not-sure' && (
                  <div className="mt-3 bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                    <p className="text-xs md:text-sm text-yellow-800">
                      <span className="font-medium">Note:</span> Our print experts will recommend the best paper type for your project based on industry standards.
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm md:text-base text-black font-medium mb-2">Color Options</label>
                <select 
                  value={formData.colorOption}
                  onChange={(e) => handleSelect('colorOption', e.target.value)}
                  className="w-full p-3 text-sm md:text-base border border-black rounded-full text-black bg-white"
                >
                  <option value="" className="text-black">Select color option</option>
                  <option value="4-0" className="text-black">Full Color Front (4+0)</option>
                  <option value="4-4" className="text-black">Full Color Both Sides (4+4)</option>
                  <option value="4-1" className="text-black">Color Front, B&W Back (4+1)</option>
                  <option value="1-0" className="text-black">Black & White Front Only (1+0)</option>
                  <option value="1-1" className="text-black">Black & White Both Sides (1+1)</option>
                  <option value="not-sure-color" className="text-black">Not Sure (Get Recommendations)</option>
                </select>
                
                {formData.colorOption === 'not-sure-color' && (
                  <div className="mt-3 bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                    <p className="text-xs md:text-sm text-yellow-800">
                      <span className="font-medium">Note:</span> Our print experts will help determine the best color options for your project.
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4">
                <label className="block text-sm md:text-base text-black font-medium mb-2">
                  Spot/Pantone Colors (Optional)
                </label>
                <input
                  type="text"
                  value={formData.spotColors || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, spotColors: e.target.value }))}
                  placeholder="e.g. PMS 2728 C, PMS 485 C"
                  className="w-full py-2 px-3 md:p-3 text-sm border border-black rounded-full text-black bg-white"
                />
                <p className="text-xs text-gray-600 mt-1 ml-1">
                  Enter Pantone color codes if you need specific brand colors in addition to your selection above.
                </p>
              </div>

              <div>
                <label className="block text-sm md:text-base text-black font-medium mb-2">Upload Design (Optional)</label>
                <div className="border-2 border-dashed border-black rounded-2xl p-6 text-center">
                  <p className="text-black text-sm md:text-base">Drag files here or click to upload</p>
                  <p className="text-xs md:text-sm text-gray-700 mt-1">PDF, AI, or INDD files</p>
                </div>
              </div>

              <div>
                <label className="block text-sm md:text-base text-black font-medium mb-2">Deadline</label>
                <div className="relative">
                  <input 
                    type="date"
                    value={formData.deadline ? formData.deadline.toISOString().split('T')[0] : ''}
                    onChange={(e) => handleSelect('deadline', new Date(e.target.value))}
                    className="w-full p-3 text-sm md:text-base border border-black rounded-full text-black bg-white"
                    min={new Date().toISOString().split('T')[0]}  // Can't select past dates
                  />
                </div>
              </div>

              <div className="flex gap-3 md:gap-4 mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 md:py-4 text-sm md:text-base border border-black rounded-full text-black hover:bg-black hover:text-white transition-colors overflow-hidden whitespace-nowrap"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-black text-white py-3 md:py-4 text-sm md:text-base rounded-full hover:bg-[#00FF4C] hover:text-black transition-colors overflow-hidden whitespace-nowrap"
                >
                  Continue →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Contact Details */}
        {step === 3 && (
          <div className="bg-white rounded-2xl p-5 md:p-8 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-black">Almost there!</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm md:text-base text-black font-medium mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => {
                    const newEmail = e.target.value
                    setFormData(prev => ({ ...prev, email: newEmail }))
                    
                    // Clear error when typing
                    setErrors(prev => ({ ...prev, email: '' }))
                  }}
                  onBlur={() => {
                    // Validate on blur (when user leaves the field)
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    if (!emailRegex.test(formData.email)) {
                      setErrors(prev => ({ 
                        ...prev, 
                        email: 'Please enter a valid email address' 
                      }))
                    }
                  }}
                  className={`w-full p-3 text-sm md:text-base border ${
                    errors.email ? 'border-red-500' : 'border-black'
                  } rounded-full text-black placeholder-gray-600 bg-white`}
                  placeholder="your@email.com"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-xs md:text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm md:text-base text-black font-medium mb-2">Phone (Optional)</label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => handleSelect('phone', e.target.value)}
                  className="w-full p-3 text-sm md:text-base border border-black rounded-full text-black placeholder-gray-600 bg-white"
                  placeholder="+45"
                />
              </div>

              <div>
                <label className="block text-sm md:text-base text-black font-medium mb-2">Additional Notes</label>
                <textarea 
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    notes: e.target.value
                  }))}
                  className="w-full p-3 text-sm md:text-base border border-black rounded-xl text-black placeholder-gray-600 bg-white"
                  rows={4}
                  placeholder="Any special requirements?"
                />
              </div>

              <div className="flex gap-3 md:gap-4 mt-6">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 py-3 md:py-4 text-sm md:text-base border border-black rounded-full text-black hover:bg-black hover:text-white transition-colors overflow-hidden whitespace-nowrap"
                >
                  ← Back
                </button>
                <button
                  onClick={() => formData.email ? setStep(4) : null}
                  className="flex-1 bg-black text-white py-3 md:py-4 text-sm md:text-base rounded-full hover:bg-[#00FF4C] hover:text-black transition-colors overflow-hidden whitespace-nowrap"
                >
                  Review Quote
                </button>
              </div>
            </div>
          </div>
        )}

        {/* New Step 4: Summary */}
        {step === 4 && (
          <div className="bg-white rounded-2xl p-5 md:p-8 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-black">Review Your Quote Request</h2>
            
            <div className="space-y-5">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg md:text-xl font-bold text-black mb-2 md:mb-4">Product Details</h3>
                <p className="text-sm md:text-base text-black">Product: {productName}</p>
                <p className="text-sm md:text-base text-black">Quantity: {formData.quantity === 'Custom' 
                  ? formData.customQuantity
                  : formData.quantity}</p>
                <p className="text-sm md:text-base text-black">Size: {formData.size === 'Custom Size' 
                  ? `Custom (${formData.customWidth}mm × ${formData.customHeight}mm)` 
                  : formData.size}</p>
                <p className="text-sm md:text-base text-black">Paper Type: {
                  (() => {
                    switch(formData.paperType) {
                      case 'matte-90': return 'Matte 90gsm';
                      case 'matte-130': return 'Matte 130gsm';
                      case 'matte-170': return 'Matte 170gsm';
                      case 'glossy-130': return 'Glossy 130gsm';
                      case 'glossy-170': return 'Glossy 170gsm';
                      case 'glossy-250': return 'Glossy 250gsm';
                      case 'recycled-100': return 'Recycled 100gsm';
                      case 'cardstock-300': return 'Card Stock 300gsm';
                      case 'not-sure': return 'Need Paper Recommendations';
                      default: return formData.paperType;
                    }
                  })()
                }</p>
                <p className="text-sm md:text-base text-black">Color: {
                  (() => {
                    switch(formData.colorOption) {
                      case '4-0': return 'Full Color Front (4+0)';
                      case '4-4': return 'Full Color Both Sides (4+4)';
                      case '4-1': return 'Color Front, B&W Back (4+1)';
                      case '1-0': return 'Black & White Front Only (1+0)';
                      case '1-1': return 'Black & White Both Sides (1+1)';
                      case 'not-sure-color': return 'Need Recommendations';
                      default: return formData.colorOption;
                    }
                  })()
                }</p>
                {formData.spotColors && (
                  <p className="text-sm md:text-base text-black">Spot/Pantone Colors: {formData.spotColors}</p>
                )}
                {formData.deadline && (
                  <p className="text-sm md:text-base text-black">Deadline: {new Date(formData.deadline).toLocaleDateString()}</p>
                )}
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg md:text-xl font-bold text-black mb-2 md:mb-4">Contact Information</h3>
                <p className="text-sm md:text-base text-black">Email: {formData.email}</p>
                {formData.phone && <p className="text-sm md:text-base text-black">Phone: {formData.phone}</p>}
              </div>

              {formData.notes && (
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg md:text-xl font-bold text-black mb-2 md:mb-4">Additional Notes</h3>
                  <p className="text-sm md:text-base text-black">{formData.notes}</p>
                </div>
              )}

              <div className="space-y-4 mt-6">
                {/* Action Buttons */}
                <div className="flex gap-3 md:gap-4">
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 py-3 md:py-4 text-sm md:text-base border border-black rounded-full text-black hover:bg-black hover:text-white transition-colors overflow-hidden whitespace-nowrap"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 bg-black text-white py-3 md:py-4 text-sm md:text-base rounded-full hover:bg-[#00FF4C] hover:text-black transition-colors overflow-hidden whitespace-nowrap"
                  >
                    Request Quote
                  </button>
                </div>
                
                {/* Bulk Quote Option */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-3">Need multiple products? Add this to your bulk quote:</p>
                    <div className="flex gap-3">
                      <button
                        onClick={handleAddToBulkQuote}
                        className="flex-1 bg-[#FF00CC] text-black py-3 md:py-4 text-sm md:text-base rounded-full hover:bg-[#ff56dd] transition-colors font-medium"
                      >
                        + Add to Bulk Quote
                      </button>
                      <Link
                        href="/quote/bulk"
                        className="flex-1 border border-[#FF00CC] text-[#FF00CC] py-3 md:py-4 text-sm md:text-base rounded-full hover:bg-[#FF00CC] hover:text-black transition-colors text-center font-medium"
                      >
                        Review Bulk Quote
                      </Link>
                    </div>
                    {isInQuote(slug) && (
                      <p className="text-xs text-green-600 mt-2">✓ This product is already in your bulk quote</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Floating Quote Panel */}
      {quoteItems.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="bg-[#FF00CC] text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                {quoteItems.length}
              </div>
              <div>
                <p className="text-sm font-medium text-black">
                  {quoteItems.length} item{quoteItems.length !== 1 ? 's' : ''} in quote
                </p>
                <Link
                  href="/quote/bulk"
                  className="text-xs text-[#FF00CC] hover:underline"
                >
                  Review Quote →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}