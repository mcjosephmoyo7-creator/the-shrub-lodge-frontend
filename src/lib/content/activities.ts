import { IMAGES } from "@/lib/images";

export type Activity = {
  name: string;
  description: string;
  price: number;
  image: string;
  /**
   * Direct booking page on The Shrub Lodge & Safari's WeTravel booking engine —
   * the same place the live site sends guests, so "Book Now" books the actual
   * activity rather than opening a contact form.
   */
  bookingUrl: string;
};

export type ActivityCategory = {
  slug: string;
  title: string;
  blurb: string;
  image: string;
  intro?: string;
  items: Activity[];
};

export const activitiesIntro =
  "At The Shrub Lodge, adventure meets serenity. Our tailored packages invite you to explore Zimbabwe's breathtaking landscapes, from thrilling game drives through Hwange National Park, to guided hikes, and cultural tours that connect you with local heritage. Whether you crave adrenaline or quiet discovery, our experiences are designed to immerse you in the beauty of Zimbabwe.";

export const satisfactionGuarantee =
  "We guarantee an exceptional travel experience, guided by knowledgeable experts and tailored to your unique interests. From unforgettable moments at iconic and hidden destinations to carefully planned itineraries, your comfort, safety, and satisfaction are always our top priorities.";

export const activityCategories: ActivityCategory[] = [
  {
    slug: "victoria-falls-scenic",
    title: "Victoria Falls & Scenic Experiences",
    blurb:
      "Experience the world-famous Victoria Falls up close with guided walks, iconic viewpoints, and once-in-a-lifetime natural wonders like Devil's Pool and Angel's Pool.",
    image: IMAGES.vicFalls,
    items: [
      {
        name: "Guided Tour of the Falls – Zimbabwe",
        price: 29,
        description:
          "Explore the awe-inspiring Victoria Falls from the Zimbabwean side on a guided walking tour led by experienced local guides. This side offers the most panoramic views of the Falls, with multiple viewpoints showcasing the full width and power of the cascading water. Guests learn about the geology, history, and local legends while enjoying one of Africa's most iconic natural wonders.",
        image: IMAGES.fallsZimbabwe,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/guided-tour-of-the-falls-zimbabwe-the-shrub-lodge-and-safari-0860987395",
      },
      {
        name: "Guided Tour of the Falls – Zambia",
        price: 70,
        description:
          "Discover a different perspective of Victoria Falls on a guided tour from the Zambian side. This experience offers closer access to the Falls, dramatic viewpoints, and seasonal opportunities to view the Eastern Cataract up close.",
        image: IMAGES.fallsZambia,
        bookingUrl: "https://www.wetravel.com/i/69cb2093d7b22e907d63e647",
      },
      {
        name: "Devils Pool Morning Breeze",
        price: 159,
        description:
          "Start your day with an unforgettable swim at Devil's Pool, located on the edge of Victoria Falls. The Morning Breeze experience offers cooler temperatures and softer light, perfect for photography and relaxed enjoyment. Guests are guided safely to the pool for a once-in-a-lifetime view over the edge of the Falls.",
        image: IMAGES.morningBreeze,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/devils-pool-morning-breeze-the-shrub-lodge-and-safari-4875262064",
      },
      {
        name: "Devils Pool High Tea",
        price: 199,
        description:
          "Combine adventure with indulgence on the Devil's Pool High Tea experience. After swimming at the edge of Victoria Falls, guests enjoy a beautifully presented high tea on Livingstone Island.",
        image: IMAGES.devil,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/devils-pool-high-tea-the-shrub-lodge-and-safari-2933819189",
      },
      {
        name: "Devils Pool Lunch",
        price: 209,
        description:
          "Enjoy the ultimate Devil's Pool experience paired with a gourmet lunch on Livingstone Island. After your guided swim at the edge of the Falls, relax and dine while taking in sweeping river views.",
        image: IMAGES.devilLunch,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/devil-s-pool-lunch-slot-the-shrub-lodge-and-safari-52422058",
      },
      {
        name: "Angels Pool Morning Breeze",
        price: 149,
        description:
          "Located near Devil's Pool, Angel's Pool offers a gentler but equally memorable experience. The Morning Breeze option allows guests to swim safely close to the Falls while enjoying spectacular views and cooler early-day conditions.",
        image: IMAGES.angel,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/angels-pool-morning-breeze-the-shrub-lodge-and-safari-9973164059",
      },
      {
        name: "Historic Bridge Tour",
        price: 64,
        description:
          "Step back in time on a guided walking tour of the iconic Victoria Falls Bridge. Learn about its fascinating history, engineering, and role in regional development while enjoying breathtaking views of the gorge and river below. A perfect blend of history, culture, and scenery.",
        image: IMAGES.bridgeTour,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/historic-bridge-tour-the-shrub-lodge-and-safari-56272554",
      },
      {
        name: "Batoka Hike",
        price: 58,
        description:
          "Explore the dramatic landscapes of the Batoka Gorge on a guided hiking experience. Descend into the gorge to witness towering cliffs, ancient rock formations, and the Zambezi River flowing far below. This hike offers a rewarding adventure for nature lovers and guests seeking a deeper connection with the landscape.",
        image: IMAGES.batoka,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/batoka-hike-the-shrub-lodge-and-safari-1284904627",
      },
      {
        name: "Bamba Tram Sunrise Bridge Run",
        price: 75,
        description:
          "Experience the magic of sunrise aboard the Bamba Tram as it crosses the Victoria Falls Bridge. This early-morning journey offers peaceful views of the gorge, river, and rising mist from the Falls.",
        image: IMAGES.bambaTram,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/bamba-tram-sunrise-bridge-run-the-shrub-lodge-and-safari-2363954377",
      },
    ],
  },
  {
    slug: "safari-wildlife-nature",
    title: "Safari, Wildlife & Nature",
    blurb:
      "Explore Southern Africa's rich wildlife through game drives, walking safaris, and birding experiences across renowned national parks and reserves.",
    image: IMAGES.safari,
    items: [
      {
        name: "Hwange Full Day Trip",
        price: 280,
        description:
          "Travel to Hwange National Park, Zimbabwe's largest and most diverse wildlife reserve. This full-day safari offers excellent opportunities to see elephants, lions, buffalo, giraffe, and a wide variety of plains game. Guests enjoy guided game drives through varied landscapes, making it a rewarding and authentic safari experience.",
        image: IMAGES.hwange,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/full-day-hwange-the-shrub-lodge-and-safari-72616455",
      },
      {
        name: "Chobe Full Day Trip",
        price: 168,
        description:
          "Experience a cross-border safari to Chobe National Park, renowned for its large elephant population and rich wildlife. The full-day trip typically includes a game drive and a scenic river cruise, offering exceptional wildlife viewing from both land and water.",
        image: IMAGES.chobe,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/chobe-full-day-trip-the-shrub-lodge-and-safari-3550063136",
      },
      {
        name: "Chobe 2 Days & 1 Night",
        price: 350,
        description:
          "Enjoy an overnight safari adventure in Chobe National Park, allowing more time to explore this wildlife-rich region. With guided game drives, a river cruise, and comfortable accommodation, this experience offers a deeper immersion into Botswana's iconic safari landscapes and abundant wildlife.",
        image: IMAGES.chobeOvernight,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/chobe-2-days-1-night-the-shrub-lodge-and-safari-4494522490",
      },
      {
        name: "3hr AM / PM Zambezi National Park Game Drive",
        price: 81,
        description:
          "Explore the wilderness of Zambezi National Park on a guided morning or afternoon game drive. Located close to Victoria Falls, the park is home to elephants, buffalo, antelope, and birdlife, offering a convenient yet rewarding safari experience.",
        image: IMAGES.gameDriveZambezi,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/am-pm-game-drive-the-shrub-lodge-and-safari-44461765",
      },
      {
        name: "3hr AM / PM Game Drive through Zambezi & Chamabondo National Park",
        price: 81,
        description:
          "Discover the diverse ecosystems of Zambezi National Park and Chamabondo National Park on a guided game drive. This experience showcases varied terrain and excellent wildlife viewing opportunities close to Victoria Falls.",
        image: IMAGES.gameDriveChamabondo,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/am-pm-game-drive-the-shrub-lodge-and-safari-44461765",
      },
      {
        name: "Night Game Drive + Bush Dinner",
        price: 159,
        description:
          "Experience the African wilderness after dark on a guided night game drive, when nocturnal animals become active. The adventure is followed by a traditional bush dinner under the stars, combining wildlife encounters with a memorable outdoor dining experience.",
        image: IMAGES.nightDrive,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/safari-night-drive-the-shrub-lodge-and-safari-87961137",
      },
      {
        name: "Safari Game Walk",
        price: 132,
        description:
          "Enjoy a guided walking safari led by experienced professional guides. This immersive experience focuses on tracking, animal behaviour, and the smaller details of the bush, offering a deeper understanding of the African ecosystem on foot.",
        image: IMAGES.gameWalk,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/safari-game-walk-the-shrub-lodge-and-safari-91524611",
      },
      {
        name: "Horseback Safari",
        price: 196,
        description:
          "Explore the African bush on horseback for a unique and tranquil safari experience. Ride through natural landscapes while observing wildlife from a different perspective, ideal for guests seeking a peaceful yet adventurous way to connect with nature.",
        image: IMAGES.horseback,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/horseback-safari-the-shrub-lodge-and-safari-93417222",
      },
      {
        name: "Rhino Walk Only",
        price: 60,
        description:
          "Join a guided rhino tracking walk for a rare and meaningful wildlife encounter. Guests walk with experienced guides to observe rhinos in their natural habitat.",
        image: IMAGES.rhino,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/rhino-walk-the-shrub-lodge-and-safari-95448471",
      },
      {
        name: "Safari Game Drive + Rhino Walk",
        price: 85,
        description:
          "Combine a classic safari game drive with a guided rhino walk for a diverse wildlife experience. This option offers both vehicle-based game viewing and an up-close, educational encounter focused on rhino conservation.",
        image: IMAGES.rhinoWalk,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/safari-game-drive-rhino-walk-the-shrub-lodge-and-safari-0979358010",
      },
      {
        name: "5 Hour Birding Safari",
        price: 134,
        description:
          "Discover the rich birdlife of the Victoria Falls region on a guided birding safari. This experience is ideal for bird enthusiasts, with opportunities to spot a wide variety of resident and migratory species across riverine and bush habitats.",
        image: IMAGES.birding,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/5hour-birding-safari-the-shrub-lodge-and-safari-4601233195",
      },
      {
        name: "Fishing",
        price: 180,
        description:
          "Enjoy a relaxing fishing experience on the Zambezi River, one of Africa's most famous waterways. Whether you are an experienced angler or a beginner, this guided activity offers the chance to fish for iconic species while enjoying the peaceful river surroundings.",
        image: IMAGES.fishing,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/fishing-the-shrub-lodge-and-safari-48118646",
      },
    ],
  },
  {
    slug: "animal-encounters",
    title: "Animal Encounters & Conservation",
    blurb:
      "Get closer to Africa's most incredible animals through ethical, conservation-focused encounters designed to educate, inspire, and protect wildlife.",
    image: IMAGES.animals,
    items: [
      {
        name: "Elephant Experience",
        price: 170,
        description:
          "Enjoy a close and educational encounter with African elephants in a natural environment. This guided experience allows guests to observe elephant behavior, learn about their intelligence and social structure, and gain insight into conservation and protection efforts. A meaningful and memorable wildlife interaction.",
        image: IMAGES.elephant,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/elephant-experience-the-shrub-lodge-and-safari-5755505830",
      },
      {
        name: "Lion Walking Safari",
        price: 170,
        description:
          "Join a guided walking safari alongside lions under the supervision of experienced professionals. This unique experience offers insight into lion behavior, tracking, and conservation while exploring the natural bush environment.",
        image: IMAGES.lionWalk,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/lion-walk-safari-the-shrub-lodge-and-safari-35477098",
      },
      {
        name: "Feast of the Beasts Lion Safari",
        price: 100,
        description:
          "Experience an unforgettable safari focused on observing lions during feeding time. Guests learn about lion hierarchy, behaviour, and conservation while witnessing these powerful animals up close in a controlled setting.",
        image: IMAGES.lion,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/feast-of-the-beasts-lion-safari-the-shrub-lodge-and-safari-08906818",
      },
      {
        name: "Cheetah Interaction",
        price: 170,
        description:
          "Meet one of Africa's most elegant predators during a guided cheetah interaction. Guests have the opportunity to learn about cheetah conservation, behaviour, and survival challenges while observing these incredible animals in a calm and informative setting.",
        image: IMAGES.cheetah,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/cheetah-interaction-the-shrub-lodge-and-safari-6419871219",
      },
      {
        name: "Crocodile Cage Diving",
        price: 85,
        description:
          "Experience an adrenaline-filled encounter with Nile crocodiles from the safety of a protective cage. This thrilling activity offers a close-up view of these ancient reptiles while guides provide insight into their behaviour and ecology.",
        image: IMAGES.crocodileDive,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/crocodile-cage-diving-the-shrub-lodge-and-safari-62149592",
      },
      {
        name: "Crocodile Farm Tour",
        price: 35,
        description:
          "Take a guided tour of a crocodile farm to learn about crocodile breeding, conservation, and farming practices. Guests gain insight into the lifecycle of crocodiles while observing them at various stages of growth.",
        image: IMAGES.crocodileFarm,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/crocodile-farm-tour-the-shrub-lodge-and-safari-75107645",
      },
    ],
  },
  {
    slug: "cruises-river",
    title: "Cruises & River Experiences",
    blurb:
      "Relax on the Zambezi River with luxury sunset cruises, dinner experiences, and scenic river adventures offering unmatched views and tranquillity.",
    image: IMAGES.cruises,
    items: [
      {
        name: "Ra-Ikane Luxury Cruise",
        price: 94,
        description:
          "Sail along the tranquil waters of the Zambezi River aboard the Ra-Ikane, a luxury teak riverboat offering an intimate and elegant experience. Guests enjoy attentive service, premium refreshments, and exceptional wildlife viewing as the sun sets over the river.",
        image: IMAGES.cruiseRa,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/ra-ikane-luxury-cruise-the-shrub-lodge-and-safari-24088703",
      },
      {
        name: "Zambezi Explorer Signature Deck Cruise",
        price: 150,
        description:
          "Experience the Zambezi River in style on the Signature Deck of the Zambezi Explorer. This premium cruise offers panoramic views, gourmet canapés, and a relaxed atmosphere while drifting past wildlife-rich riverbanks.",
        image: IMAGES.cruiseExplorer,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/zambezi-explorer-signature-deck-cruise-the-shrub-lodge-and-safari-45558076",
      },
      {
        name: "Zambezi Vista Luxury Sunset Cruise",
        price: 80,
        description:
          "Enjoy a sophisticated sunset cruise with elevated river views and personalized service. The Zambezi Vista offers comfortable seating, quality refreshments, and excellent photo opportunities as the river glows in the evening light. A perfect blend of luxury and natural beauty.",
        image: IMAGES.cruiseVista,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/zambezi-vista-luxury-sunset-cruise-the-shrub-lodge-and-safari-49188789",
      },
      {
        name: "Standard Sunset Cruise",
        price: 52,
        description:
          "Relax on a scenic sunset cruise along the Zambezi River, featuring comfortable seating, refreshments, and opportunities to spot wildlife along the banks. This popular experience offers a peaceful way to unwind while enjoying one of Africa's most beautiful sunsets.",
        image: IMAGES.cruiseSunset,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/standard-sunset-cruise-the-shrub-lodge-and-safari-7608875838",
      },
      {
        name: "Sunrise Cruise",
        price: 62,
        description:
          "Start your day with a calm and scenic sunrise cruise on the Zambezi River. Watch the landscape awaken as the sun rises over the water, with chances to see wildlife and birdlife in the early morning light. A serene and refreshing experience.",
        image: IMAGES.cruiseSunrise,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/sunrise-cruise-the-shrub-lodge-and-safari-8251847970",
      },
      {
        name: "Malachite Dinner Cruise",
        price: 125,
        description:
          "Indulge in an elegant evening aboard the Malachite Dinner Cruise, featuring a freshly prepared multi-course meal served on the river. Enjoy fine dining, attentive service, and a tranquil night-time cruise under the African sky.",
        image: IMAGES.cruiseDinner,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/malachite-dinner-cruise-the-shrub-lodge-and-safari-3393529989",
      },
      {
        name: "Rafting | Luxury Dinner Cruise | Helicopter Ride",
        price: 402,
        description:
          "Experience the ultimate Victoria Falls adventure combination. Enjoy an exhilarating white water rafting trip, followed by a luxury dinner cruise on the Zambezi River, and complete the day with a scenic helicopter flight over the Falls.",
        image: IMAGES.cruiseCombo,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/rafting-luxury-dinner-cruise-helicopter-ride-the-shrub-lodge-and-safari-59249582",
      },
      {
        name: "2 Nights Sunset Cruise & Guided Tour",
        price: 465,
        description:
          "Enjoy a perfectly curated short stay featuring two nights of relaxation and exploration. This package includes a scenic Zambezi sunset cruise and a guided tour of Victoria Falls, offering a balanced combination of leisure, sightseeing, and unforgettable natural beauty.",
        image: IMAGES.cruisePackage,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/2-nights-boma-sunest-cruise-guided-tour-the-shrub-lodge-and-safari-97774939",
      },
    ],
  },
  {
    slug: "aerial-adventures",
    title: "Aerial Adventures",
    blurb:
      "Take to the skies for breathtaking views of Victoria Falls, the Zambezi River, and surrounding landscapes from helicopters and microlight flights.",
    image: IMAGES.aerial,
    items: [
      {
        name: "Helicopter Ride 13–15 min",
        price: 177,
        description:
          "Enjoy a breathtaking aerial experience over Victoria Falls on this short yet unforgettable helicopter flight. Often referred to as the “Flight of Angels,” this ride offers spectacular views of the Falls, the Zambezi River, and the surrounding rainforest.",
        image: IMAGES.helicopterHero,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/helicopter-ride-13-15min-the-shrub-lodge-and-safari-2587352901",
      },
      {
        name: "Helicopter Long Flight 25–30 min",
        price: 334,
        description:
          "This extended helicopter flight provides a more immersive aerial journey over Victoria Falls and the vast landscapes beyond. In addition to sweeping views of the Falls and gorge, guests enjoy panoramic sights of the Zambezi River, surrounding national parks, and wildlife corridors.",
        image: IMAGES.helicopter,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/helicopter-flight-25-30-min-the-shrub-lodge-and-safari-3725583813",
      },
      {
        name: "Microlight Flight 15 min",
        price: 196,
        description:
          "Experience the thrill of open-air flying on a microlight flight above Victoria Falls. With unobstructed views and a sense of freedom unlike any other, this flight offers an intimate and exhilarating perspective of the Falls, the river, and the surrounding terrain.",
        image: IMAGES.microlight,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/microlight-flight-over-victoria-falls-the-shrub-lodge-and-safari-78594145",
      },
      {
        name: "Gorge Flight 20 min",
        price: 272,
        description:
          "Fly low and close to the dramatic Batoka Gorge on this scenic helicopter experience. The gorge flight highlights the raw power of the Zambezi River as it carves through towering cliffs below Victoria Falls.",
        image: IMAGES.helicopterAlt,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/gorge-flight-20min-the-shrub-lodge-and-safari-1734529747",
      },
    ],
  },
  {
    slug: "adventure-adrenaline",
    title: "Adventure & Adrenaline",
    blurb:
      "For thrill-seekers, enjoy heart-pumping activities from white water rafting and bungee jumping to ziplining and gorge swings.",
    image: IMAGES.adrenaline,
    items: [
      {
        name: "White Water Rafting – Low Water",
        price: 173,
        description:
          "Experience one of the world's most exhilarating rafting adventures as you navigate the powerful rapids of the Zambezi River during the low-water season. This period offers technical rapids, clear channels, and high adrenaline, guided by expert river professionals.",
        image: IMAGES.raftingLow,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/white-water-rafting-the-shrub-lodge-and-safari-22658942",
      },
      {
        name: "White Water Rafting – High Water",
        price: 173,
        description:
          "During the high-water season, the Zambezi transforms into a fast-flowing giant with massive waves and dramatic scenery. This rafting experience focuses on big water and momentum rather than technical manoeuvres, delivering an exciting and scenic ride through the gorge.",
        image: IMAGES.raftingHigh,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/white-water-rafting-the-shrub-lodge-and-safari-22658942",
      },
      {
        name: "Bungee Jumping",
        price: 194,
        description:
          "Take a legendary leap from the iconic Victoria Falls Bridge, plunging deep into the gorge below. One of the highest commercial bungee jumps in the world, this experience delivers an unmatched adrenaline rush with breathtaking views.",
        image: IMAGES.bungee,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/bungee-jump-the-shrub-lodge-and-safari-32662868",
      },
      {
        name: "Bridge Swing",
        price: 137,
        description:
          "Step off the Victoria Falls Bridge and enjoy a thrilling freefall followed by a wide, sweeping swing across the gorge. This high-intensity experience combines fear, excitement, and spectacular scenery in one unforgettable moment.",
        image: IMAGES.bridgeSwing,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/bridge-swing-the-shrub-lodge-and-safari-32012317",
      },
      {
        name: "Tandem Bridge Swing",
        price: 201,
        description:
          "Share the excitement as two participants swing together from the Victoria Falls Bridge. This experience combines heart-pounding adrenaline with a shared adventure high above the gorge.",
        image: IMAGES.tandemBridgeSwing,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/bridge-swing-the-shrub-lodge-and-safari-32012317",
      },
      {
        name: "Gorge Swing",
        price: 139,
        description:
          "Jump from the edge of the Batoka Gorge and experience an intense freefall before swinging through the vast canyon. This activity offers raw adrenaline in a dramatic natural setting.",
        image: IMAGES.gorgeSwing,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/gorge-swing-the-shrub-lodge-and-safari-1836941079",
      },
      {
        name: "Tandem Gorge Swing",
        price: 206,
        description:
          "Enjoy the thrill of the gorge swing together with a partner. This tandem option allows two guests to leap at the same time, creating a powerful shared adventure surrounded by towering cliffs and sweeping views.",
        image: IMAGES.tandemGorgeSwing,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/tandem-gorge-swing-the-shrub-lodge-and-safari-4903734987",
      },
      {
        name: "Zip Line",
        price: 112,
        description:
          "Soar high across the Batoka Gorge on a fast and exciting zip line. This experience combines speed, height, and panoramic views, making it ideal for guests seeking adventure with a strong scenic element.",
        image: IMAGES.zipLine,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/zipline-the-shrub-lodge-and-safari-0698882195",
      },
      {
        name: "Tandem Zip Line",
        price: 167,
        description:
          "Fly side-by-side with a partner on the tandem zip line. A fun and social experience, it allows guests to enjoy the thrill together while taking in the dramatic gorge scenery below.",
        image: IMAGES.tandemZip,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/tandem-zipline-the-shrub-lodge-and-safari-5774202519",
      },
      {
        name: "Bridge Slide / Zipline",
        price: 58,
        description:
          "Glide smoothly from the Victoria Falls Bridge across the gorge on this scenic zip line. Less intense than bungee or swings, it offers excitement, incredible views, and a fun introduction to aerial adventures.",
        image: IMAGES.bridgeSlide,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/bridge-slide-zipline-the-shrub-lodge-and-safari-49708389",
      },
      {
        name: "Flying Fox",
        price: 73,
        description:
          "The Flying Fox offers a relaxed yet thrilling glide across the gorge in a seated harness. This experience focuses on comfort, views, and enjoyment rather than extreme adrenaline.",
        image: IMAGES.flyingFox,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/flying-fox-the-shrub-lodge-and-safari-2550048151",
      },
      {
        name: "High Wire Pass",
        price: 180,
        description:
          "Test your balance and nerve as you cross a high wire suspended above the gorge. This challenge offers a rewarding sense of achievement along with stunning views of the surrounding landscape.",
        image: IMAGES.highWire,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/high-wire-pass-the-shrub-lodge-and-safari-7060714239",
      },
      {
        name: "Canopy Tour",
        price: 86,
        description:
          "Explore the forested edges of the gorge on a guided canopy tour featuring a series of zip lines and platforms. This eco-adventure blends nature, education, and excitement while showcasing the area's unique flora and birdlife.",
        image: IMAGES.canopy,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/canopy-tour-the-shrub-lodge-and-safari-0064815624",
      },
      {
        name: "Quad Biking (Adventure)",
        price: 65,
        description:
          "Set out on a guided quad biking adventure through bush trails and open terrain near Victoria Falls. This experience offers a fun and active way to explore the natural surroundings while enjoying a sense of freedom and discovery.",
        image: IMAGES.quadBike,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/quad-biking-adventure-the-shrub-lodge-and-safari-5549260909",
      },
      {
        name: "Adventure Jetboat",
        price: 141,
        description:
          "Enjoy a high-speed jetboat ride on the river below Victoria Falls, featuring sharp turns, powerful acceleration, and exciting manoeuvres. This water-based adventure delivers fast-paced fun with stunning river and gorge scenery.",
        image: IMAGES.jetboat,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/jet-boat-adventure-the-shrub-lodge-and-safari-10466963",
      },
    ],
  },
  {
    slug: "cultural-city",
    title: "Cultural, City & Local Experiences",
    blurb:
      "Discover local culture, heritage, and daily life through village visits, township tours, city explorations, and traditional entertainment.",
    image: IMAGES.cultural,
    items: [
      {
        name: "Chinotimba Township Tour",
        price: 40,
        description:
          "Experience everyday local life on a guided visit to Chinotimba Township, one of Victoria Falls' oldest residential areas. This cultural tour offers insight into community life, local markets, schools, and small businesses, providing a deeper understanding of Zimbabwean culture beyond the main tourist attractions.",
        image: IMAGES.chinotimba,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/chinotimba-township-tour-the-shrub-lodge-and-safari-8412541696",
      },
      {
        name: "Traditional Village Tour",
        price: 60,
        description:
          "Step into a traditional rural village setting and learn about age-old customs, daily routines, and social structures. Guests gain insight into traditional housing, food preparation, and cultural practices, making this an enriching and educational experience for those interested in authentic local culture.",
        image: IMAGES.village,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/traditional-village-tour-the-shrub-lodge-and-safari-80777208",
      },
      {
        name: "Mukuni Village Tour",
        price: 50,
        description:
          "Visit Mukuni Village, one of the region's most well-known traditional settlements. This guided tour introduces guests to local customs, leadership traditions, music, and crafts, offering a meaningful cultural exchange and insight into the heritage of the local people.",
        image: IMAGES.mukuni,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/mukuni-village-tour-the-shrub-lodge-and-safari-3752516757",
      },
      {
        name: "Livingstone City Town Tour",
        price: 50,
        description:
          "Discover the highlights of Livingstone on a guided town tour. Explore historical landmarks, local markets, and cultural sites while learning about the city's colonial history and modern-day life. A relaxed way to experience Livingstone beyond the Falls.",
        image: IMAGES.livingstone,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/livingstone-city-tour-the-shrub-lodge-and-safari-9850765421",
      },
      {
        name: "Shopping Tour",
        price: 10,
        description:
          "Enjoy a guided shopping experience visiting local markets, craft centres, and curio shops. Guests can browse handmade souvenirs, artwork, textiles, and jewellery while learning about local craftsmanship and supporting community artisans.",
        image: IMAGES.shop,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/shopping-tour-the-shrub-lodge-and-safari-13161930",
      },
      {
        name: "Simunye Theatre Show",
        price: 58,
        description:
          "Enjoy an energetic cultural performance at the Simunye Theatre, featuring traditional music, dance, storytelling, and acrobatics. This lively evening show celebrates regional culture and provides an entertaining introduction to African performance arts.",
        image: IMAGES.simunye,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/the-victoria-falls-theatre-simunye-spirit-of-africa-the-shrub-lodge-and-safari-98151655",
      },
      {
        name: "Boma International",
        price: 70,
        description:
          "Experience an evening of vibrant culture, food, and entertainment at The Boma – Dinner & Drum Show. Guests enjoy a traditional-style buffet, live music, drumming, and dance performances, creating a lively and memorable African dining experience.",
        image: IMAGES.bomaInternational,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/boma-international-the-shrub-lodge-and-safari-0568097492",
      },
      {
        name: "Boma Resident",
        price: 65,
        description:
          "The Boma Resident experience offers a more relaxed and intimate version of the popular cultural dinner show. Designed primarily for in-house guests, it combines traditional cuisine, live entertainment, and a warm social atmosphere for an enjoyable evening close to the hotel.",
        image: IMAGES.bomaResident,
        bookingUrl: "https://theshrublodgeandsafari.wetravel.com/trips/boma-locals-the-shrub-lodge-and-safari-0954918950",
      },
    ],
  },
];

export function getActivityCategory(slug: string): ActivityCategory {
  const category = activityCategories.find((item) => item.slug === slug);
  if (!category) {
    throw new Error(`Unknown activity category: ${slug}`);
  }
  return category;
}

export type OverviewCard = {
  title: string;
  blurb: string;
  href: string;
  image: string;
};

export const activityOverview: OverviewCard[] = [
  ...activityCategories.map((category) => ({
    title: category.title,
    blurb: category.blurb,
    href: `/activities/${category.slug}`,
    image: category.image,
  })),
  {
    title: "Transfers & Logistics",
    blurb:
      "Seamless airport transfers and transport services to ensure a smooth, stress-free travel experience from arrival to departure.",
    href: "/transfers",
    image: IMAGES.transfers,
  },
];
