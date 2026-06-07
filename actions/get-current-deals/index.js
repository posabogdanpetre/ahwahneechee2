// synthetic fixture — no sample data available from Action Planner
const MOCK_DATA = [
  {
    name: 'Men\'s Down Sweater Jacket',
    original_price: '$249.00',
    sale_price: '$174.30',
    discount_percentage: '30% OFF',
    category: 'Jackets & Vests',
    image_url: 'https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw123456/images/hi-res/84674_BLK.jpg'
  },
  {
    name: 'Women\'s Better Sweater Fleece Jacket',
    original_price: '$139.00',
    sale_price: '$97.30',
    discount_percentage: '30% OFF',
    category: 'Fleece',
    image_url: 'https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw234567/images/hi-res/25542_SMDB.jpg'
  },
  {
    name: 'Baggies Shorts 5"',
    original_price: '$65.00',
    sale_price: '$45.50',
    discount_percentage: '30% OFF',
    category: 'Shorts & Pants',
    image_url: 'https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw345678/images/hi-res/57021_SPTR.jpg'
  }
]

module.exports = async ({ category = '', gender = '' }) => {
  // TODO: Replace MOCK_DATA with a real API call.
  // See the TODO block below the handler for endpoint details.

  // Filter deals by input args
  const results = MOCK_DATA.filter(item => {
    if (category && item.category !== category) return false
    // Note: gender filter would require gender field in API response
    // Current MOCK_DATA does not include gender metadata for filtering
    return true
  })

  // Build content summary
  const countText = results.length === 1 ? '1 deal' : `${results.length} deals`
  const filterText = category ? ` in ${category}` : ''
  const contentText = `Found ${countText}${filterText} currently available.`

  return {
    content: [
      { type: 'text', text: contentText }
    ],
    // structuredContent.deals — bare array outputSchema; key derived from actionName "get_current_deals"
    structuredContent: {
      deals: results
    }
  }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/web-specials?category=${category}&gender=${gender}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of Patagonia's API (e.g. https://www.patagonia.com/api)
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check Patagonia's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const url = new URL(`${process.env.API_BASE_URL}/web-specials`)
 *   if (category) url.searchParams.append('category', category)
 *   if (gender) url.searchParams.append('gender', gender)
 *   
 *   const res = await fetch(url.toString(), {
 *     headers: { 'Authorization': `Bearer ${process.env.API_KEY}` }
 *   })
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
