export interface ProductConfig {
  sizes: { value: string; label: string }[]
  paperTypes: { value: string; label: string }[]
  colorOptions: { value: string; label: string }[]
  hasFileUpload: boolean
  hasDeadline: boolean
  customFields?: { key: string; label: string; type: 'text' | 'select' | 'number'; options?: { value: string; label: string }[] }[]
}

export const productConfigs: Record<string, ProductConfig> = {
  'business-card': {
    sizes: [
      { value: 'standard', label: 'Standard (85×55mm)' },
      { value: 'square', label: 'Square (55×55mm)' },
      { value: 'mini', label: 'Mini (70×40mm)' },
      { value: 'custom', label: 'Custom Size' }
    ],
    paperTypes: [
      { value: 'matte-300', label: 'Matte 300gsm' },
      { value: 'glossy-300', label: 'Glossy 300gsm' },
      { value: 'uncoated-300', label: 'Uncoated 300gsm' },
      { value: 'premium-350', label: 'Premium 350gsm' }
    ],
    colorOptions: [
      { value: '4-0', label: 'Full Color Front (4+0)' },
      { value: '4-4', label: 'Full Color Both Sides (4+4)' },
      { value: '1-0', label: 'Black & White Front Only (1+0)' },
      { value: '1-1', label: 'Black & White Both Sides (1+1)' }
    ],
    hasFileUpload: true,
    hasDeadline: false
  },
  'sticker': {
    sizes: [
      { value: 'small', label: 'Small (50×50mm)' },
      { value: 'medium', label: 'Medium (75×75mm)' },
      { value: 'large', label: 'Large (100×100mm)' },
      { value: 'custom', label: 'Custom Size' }
    ],
    paperTypes: [
      { value: 'vinyl', label: 'Vinyl (Waterproof)' },
      { value: 'paper', label: 'Paper (Indoor)' },
      { value: 'transparent', label: 'Transparent Vinyl' },
      { value: 'magnetic', label: 'Magnetic' }
    ],
    colorOptions: [
      { value: '4-0', label: 'Full Color (4+0)' },
      { value: '1-0', label: 'Black & White (1+0)' }
    ],
    hasFileUpload: true,
    hasDeadline: false,
    customFields: [
      { key: 'shape', label: 'Shape', type: 'select', options: [
        { value: 'square', label: 'Square' },
        { value: 'circle', label: 'Circle' },
        { value: 'rectangle', label: 'Rectangle' },
        { value: 'custom', label: 'Custom Shape' }
      ]}
    ]
  },
  'calendar': {
    sizes: [
      { value: 'a4', label: 'A4 (210×297mm)' },
      { value: 'a3', label: 'A3 (297×420mm)' },
      { value: 'a5', label: 'A5 (148×210mm)' },
      { value: 'custom', label: 'Custom Size' }
    ],
    paperTypes: [
      { value: 'matte-130', label: 'Matte 130gsm' },
      { value: 'matte-170', label: 'Matte 170gsm' },
      { value: 'glossy-130', label: 'Glossy 130gsm' },
      { value: 'glossy-170', label: 'Glossy 170gsm' }
    ],
    colorOptions: [
      { value: '4-0', label: 'Full Color (4+0)' },
      { value: '4-4', label: 'Full Color Both Sides (4+4)' }
    ],
    hasFileUpload: true,
    hasDeadline: true,
    customFields: [
      { key: 'year', label: 'Year', type: 'number' },
      { key: 'language', label: 'Language', type: 'select', options: [
        { value: 'english', label: 'English' },
        { value: 'danish', label: 'Danish' },
        { value: 'german', label: 'German' },
        { value: 'custom', label: 'Custom' }
      ]}
    ]
  },
  'poster': {
    sizes: [
      { value: 'a4', label: 'A4 (210×297mm)' },
      { value: 'a3', label: 'A3 (297×420mm)' },
      { value: 'a2', label: 'A2 (420×594mm)' },
      { value: 'a1', label: 'A1 (594×841mm)' },
      { value: 'a0', label: 'A0 (841×1189mm)' },
      { value: 'custom', label: 'Custom Size' }
    ],
    paperTypes: [
      { value: 'matte-130', label: 'Matte 130gsm' },
      { value: 'matte-170', label: 'Matte 170gsm' },
      { value: 'glossy-130', label: 'Glossy 130gsm' },
      { value: 'glossy-170', label: 'Glossy 170gsm' }
    ],
    colorOptions: [
      { value: '4-0', label: 'Full Color (4+0)' },
      { value: '1-0', label: 'Black & White (1+0)' }
    ],
    hasFileUpload: true,
    hasDeadline: false
  },
  'flyer': {
    sizes: [
      { value: 'a4', label: 'A4 (210×297mm)' },
      { value: 'a5', label: 'A5 (148×210mm)' },
      { value: 'a6', label: 'A6 (105×148mm)' },
      { value: 'dl', label: 'DL (99×210mm)' },
      { value: 'custom', label: 'Custom Size' }
    ],
    paperTypes: [
      { value: 'matte-90', label: 'Matte 90gsm' },
      { value: 'matte-130', label: 'Matte 130gsm' },
      { value: 'matte-170', label: 'Matte 170gsm' },
      { value: 'glossy-130', label: 'Glossy 130gsm' },
      { value: 'glossy-170', label: 'Glossy 170gsm' }
    ],
    colorOptions: [
      { value: '4-0', label: 'Full Color Front (4+0)' },
      { value: '4-4', label: 'Full Color Both Sides (4+4)' },
      { value: '4-1', label: 'Color Front, B&W Back (4+1)' }
    ],
    hasFileUpload: true,
    hasDeadline: false
  },
  'brochure': {
    sizes: [
      { value: 'a4', label: 'A4 (210×297mm)' },
      { value: 'a5', label: 'A5 (148×210mm)' },
      { value: 'a6', label: 'A6 (105×148mm)' },
      { value: 'custom', label: 'Custom Size' }
    ],
    paperTypes: [
      { value: 'matte-130', label: 'Matte 130gsm' },
      { value: 'matte-170', label: 'Matte 170gsm' },
      { value: 'glossy-130', label: 'Glossy 130gsm' },
      { value: 'glossy-170', label: 'Glossy 170gsm' }
    ],
    colorOptions: [
      { value: '4-0', label: 'Full Color Front (4+0)' },
      { value: '4-4', label: 'Full Color Both Sides (4+4)' },
      { value: '4-1', label: 'Color Front, B&W Back (4+1)' }
    ],
    hasFileUpload: true,
    hasDeadline: false,
    customFields: [
      { key: 'pages', label: 'Number of Pages', type: 'select', options: [
        { value: '2', label: '2 pages' },
        { value: '4', label: '4 pages' },
        { value: '6', label: '6 pages' },
        { value: '8', label: '8 pages' },
        { value: 'custom', label: 'Custom' }
      ]}
    ]
  },
  'postcard': {
    sizes: [
      { value: 'standard', label: 'Standard (105×148mm)' },
      { value: 'large', label: 'Large (148×210mm)' },
      { value: 'custom', label: 'Custom Size' }
    ],
    paperTypes: [
      { value: 'matte-300', label: 'Matte 300gsm' },
      { value: 'glossy-300', label: 'Glossy 300gsm' },
      { value: 'uncoated-300', label: 'Uncoated 300gsm' }
    ],
    colorOptions: [
      { value: '4-0', label: 'Full Color Front (4+0)' },
      { value: '4-4', label: 'Full Color Both Sides (4+4)' }
    ],
    hasFileUpload: true,
    hasDeadline: false
  },
  'book-hard': {
    sizes: [
      { value: 'a5', label: 'A5 (148×210mm)' },
      { value: 'a4', label: 'A4 (210×297mm)' },
      { value: 'b5', label: 'B5 (176×250mm)' },
      { value: 'custom', label: 'Custom Size' }
    ],
    paperTypes: [
      { value: 'matte-80', label: 'Matte 80gsm (Text)' },
      { value: 'matte-130', label: 'Matte 130gsm (Cover)' },
      { value: 'glossy-130', label: 'Glossy 130gsm (Cover)' }
    ],
    colorOptions: [
      { value: '4-0', label: 'Full Color Front (4+0)' },
      { value: '4-4', label: 'Full Color Both Sides (4+4)' },
      { value: '4-1', label: 'Color Front, B&W Back (4+1)' }
    ],
    hasFileUpload: true,
    hasDeadline: true,
    customFields: [
      { key: 'pages', label: 'Number of Pages', type: 'number' },
      { key: 'binding', label: 'Binding Type', type: 'select', options: [
        { value: 'hardcover', label: 'Hardcover' },
        { value: 'softcover', label: 'Softcover' },
        { value: 'spiral', label: 'Spiral Bound' }
      ]}
    ]
  },
  'magazine': {
    sizes: [
      { value: 'a4', label: 'A4 (210×297mm)' },
      { value: 'a5', label: 'A5 (148×210mm)' },
      { value: 'custom', label: 'Custom Size' }
    ],
    paperTypes: [
      { value: 'matte-80', label: 'Matte 80gsm (Text)' },
      { value: 'matte-130', label: 'Matte 130gsm (Cover)' },
      { value: 'glossy-130', label: 'Glossy 130gsm (Cover)' }
    ],
    colorOptions: [
      { value: '4-0', label: 'Full Color Front (4+0)' },
      { value: '4-4', label: 'Full Color Both Sides (4+4)' },
      { value: '4-1', label: 'Color Front, B&W Back (4+1)' }
    ],
    hasFileUpload: true,
    hasDeadline: true,
    customFields: [
      { key: 'pages', label: 'Number of Pages', type: 'number' },
      { key: 'binding', label: 'Binding Type', type: 'select', options: [
        { value: 'stapled', label: 'Stapled' },
        { value: 'perfect', label: 'Perfect Bound' },
        { value: 'saddle', label: 'Saddle Stitched' }
      ]}
    ]
  }
}

export function getProductConfig(slug: string): ProductConfig {
  return productConfigs[slug] || {
    sizes: [
      { value: 'a4', label: 'A4 (210×297mm)' },
      { value: 'a5', label: 'A5 (148×210mm)' },
      { value: 'custom', label: 'Custom Size' }
    ],
    paperTypes: [
      { value: 'matte-130', label: 'Matte 130gsm' },
      { value: 'glossy-130', label: 'Glossy 130gsm' }
    ],
    colorOptions: [
      { value: '4-0', label: 'Full Color (4+0)' },
      { value: '4-4', label: 'Full Color Both Sides (4+4)' }
    ],
    hasFileUpload: true,
    hasDeadline: false
  }
}



