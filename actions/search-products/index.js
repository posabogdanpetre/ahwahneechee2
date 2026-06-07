// synthetic fixture — no sample data available from Action Planner
const MOCK_DATA = [
  {
    name: 'Men\'s Torrentshell 3L Jacket',
    price: '£159',
    category: 'Jackets & Vests',
    image_url: 'https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw12345678/images/hi-res/85240_BLK.jpg',
    product_url: 'https://www.patagonia.com/product/mens-torrentshell-3l-jacket/85240.html'
  },
  {
    name: 'Women\'s Better Sweater Fleece Jacket',
    price: '£119',
    category: 'Fleece',
    image_url: 'https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw87654321/images/hi-res/25542_NVYB.jpg',
    product_url: 'https://www.patagonia.com/product/womens-better-sweater-fleece-jacket/25542.html'
  },
  {
    name: 'Kids\' Retro Pile Jacket',
    price: '£89',
    category: 'Fleece',
    image_url: 'https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw11223344/images/hi-res/65625_SMDB.jpg',
    product_url: 'https://www.patagonia.com/product/kids-retro-pile-jacket/65625.html'
  }
]

module.exports = async ({ category = '', gender = '', query = '' }) => {
  const results = MOCK_DATA.filter(item => {
    if (category && item.category !== category) return false
    if (gender) {
      const itemGender = item.name.toLowerCase().includes('women') ? 'womens' :
                         item.name.toLowerCase().includes('men') && !item.name.toLowerCase().includes('women') ? 'mens' :
                         item.name.toLowerCase().includes('kids') ? 'kids' : ''
      if (itemGender !== gender) return false
    }
    if (query && !item.name.toLowerCase().includes(query.toLowerCase())) return false
    return true
  })

  const summary = results.length === 0
    ? `No products found${category ? ` in ${category}` : ''}${gender ? ` for ${gender}` : ''}${query ? ` matching "${query}"` : ''}.`
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
 * Suggested endpoint pattern (update based on actual Patagonia API):
 *   GET ${process.env.API_BASE_URL}/products?category=${category}&gender=${gender}&q=${query}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the Patagonia API (e.g. https://www.patagonia.com/api)
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the Patagonia website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const params = new URLSearchParams()
 *   if (category) params.append('category', category)
 *   if (gender) params.append('gender', gender)
 *   if (query) params.append('q', query)
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/products?${params.toString()}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */