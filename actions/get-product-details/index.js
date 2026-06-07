// synthetic fixture — no sample data available from Action Planner
const MOCK_DATA = [
  {
    name: 'Men\'s Nano Puff® Jacket',
    description: 'Lightweight, windproof, and compressible jacket with PrimaLoft® Gold Insulation Eco for warmth. Fair Trade Certified™ sewn.',
    price: '£199',
    category: 'Insulated Jackets',
    materials: 'Shell: 100% recycled polyester ripstop. Insulation: 60-g PrimaLoft® Gold Insulation Eco 100% postconsumer recycled polyester.',
    weight: '337 g (11.9 oz)',
    available_sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    image_url: 'https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw1a2b3c4d/images/hi-res/84212_BLK.jpg'
  },
  {
    name: 'Women\'s Down Sweater',
    description: 'Windproof, warm, and lightweight. 800-fill-power 100% Recycled Down insulation in a 100% recycled polyester shell. Fair Trade Certified™ sewn.',
    price: '£229',
    category: 'Down Jackets',
    materials: 'Shell: 100% recycled polyester with a DWR finish. Insulation: 800-fill-power 100% Recycled Down.',
    weight: '345 g (12.2 oz)',
    available_sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image_url: 'https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw5e6f7g8h/images/hi-res/84775_SNBL.jpg'
  },
  {
    name: 'Men\'s Torrentshell 3L Jacket',
    description: 'Waterproof, breathable, and packable rain jacket made with 3-layer H2No® Performance Standard shell. Fair Trade Certified™ sewn.',
    price: '£139',
    category: 'Rain Jackets',
    materials: 'Shell: 3-layer 50D 100% recycled nylon ripstop with H2No® Performance Standard and DWR finish.',
    weight: '397 g (14 oz)',
    available_sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image_url: 'https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw9a0b1c2d/images/hi-res/85240_FGE.jpg'
  }
]

module.exports = async ({ product_name = '' }) => {
  if (!product_name || typeof product_name !== 'string' || !product_name.trim()) {
    return {
      content: [{ type: 'text', text: 'Please provide a product_name to retrieve details.' }],
      structuredContent: { product: null }
    }
  }

  const query = product_name.trim()
  const product = MOCK_DATA.find(p => p.name.toLowerCase().includes(query.toLowerCase()))

  if (!product) {
    return {
      content: [{ type: 'text', text: `No product found matching: ${product_name}` }],
      structuredContent: { product: null }
    }
  }

  const summary = `${product.name} — ${product.price}. ${product.description} Available in sizes: ${product.available_sizes.join(', ')}.`

  return {
    content: [{ type: 'text', text: summary }],
    // structuredContent.product — named wrapper in outputSchema
    structuredContent: { product }
  }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual Patagonia API):
 *   GET ${process.env.API_BASE_URL}/products?name=${encodeURIComponent(product_name)}
 *   or
 *   GET ${process.env.API_BASE_URL}/products/${productId}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the Patagonia API (e.g., https://www.patagonia.com/api)
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/products?name=${encodeURIComponent(product_name)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   const data = await res.json()
 *   return data.products && data.products.length > 0 ? data.products[0] : null
 */
