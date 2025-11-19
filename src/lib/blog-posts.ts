
import { Locale } from './translations';

export type BlogPost = {
  slug: string;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  content: Record<Locale, string>;
  imageId: string;
  galleryImageIds?: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'choisir-le-lieu-parfait',
    title: {
      en: 'Choosing the Perfect Venue: A Guide for Couples',
      fr: 'Le Lieu Parfait : Comment Choisir le Cocon de Votre Amour',
    },
    summary: {
      en: 'The venue is the soul of your wedding. Discover our secrets for finding the place that tells your story.',
      fr: 'Le lieu de réception est l\'âme de votre mariage. Découvrez nos secrets pour trouver l\'endroit qui raconte votre histoire.',
    },
    imageId: 'blog-venue',
    galleryImageIds: ['gallery-1', 'salle_reception_8', 'Parc_2'],
    content: {
        en: `
        <p class="lead">Choosing a wedding venue is like choosing a home for your love story to unfold for a day. It’s the first brushstroke on the canvas of your life together. At Manoir de Vacheresses, we believe this choice should be guided by heart and emotion. Let us whisper some secrets to help you find a place that feels like destiny.</p>
        
        <h3>1. Dream Together, Define Your Soul's Aesthetic</h3>
        <p>Before any search begins, close your eyes. What do you see? What do you feel? Is it a fairytale romance bathed in the golden light of sunset, or a chic, modern affair filled with laughter and champagne?</p>
        <ul>
            <li><strong>Timeless Romance:</strong> Imagine ancient stones whispering tales of the past, gardens where you can steal a quiet kiss, and a grand hall lit by the soft glow of a hundred candles. This is the heart of Vacheresses.</li>
            <li><strong>Bohemian Dream:</strong> Envision a relaxed celebration under the stars, with wildflowers in your hair and music drifting through an old orchard.</li>
        </ul>
        <p>Your venue should be a reflection of your shared soul. It’s the stage where your promises will echo for a lifetime.</p>
        
        <blockquote class="my-8 p-6 border-l-4 border-primary bg-primary/10 text-lg italic text-primary/80">
          “A venue isn't just a place to host a party; it’s the silent witness to your most precious promises.”
        </blockquote>

        <h3>2. The Perfect Embrace: Guests and Atmosphere</h3>
        <p>The right venue holds your loved ones in a warm embrace. It should feel full, but not crowded; intimate, but not small. Whether you dream of a close-knit gathering or a grand celebration, the space should amplify the love in the room. Our estate can transform to welcome your tribe, making everyone feel part of your inner circle.</p>
        
        <h3>3. A Journey for the Heart (and for Your Guests)</h3>
        <p>Think of your wedding as a beautiful journey for everyone you love. How will they experience your day?</p>
        <ul>
            <li><strong>A Seamless Flow:</strong> From a sun-dappled ceremony in the park to a magical reception in the Grand Hall, a venue that offers diverse spaces creates a fluid, enchanting experience.</li>
            <li><strong>A Haven of Rest:</strong> For those traveling to share your joy, on-site accommodations are a gift of comfort and peace, allowing the celebration to continue without a worry.</li>
        </ul>
        
        <h3>4. The Vacheresses Promise: More Than a Venue</h3>
        <p>Choosing Vacheresses is choosing a partner in your dream. It's the peace of mind that comes with a dedicated team who cares about your day as much as you do. It's the magic woven into the very fabric of the place, an elegance that turns a beautiful wedding into an unforgettable memory.</p>
        `,
        fr: `
        <p class="lead">Choisir un lieu de mariage, c'est comme choisir la maison où votre histoire d'amour s'épanouira le temps d'une journée. C'est le premier coup de pinceau sur la toile de votre vie à deux. Au Manoir de Vacheresses, nous croyons que ce choix doit être guidé par le cœur et l'émotion. Laissez-nous vous murmurer quelques secrets pour trouver un lieu qui ressemble à une évidence.</p>
        
        <h3>1. Rêvez Ensemble, Définissez l'Esthétique de Votre Âme</h3>
        <p>Avant toute recherche, fermez les yeux. Que voyez-vous ? Que ressentez-vous ? Est-ce une romance de conte de fées baignée dans la lumière dorée du couchant, ou une fête chic et moderne remplie de rires et de champagne ?</p>
        <ul>
            <li><strong>Romance Intemporelle :</strong> Imaginez des pierres anciennes qui murmurent les contes du passé, des jardins où voler un baiser tranquille, et une grande salle éclairée par la lueur douce de cent bougies. C'est le cœur de Vacheresses.</li>
            <li><strong>Rêve Bohème :</strong> Envisagez une célébration décontractée sous les étoiles, avec des fleurs sauvages dans vos cheveux et une musique qui flotte à travers un vieux verger.</li>
        </ul>
        <p>Votre lieu doit être le reflet de votre âme commune. C'est la scène où vos promesses résonneront pour toute une vie.</p>
        
        <blockquote class="my-8 p-6 border-l-4 border-primary bg-primary/10 text-lg italic text-primary/80">
          “Un lieu n'est pas qu'un simple endroit pour une fête ; c'est le témoin silencieux de vos plus précieuses promesses.”
        </blockquote>

        <h3>2. L'Écrin Parfait : Invités et Atmosphère</h3>
        <p>Le bon lieu enveloppe vos proches dans une étreinte chaleureuse. Il doit sembler plein, mais pas bondé ; intime, mais pas petit. Que vous rêviez d'une réunion en comité restreint ou d'une grande célébration, l'espace doit amplifier l'amour présent. Notre domaine se transforme pour accueillir votre tribu, faisant en sorte que chacun se sente partie de votre cercle intime.</p>
        
        <h3>3. Un Voyage pour le Cœur (et pour vos Invités)</h3>
        <p>Pensez à votre mariage comme à un magnifique voyage pour tous ceux que vous aimez. Comment vivront-ils votre journée ?</p>
        <ul>
            <li><strong>Une Fluidité Sans Faille :</strong> D'une cérémonie baignée de soleil dans le parc à une réception magique dans la Grande Salle, un lieu qui offre des espaces variés crée une expérience fluide et enchanteresse.</li>
            <li><strong>Un Havre de Repos :</strong> Pour ceux qui voyagent pour partager votre joie, des hébergements sur place sont un cadeau de confort et de paix, permettant à la célébration de se prolonger sans souci.</li>
        </ul>
        
        <h3>4. La Promesse Vacheresses : Plus qu'un Lieu</h3>
        <p>Choisir Vacheresses, c'est choisir un partenaire pour votre rêve. C'est la tranquillité d'esprit d'une équipe dévouée qui se soucie de votre journée autant que vous. C'est la magie tissée dans l'essence même du lieu, une élégance qui transforme un beau mariage en un souvenir inoubliable.</p>
        `,
    },
  },
  {
    slug: 'tendances-decoration-mariage-2025',
    title: {
      en: '2025 Wedding Decor Trends: Whispers of Romance',
      fr: 'Tendances Déco 2025 : Murmures de Romance pour Votre Mariage',
    },
    summary: {
      en: 'From ethereal lighting to poetic details, discover the trends that will make your 2025 wedding a true romance.',
      fr: 'De l\'éclairage éthéré aux détails poétiques, découvrez les tendances qui feront de votre mariage 2025 une véritable romance.',
    },
    imageId: 'blog-decor',
    galleryImageIds: ['esprit-9', 'esprit-10', 'salle_reception_6'],
    content: {
      en: `<p class="lead">In 2025, wedding design is moving away from the ephemeral to embrace the eternal. It's about creating an atmosphere that feels like a beautiful dream—personal, immersive, and filled with a quiet, confident romance.</p>
            <h3>1. The Poetry of Imperfection</h3>
            <p>Perfection is giving way to personality. This trend celebrates the beauty of the handmade, the natural, and the slightly undone.</p>
            <ul>
                <li><strong>Organic Florals:</strong> Arrangements are becoming more artful and less structured, looking as if they were just gathered from a wildflower meadow. Think delicate textures, trailing vines, and unexpected color pairings.</li>
                <li><strong>Hand-Touched Details:</strong> Calligraphy with character on handmade paper, hand-dyed silk ribbons, and ceramics with a human touch are taking center stage.</li>
            </ul>

            <h3>2. Lighting as the Main Character</h3>
            <p>Lighting is no longer an afterthought; it’s the primary tool for creating mood and magic. The goal is to create pockets of intimacy and warmth.</p>
            <ul>
                <li><strong>A Sea of Candles:</strong> Taper candles in varying heights, clusters of pillar candles, and floating tea lights create a dynamic, living light that flatters everyone.</li>
                <li><strong>Statement Installations:</strong> Think canopies of fairy lights that mimic a starlit sky, or a dramatic chandelier dripping with foliage over the main table.</li>
            </ul>

            <blockquote class="my-8 p-6 border-l-4 border-primary bg-primary/10 text-lg italic text-primary/80">
              "Good lighting makes everyone and everything look more beautiful. It's the simplest secret to a magical atmosphere."
            </blockquote>

            <h3>3. The Sensory Journey</h3>
            <p>A truly romantic wedding engages all the senses. It’s about creating moments that guests feel, not just see.</p>
            <ul>
                <li><strong>Curated Scents:</strong> A signature scent for the day, diffused subtly through the venue—perhaps notes of orange blossom in the garden and amber by the fireplace.</li>
                <li><strong>Textures and Textiles:</strong> Velvet tablecloths, soft linen napkins, and comfortable lounge areas invite guests to relax and sink into the experience.</li>
                <li><strong>A Culinary Story:</strong> The menu becomes a narrative of the couple's journey, featuring dishes inspired by their travels or favorite shared meals, served in an intimate, thoughtful way.</li>
            </ul>
            <p>At Domaine des Vacheresses, the historic architecture and natural landscapes provide the perfect foundation. We help you layer these romantic trends to create a day that is not just seen, but deeply felt—a true reflection of your love.</p>`,
      fr: `<p class="lead">En 2025, le design de mariage s'éloigne de l'éphémère pour embrasser l'éternel. Il s'agit de créer une atmosphère qui ressemble à un beau rêve : personnelle, immersive et empreinte d'une romance tranquille et affirmée.</p>
            <h3>1. La Poésie de l'Imperfection</h3>
            <p>La perfection cède la place à la personnalité. Cette tendance célèbre la beauté du fait-main, du naturel et du légèrement imparfait.</p>
            <ul>
                <li><strong>Floraisons Organiques :</strong> Les arrangements deviennent plus artistiques et moins structurés, comme s'ils venaient d'être cueillis dans une prairie de fleurs sauvages. Pensez à des textures délicates, des vignes retombantes et des associations de couleurs inattendues.</li>
                <li><strong>Détails Faits Main :</strong> La calligraphie de caractère sur du papier artisanal, les rubans de soie teints à la main et les céramiques avec une touche humaine occupent le devant de la scène.</li>
            </ul>

            <h3>2. L'Éclairage comme Personnage Principal</h3>
            <p>L'éclairage n'est plus une réflexion après coup ; c'est l'outil principal pour créer l'ambiance et la magie. L'objectif est de créer des cocons d'intimité et de chaleur.</p>
            <ul>
                <li><strong>Une Mer de Bougies :</strong> Des bougies effilées de différentes hauteurs, des groupes de cierges et des bougies flottantes créent une lumière dynamique et vivante qui flatte tout le monde.</li>
                <li><strong>Installations Spectaculaires :</strong> Pensez à des auvents de guirlandes lumineuses imitant un ciel étoilé, ou à un lustre spectaculaire dégoulinant de feuillage au-dessus de la table d'honneur.</li>
            </ul>

            <blockquote class="my-8 p-6 border-l-4 border-primary bg-primary/10 text-lg italic text-primary/80">
              "Un bon éclairage rend tout et tout le monde plus beau. C'est le secret le plus simple pour une atmosphère magique."
            </blockquote>

            <h3>3. Le Voyage Sensoriel</h3>
            <p>Un mariage vraiment romantique engage tous les sens. Il s'agit de créer des moments que les invités ressentent, et pas seulement voient.</p>
            <ul>
                <li><strong>Parfums Sur Mesure :</strong> Un parfum signature pour la journée, diffusé subtilement dans le lieu — peut-être des notes de fleur d'oranger dans le jardin et d'ambre près de la cheminée.</li>
                <li><strong>Textures et Textiles :</strong> Des nappes en velours, des serviettes en lin doux et des espaces lounge confortables invitent les invités à se détendre et à s'immerger dans l'expérience.</li>
                <li><strong>Une Histoire Culinaire :</strong> Le menu devient le récit du voyage du couple, avec des plats inspirés de leurs voyages ou de leurs repas partagés préférés, servis de manière intime et réfléchie.</li>
            </ul>
            <p>Au Domaine des Vacheresses, l'architecture historique et les paysages naturels fournissent la base parfaite. Nous vous aidons à superposer ces tendances romantiques pour créer une journée qui n'est pas seulement vue, mais profondément ressentie — un véritable reflet de votre amour.</p>`,
    },
  },
  {
    slug: 'personaliser-votre-journee',
    title: {
      en: '5 Whispers of the Heart to Personalize Your Wedding Day',
      fr: '5 Murmures du Cœur pour Personnaliser Votre Jour de Mariage',
    },
    summary: {
      en: 'Infuse your celebration with soul. Discover intimate ways to make your wedding an unforgettable reflection of your love story.',
      fr: 'Insufflez une âme à votre célébration. Découvrez des manières intimes de faire de votre mariage un reflet inoubliable de votre histoire d\'amour.',
    },
    imageId: 'blog-personalize',
    galleryImageIds: ['se_marier_3', 'vacheresses_19', 'package-luxury'],
    content: {
      en: `<p class="lead">Your wedding is more than an event; it's a symphony composed of your shared memories, inside jokes, and quiet promises. The most beautiful weddings are those that feel like a conversation with the couple. Here are five intimate ideas to make your day a true whisper of the heart.</p>
            <h3>1. Vows from the Soul</h3>
            <p>This is the crescendo of your ceremony. Instead of traditional vows, consider writing personal promises. It doesn't have to be a masterpiece of literature; it just has to be real. Speak from the heart about the small moments that built your great love. It’s a gift to your partner and to every guest who has the honor of witnessing it.</p>

            <h3>2. Weave Your Story into the Details</h3>
            <p>Let your story unfold throughout the day in subtle, meaningful ways:</p>
            <ul>
                <li><strong>Table Names with a Past:</strong> Name your tables after places you've traveled together, significant dates, or even your favorite songs. A small note on the table can explain the significance.</li>
                <li><strong>A "Memory Lane" Welcome:</strong> Create a gallery of photos not just of you as a couple, but of your parents' and grandparents' weddings. It’s a beautiful tribute to the love that came before you.</li>
            </ul>
            
            <h3>3. A Signature Scent</h3>
            <p>Scent is the strongest sense tied to memory. Choose a fragrance—a specific candle, a type of flower like jasmine or tuberose, or an essential oil blend—and use it subtly throughout your venue. Years from now, that scent will instantly transport you both back to the magic of your wedding day.</p>
            
            <blockquote class="my-8 p-6 border-l-4 border-primary bg-primary/10 text-lg italic text-primary/80">
              "The smallest personal details often leave the biggest impression on the heart."
            </blockquote>

            <h3>4. An Ode to Your Roots</h3>
            <p>Honor your heritage in a way that feels authentic to you. This could be through a specific dish served during the meal, a traditional dance, or a piece of music that pays homage to your family's culture. It’s a way of grounding your new beginning in the richness of your past.</p>
            
            <h3>5. A Parting Gift with Meaning</h3>
            <p>Send your guests home with a favor that is a true extension of you. Instead of a trinket, consider a small bottle of local olive oil if you're foodies, a bookmark with your favorite love poem, or a donation to a cause you're passionate about. It’s a final, warm thank you that feels both personal and heartfelt.</p>`,
      fr: `<p class="lead">Votre mariage est plus qu'un événement ; c'est une symphonie composée de vos souvenirs communs, de vos blagues complices et de vos promesses silencieuses. Les plus beaux mariages sont ceux qui ressemblent à une conversation avec le couple. Voici cinq idées intimes pour faire de votre journée un véritable murmure du cœur.</p>
            <h3>1. Des Vœux qui Viennent de l'Âme</h3>
            <p>C'est le point culminant de votre cérémonie. Au lieu de vœux traditionnels, envisagez d'écrire des promesses personnelles. Il ne s'agit pas d'être un chef-d'œuvre de la littérature, mais simplement d'être vrai. Parlez avec le cœur des petits moments qui ont construit votre grand amour. C'est un cadeau pour votre partenaire et pour chaque invité qui a l'honneur d'en être témoin.</p>

            <h3>2. Tissez Votre Histoire dans les Détails</h3>
            <p>Laissez votre histoire se dérouler tout au long de la journée de manière subtile et significative :</p>
            <ul>
                <li><strong>Des Noms de Table avec un Passé :</strong> Nommez vos tables d'après des lieux où vous avez voyagé ensemble, des dates importantes ou même vos chansons préférées. Une petite note sur la table peut en expliquer la signification.</li>
                <li><strong>Un Accueil "Chemin des Souvenirs" :</strong> Créez une galerie de photos non seulement de vous en tant que couple, mais aussi des mariages de vos parents et grands-parents. C'est un bel hommage à l'amour qui vous a précédés.</li>
            </ul>
            
            <h3>3. Un Parfum Signature</h3>
            <p>L'odorat est le sens le plus fortement lié à la mémoire. Choisissez un parfum — une bougie spécifique, un type de fleur comme le jasmin ou la tubéreuse, ou un mélange d'huiles essentielles — et utilisez-le subtilement dans votre lieu de réception. Dans des années, ce parfum vous transportera instantanément tous les deux dans la magie de votre journée de mariage.</p>
            
            <blockquote class="my-8 p-6 border-l-4 border-primary bg-primary/10 text-lg italic text-primary/80">
              "Les plus petits détails personnels laissent souvent la plus grande impression sur le cœur."
            </blockquote>

            <h3>4. Une Ode à Vos Racines</h3>
            <p>Honorez votre héritage d'une manière qui vous semble authentique. Cela peut se faire à travers un plat spécifique servi pendant le repas, une danse traditionnelle ou un morceau de musique qui rend hommage à la culture de votre famille. C'est une façon d'ancrer votre nouveau départ dans la richesse de votre passé.</p>
            
            <h3>5. Un Cadeau d'Adieu Qui a du Sens</h3>
            <p>Renvoyez vos invités chez eux avec un cadeau qui est une véritable extension de vous. Au lieu d'une babiole, pensez à une petite bouteille d'huile d'olive locale si vous êtes gourmands, un marque-page avec votre poème d'amour préféré, ou un don à une cause qui vous passionne. C'est un dernier remerciement chaleureux, à la fois personnel et sincère.</p>`,
    },
  },
];
