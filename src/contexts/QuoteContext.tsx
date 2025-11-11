'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface QuoteItem {
  id: string
  name: string
  slug: string
  imageUrl: string
  quantity?: string
  size?: string
  customWidth?: string
  customHeight?: string
  paperType?: string
  colorOption?: string
  notes?: string
  deadline?: string
  customFields?: Record<string, string>
  designFile?: File | null
}

interface QuoteContextType {
  quoteItems: QuoteItem[]
  addToQuote: (item: Omit<QuoteItem, 'id'>) => void
  removeFromQuote: (id: string) => void
  updateQuoteItem: (id: string, updates: Partial<QuoteItem>) => void
  clearQuote: () => void
  isInQuote: (slug: string) => boolean
  getQuoteItem: (slug: string) => QuoteItem | undefined
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined)

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('printmarket-quote')
      if (saved) {
        try {
          setQuoteItems(JSON.parse(saved))
        } catch (error) {
          console.error('Error loading quote from localStorage:', error)
        }
      }
    }
  }, [])

  // Save to localStorage whenever quoteItems changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('printmarket-quote', JSON.stringify(quoteItems))
    }
  }, [quoteItems])

  const addToQuote = (item: Omit<QuoteItem, 'id'>) => {
    const id = `${item.slug}-${Date.now()}`
    const newItem: QuoteItem = { ...item, id }
    
    setQuoteItems(prev => {
      // Check if item with same slug already exists
      const existingIndex = prev.findIndex(existing => existing.slug === item.slug)
      if (existingIndex >= 0) {
        // Update existing item
        const updated = [...prev]
        updated[existingIndex] = { ...updated[existingIndex], ...newItem }
        return updated
      } else {
        // Add new item
        return [...prev, newItem]
      }
    })
  }

  const removeFromQuote = (id: string) => {
    setQuoteItems(prev => prev.filter(item => item.id !== id))
  }

  const updateQuoteItem = (id: string, updates: Partial<QuoteItem>) => {
    setQuoteItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    )
  }

  const clearQuote = () => {
    setQuoteItems([])
  }

  const isInQuote = (slug: string) => {
    return quoteItems.some(item => item.slug === slug)
  }

  const getQuoteItem = (slug: string) => {
    return quoteItems.find(item => item.slug === slug)
  }

  return (
    <QuoteContext.Provider value={{
      quoteItems,
      addToQuote,
      removeFromQuote,
      updateQuoteItem,
      clearQuote,
      isInQuote,
      getQuoteItem
    }}>
      {children}
    </QuoteContext.Provider>
  )
}

export function useQuote() {
  const context = useContext(QuoteContext)
  if (context === undefined) {
    throw new Error('useQuote must be used within a QuoteProvider')
  }
  return context
}
