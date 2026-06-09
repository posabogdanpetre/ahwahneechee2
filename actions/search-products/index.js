// synthetic fixture — no sample data available from Action Planner
const MOCK_DATA = [
  {
    name: "Better Sweater® Fleece Jacket - Women's",
    price: "£115.00",
    category: "Fleece",
    rating: 4.7,
    review_count: 342,
    image_url: "https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw12345678/images/hi-res/25542_NENA.jpg"
  },
  {
    name: "Nano Puff® Jacket - Men's",
    price: "£200.00",
    category: "Jackets & Vests",
    rating: 4.8,
    review_count: 521,
    image_url: "https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw87654321/images/hi-res/84212_BLK.jpg"
  },
  {
    name: "Baggies™ Shorts 5\" - Kids'",
    price: "£35.00",
    category: "Shorts",
    rating: 4.6,
    review_count: 189,
    image_url: "https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw11223344/images/hi-res/67042_SNBL.jpg"
  }
]

module.exports = async ({ category = '', gender = '', query = '' }) => {
  const results = MOCK_DATA.filter(item => {
    if (category && item.category !== category) return false
    if (gender && !item.name.toLowerCase().includes(gender.toLowerCase().replace("'", ''))) return false
    if (query && !item.name.toLowerCase().includes(query.toLowerCase())) return false
    return true
  })

  const summary = results.length === 0
    ? `No products found matching the criteria.`
    : `Found ${results.length} product${results.length === 1 ? '' : 's'}${category ? ` in ${category}` : ''}${gender ? ` for ${gender}` : ''}${query ? ` matching "${query}"` : ''}.`

  return {
    content: [
      { type: 'text', text: summary }
    ],
    // structuredContent.products — bare array outputSchema; key derived from actionName "search_products"
    structuredContent: { products: results }
  }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/products?category=${category}&gender=${gender}&q=${query}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the Patagonia API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const url = new URL(`${process.env.API_BASE_URL}/products`)
 *   if (category) url.searchParams.set('category', category)
 *   if (gender) url.searchParams.set('gender', gender)
 *   if (query) url.searchParams.set('q', query)
 *   const res = await fetch(url, {
 *     headers: { 'Authorization': `Bearer ${process.env.API_KEY}` }
 *   })
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
