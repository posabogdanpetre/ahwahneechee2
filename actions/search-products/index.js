module.exports = async ({ category = '', gender = '', sport = '' }) => {
  // TODO: Replace MOCK_DATA with a real API call.
  // See the TODO block below the handler for endpoint details.
  const MOCK_DATA = [
    {
      "name": "Men's Nano Puff® Jacket",
      "description": "Lightweight, weather-resistant synthetic insulation layer that stays warm when wet.",
      "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw8079c0d9/images/hi-res/84213_BLSG.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
      "price": "£170",
      "category": "Insulated Jackets"
    },
    {
      "name": "Men's Down Sweater™ Insulated Jacket",
      "description": "Lightweight, windproof jacket with 800-fill-power recycled down for versatile warmth.",
      "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw3c83e113/images/hi-res/84675_CLOR.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
      "price": "",
      "category": "Insulated Jackets"
    },
    {
      "name": "Black Hole® MLC™ Convertible Carry On Backpack 45L",
      "description": "Versatile carry-on that converts between backpack, shoulder bag and duffel.",
      "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw229945d1/images/hi-res/49307_WSTO.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
      "price": "",
      "category": "Backpacks"
    }
  ]

  // Filter products based on input parameters
  const results = MOCK_DATA.filter(item => {
    if (category && item.category !== category) return false
    // Note: gender and sport filters would require those fields in the product data
    // Since MOCK_DATA doesn't have gender/sport fields, these filters have no effect
    return true
  })

  const count = results.length
  const summary = count > 0
    ? `Found ${count} product${count === 1 ? '' : 's'}${category ? ` in category "${category}"` : ''}${gender ? ` for ${gender}` : ''}${sport ? ` for ${sport}` : ''}.`
    : `No products found matching your criteria.`

  return {
    content: [
      { type: 'text', text: summary }
    ],
    // structuredContent.products — bare array outputSchema; key derived from actionName "search_products"
    structuredContent: {
      products: results
    }
  }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/products?category=${category}&gender=${gender}&sport=${sport}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the Patagonia API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the Patagonia website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const params = new URLSearchParams()
 *   if (category) params.append('category', category)
 *   if (gender) params.append('gender', gender)
 *   if (sport) params.append('sport', sport)
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/products?${params.toString()}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
