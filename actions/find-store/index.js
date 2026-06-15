// synthetic fixture — no sample data available from Action Planner
const MOCK_DATA = [
  {
    name: 'Patagonia Santa Monica',
    address: '1344 4th Street, Santa Monica, CA 90401',
    phone: '(310) 395-6710',
    hours: 'Mon-Sat 10am-8pm, Sun 11am-7pm',
    type: 'Patagonia Store'
  },
  {
    name: 'Summit Hut',
    address: '5045 E Speedway Blvd, Tucson, AZ 85712',
    phone: '(520) 325-1554',
    hours: 'Mon-Fri 10am-7pm, Sat 9am-6pm, Sun 11am-5pm',
    type: 'Authorized Dealer'
  },
  {
    name: 'Patagonia Portland',
    address: '907 NW Irving St, Portland, OR 97209',
    phone: '(503) 525-2552',
    hours: 'Mon-Sat 10am-7pm, Sun 11am-6pm',
    type: 'Patagonia Store'
  }
]

module.exports = async ({ location = '' }) => {
  if (!location || typeof location !== 'string' || !location.trim()) {
    return {
      content: [{ type: 'text', text: 'Please provide a location to search for stores.' }],
      structuredContent: { stores: [] }
    }
  }

  const query = location.trim().toLowerCase()

  // Filter MOCK_DATA by location (simple substring match on address)
  const results = MOCK_DATA.filter(store => 
    store.address.toLowerCase().includes(query) ||
    store.name.toLowerCase().includes(query)
  )

  const summary = results.length > 0
    ? `Found ${results.length} store${results.length === 1 ? '' : 's'} near ${location}.`
    : `No stores found near ${location}.`

  return {
    content: [{ type: 'text', text: summary }],
    // structuredContent.stores — bare array outputSchema; key derived from actionName "find_store"
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
 *   API_BASE_URL   Base URL of the Patagonia website API
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