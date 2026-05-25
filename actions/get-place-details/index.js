/*
 * get-place-details action handler
 *
 * Returns the full cultural and historical details for one specific
 * Ahwahneechee sacred place, looked up by placeId.
 *
 * @param {object} params
 * @param {string} params.placeId - The place ID (e.g. "half-dome", "el-capitan").
 */

const PLACES = [
    {
        id: 'ahwahnee-valley',
        name: 'Yosemite Valley',
        nativeName: 'Ahwahnee',
        meaning: 'Place of a Gaping Mouth',
        type: 'Valley',
        shortDescription: 'The ancestral homeland of the Ahwahneechee people — a valley carved by glaciers and held sacred for countless generations.',
        description: 'The Ahwahneechee people have called this valley home for thousands of years. The name Ahwahnee — "place of a gaping mouth" — describes the dramatic cliffs that frame the valley\'s entrance. The Ahwahneechee lived in villages along the valley floor, gathering acorns from the black oak groves that once covered the land. Chief Tenaya, the last great leader of the Ahwahneechee, was born in exile and spent his life fighting to bring his scattered people back to this valley.',
        significance: 'Ancestral homeland; site of Ahwahneechee villages; where Chief Tenaya made his final stand against removal.',
        storyId: 'founding-of-ahwahnee',
        storyTitle: 'Chief Tenaya and the Return to Ahwahnee'
    },
    {
        id: 'half-dome',
        name: 'Half Dome',
        nativeName: 'Tis-sa-ack',
        meaning: 'The Weeping Woman',
        type: 'Rock Formation',
        shortDescription: 'The granite dome named after a woman transformed by grief — her tears still stain the rock face in dark streaks.',
        description: 'The Ahwahneechee name Tis-sa-ack refers to a woman who made the long journey to Ahwahnee carrying a heavy burden basket. According to oral tradition, she and her husband quarreled violently upon arriving — she drank the valley\'s lake dry, and in divine punishment both were turned to stone. Her weeping face is visible in the dark streaks on the dome\'s surface. Her husband became the smaller formation nearby, now called Washington Column.',
        significance: 'Marks the story of Tis-sa-ack; the dark vertical streaks on the granite face are said to be her tears; a reminder of the cost of selfishness and cruelty.',
        storyId: 'legend-of-tis-sa-ack',
        storyTitle: 'The Legend of Tis-sa-ack'
    },
    {
        id: 'bridalveil-fall',
        name: 'Bridalveil Fall',
        nativeName: 'Po-ho-no',
        meaning: 'Spirit of the Evil Wind',
        type: 'Waterfall',
        shortDescription: 'A 620-foot waterfall the Ahwahneechee considered cursed — its shifting winds were said to seize the spirit of those who lingered.',
        description: 'The Ahwahneechee regarded Po-ho-no with deep reverence and fear. The puffing, gusting wind that blows the water sideways is the breath of the spirit within the fall. Tradition held that gazing into the pool at the base could cause a person to be seized by the spirit of Po-ho-no and driven to wander forever, unable to return home. Warriors going on long journeys were warned: do not stop at Po-ho-no.',
        significance: 'Site of the Po-ho-no spirit legend; Ahwahneechee avoided camping near it; one of the most powerful spiritual warnings in the oral tradition.',
        storyId: 'spirit-of-pohono',
        storyTitle: 'The Spirit of Po-ho-no'
    },
    {
        id: 'el-capitan',
        name: 'El Capitan',
        nativeName: 'To-to-kon-oo-lah',
        meaning: 'Rock Chief',
        type: 'Rock Formation',
        shortDescription: 'The largest granite monolith on Earth — home to the Ahwahneechee\'s most beloved legend about patience defeating pride.',
        description: 'To the Ahwahneechee, To-to-kon-oo-lah was the "Rock Chief" — the undisputed giant among the valley\'s formations. Its sheer 3,000-foot face inspired the tribe\'s greatest legend: the story of two bear cubs stranded on its summit, rescued only by the humble measuring worm who climbed inch by inch what no other creature could. This story teaches that patience and quiet determination triumph over strength and pride.',
        significance: 'Subject of the Two Bears legend; the measuring worm Tu-tok-a-nu-la is the hero; symbol of perseverance in Ahwahneechee culture.',
        storyId: 'two-bears-of-el-capitan',
        storyTitle: 'The Two Bears and the Measuring Worm'
    },
    {
        id: 'yosemite-falls',
        name: 'Yosemite Falls',
        nativeName: 'Cho-lok',
        meaning: 'The Fall',
        type: 'Waterfall',
        shortDescription: 'The tallest waterfall in North America — to the Ahwahneechee, its spring roar was the voice of the valley awakening.',
        description: 'Cho-lok — simply "the fall" — was the most dramatic seasonal marker in Ahwahneechee life. In spring, fed by snowmelt, it thunders at full force. By late summer it slows to a trickle. The Ahwahneechee read the strength of Cho-lok as an indicator of the season\'s acorn harvest: a strong spring meant good rains and a full harvest. The area around the base was used for summer camps when the falls subsided.',
        significance: 'Seasonal calendar marker; the strength of the fall predicted the acorn harvest; site of summer camps.',
        storyId: 'founding-of-ahwahnee',
        storyTitle: 'Chief Tenaya and the Return to Ahwahnee'
    },
    {
        id: 'wawona',
        name: 'Wawona',
        nativeName: 'Pallachun',
        meaning: 'Good Place to Stop',
        type: 'Forest',
        shortDescription: 'A meadow crossroads at the edge of Ahwahneechee territory, where bands gathered to trade and the owl spirit kept watch.',
        description: 'Pallachun — "good place to stop" — was a crossroads in the Ahwahneechee world. The giant sequoias of the nearby Mariposa Grove held deep spiritual significance. The Ahwahneechee did not harvest the giant sequoias but gathered food, held ceremonies, and maintained trade relationships with neighboring tribes in the Wawona meadow. The name Wawona is said to be an onomatopoeia of the call of the great horned owl, the guardian spirit of the area.',
        significance: 'Trade crossroads; near the sacred Mariposa Grove sequoias; protected by the owl guardian spirit.',
        storyId: 'spirit-of-pohono',
        storyTitle: 'The Spirit of Po-ho-no'
    }
];

module.exports = async ({ placeId = '' }) => {
    const query = String(placeId).trim().toLowerCase();

    if (!query) {
        return {
            content: [{ type: 'text', text: 'Please provide a placeId to look up.' }],
            structuredContent: { place: null }
        };
    }

    const place = PLACES.find((p) => p.id === query);

    if (!place) {
        return {
            content: [{ type: 'text', text: `No Ahwahneechee place found for id: ${placeId}` }],
            structuredContent: { place: null }
        };
    }

    return {
        content: [
            {
                type: 'text',
                text: `${place.nativeName} (${place.name}) — ${place.meaning}\n\n${place.description}\n\nSignificance: ${place.significance}`
            }
        ],
        structuredContent: { place }
    };
};
