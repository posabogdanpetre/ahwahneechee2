// synthetic fixture — no sample data available from Action Planner
const MOCK_DATA = [
  {
    name: 'Patagonia Boulder',
    type: 'Retail Store',
    address: '2800 Pearl Street',
    city: 'Boulder',
    state: 'CO',
    zip: '80302',
    phone: '(303) 555-0198',
    hours: 'Mon-Sat 10am-7pm, Sun 11am-6pm',
    distance_miles: 1.2
  },
  {
    name: 'Summit Outfitters',
    type: 'Authorized Dealer',
    address: '1450 Canyon Boulevard',
    city: 'Boulder',
    state: 'CO',
    zip: '80302',
    phone: '(303) 555-0234',
    hours: 'Mon-Fri 9am-8pm, Sat-Sun 10am-6pm',
    distance_miles: 2.5
  },
  {
    name: 'Patagonia Outlet Denver',
    type: 'Outlet',
    address: '16000 E 40th Avenue',
    city: 'Denver',
    state: 'CO',
    zip: '80239',
    phone: '(720) 555-0145',
    hours: 'Mon-Sat 9am-9pm, Sun 10am-7pm',
    distance_miles: 28.3
  }
]

module.exports = async ({ location, radius_miles = 50 }) => {
  // Validate required parameter
  if (!location || typeof location !== 'string' || !location.trim()) {
    return {
      content: [{ type: 'text', text: 'Please provide a location (ZIP code, city name, or address) to search near.' }],
      structuredContent: { stores: [] }
    }
  }

  const query = location.trim()

  // TODO: Replace MOCK_DATA filtering with real API call (see TODO block below)
  // Filter by radius_miles
  const results = MOCK_DATA.filter(store => store.distance_miles <= radius_miles)

  const storeWord = results.length === 1 ? 'store' : 'stores'
  const contentText = results.length > 0
    ? `Found ${results.length} Patagonia ${storeWord} within ${radius_miles} miles of ${query}.`
    : `No Patagonia stores found within ${radius_miles} miles of ${query}. Try increasing the search radius.`

  return {
    content: [{ type: 'text', text: contentText }],
    structuredContent: { stores: results }
  }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual Patagonia API):
 *   GET ${process.env.API_BASE_URL}/stores/search?location=${encodeURIComponent(location)}&radius=${radius_miles}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the Patagonia store locator API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the Patagonia website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const url = `${process.env.API_BASE_URL}/stores/search?location=${encodeURIComponent(location)}&radius=${radius_miles}`
 *   const res = await fetch(url, {
 *     headers: {
 *       'Authorization': `Bearer ${process.env.API_KEY}`,
 *       'Content-Type': 'application/json'
 *     }
 *   })
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   const data = await res.json()
 *   return data.stores || []
 */