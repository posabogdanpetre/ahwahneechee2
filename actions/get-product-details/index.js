// synthetic fixture — no sample data available from Action Planner
const MOCK_DATA = [
  {
    name: 'Better Sweater Fleece Jacket',
    description: 'A versatile midweight fleece jacket made with 100% recycled polyester fleece. Features a full-zip front with a storm flap, raglan sleeves for pack-wearing comfort, and a zippered left chest pocket. Fair Trade Certified™ sewn.',
    price: '$139.00',
    category: 'Jackets & Vests',
    materials: '100% recycled polyester fleece with a sweater-knit exterior and fleece interior',
    features: 'Full-zip front with storm flap, raglan sleeves, zippered chest pocket, micropolyester jersey trim on collar and cuffs, Fair Trade Certified™ sewn',
    fit: 'Regular',
    image_url: 'https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw1234abcd/images/hi-res/25528_NUVG.jpg'
  },
  {
    name: 'Nano Puff Jacket',
    description: 'Warm, windproof, water-resistant—the Nano Puff Jacket uses incredibly lightweight and highly compressible 60-g PrimaLoft Gold Insulation Eco 100% postconsumer recycled polyester with P.U.R.E. technology. Fair Trade Certified™ sewn.',
    price: '$249.00',
    category: 'Jackets & Vests',
    materials: 'Shell: 100% recycled polyester ripstop with DWR finish. Insulation: 60-g PrimaLoft Gold Insulation Eco 100% postconsumer recycled polyester',
    features: 'Center-front zipper with interior storm flap, two zippered handwarmer pockets, internal chest pocket doubles as stuffsack with reinforced carabiner clip-in loop, Fair Trade Certified™ sewn',
    fit: 'Regular',
    image_url: 'https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw5678efgh/images/hi-res/84212_BLK.jpg'
  },
  {
    name: 'Torrentshell 3L Rain Jacket',
    description: 'A simple, lightweight, waterproof/breathable rain jacket made with 3-layer H2No Performance Standard shell and a PFC-free DWR finish. Features an adjustable hood, two handwarmer pockets, and self-stuffs into the left handwarmer pocket. Fair Trade Certified™ sewn.',
    price: '$179.00',
    category: 'Jackets & Vests',
    materials: '3-layer 100% recycled nylon ripstop with H2No Performance Standard and PFC-free DWR finish',
    features: '2-way-adjustable hood, center-front zipper with external and internal storm flaps, two handwarmer pockets, venting pit zips, self-stuffs into left pocket, Fair Trade Certified™ sewn',
    fit: 'Regular',
    image_url: 'https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw9012ijkl/images/hi-res/85241_SMDB.jpg'
  }
]

module.exports = async ({ product_name }) => {
  // Validate required parameter
  if (!product_name || typeof product_name !== 'string' || !product_name.trim()) {
    return {
      content: [{ type: 'text', text: 'Please provide a product_name to retrieve details.' }],
      structuredContent: { product: null }
    }
  }

  const query = product_name.trim()

  // Look up the product by name (case-insensitive)
  const product = MOCK_DATA.find(p => p.name.toLowerCase() === query.toLowerCase())

  if (!product) {
    return {
      content: [{ type: 'text', text: `No product found with the name: ${product_name}` }],
      structuredContent: { product: null }
    }
  }

  // Return the product details
  return {
    content: [
      {
        type: 'text',
        text: `Found product: ${product.name}. ${product.description} Price: ${product.price}.`
      }
    ],
    // structuredContent.product — detail outputSchema; key derived from actionName "get_product_details"
    structuredContent: { product }
  }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/products?name=${encodeURIComponent(product_name)}
 *   or
 *   GET ${process.env.API_BASE_URL}/products/${productId}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the Patagonia website API
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
