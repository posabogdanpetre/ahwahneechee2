/**
 * find_store handler
 * 
 * Finds nearby Patagonia retail stores and authorized dealers based on a country or city,
 * returning store names, addresses, and contact information.
 */

// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
    {
        name: 'Patagonia Manchester',
        address: '51 King Street, Manchester M2 7AZ',
        phone: '+44 (0)161 834 4005',
        hours: ''
    },
    {
        name: 'Patagonia Bristol',
        address: '81 Park Street, Bristol BS1 5PF',
        phone: '+44 (0)1202017184',
        hours: ''
    }
]

module.exports = async ({ country = '', city = '' }) => {
    // Validate required parameters
    if (!country || typeof country !== 'string' || !country.trim()) {
        return {
            content: [{ type: 'text', text: 'Please provide a country to search for stores.' }],
            structuredContent: { stores: [] }
        }
    }

    const countryQuery = country.trim().toLowerCase()
    const cityQuery = city ? city.trim().toLowerCase() : null

    // Filter stores by country and optionally by city
    let results = MOCK_DATA.filter(store => {
        // In a real implementation, stores would have country/city metadata
        // For now, we'll match against the address field
        const addressLower = store.address.toLowerCase()
        
        // Simple country matching (would be more sophisticated with real data)
        const countryMatch = addressLower.includes(countryQuery) || 
                             store.address.includes(country.trim())
        
        if (!countryMatch) return false
        
        // If city is specified, filter by city
        if (cityQuery) {
            const cityMatch = addressLower.includes(cityQuery) ||
                             store.name.toLowerCase().includes(cityQuery)
            if (!cityMatch) return false
        }
        
        return true
    })

    // Add Google Maps directions URL if not present
    results = results.map(store => ({
        name: store.name,
        address: store.address,
        phone: store.phone,
        directions_url: store.directions_url || 
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address)}`
    }))

    // Build content text summary
    let contentText
    if (results.length === 0) {
        contentText = city 
            ? `No Patagonia stores found in ${city}, ${country}.`
            : `No Patagonia stores found in ${country}.`
    } else if (results.length === 1) {
        contentText = city
            ? `Found 1 Patagonia store in ${city}, ${country}: ${results[0].name} at ${results[0].address}.`
            : `Found 1 Patagonia store in ${country}: ${results[0].name} at ${results[0].address}.`
    } else {
        contentText = city
            ? `Found ${results.length} Patagonia stores in ${city}, ${country}.`
            : `Found ${results.length} Patagonia stores in ${country}.`
    }

    return {
        content: [{ type: 'text', text: contentText }],
        structuredContent: { stores: results }
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual Patagonia API):
 *   GET ${process.env.API_BASE_URL}/stores?country=${country}&city=${city}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the Patagonia store locator API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check Patagonia's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const url = new URL(`${process.env.API_BASE_URL}/stores`)
 *   url.searchParams.append('country', country)
 *   if (city) url.searchParams.append('city', city)
 *   
 *   const res = await fetch(url.toString(), {
 *     headers: { 
 *       'Authorization': `Bearer ${process.env.API_KEY}`,
 *       'Content-Type': 'application/json'
 *     }
 *   })
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   const stores = await res.json()
 *   
 *   // Transform to match outputSchema if needed
 *   return stores.map(store => ({
 *     name: store.name,
 *     address: store.address,
 *     phone: store.phone,
 *     directions_url: store.directions_url || 
 *       `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address)}`
 *   }))
 */
