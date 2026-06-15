module.exports = async ({ query = '', category = '', gender = '' }) => {
  // TODO: Replace MOCK_DATA with a real API call.
  // See the TODO block below the handler for endpoint details.
  const MOCK_DATA = [
    {
      "name": "Men's Boulder Fork Rain Jacket",
      "description": "Low-profile 3-layer shell with exceptional waterproof/breathable protection.",
      "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwe30ba363/images/hi-res/85140_SMDB.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
      "price": 250,
      "category": "Jackets & Vests",
      "gender": "Men's",
      "colors_available": 3,
      "is_fair_trade": false
    },
    {
      "name": "Men's Triolet Alpine Jacket",
      "description": "Alpine climbing workhorse built to thrive in cold, snowy conditions with 3-layer waterproof fabric.",
      "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw95d91ca9/images/hi-res/83403_CPRG.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
      "price": 370,
      "category": "Jackets & Vests",
      "gender": "Men's",
      "colors_available": 4,
      "is_fair_trade": false
    },
    {
      "name": "Men's Windsweep Lightweight Windbreaker Jacket",
      "description": "Lightweight, packable windbreaker made of 100% organic cotton, Fair Trade Certified.",
      "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw3ae01c29/images/hi-res/20320_INBK.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
      "price": 210,
      "category": "Jackets & Vests",
      "gender": "Men's",
      "colors_available": 2,
      "is_fair_trade": true
    },
    {
      "name": "Women's Better Sweater Fleece Jacket",
      "description": "Warm full-zip jacket made of 100% recycled polyester with sweater-knit aesthetic.",
      "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwb74b05e1/images/hi-res/25543_NENA.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
      "price": 130,
      "category": "Fleece",
      "gender": "Women's",
      "colors_available": 5,
      "is_fair_trade": false
    },
    {
      "name": "Women's R1 Air Fleece Midlayer Zip-Neck",
      "description": "Lightweight, highly breathable, quick-drying technical fleece for cool conditions.",
      "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw2ade861d/images/hi-res/40251_QVLT.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
      "price": 120,
      "category": "Fleece",
      "gender": "Women's",
      "colors_available": 3,
      "is_fair_trade": false
    },
    {
      "name": "Women's Retro Pile Fleece Jacket",
      "description": "Heritage-inspired jacket made with 100% recycled polyester offering ultimate softness.",
      "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw7c2512d9/images/hi-res/22795_NAT.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
      "price": 140,
      "category": "Fleece",
      "gender": "Women's",
      "colors_available": 2,
      "is_fair_trade": false
    },
    {
      "name": "Women's Lightweight Synchilla Snap-T Fleece Pullover",
      "description": "Classic pullover providing everyday warmth with soft recycled polyester fleece.",
      "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw437708c0/images/hi-res/25455_KALB.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
      "price": 120,
      "category": "Fleece",
      "gender": "Women's",
      "colors_available": 4,
      "is_fair_trade": false
    }
  ]

  const results = MOCK_DATA.filter(item => {
    if (category && item.category !== category) return false
    if (gender && item.gender !== gender) return false
    if (query) {
      const q = query.toLowerCase()
      const nameMatch = item.name.toLowerCase().includes(q)
      const descMatch = item.description && item.description.toLowerCase().includes(q)
      if (!nameMatch && !descMatch) return false
    }
    return true
  })

  const summary = results.length === 0
    ? 'No products found matching your criteria.'
    : `Found ${results.length} Patagonia product${results.length === 1 ? '' : 's'}.`

  return {
    content: [{ type: 'text', text: summary }],
    // structuredContent.products — bare array outputSchema; key derived from actionName "search_products"
    structuredContent: { products: results }
  }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/products?query=${query}&category=${category}&gender=${gender}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the Patagonia API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const params = new URLSearchParams()
 *   if (query) params.append('query', query)
 *   if (category) params.append('category', category)
 *   if (gender) params.append('gender', gender)
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/products?${params.toString()}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
