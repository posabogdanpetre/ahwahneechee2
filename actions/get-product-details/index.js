// synthetic fixture — no sample data available from Action Planner
const MOCK_DATA = [
  {
    name: 'Men\'s Better Sweater Fleece Jacket',
    price: 139,
    description: 'A warm, full-zip fleece jacket made from 100% recycled polyester with a sweater-knit exterior and fleece interior. Features a stand-up collar and zippered handwarmer pockets.',
    materials: '100% Recycled Polyester Fleece',
    weight: '13.4 oz (380 g)',
    fit: 'Regular fit',
    rating: 4.7,
    num_reviews: 1842,
    colors: ['Stonewash', 'Black', 'Navy Blue', 'Industrial Green'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    features: [
      'Stand-up collar with zipper garage',
      'Full-length zipper with internal wind flap',
      'Zippered handwarmer pockets',
      'Flat-seam construction reduces bulk and increases comfort'
    ],
    fair_trade: true,
    recycled_materials: true,
    image_url: 'https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw12345678/images/hi-res/25528_STH.jpg'
  },
  {
    name: 'Women\'s Nano Puff Jacket',
    price: 249,
    description: 'A lightweight, windproof, and water-resistant jacket insulated with PrimaLoft Gold Insulation Eco. Compressible and perfect for cold-weather layering.',
    materials: '100% Recycled Polyester Ripstop with DWR finish, PrimaLoft Gold Insulation Eco 60g',
    weight: '11.6 oz (329 g)',
    fit: 'Regular fit',
    rating: 4.8,
    num_reviews: 3256,
    colors: ['Black', 'Forge Grey', 'Classic Navy', 'Pesto'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    features: [
      'Horizontal quilt pattern with narrow horizontal quilting',
      'Center-front zipper with internal storm flap and zipper garage',
      'Two zippered handwarmer pockets',
      'Elasticized cuffs and adjustable drawcord hem'
    ],
    fair_trade: true,
    recycled_materials: true,
    image_url: 'https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw87654321/images/hi-res/84217_BLK.jpg'
  },
  {
    name: 'Baggies Shorts - 5"',
    price: 55,
    description: 'Quick-drying shorts with a classic fit, made from lightweight 100% recycled nylon. Built-in mesh liner and elastic waistband with drawstring.',
    materials: '100% Recycled Nylon with DWR finish',
    weight: '4.2 oz (119 g)',
    fit: 'Regular fit',
    rating: 4.6,
    num_reviews: 892,
    colors: ['Balkan Blue', 'Superior Blue', 'New Navy', 'Basin Green'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    features: [
      'Elasticized waistband with drawcord',
      'Built-in mesh liner',
      'On-seam side pockets and single rear pocket',
      'Quick-drying and packable'
    ],
    fair_trade: true,
    recycled_materials: true,
    image_url: 'https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw11223344/images/hi-res/57021_BSRB.jpg'
  }
]

module.exports = async ({ product_name = '', style_number = '' }) => {
  // Validate required parameter
  if (!product_name || typeof product_name !== 'string' || !product_name.trim()) {
    return {
      content: [{ type: 'text', text: 'Please provide a product_name to retrieve details for.' }],
      structuredContent: { item: null }
    }
  }

  const query = product_name.trim()

  // Look up product by name (case-insensitive)
  let item = MOCK_DATA.find(p => p.name.toLowerCase() === query.toLowerCase())

  // If style_number is provided, prioritize it over name
  if (style_number && style_number.trim()) {
    // Style number lookup would go here in production
    // For mock data, we fall back to name-based lookup
  }

  // If not found, try partial match
  if (!item) {
    item = MOCK_DATA.find(p => p.name.toLowerCase().includes(query.toLowerCase()))
  }

  if (!item) {
    return {
      content: [{ type: 'text', text: `No product found matching: ${product_name}` }],
      structuredContent: { item: null }
    }
  }

  // Build content text with key details
  const contentText = `Product: ${item.name}
Price: $${item.price}
Rating: ${item.rating}/5 (${item.num_reviews} reviews)
Materials: ${item.materials}
Available in ${item.colors.length} colors and ${item.sizes.length} sizes.
${item.fair_trade ? 'Fair Trade Certified. ' : ''}${item.recycled_materials ? 'Made with recycled materials.' : ''}`

  return {
    content: [{ type: 'text', text: contentText }],
    structuredContent: { item }
  }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual Patagonia API):
 *   GET ${process.env.API_BASE_URL}/products?name=${product_name}
 *   GET ${process.env.API_BASE_URL}/products/${style_number}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the Patagonia API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check Patagonia's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const endpoint = style_number
 *     ? `${process.env.API_BASE_URL}/products/${encodeURIComponent(style_number)}`
 *     : `${process.env.API_BASE_URL}/products?name=${encodeURIComponent(product_name)}`
 *   const res = await fetch(endpoint, {
 *     headers: { 'Authorization': `Bearer ${process.env.API_KEY}` }
 *   })
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */