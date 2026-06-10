// synthetic fixture — no sample data available from Action Planner
const MOCK_DATA = [
    {
        name: 'Patagonia SoHo',
        address: '72 Greene Street',
        city: 'New York',
        phone: '(212) 343-1776',
        hours: 'Mon-Sat 10am-8pm, Sun 11am-7pm',
        store_type: 'Retail Store'
    },
    {
        name: 'Patagonia Chicago',
        address: '48 East Walton Street',
        city: 'Chicago',
        phone: '(312) 951-0518',
        hours: 'Mon-Sat 10am-7pm, Sun 11am-6pm',
        store_type: 'Retail Store'
    },
    {
        name: 'Patagonia Portland Outlet',
        address: '907 NW Irving Street',
        city: 'Portland',
        phone: '(503) 525-2552',
        hours: 'Mon-Sun 10am-7pm',
        store_type: 'Outlet'
    }
]

module.exports = async ({ location = '' }) => {
    if (!location || typeof location !== 'string' || !location.trim()) {
        return {
            content: [{ type: 'text', text: 'Please provide a location (city name or postal code) to search for stores.' }],
            structuredContent: { stores: [] }
        }
    }

    const query = location.trim().toLowerCase()

    // Filter stores by matching city name or postal code (in a real implementation,
    // this would be a geocoded radius search via the API)
    const results = MOCK_DATA.filter(store =>
        store.city.toLowerCase().includes(query) ||
        store.address.toLowerCase().includes(query)
    )

    if (results.length === 0) {
        return {
            content: [{ type: 'text', text: `No Patagonia stores found near "${location}".` }],
            structuredContent: { stores: [] }
        }
    }

    const summary = results.length === 1
        ? `Found 1 Patagonia store near ${location}.`
        : `Found ${results.length} Patagonia stores near ${location}.`

    return {
        content: [{ type: 'text', text: summary }],
        // structuredContent.stores — bare array outputSchema; key derived from actionName "find_store"
        structuredContent: { stores: results }
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual Patagonia API):
 *   GET ${process.env.API_BASE_URL}/stores?location=${encodeURIComponent(location)}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the Patagonia store locator API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check Patagonia's website network requests for the correct
 *   store locator endpoint and any required auth headers.
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/stores?location=${encodeURIComponent(location)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   const data = await res.json()
 *   return data.stores || data
 */
