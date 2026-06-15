module.exports = async ({ product_name = '' }) => {
  // Validate required parameter
  if (!product_name || typeof product_name !== 'string' || !product_name.trim()) {
    return {
      content: [{ type: 'text', text: 'Please provide a product_name to retrieve details.' }]
    }
  }

  const query = product_name.trim()

  // TODO: Replace MOCK_DATA with a real API call.
  // See the TODO block below the handler for endpoint details.
  const MOCK_DATA = [
    {
      "name": "Men's Torrentshell 3L Rain Jacket",
      "description": "Waterproof/breathable 3-layer rain jacket providing excellent performance, comfort and durability.",
      "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw3f39aea6/images/hi-res/85241_LMST.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
      "price": "£180",
      "category": "Men's Jackets"
    },
    {
      "name": "Women's Nano Puff Packable Insulated Jacket",
      "description": "Warm, windproof, water-resistant jacket with lightweight compressible insulation for packability.",
      "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwbdabaa49/images/hi-res/84218_SMDB.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
      "price": "£170",
      "category": "Women's Jackets"
    },
    {
      "name": "Men's Better Sweater Fleece Jacket",
      "description": "Warm, low-bulk full-zip jacket made of sweater-knit 100% recycled polyester fleece.",
      "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwf4894a9f/images/hi-res/25528_BLK.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
      "price": "£130",
      "category": "Men's Fleece"
    },
    {
      "name": "Women's Torrentshell 3L Rain Jacket",
      "description": "Exceptional waterproof/breathable rain jacket providing performance, comfort and durability.",
      "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw5b977282/images/hi-res/85246_BLK.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
      "price": "£180",
      "category": "Women's Jackets"
    },
    {
      "name": "Men's Durable Down Parka",
      "description": "Lofty 800-fill-power down belay jacket with two-way zipper and rock abrasion resistance.",
      "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw903101cf/images/hi-res/85520_SMDB.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
      "price": "£575",
      "category": "Men's Jackets"
    }
  ]

  // Look up the product by name (case-insensitive match)
  const item = MOCK_DATA.find(p => p.name.toLowerCase() === query.toLowerCase())

  if (!item) {
    return {
      content: [{ type: 'text', text: `No product found matching: ${product_name}` }]
    }
  }

  // structuredContent — flat single-object detail shape (widget reads sc directly, no wrapper key)
  return {
    content: [{ type: 'text', text: `Product details for ${item.name}: ${item.description} Available at ${item.price}.` }],
    structuredContent: { ...item }
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
 *   API_BASE_URL   Base URL of the Patagonia API
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
 *   return data
 */
