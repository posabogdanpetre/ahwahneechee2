// synthetic fixture — no sample data available from Action Planner
const MOCK_DATA = [
  {
    name: 'Patagonia London Store',
    address: '13-17 Foubert\'s Place',
    city: 'London',
    country: 'United Kingdom',
    phone: '+44 20 7287 9970',
    hours: 'Mon-Sat 10am-7pm, Sun 12pm-6pm',
    type: 'Patagonia Store'
  },
  {
    name: 'Mountain Sports',
    address: '23 High Street',
    city: 'Edinburgh',
    country: 'United Kingdom',
    phone: '+44 131 555 1234',
    hours: 'Mon-Sat 9am-6pm, Sun 11am-5pm',
    type: 'Authorized Dealer'
  },
  {
    name: 'Patagonia Berlin Store',
    address: 'Alte Schönhauser Str. 34',
    city: 'Berlin',
    country: 'Germany',
    phone: '+49 30 4000 5890',
    hours: 'Mon-Sat 10am-8pm',
    type: 'Patagonia Store'
  }
]

module.exports = async ({ city = '', country = '' }) => {
  if (!city || typeof city !== 'string' || !city.trim()) {
    return {
      content: [{ type: 'text', text: 'Please provide a city to search for nearby stores.' }],
      structuredContent: { stores: [] }
    }
  }

  const cityQuery = city.trim().toLowerCase()
  const results = MOCK_DATA.filter(store => {
    if (!store.city.toLowerCase().includes(cityQuery)) return false
    if (country && store.country !== country) return false
    return true
  })

  const summary = results.length === 0
    ? `No Patagonia stores found near ${city}.`
    : `Found ${results.length} Patagonia ${results.length === 1 ? 'store' : 'stores'} near ${city}.`

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
 *   GET ${process.env.API_BASE_URL}/store-locator?city=${city}&country=${country}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the Patagonia website API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the Patagonia website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const url = new URL(`${process.env.API_BASE_URL}/store-locator`)
 *   url.searchParams.append('city', city)
 *   if (country) url.searchParams.append('country', country)
 *   const res = await fetch(url.toString(), {
 *     headers: { 'Authorization': `Bearer ${process.env.API_KEY}` }
 *   })
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
