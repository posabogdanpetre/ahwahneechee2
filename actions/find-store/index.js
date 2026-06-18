// synthetic fixture — no sample data available from Action Planner
const MOCK_DATA = [
  {
    name: 'Patagonia Retail Store - Seattle',
    address: '2100 1st Avenue, Seattle, WA 98121',
    phone: '(206) 622-9700',
    hours: 'Mon-Sat 10am-8pm, Sun 11am-6pm',
    type: 'Retail Store'
  },
  {
    name: 'Patagonia Retail Store - Portland',
    address: '907 NW Irving Street, Portland, OR 97209',
    phone: '(503) 525-6444',
    hours: 'Mon-Sat 10am-7pm, Sun 11am-6pm',
    type: 'Retail Store'
  },
  {
    name: 'Mountain Outfitters - Authorized Dealer',
    address: '1523 Main Street, Bend, OR 97701',
    phone: '(541) 555-0198',
    hours: 'Mon-Sun 9am-6pm',
    type: 'Authorized Dealer'
  }
]

module.exports = async ({ location = '' }) => {
  if (!location || typeof location !== 'string' || !location.trim()) {
    return {
      content: [{ type: 'text', text: 'Please provide a location (city name or postal code) to search for nearby stores.' }],
      structuredContent: { stores: [] }
    }
  }

  const query = location.trim().toLowerCase()

  // Filter MOCK_DATA by location — in a real implementation, the API would
  // perform geocoding and distance-based search
  const results = MOCK_DATA.filter(store => {
    const addressLower = store.address.toLowerCase()
    return addressLower.includes(query)
  })

  // structuredContent.stores — bare array outputSchema; key derived from actionName "find_store"
  return {
    content: [{ type: 'text', text: `Found ${results.length} Patagonia store(s) near ${location}.` }],
    structuredContent: { stores: results }
  }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/stores?location=${encodeURIComponent(location)}
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
 *     `${process.env.API_BASE_URL}/stores?location=${encodeURIComponent(location)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
