// synthetic fixture — no sample data available from Action Planner
const MOCK_DATA = [
  {
    name: 'Patagonia Portland',
    address: '907 NW Irving St, Portland, OR 97209',
    phone: '(503) 525-2552',
    hours: 'Mon-Sat 10am-7pm, Sun 11am-6pm',
    country: 'USA'
  },
  {
    name: 'Patagonia Boulder',
    address: '1431 Pearl St, Boulder, CO 80302',
    phone: '(303) 442-3577',
    hours: 'Mon-Sat 10am-8pm, Sun 10am-6pm',
    country: 'USA'
  },
  {
    name: 'Patagonia San Francisco',
    address: '770 North Point St, San Francisco, CA 94109',
    phone: '(415) 771-2050',
    hours: 'Mon-Sun 10am-7pm',
    country: 'USA'
  }
]

module.exports = async ({ location = '' }) => {
  // Validate required parameter
  if (!location || typeof location !== 'string' || !location.trim()) {
    return {
      content: [{ type: 'text', text: 'Please provide a location to search near.' }],
      structuredContent: { stores: [] }
    }
  }

  const query = location.trim().toLowerCase()

  // TODO: Replace MOCK_DATA with a real API call.
  // Filter mock data by location (match against address, city, or store name)
  const results = MOCK_DATA.filter(store => {
    return store.address.toLowerCase().includes(query) ||
           store.name.toLowerCase().includes(query) ||
           store.country.toLowerCase().includes(query)
  })

  const resultCount = results.length
  const summary = resultCount > 0
    ? `Found ${resultCount} Patagonia store${resultCount === 1 ? '' : 's'} near ${location}.`
    : `No Patagonia stores found near ${location}.`

  return {
    content: [{ type: 'text', text: summary }],
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
 * Authentication: check the Patagonia website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/stores?location=${encodeURIComponent(location)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   const data = await res.json()
 *   return data.stores || []
 */
