'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useQuote } from '../../../contexts/QuoteContext'
import { getProductConfig } from '../../../config/productConfigs'

export default function BulkQuotePage() {
  const { quoteItems, removeFromQuote, updateQuoteItem, clearQuote } = useQuote()
  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: '',
    notes: ''
  })
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }

  const isItemReady = (item: any) => {
    const config = getProductConfig(item.slug)
    const hasRequiredFields = item.quantity && item.size && item.paperType && item.colorOption
    
    // Check if custom size is selected but no custom dimensions provided
    if (item.size === 'custom' && (!item.customWidth || !item.customHeight)) {
      return false
    }
    
    // Check if deadline is required but not provided
    if (config.hasDeadline && !item.deadline) {
      return false
    }
    
    return hasRequiredFields
  }

  const getReadyStatus = (item: any) => {
    if (isItemReady(item)) {
      return {
        status: 'ready',
        text: 'Ready to quote',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200'
      }
    }
    
    const config = getProductConfig(item.slug)
    const missingFields = []
    
    if (!item.quantity) missingFields.push('quantity')
    if (!item.size) missingFields.push('size')
    if (!item.paperType) missingFields.push('paper type')
    if (!item.colorOption) missingFields.push('color')
    if (item.size === 'custom' && (!item.customWidth || !item.customHeight)) missingFields.push('custom dimensions')
    if (config.hasDeadline && !item.deadline) missingFields.push('deadline')
    
    if (missingFields.length === 0) {
      return {
        status: 'ready',
        text: 'Ready to quote',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200'
      }
    }
    
    return {
      status: 'incomplete',
      text: `${missingFields.length} field${missingFields.length > 1 ? 's' : ''} needed`,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200'
    }
  }

  const handleSubmit = () => {
    const bulkQuote = {
      items: quoteItems,
      contact: contactInfo,
      timestamp: new Date().toISOString()
    }
    
    console.log('Bulk Quote Submission:', bulkQuote)
    
    // TODO: Send to API endpoint
    alert('Quote request submitted! (Check console for details)')
    
    // Clear the quote after submission
    clearQuote()
  }

  if (quoteItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FF00CC] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black mb-4">No Items in Quote</h1>
          <p className="text-xl text-black mb-8">Add some products to your quote first!</p>
          <Link 
            href="/marketplace"
            className="bg-black text-white px-8 py-4 rounded-full hover:bg-[#2C2C2C] transition-colors text-lg"
          >
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FF00CC]">
      {/* Navigation */}
      <nav className="relative flex justify-center items-center px-4 md:px-12 py-3 md:py-4 border-b border-black">
        <Link href="/marketplace" className="absolute left-4 md:left-12 text-black hover:underline">
          ← Back to Marketplace
        </Link>
        <h1 className="text-xl md:text-2xl font-bold text-black">Bulk Quote Request</h1>
        <button 
          onClick={clearQuote}
          className="absolute right-4 md:right-12 text-black hover:underline text-sm"
        >
          Clear All
        </button>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Quote Summary */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold text-black mb-4">
            Quote Summary ({quoteItems.length} items)
          </h2>
          <div className="space-y-4">
            {quoteItems.map((item) => {
              const config = getProductConfig(item.slug)
              const isExpanded = expandedItems.has(item.id)
              const hasBasicInfo = item.quantity || item.size || item.paperType || item.colorOption
              const readyStatus = getReadyStatus(item)
              
              return (
                <div key={item.id} className="border border-gray-200 rounded-lg bg-white shadow-sm">
                  {/* Header - Always Visible */}
                  <div 
                    className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleExpanded(item.id)}
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-bold text-black text-lg">{item.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${readyStatus.bgColor} ${readyStatus.color} ${readyStatus.borderColor} border`}>
                            {readyStatus.text}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          {hasBasicInfo && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              {item.quantity && <span>Qty: {item.quantity}</span>}
                              {item.size && <span>• Size: {config.sizes.find(s => s.value === item.size)?.label || item.size}</span>}
                              {item.paperType && <span>• Paper: {config.paperTypes.find(p => p.value === item.paperType)?.label || item.paperType}</span>}
                            </div>
                          )}
                          {!hasBasicInfo && (
                            <span className="text-sm text-gray-500">Click to configure</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            removeFromQuote(item.id)
                          }}
                          className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded hover:bg-red-50"
                          title="Remove from quote"
                        >
                          Remove
                        </button>
                        <div className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Content */}
                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-gray-100">
                      <div className="pt-4">
                        {/* Basic Configuration */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-black mb-1">Quantity</label>
                            <select
                              value={item.quantity || ''}
                              onChange={(e) => updateQuoteItem(item.id, { quantity: e.target.value })}
                              className="w-full p-2 text-sm border border-gray-300 rounded-lg"
                            >
                              <option value="">Select quantity</option>
                              <option value="100">100</option>
                              <option value="250">250</option>
                              <option value="500">500</option>
                              <option value="1000">1,000</option>
                              <option value="2500">2,500</option>
                              <option value="5000">5,000</option>
                              <option value="10000">10,000</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-black mb-1">Size</label>
                            <select
                              value={item.size || ''}
                              onChange={(e) => updateQuoteItem(item.id, { size: e.target.value })}
                              className="w-full p-2 text-sm border border-gray-300 rounded-lg"
                            >
                              <option value="">Select size</option>
                              {config.sizes.map((size) => (
                                <option key={size.value} value={size.value}>
                                  {size.label}
                                </option>
                              ))}
                            </select>
                            
                            {/* Custom Size Inputs */}
                            {item.size === 'custom' && (
                              <div className="mt-2 grid grid-cols-2 gap-2">
                                <div>
                                  <label className="block text-xs text-gray-600 mb-1">Width (mm)</label>
                                  <input
                                    type="number"
                                    min="10"
                                    max="1000"
                                    step="1"
                                    value={item.customWidth || ''}
                                    onChange={(e) => updateQuoteItem(item.id, { customWidth: e.target.value })}
                                    placeholder="e.g. 100"
                                    className="w-full p-2 text-sm border border-gray-300 rounded-lg"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs text-gray-600 mb-1">Height (mm)</label>
                                  <input
                                    type="number"
                                    min="10"
                                    max="1000"
                                    step="1"
                                    value={item.customHeight || ''}
                                    onChange={(e) => updateQuoteItem(item.id, { customHeight: e.target.value })}
                                    placeholder="e.g. 150"
                                    className="w-full p-2 text-sm border border-gray-300 rounded-lg"
                                  />
                                </div>
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-black mb-1">Paper Type</label>
                            <select
                              value={item.paperType || ''}
                              onChange={(e) => updateQuoteItem(item.id, { paperType: e.target.value })}
                              className="w-full p-2 text-sm border border-gray-300 rounded-lg"
                            >
                              <option value="">Select paper</option>
                              {config.paperTypes.map((paper) => (
                                <option key={paper.value} value={paper.value}>
                                  {paper.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-black mb-1">Color</label>
                            <select
                              value={item.colorOption || ''}
                              onChange={(e) => updateQuoteItem(item.id, { colorOption: e.target.value })}
                              className="w-full p-2 text-sm border border-gray-300 rounded-lg"
                            >
                              <option value="">Select color</option>
                              {config.colorOptions.map((color) => (
                                <option key={color.value} value={color.value}>
                                  {color.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Custom Fields */}
                        {config.customFields && config.customFields.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                            {config.customFields.map((field) => (
                              <div key={field.key}>
                                <label className="block text-sm font-medium text-black mb-1">
                                  {field.label}
                                </label>
                                {field.type === 'select' ? (
                                  <select
                                    value={item.customFields?.[field.key] || ''}
                                    onChange={(e) => updateQuoteItem(item.id, { 
                                      customFields: { 
                                        ...item.customFields, 
                                        [field.key]: e.target.value 
                                      } 
                                    })}
                                    className="w-full p-2 text-sm border border-gray-300 rounded-lg"
                                  >
                                    <option value="">Select {field.label.toLowerCase()}</option>
                                    {field.options?.map((option) => (
                                      <option key={option.value} value={option.value}>
                                        {option.label}
                                      </option>
                                    ))}
                                  </select>
                                ) : field.type === 'number' ? (
                                  <input
                                    type="number"
                                    value={item.customFields?.[field.key] || ''}
                                    onChange={(e) => updateQuoteItem(item.id, { 
                                      customFields: { 
                                        ...item.customFields, 
                                        [field.key]: e.target.value 
                                      } 
                                    })}
                                    className="w-full p-2 text-sm border border-gray-300 rounded-lg"
                                    placeholder={`Enter ${field.label.toLowerCase()}`}
                                  />
                                ) : (
                                  <input
                                    type="text"
                                    value={item.customFields?.[field.key] || ''}
                                    onChange={(e) => updateQuoteItem(item.id, { 
                                      customFields: { 
                                        ...item.customFields, 
                                        [field.key]: e.target.value 
                                      } 
                                    })}
                                    className="w-full p-2 text-sm border border-gray-300 rounded-lg"
                                    placeholder={`Enter ${field.label.toLowerCase()}`}
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Deadline for calendar and books */}
                        {config.hasDeadline && (
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-black mb-1">Deadline</label>
                            <input
                              type="date"
                              value={item.deadline || ''}
                              onChange={(e) => updateQuoteItem(item.id, { deadline: e.target.value })}
                              className="w-full p-2 text-sm border border-gray-300 rounded-lg"
                              min={new Date().toISOString().split('T')[0]}
                            />
                          </div>
                        )}

                        {/* File Upload */}
                        {config.hasFileUpload && (
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-black mb-1">Design File (Optional)</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                              <p className="text-sm text-gray-600 mb-2">Upload your design file</p>
                              <input
                                type="file"
                                accept=".pdf,.ai,.indd,.psd,.jpg,.png"
                                onChange={(e) => updateQuoteItem(item.id, { designFile: e.target.files?.[0] || null })}
                                className="text-sm"
                              />
                              <p className="text-xs text-gray-500 mt-1">PDF, AI, INDD, PSD, JPG, PNG</p>
                            </div>
                          </div>
                        )}

                        {/* Notes */}
                        <div>
                          <label className="block text-sm font-medium text-black mb-1">Special Notes</label>
                          <textarea
                            value={item.notes || ''}
                            onChange={(e) => updateQuoteItem(item.id, { notes: e.target.value })}
                            placeholder="Any special requirements or instructions..."
                            className="w-full p-2 text-sm border border-gray-300 rounded-lg"
                            rows={2}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold text-black mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={contactInfo.email}
                onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">Phone</label>
              <input
                type="tel"
                value={contactInfo.phone}
                onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="+45"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-black mb-2">Additional Notes</label>
            <textarea
              value={contactInfo.notes}
              onChange={(e) => setContactInfo(prev => ({ ...prev, notes: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows={3}
              placeholder="Any special requirements or deadlines?"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          {(() => {
            const allItemsReady = quoteItems.every(item => isItemReady(item))
            const canSubmit = contactInfo.email && allItemsReady
            
            return (
              <>
                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className={`px-12 py-4 rounded-full text-lg font-bold transition-colors ${
                    canSubmit
                      ? 'bg-black text-white hover:bg-[#2C2C2C]'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {allItemsReady ? 'Submit Bulk Quote Request' : 'Complete All Items First'}
                </button>
                <p className="text-sm text-gray-600 mt-2">
                  {allItemsReady 
                    ? "We'll send your request to relevant print shops and get back to you within 24 hours."
                    : `${quoteItems.filter(item => !isItemReady(item)).length} item${quoteItems.filter(item => !isItemReady(item)).length !== 1 ? 's' : ''} need${quoteItems.filter(item => !isItemReady(item)).length === 1 ? 's' : ''} configuration`
                  }
                </p>
              </>
            )
          })()}
        </div>
      </div>
    </div>
  )
}
