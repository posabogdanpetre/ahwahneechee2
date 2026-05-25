/*
 * get-cultural-story action handler
 *
 * Returns an Ahwahneechee cultural legend or story.
 * Can be looked up by placeId (preferred) or storyId.
 * If neither is provided, returns a story at random.
 *
 * @param {object} params
 * @param {string} [params.placeId]  - The place ID to find the associated legend (e.g. "half-dome").
 * @param {string} [params.storyId] - The story ID as a direct lookup fallback (e.g. "legend-of-tis-sa-ack").
 */

const PLACE_STORY_MAP = {
    'ahwahnee-valley': 'founding-of-ahwahnee',
    'half-dome': 'legend-of-tis-sa-ack',
    'bridalveil-fall': 'spirit-of-pohono',
    'el-capitan': 'two-bears-of-el-capitan',
    'yosemite-falls': 'founding-of-ahwahnee',
    'wawona': 'spirit-of-pohono'
};

const STORIES = [
    {
        id: 'legend-of-tis-sa-ack',
        title: 'The Legend of Tis-sa-ack',
        placeId: 'half-dome',
        placeName: 'Half Dome (Tis-sa-ack)',
        excerpt: 'A woman carried her burdens all the way to Ahwahnee — but what she found there would transform her into stone for eternity.',
        text: `Long ago, before the valley had people, a woman named Tis-sa-ack and her husband made the long journey to Ahwahnee. She carried a great burden basket on her back; he walked behind her.

The journey was long and the couple quarreled bitterly along the way. When they finally reached the valley, Tis-sa-ack was consumed by thirst. She found the great lake that filled the valley floor and drank it entirely — emptying it into her burden basket so that nothing would be left for her husband.

Her husband, enraged, struck her. She turned and flung the basket at him. The water spilled across the valley floor and carved the river we see today.

For this act of selfishness and violence, the Great Spirit transformed them both to stone. Tis-sa-ack became the great dome, her face turned toward the sky. The dark streaks running down the granite — her tears — have never dried. Her husband became the pillar nearby, forever watching her.

The Ahwahneechee say that on quiet nights, when the wind moves through the valley, you can still hear Tis-sa-ack weeping for what was lost.`
    },
    {
        id: 'two-bears-of-el-capitan',
        title: 'The Two Bears and the Measuring Worm',
        placeId: 'el-capitan',
        placeName: 'El Capitan (To-to-kon-oo-lah)',
        excerpt: 'Two bear cubs fell asleep on a great rock and were carried to the sky — only the smallest, most patient creature dared to save them.',
        text: `Two young bear cubs were playing near the river one warm afternoon when they climbed onto a flat rock to rest. While they slept, the rock began to rise — slowly, impossibly — pushed upward by a power within the earth. By morning it had risen into the sky, carrying the cubs with it, until it became the great wall we now call To-to-kon-oo-lah.

The animals of the valley gathered in alarm. The mother bear cried out. One by one, the creatures attempted the rescue. The mouse jumped — and fell. The rat tried — and turned back. The elk charged at the rock and could not find a hold. The grizzly bear, mightiest of all, clawed his way up a few lengths before tumbling back.

Then, quietly, a tiny measuring worm named Tu-tok-a-nu-la approached the base of the rock.

"I will try," he said.

The other animals laughed. But Tu-tok-a-nu-la began to climb, inching forward — a fraction at a time — never rushing, never looking down. Day after day he rose. The animals below fell silent.

At last, Tu-tok-a-nu-la reached the summit and carried the cubs safely back to the valley floor.

The Ahwahneechee named the great rock in his honor: To-to-kon-oo-lah. And they tell his story whenever the proud forget that patience and quiet persistence outlast all strength.`
    },
    {
        id: 'spirit-of-pohono',
        title: 'The Spirit of Po-ho-no',
        placeId: 'bridalveil-fall',
        placeName: 'Bridalveil Fall (Po-ho-no)',
        excerpt: 'The Ahwahneechee feared Po-ho-no more than any other place in the valley — those who looked into its pool were never quite the same.',
        text: `Among all the places in Ahwahnee, none was spoken of with more caution than Po-ho-no.

The water there falls six hundred feet, but the wind — the puffing, unpredictable wind — catches it before it reaches the ground and pushes it sideways, into your face, into your eyes. This is the breath of Po-ho-no, the spirit who lives within the fall.

The Ahwahneechee knew that if a person stopped at Po-ho-no and looked too long into the pool below, the spirit would enter them. Not violently — but quietly. A restlessness would take hold. The person would begin to wander. They would leave the village, drawn toward distant ridges, toward places with no names. They would not be able to say why. And they would not come back.

Warriors going on long journeys were told: do not stop at Po-ho-no. Do not lean over the pool. Do not let the mist touch your closed eyes.

There are stories of young men who ignored this warning. One walked away from his village the morning after visiting the falls and was found weeks later far to the south, unable to explain his journey. Another simply disappeared.

The Ahwahneechee did not hate Po-ho-no. They respected it completely. Some spirits, they understood, do not wish to harm you — they simply wish to keep you.`
    },
    {
        id: 'founding-of-ahwahnee',
        title: 'Chief Tenaya and the Return to Ahwahnee',
        placeId: 'ahwahnee-valley',
        placeName: 'Yosemite Valley (Ahwahnee)',
        excerpt: 'Chief Tenaya was born in exile and raised with a prophecy: one day he would lead his scattered people back to Ahwahnee.',
        text: `Chief Tenaya was not born in the valley. His mother was Ahwahneechee; his father came from the Mono people east of the mountains. As a child, he was raised among the Mono, but he grew up hearing the stories of Ahwahnee — the valley his mother\'s people had been driven from by a plague that scattered them like seeds in a high wind.

An elder told young Tenaya: you will be a chief. You will gather what was scattered. You will go back.

Tenaya believed it. As a young man, he traveled across the Sierra and found the remnants of the Ahwahneechee people — a few families here, a few there, living among other tribes, half-forgotten. He spoke to each of them. He told them: come with me. Come home.

One by one, families came. They followed him west and over the mountains and into the valley. Tenaya named it again — Ahwahnee — and built his village beside the river.

He lived to see Ahwahnee full of life again. He also lived to see the first Americans arrive with soldiers.

When the Mariposa Battalion came in 1851 to remove the Ahwahneechee and place them on a reservation, Tenaya stood before them and said: we are not at war with you. This valley is our home. Let us stay.

They did not let him stay.

He was taken to the reservation. He escaped. He returned to Ahwahnee. He was captured again.

The Ahwahneechee remember Tenaya not as a figure of defeat, but as the man who kept the name alive long enough for it to matter — the valley still carries the name given to the hotel built within it: The Ahwahnee. And those who know the story know what it means.`
    }
];

module.exports = async ({ placeId = '', storyId = '' }) => {
    const normalizedPlaceId = String(placeId).trim().toLowerCase();
    const normalizedStoryId = String(storyId).trim().toLowerCase();

    let story;

    if (normalizedPlaceId) {
        const mappedStoryId = PLACE_STORY_MAP[normalizedPlaceId];
        if (mappedStoryId) {
            story = STORIES.find((s) => s.id === mappedStoryId);
        }
    }

    if (!story && normalizedStoryId) {
        story = STORIES.find((s) => s.id === normalizedStoryId);
    }

    if (!story) {
        story = STORIES[Math.floor(Math.random() * STORIES.length)];
    }

    return {
        content: [
            {
                type: 'text',
                text: `${story.title}\n\nPlace: ${story.placeName}\n\n${story.text}`
            }
        ],
        structuredContent: { story }
    };
};
