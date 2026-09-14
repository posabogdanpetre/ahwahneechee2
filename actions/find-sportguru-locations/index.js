// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
    {
        name: 'Magazin SportGuru Cluj',
        address: 'Strada Ploiesti nr. 39-45',
        city: 'Cluj-Napoca',
        phone: '0374 027 028',
        hours: 'Luni-Vineri: 10:00-19:00, Sambata: 09:00-16:00',
        latitude: 46.77733,
        longitude: 23.59703,
        services: ['In-store shopping', 'Order pickup'],
        pickup_available: true,
        bike_service_available: false,
    },
    {
        name: 'Magazin SportGuru Brasov',
        address: 'Strada Zaharia Stancu nr. 1, galeria Street Coresi (in parcare)',
        city: 'Brasov',
        phone: '0374 800 300',
        hours: 'Luni-Vineri: 10:00-21:00, Sambata-Duminica: 10:00-20:00',
        latitude: 45.67167,
        longitude: 25.61628,
        services: ['In-store shopping', 'Order pickup'],
        pickup_available: true,
        bike_service_available: false,
    },
    {
        name: 'Magazin SportGuru Iasi',
        address: 'Palas Shopping Street - Strada Palat nr. 3C, Cladire E3',
        city: 'Iasi',
        phone: '0374 026 026',
        hours: 'Luni-Vineri: 10:00-22:00, Sambata: 10:00-18:00',
        latitude: 47.15532,
        longitude: 27.58617,
        services: ['In-store shopping', 'Order pickup'],
        pickup_available: true,
        bike_service_available: false,
    },
    {
        name: 'Magazin SportGuru Timisoara',
        address: 'Pta Consiliul Europei 2, Iulius Mall',
        city: 'Timisoara',
        phone: '0374 670 000',
        hours: 'Luni-Duminica: 10:00-22:00',
        latitude: 45.72114,
        longitude: 21.26165,
        services: ['In-store shopping', 'Order pickup'],
        pickup_available: true,
        bike_service_available: false,
    },
];

module.exports = async ({
    location = '',
    latitude,
    longitude,
    service_needed = '',
    radius_km,
} = {}) => {
    if (!location || typeof location !== 'string' || !location.trim()) {
        return {
            content: [{ type: 'text', text: 'Please provide a location (city, address, postcode, or landmark) to search near.' }],
            // structuredContent.locations — derived from action name "find_sportguru_locations" (bare array outputSchema rule)
            structuredContent: { locations: [] },
        };
    }

    const query = location.trim().toLowerCase();
    const service = service_needed.trim().toLowerCase();

    let results = MOCK_DATA.filter((store) => {
        const haystack = [store.name, store.address, store.city]
            .filter(Boolean)
            .join(' ')
            .toLowerCase();
        return haystack.includes(query);
    });

    // No match on the query text — fall back to the full list so the user still
    // sees SportGuru stores to choose from rather than an empty map.
    if (results.length === 0) results = MOCK_DATA.slice();

    // Optional service filter: keep only stores that explicitly list the service,
    // and treat "bike"/"bicycle" as the bike_service_available flag.
    if (service) {
        const wantsBike = service.includes('bike') || service.includes('bicycle');
        const filtered = results.filter((store) => {
            if (wantsBike && store.bike_service_available === true) return true;
            const listed = Array.isArray(store.services) ? store.services : [];
            return listed.some((s) => String(s).toLowerCase().includes(service));
        });
        if (filtered.length > 0) results = filtered;
    }

    const nearest = results[0];
    const summary = `Found ${results.length} SportGuru location${results.length === 1 ? '' : 's'} near ${location.trim()}`
        + `${nearest ? ` — ${nearest.name} is the closest suitable match` : ''}.`
        + ' Confirm product stock or service capacity by phone before you travel.';

    return {
        content: [{ type: 'text', text: summary }],
        // structuredContent.locations — derived from action name "find_sportguru_locations" (bare array outputSchema rule)
        structuredContent: { locations: results },
    };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/stores?location=${location}&radius_km=${radius_km}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the website's API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const params = new URLSearchParams({ location });
 *   if (Number.isFinite(latitude)) params.set('lat', String(latitude));
 *   if (Number.isFinite(longitude)) params.set('lng', String(longitude));
 *   if (Number.isFinite(radius_km)) params.set('radius_km', String(radius_km));
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/stores?${params.toString()}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   );
 *   if (!res.ok) throw new Error(`API error: ${res.status}`);
 *   return await res.json();
 */
