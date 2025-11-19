
import { Locale } from './translations';

export type BlogPost = {
  slug: string;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  content: Record<Locale, string>;
  imageId: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'choisir-le-lieu-parfait',
    title: {
      en: 'Choosing the Perfect Venue: A Guide for Couples',
      fr: 'Choisir le lieu parfait : Le Guide Ultime pour les Futurs Mariés',
    },
    summary: {
      en: 'The venue sets the tone for your entire wedding. Here are our top tips for finding the one that\'s right for you.',
      fr: 'Le lieu de réception est la toile de fond de votre mariage. Découvrez nos conseils pour faire le choix qui vous ressemble.',
    },
    content: {
        en: `
        <p class="lead">Finding the perfect wedding venue is often the first and most significant decision you'll make. It’s the canvas upon which you'll paint the memories of your special day. At Manoir de Vacheresses, we understand that this choice is deeply personal. Let us guide you through the key steps to finding a venue that feels like it was made just for you.</p>
        
        <h3>1. Define Your Vision and Style</h3>
        <p>Before you even type "wedding venue" into a search bar, take a moment to dream with your partner. What is the atmosphere you want to create? Close your eyes and imagine your day.</p>
        <ul>
            <li><strong>Romantic & Timeless:</strong> Do you see flickering candles, soft florals, and historic architecture? A place like our manor, with its centuries of history, could be perfect.</li>
            <li><strong>Modern & Chic:</strong> Perhaps you envision clean lines, minimalist decor, and a sophisticated, urban feel.</li>
            <li><strong>Bohemian & Rustic:</strong> Or maybe a relaxed, nature-filled day with wooden elements, open fields, and a touch of whimsy in our covered orchard area.</li>
        </ul>
        <p>Your style will dictate the type of venue that will best bring your vision to life. This is your story, and the setting should be its perfect first chapter.</p>
        
        <blockquote class="my-8 p-6 border-l-4 border-primary bg-primary/10 text-lg italic">
          “The venue isn’t just a place; it’s a character in your love story. Choose one that speaks your language.”
        </blockquote>

        <h3>2. Align with Your Guest List & Budget</h3>
        <p>These two elements are intertwined. Your guest count will directly influence your budget and venue capacity. Be realistic: ensure your chosen space can comfortably host your guests without feeling cramped or cavernously empty. At Vacheresses, we can host intimate gatherings of 30 or grand celebrations of up to 130, offering flexibility for your dream guest list.</p>
        
        <div class="grid grid-cols-2 gap-4 my-8">
            <img src="/salle_reception_8.jpg" alt="Interior of the reception hall" class="rounded-lg shadow-lg" />
            <img src="/Parc_2.jpg" alt="Gardens of the manor" class="rounded-lg shadow-lg" />
        </div>

        <h3>3. Think About the Guest Experience</h3>
        <p>A great wedding is a great party. Consider your guests' journey:</p>
        <ul>
            <li><strong>Accessibility:</strong> Is the venue easy to find? Is there ample parking? We are conveniently located just over an hour from Paris.</li>
            <li><strong>Flow of the Day:</strong> Can the venue accommodate both the ceremony and reception? Having distinct spaces, like our park for the ceremony and the Grand Hall for the reception, creates a seamless experience.</li>
            <li><strong>Accommodations:</strong> For guests traveling from afar, nearby lodging is a must. Our on-site guesthouses offer unparalleled convenience and charm.</li>
        </ul>
        
        <h3>4. The Vacheresses Advantage</h3>
        <p>Choosing a venue like the Manoir de Vacheresses offers more than just a beautiful space. It provides a dedicated team, a curated list of trusted caterers, and the peace of mind that comes from knowing every detail is handled with care. The history within our walls and the beauty of our grounds offer a timeless elegance that cannot be replicated.</p>
        `,
        fr: `
        <p class="lead">Trouver le lieu de mariage parfait est souvent la première et la plus importante des décisions. C'est la toile sur laquelle vous peindrez les souvenirs de votre journée unique. Au Manoir de Vacheresses, nous savons que ce choix est profondément personnel. Laissez-nous vous guider à travers les étapes clés pour trouver un lieu qui semble avoir été créé juste pour vous.</p>
        
        <h3>1. Définissez Votre Vision et Votre Style</h3>
        <p>Avant même de taper "lieu de mariage" dans une barre de recherche, prenez un moment pour rêver avec votre partenaire. Quelle est l'atmosphère que vous souhaitez créer ? Fermez les yeux et imaginez votre journée.</p>
        <ul>
            <li><strong>Romantique & Intemporel :</strong> Voyez-vous des bougies scintillantes, des fleurs douces et une architecture historique ? Un lieu comme notre manoir, avec ses siècles d'histoire, pourrait être parfait.</li>
            <li><strong>Moderne & Chic :</strong> Peut-être imaginez-vous des lignes épurées, un décor minimaliste et une ambiance urbaine sophistiquée.</li>
            <li><strong>Bohème & Rustique :</strong> Ou peut-être une journée décontractée, en pleine nature, avec des éléments en bois, des champs ouverts et une touche de fantaisie dans notre préau du verger.</li>
        </ul>
        <p>Votre style dictera le type de lieu qui donnera le mieux vie à votre vision. C'est votre histoire, et le décor doit en être le parfait premier chapitre.</p>
        
        <blockquote class="my-8 p-6 border-l-4 border-primary bg-primary/10 text-lg italic">
          “Le lieu n'est pas juste un endroit ; c'est un personnage de votre histoire d'amour. Choisissez-en un qui parle votre langue.”
        </blockquote>

        <h3>2. Alignez-vous sur Votre Liste d'Invités & Votre Budget</h3>
        <p>Ces deux éléments sont étroitement liés. Le nombre de vos invités influencera directement votre budget et la capacité du lieu. Soyez réaliste : assurez-vous que l'espace choisi puisse accueillir confortablement vos invités sans qu'ils se sentent à l'étroit ou perdus dans un lieu trop grand. À Vacheresses, nous pouvons accueillir des réceptions intimes de 30 personnes ou de grandes célébrations jusqu'à 130 personnes, offrant une flexibilité pour la liste d'invités de vos rêves.</p>
        
        <div class="grid grid-cols-2 gap-4 my-8">
            <img src="/salle_reception_8.jpg" alt="Intérieur de la salle de réception" class="rounded-lg shadow-lg" />
            <img src="/Parc_2.jpg" alt="Jardins du manoir" class="rounded-lg shadow-lg" />
        </div>

        <h3>3. Pensez à l'Expérience Invité</h3>
        <p>Un grand mariage est une grande fête. Pensez au parcours de vos invités :</p>
        <ul>
            <li><strong>Accessibilité :</strong> Le lieu est-il facile à trouver ? Y a-t-il un grand parking ? Nous sommes idéalement situés à un peu plus d'une heure de Paris.</li>
            <li><strong>Déroulement de la journée :</strong> Le lieu peut-il accueillir à la fois la cérémonie et la réception ? Avoir des espaces distincts, comme notre parc pour la cérémonie et la Grande Salle pour la réception, crée une expérience fluide.</li>
            <li><strong>Hébergements :</strong> Pour les invités venant de loin, un hébergement à proximité est indispensable. Nos gîtes sur place offrent une commodité et un charme inégalés.</li>
        </ul>
        
        <h3>4. L'Avantage Vacheresses</h3>
        <p>Choisir un lieu comme le Manoir de Vacheresses offre plus qu'un simple bel espace. Il met à votre disposition une équipe dévouée, une liste de traiteurs de confiance et la tranquillité d'esprit de savoir que chaque détail est traité avec soin. L'histoire entre nos murs et la beauté de nos jardins offrent une élégance intemporelle qui ne peut être reproduite.</p>
        `,
    },
    imageId: 'blog-venue',
  },
  {
    slug: 'tendances-decoration-mariage-2025',
    title: {
      en: 'Top Wedding Decor Trends for 2025',
      fr: 'Les Tendances Déco Incontournables pour un Mariage en 2025',
    },
    summary: {
      en: 'From sustainable choices to bold color palettes, discover the trends that will define wedding aesthetics next year.',
      fr: 'Durabilité, couleurs audacieuses et expériences immersives : plongez dans les tendances qui définiront les mariages de demain.',
    },
    content: {
      en: `<p class="lead">2025 is all about creating weddings that are not just beautiful, but deeply personal and intentional. Forget cookie-cutter designs; this year's trends are about storytelling, sustainability, and creating unforgettable moments.</p>
            <h3>1. The Rise of "Eco-Luxe"</h3>
            <p>Sustainability is no longer a niche-it's chic. Couples are proving that you don't have to sacrifice luxury to be eco-conscious. This trend translates into:</p>
            <ul>
                <li><strong>Local & Seasonal Florals:</strong> Using flowers grown nearby not only supports local businesses but ensures freshness and reduces carbon footprint.</li>
                <li><strong>Rethought Materials:</strong> Expect to see rented decor, upcycled elements, and invitations made from recycled paper or sent digitally.</li>
                <li><strong>Mindful Menus:</strong> Caterers are focusing on farm-to-table menus that minimize waste and highlight local produce.</li>
            </ul>

            <div class="grid grid-cols-2 gap-4 my-8">
                <img src="/esprit_vacheresses_9.jpg" alt="Natural floral arrangement" class="rounded-lg shadow-lg" />
                <img src="/esprit_vacheresses_10.jpg" alt="Sustainable wedding detail" class="rounded-lg shadow-lg" />
            </div>

            <h3>2. Color is the New Neutral</h3>
            <p>While classic white will never fade, 2025 is embracing bold, expressive color palettes. Think beyond blush and sage. We're seeing rich jewel tones like emerald and sapphire, earthy terracottas paired with vibrant blues, and even playful splashes of citrusy orange and yellow. This color confidence extends from florals to linens, stationery, and even the wedding cake.</p>

            <blockquote class="my-8 p-6 border-l-4 border-primary bg-primary/10 text-lg italic">
              "Color is the conversation starter of wedding design. It sets the mood before a single word is spoken."
            </blockquote>

            <h3>3. The Immersive Guest Experience</h3>
            <p>The focus is shifting from simply observing to participating. Couples are curating multi-sensory experiences:</p>
            <ul>
                <li><strong>Interactive Stations:</strong> Think beyond the photo booth. We're seeing "perfume bars" where guests create their own scent, or live painters capturing the reception on canvas.</li>
                <li><strong>Theatrical Entertainment:</strong> Magicians mingling during cocktail hour, surprise musical performances, or even choreographed dance numbers are on the rise.</li>
                <li><strong>A Culinary Journey:</strong> The meal itself becomes an event, with curated tasting menus, wine pairings, and late-night food trucks offering a casual, fun twist.</li>
            </ul>
            <p>At Domaine des Vacheresses, our varied spaces—from the historic hall to the natural beauty of the orchard—provide a versatile canvas to bring any of these trends to life, allowing you to craft a day that's as stylish as it is personal.</p>`,
      fr: `<p class="lead">L'année 2025 s'annonce comme celle des mariages non seulement beaux, mais profondément personnels et intentionnels. Oubliez les designs standardisés ; les tendances de cette année sont axées sur le storytelling, la durabilité et la création de moments inoubliables.</p>
            <h3>1. L'Ascension de l'"Éco-Luxe"</h3>
            <p>La durabilité n'est plus une niche, c'est devenu chic. Les couples prouvent qu'il n'est pas nécessaire de sacrifier le luxe pour être éco-responsable. Cette tendance se traduit par :</p>
            <ul>
                <li><strong>Fleurs Locales & de Saison :</strong> Utiliser des fleurs cultivées à proximité soutient les entreprises locales, garantit la fraîcheur et réduit l'empreinte carbone.</li>
                <li><strong>Matériaux Repensés :</strong> Attendez-vous à voir des décors de location, des éléments recyclés et des invitations en papier recyclé ou envoyées numériquement.</li>
                <li><strong>Menus Conscients :</strong> Les traiteurs se concentrent sur des menus "de la ferme à la table" qui minimisent le gaspillage et mettent en valeur les produits locaux.</li>
            </ul>

            <div class="grid grid-cols-2 gap-4 my-8">
                <img src="/esprit_vacheresses_9.jpg" alt="Arrangement floral naturel" class="rounded-lg shadow-lg" />
                <img src="/esprit_vacheresses_10.jpg" alt="Détail de mariage durable" class="rounded-lg shadow-lg" />
            </div>

            <h3>2. La Couleur est le Nouveau Neutre</h3>
            <p>Alors que le blanc classique ne se démodera jamais, 2025 embrasse des palettes de couleurs audacieuses et expressives. Pensez au-delà du rose poudré et du vert sauge. Nous voyons des tons riches de pierres précieuses comme l'émeraude et le saphir, des terres cuites terreuses associées à des bleus vifs, et même des touches ludiques d'orange et de jaune d'agrumes. Cette confiance dans la couleur s'étend des fleurs à la papeterie, en passant par le linge de table et même le gâteau de mariage.</p>

            <blockquote class="my-8 p-6 border-l-4 border-primary bg-primary/10 text-lg italic">
              "La couleur est le point de départ de la conversation dans le design de mariage. Elle crée l'ambiance avant même qu'un seul mot ne soit prononcé."
            </blockquote>

            <h3>3. L'Expérience Immersive pour les Invités</h3>
            <p>L'accent passe de la simple observation à la participation. Les couples organisent des expériences multi-sensorielles :</p>
            <ul>
                <li><strong>Stations Interactives :</strong> Pensez au-delà du photomaton. Nous voyons des "bars à parfums" où les invités créent leur propre senteur, ou des peintres en direct capturant la réception sur toile.</li>
                <li><strong>Divertissement Théâtral :</strong> Des magiciens se mêlant aux invités pendant le cocktail, des performances musicales surprises ou même des numéros de danse chorégraphiés sont en plein essor.</li>
                <li><strong>Un Voyage Culinaire :</strong> Le repas lui-même devient un événement, avec des menus dégustation, des accords mets et vins, et des food-trucks de fin de soirée offrant une touche décontractée et amusante.</li>
            </ul>
            <p>Au Domaine des Vacheresses, nos espaces variés—de la salle historique à la beauté naturelle du verger—offrent une toile polyvalente pour donner vie à n'importe laquelle de ces tendances, vous permettant de créer une journée aussi élégante que personnelle.</p>`,
    },
    imageId: 'blog-decor',
  },
  {
    slug: 'personaliser-votre-journee',
    title: {
      en: '5 Ways to Personalize Your Wedding Day',
      fr: '5 Idées Uniques pour Personnaliser Votre Jour de Mariage',
    },
    summary: {
      en: 'Make your wedding uniquely yours. Here are five creative ideas to infuse your personality into your celebration.',
      fr: 'Rendez votre mariage inoubliable en y ajoutant des touches qui racontent votre histoire. Voici nos idées favorites.',
    },
    content: {
      en: `<p class="lead">Your wedding is the ultimate expression of your love story. While traditions are beautiful, the most memorable moments often come from the personal touches that make the day uniquely yours. Here are five creative ways to weave your personality into every aspect of your celebration.</p>
            <h3>1. An Unforgettable Ceremony</h3>
            <p>This is the heart of your day. Go beyond the standard script:</p>
            <ul>
                <li><strong>Write Your Own Vows:</strong> This is your chance to tell your partner, and the world, exactly what they mean to you. It's often the most emotional part of the day.</li>
                <li><strong>Involve Loved Ones:</strong> Ask a close friend or family member to read a poem, or even officiate.</li>
                <li><strong>A Symbolic Ritual:</strong> Consider a handfasting ceremony, planting a tree together, or a wine blending ritual to symbolize your union.</li>
            </ul>
            
            <div class="grid grid-cols-2 gap-4 my-8">
                <img src="/se_marier_3.jpg" alt="Couple exchanging vows" class="rounded-lg shadow-lg" />
                <img src="/vacheresses_19.jpg" alt="Outdoor ceremony at the manor" class="rounded-lg shadow-lg" />
            </div>

            <h3>2. The Soundtrack of Your Love</h3>
            <p>Music is emotion. Create a playlist that tells your story. Think about the song that was playing on your first date, the music you both love for road trips, or the tune that always makes you dance. Ask for guest requests on your RSVPs to ensure the dance floor is packed all night.</p>

            <h3>3. A Taste of "You" with a Signature Cocktail</h3>
            <p>Work with your caterer to design a signature drink that reflects your tastes. Name it after something meaningful—a pet's name, the place you met, or an inside joke. It's a fun, personal detail that guests love.</p>
            
            <blockquote class="my-8 p-6 border-l-4 border-primary bg-primary/10 text-lg italic">
              "Personal touches are the soul of a wedding. They transform a beautiful event into a meaningful memory."
            </blockquote>

            <h3>4. A Walk Down Memory Lane</h3>
            <p>Create a beautiful display of photos charting your journey as a couple, from childhood snaps to engagement photos. It’s a wonderful way for guests from both sides to feel more connected to your story.</p>
            
            <h3>5. Favors That Tell a Story</h3>
            <p>Ditch generic favors for something that speaks to who you are. Are you avid gardeners? Give seed packets. Coffee lovers? A small bag of your favorite local roast. A donation to a charity you both support is also a beautiful gesture. The best favors are the ones that feel like a small piece of you that your guests can take home.</p>`,
      fr: `<p class="lead">Votre mariage est l'expression ultime de votre histoire d'amour. Bien que les traditions soient belles, les moments les plus mémorables proviennent souvent des touches personnelles qui rendent la journée unique. Voici cinq façons créatives d'intégrer votre personnalité dans chaque aspect de votre célébration.</p>
            <h3>1. Une Cérémonie Inoubliable</h3>
            <p>C'est le cœur de votre journée. Allez au-delà du script standard :</p>
            <ul>
                <li><strong>Écrivez Vos Propres Vœux :</strong> C'est votre chance de dire à votre partenaire, et au monde, exactement ce qu'il ou elle représente pour vous. C'est souvent la partie la plus émouvante de la journée.</li>
                <li><strong>Impliquez Vos Proches :</strong> Demandez à un ami proche ou à un membre de votre famille de lire un poème, ou même d'officier.</li>
                <li><strong>Un Rituel Symbolique :</strong> Pensez à une cérémonie du ruban (handfasting), à planter un arbre ensemble, ou à un rituel de mélange de vins pour symboliser votre union.</li>
            </ul>
            
            <div class="grid grid-cols-2 gap-4 my-8">
                <img src="/se_marier_3.jpg" alt="Couple échangeant ses vœux" class="rounded-lg shadow-lg" />
                <img src="/vacheresses_19.jpg" alt="Cérémonie en plein air au manoir" class="rounded-lg shadow-lg" />
            </div>

            <h3>2. La Bande-Son de Votre Amour</h3>
            <p>La musique, c'est de l'émotion. Créez une playlist qui raconte votre histoire. Pensez à la chanson qui passait lors de votre premier rendez-vous, la musique que vous aimez pour les voyages en voiture, ou l'air qui vous fait toujours danser. Demandez des suggestions de chansons à vos invités sur les cartons RSVP pour vous assurer que la piste de danse soit pleine toute la nuit.</p>

            <h3>3. Le Goût de "Vous" avec un Cocktail Signature</h3>
            <p>Collaborez avec votre traiteur pour concevoir une boisson signature qui reflète vos goûts. Nommez-la d'après quelque chose de significatif—le nom d'un animal de compagnie, le lieu de votre rencontre, ou une blague entre vous. C'est un détail amusant et personnel que les invités adorent.</p>
            
            <blockquote class="my-8 p-6 border-l-4 border-primary bg-primary/10 text-lg italic">
              "Les touches personnelles sont l'âme d'un mariage. Elles transforment un bel événement en un souvenir chargé de sens."
            </blockquote>

            <h3>4. Une Promenade dans les Souvenirs</h3>
            <p>Créez un bel affichage de photos retraçant votre parcours en tant que couple, des photos d'enfance aux photos de fiançailles. C'est une merveilleuse façon pour les invités des deux côtés de se sentir plus connectés à votre histoire.</p>
            
            <h3>5. Des Cadeaux d'Invités Qui Racontent une Histoire</h3>
            <p>Abandonnez les cadeaux génériques pour quelque chose qui parle de qui vous êtes. Vous êtes des jardiniers passionnés ? Offrez des paquets de graines. Amateurs de café ? Un petit sac de votre torréfaction locale préférée. Un don à une œuvre de charité que vous soutenez tous les deux est également un beau geste. Les meilleurs cadeaux sont ceux qui semblent être un petit morceau de vous que vos invités peuvent emporter chez eux.</p>`,
    },
    imageId: 'blog-personalize',
  },
];

    