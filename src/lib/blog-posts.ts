
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
      fr: 'Choisir le lieu parfait : un guide pour les couples',
    },
    summary: {
      en: 'The venue sets the tone for your entire wedding. Here are our top tips for finding the one that\'s right for you.',
      fr: 'Le lieu donne le ton de tout votre mariage. Voici nos meilleurs conseils pour trouver celui qui vous convient.',
    },
    content: {
        en: `<p>Finding the perfect wedding venue is often the first and most significant decision you'll make in your planning journey. It sets the backdrop for your special day and influences everything from your guest list to your decor. Here's a breakdown of what to consider:</p>
            <h3>1. Define Your Vision</h3>
            <p>Before you start looking, sit down with your partner and discuss what you envision for your wedding. Do you dream of a rustic barn celebration, a chic city affair, or an elegant countryside escape? Knowing your style will help narrow down the options.</p>
            <h3>2. Consider Your Guest List</h3>
            <p>Your guest count is a major factor. Make sure the venues you consider can comfortably accommodate your numbers. Don't try to squeeze 200 people into a space meant for 100, but also avoid a space that's too large, which can make the event feel empty.</p>
            <h3>3. Align with Your Budget</h3>
            <p>Be realistic about what you can afford. Venue costs can include rental fees, catering, and extras. Ask for detailed pricing information upfront to avoid any surprises. Remember that a venue's price often reflects its location, capacity, and included services.</p>
            <h3>4. Think About Logistics</h3>
            <p>Consider the guest experience. Is the venue easy to get to? Is there ample parking or access to public transportation? If you have many out-of-town guests, are there hotels nearby? These logistical details can make a big difference.</p>
            <p>At Domaine des Vacheresses, we offer a versatile and elegant setting that can be tailored to your unique vision. From our grand reception hall to our serene gardens, we provide a timeless canvas for your dream wedding.</p>`,
        fr: `<p>Trouver le lieu de mariage parfait est souvent la première et la plus importante décision que vous prendrez dans votre parcours de planification. Il définit le décor de votre journée spéciale et influence tout, de votre liste d'invités à votre décoration. Voici une analyse de ce qu'il faut considérer :</p>
            <h3>1. Définissez votre vision</h3>
            <p>Avant de commencer à chercher, asseyez-vous avec votre partenaire et discutez de ce que vous imaginez pour votre mariage. Rêvez-vous d'une célébration rustique dans une grange, d'une affaire chic en ville ou d'une escapade élégante à la campagne ? Connaître votre style vous aidera à affiner les options.</p>
            <h3>2. Tenez compte de votre liste d'invités</h3>
            <p>Le nombre de vos invités est un facteur majeur. Assurez-vous que les lieux que vous envisagez peuvent accueillir confortablement votre nombre. N'essayez pas de faire entrer 200 personnes dans un espace prévu pour 100, mais évitez aussi un espace trop grand, qui peut donner l'impression que l'événement est vide.</p>
            <h3>3. Alignez-vous sur votre budget</h3>
            <p>Soyez réaliste quant à ce que vous pouvez vous permettre. Les coûts du lieu peuvent inclure les frais de location, la restauration et les extras. Demandez des informations tarifaires détaillées dès le départ pour éviter toute surprise. N'oubliez pas que le prix d'un lieu reflète souvent son emplacement, sa capacité et les services inclus.</p>
            <h3>4. Pensez à la logistique</h3>
            <p>Pensez à l'expérience des invités. Le lieu est-il facile d'accès ? Y a-t-il un grand parking ou un accès aux transports en commun ? Si vous avez de nombreux invités venant de loin, y a-t-il des hôtels à proximité ? Ces détails logistiques peuvent faire une grande différence.</p>
            <p>Au Domaine des Vacheresses, nous offrons un cadre polyvalent et élégant qui peut être adapté à votre vision unique. De notre grande salle de réception à nos jardins sereins, nous offrons une toile intemporelle pour le mariage de vos rêves.</p>`,
    },
    imageId: 'blog-venue',
  },
  {
    slug: 'tendances-decoration-mariage-2025',
    title: {
      en: 'Top Wedding Decor Trends for 2025',
      fr: 'Les tendances déco de mariage pour 2025',
    },
    summary: {
      en: 'From sustainable choices to bold color palettes, discover the trends that will define wedding aesthetics next year.',
      fr: 'Des choix durables aux palettes de couleurs audacieuses, découvrez les tendances qui définiront l\'esthétique des mariages l\'année prochaine.',
    },
    content: {
      en: `<p>As we look ahead, 2025 is shaping up to be a year of personalized, sustainable, and boldly expressive wedding decor. Couples are moving away from traditional norms and embracing styles that truly reflect their personalities. Here are the top trends to watch:</p>
            <h3>1. Sustainable & Eco-Friendly Choices</h3>
            <p>Sustainability is more than a trend; it's a movement. Expect to see locally sourced flowers, digital invitations, and upcycled decor. Couples are increasingly mindful of their environmental impact, opting for vendors who share their values.</p>
            <h3>2. Bold & Vibrant Color Palettes</h3>
            <p>While neutrals will always be classic, 2025 is all about color. Think rich jewel tones, vibrant blues, and earthy terracottas. These bold palettes are being used in everything from florals and linens to bridesmaid dresses and stationery.</p>
            <h3>3. Immersive Guest Experiences</h3>
            <p>Couples are creating unique experiences for their guests. This includes interactive food stations, live entertainment beyond a DJ (think painters or magicians), and personalized welcome gifts. The focus is on making the day memorable for everyone involved.</p>
            <h3>4. Statement Florals & Greenery</h3>
            <p>Floral installations are becoming more dramatic and architectural. Hanging floral arrangements, large-scale ceremony backdrops, and abundant greenery are being used to transform spaces and create a 'wow' factor.</p>
            <p>At Domaine des Vacheresses, our versatile spaces provide the perfect backdrop for any of these trends, allowing you to create a day that's both stylish and deeply personal.</p>`,
      fr: `<p>Alors que nous nous projetons, 2025 s'annonce comme une année de décoration de mariage personnalisée, durable et audacieusement expressive. Les couples s'éloignent des normes traditionnelles et adoptent des styles qui reflètent vraiment leur personnalité. Voici les principales tendances à surveiller :</p>
            <h3>1. Choix durables et écologiques</h3>
            <p>La durabilité est plus qu'une tendance ; c'est un mouvement. Attendez-vous à voir des fleurs d'origine locale, des invitations numériques et une décoration recyclée. Les couples sont de plus en plus conscients de leur impact environnemental, optant pour des fournisseurs qui partagent leurs valeurs.</p>
            <h3>2. Palettes de couleurs vives et audacieuses</h3>
            <p>Alors que les tons neutres seront toujours classiques, 2025 est l'année de la couleur. Pensez à des tons riches de pierres précieuses, des bleus vifs et des terres cuites. Ces palettes audacieuses sont utilisées partout, des fleurs et du linge de table aux robes des demoiselles d'honneur et à la papeterie.</p>
            <h3>3. Expériences immersives pour les invités</h3>
            <p>Les couples créent des expériences uniques pour leurs invités. Cela inclut des stations de restauration interactives, des animations live au-delà d'un DJ (pensez à des peintres ou des magiciens) et des cadeaux de bienvenue personnalisés. L'accent est mis sur le fait de rendre la journée mémorable pour toutes les personnes impliquées.</p>
            <h3>4. Fleurs et verdure spectaculaires</h3>
            <p>Les installations florales deviennent plus spectaculaires et architecturales. Des arrangements floraux suspendus, des décors de cérémonie à grande échelle et une verdure abondante sont utilisés pour transformer les espaces et créer un effet « wow ».</p>
            <p>Au Domaine des Vacheresses, nos espaces polyvalents offrent le cadre idéal pour toutes ces tendances, vous permettant de créer une journée à la fois élégante et profondément personnelle.</p>`,
    },
    imageId: 'blog-decor',
  },
  {
    slug: 'personaliser-votre-journee',
    title: {
      en: '5 Ways to Personalize Your Wedding Day',
      fr: '5 façons de personnaliser votre mariage',
    },
    summary: {
      en: 'Make your wedding uniquely yours. Here are five creative ideas to infuse your personality into your celebration.',
      fr: 'Rendez votre mariage unique. Voici cinq idées créatives pour insuffler votre personnalité dans votre célébration.',
    },
    content: {
      en: `<p>Your wedding day is a reflection of your love story. Infusing personal touches throughout the celebration makes it even more meaningful for you and your guests. Here are five ideas to inspire you:</p>
            <h3>1. Customize Your Ceremony</h3>
            <p>Write your own vows to express your love in your own words. You can also incorporate a unity ceremony that is meaningful to you, such as planting a tree, a handfasting ritual, or mixing a custom cocktail.</p>
            <h3>2. Incorporate Meaningful Music</h3>
            <p>Music has a powerful ability to evoke emotion. Choose songs for your ceremony, first dance, and reception playlist that are significant to your relationship. You could even ask guests for song requests on your RSVP cards.</p>
            <h3>3. Create a Signature Cocktail</h3>
            <p>Work with your caterer or bartender to design a "his" and "hers" or "theirs" signature cocktail. Name it after something special to you—a pet, a favorite place, or an inside joke.</p>
            <h3>4. Display Personal Photos</h3>
            <p>Create a photo display with pictures of you and your partner through the years, from childhood to your engagement. This is a wonderful conversation starter for guests and a beautiful tribute to your journey together.</p>
            <h3>5. Thoughtful Wedding Favors</h3>
            <p>Choose favors that represent you as a couple. If you love to cook, consider a small bottle of your favorite spice blend. If you're coffee enthusiasts, a bag of locally roasted beans is a great idea. The more personal the favor, the more your guests will appreciate it.</p>`,
      fr: `<p>Le jour de votre mariage est le reflet de votre histoire d'amour. Infuser des touches personnelles tout au long de la célébration le rend encore plus significatif pour vous et vos invités. Voici cinq idées pour vous inspirer :</p>
            <h3>1. Personnalisez votre cérémonie</h3>
            <p>Écrivez vos propres vœux pour exprimer votre amour avec vos propres mots. Vous pouvez également incorporer une cérémonie d'unité qui a du sens pour vous, comme planter un arbre, un rituel du handfasting ou mélanger un cocktail personnalisé.</p>
            <h3>2. Intégrez de la musique significative</h3>
            <p>La musique a un pouvoir puissant pour évoquer des émotions. Choisissez des chansons pour votre cérémonie, votre première danse et votre playlist de réception qui sont importantes pour votre relation. Vous pourriez même demander aux invités des suggestions de chansons sur vos cartons RSVP.</p>
            <h3>3. Créez un cocktail signature</h3>
            <p>Travaillez avec votre traiteur ou votre barman pour concevoir un cocktail signature "lui", "elle" ou "eux". Donnez-lui le nom de quelque chose de spécial pour vous : un animal de compagnie, un lieu préféré ou une blague entre vous.</p>
            <h3>4. Affichez des photos personnelles</h3>
            <p>Créez un affichage de photos avec des images de vous et de votre partenaire au fil des ans, de l'enfance à vos fiançailles. C'est un merveilleux sujet de conversation pour les invités et un bel hommage à votre parcours commun.</p>
            <h3>5. Des cadeaux de mariage attentionnés</h3>
            <p>Choisissez des cadeaux qui vous représentent en tant que couple. Si vous aimez cuisiner, pensez à une petite bouteille de votre mélange d'épices préféré. Si vous êtes des amateurs de café, un sac de grains torréfiés localement est une excellente idée. Plus le cadeau est personnel, plus vos invités l'apprécieront.</p>`,
    },
    imageId: 'blog-personalize',
  },
  {
    slug: 'photographie-de-mariage-incontournable',
    title: {
      en: 'The Must-Have Wedding Photography Shot List',
      fr: 'La liste des photos de mariage incontournables',
    },
    summary: {
      en: 'Ensure your photographer captures every important moment. Our checklist covers everything from getting ready to the final dance.',
      fr: 'Assurez-vous que votre photographe immortalise chaque moment important. Notre liste couvre tout, des préparatifs à la dernière danse.',
    },
    content: {
      en: `<p>Your wedding photos will be cherished for a lifetime. While you should trust your photographer's creative eye, providing a shot list ensures no important moment is missed. Here’s a comprehensive checklist:</p>
            <h3>Getting Ready</h3>
            <ul>
              <li>Detail shots: dress, shoes, rings, invitations</li>
              <li>Bride(s) and/or Groom(s) getting their hair and makeup done</li>
              <li>Candid moments with the wedding party</li>
              <li>The "first look" with parents or the wedding party</li>
            </ul>
            <h3>Ceremony</h3>
            <ul>
              <li>The empty ceremony space, decorated</li>
              <li>Guests arriving and being seated</li>
              <li>The wedding party walking down the aisle</li>
              <li>The processional and giving away</li>
              <li>Exchanging vows and rings</li>
              <li>The first kiss as a married couple</li>
              <li>The recessional</li>
            </ul>
             <h3>Portraits</h3>
            <ul>
              <li>The couple alone</li>
              <li>The couple with their wedding party (full group and smaller combinations)</li>
              <li>The couple with their immediate families</li>
            </ul>
            <h3>Reception</h3>
            <ul>
              <li>The empty reception space, including table settings and decor</li>
              <li>Grand entrance of the wedding party and couple</li>
              <li>The first dance</li>
              <li>Parent dances</li>
              <li>Speeches and toasts</li>
              <li>Cake cutting</li>
              <li>Guests dancing and mingling</li>
              <li>The grand exit (sparklers, confetti, etc.)</li>
            </ul>`,
      fr: `<p>Vos photos de mariage seront chéries toute votre vie. Bien que vous deviez faire confiance à l'œil créatif de votre photographe, fournir une liste de clichés garantit qu'aucun moment important n'est manqué. Voici une liste complète :</p>
            <h3>Préparatifs</h3>
            <ul>
              <li>Photos de détails : robe, chaussures, alliances, invitations</li>
              <li>La/les mariée(s) et/ou le/les marié(s) se faisant coiffer et maquiller</li>
              <li>Moments spontanés avec le cortège</li>
              <li>Le « premier regard » avec les parents ou le cortège</li>
            </ul>
            <h3>Cérémonie</h3>
            <ul>
              <li>L'espace de cérémonie vide, décoré</li>
              <li>Arrivée et installation des invités</li>
              <li>Le cortège descendant l'allée</li>
              <li>La procession et le don de la mariée</li>
              <li>L'échange des vœux et des alliances</li>
              <li>Le premier baiser en tant que couple marié</li>
              <li>La sortie</li>
            </ul>
             <h3>Portraits</h3>
            <ul>
              <li>Le couple seul</li>
              <li>Le couple avec son cortège (groupe complet et combinaisons plus petites)</li>
              <li>Le couple avec leurs familles immédiates</li>
            </ul>
            <h3>Réception</h3>
            <ul>
              <li>L'espace de réception vide, y compris la mise en table et la décoration</li>
              <li>Grande entrée du cortège et du couple</li>
              <li>La première danse</li>
              <li>Danses avec les parents</li>
              <li>Discours et toasts</li>
              <li>La coupe du gâteau</li>
              <li>Les invités qui dansent et socialisent</li>
              <li>La grande sortie (cierges magiques, confettis, etc.)</li>
            </ul>`,
    },
    imageId: 'blog-photos',
  },
  {
    slug: 'questions-a-poser-a-votre-traiteur',
    title: {
      en: 'Key Questions to Ask Your Wedding Caterer',
      fr: 'Questions clés à poser à votre traiteur de mariage',
    },
    summary: {
      en: 'Choosing a caterer is about more than just food. Here are the essential questions to ask before you sign a contract.',
      fr: 'Choisir un traiteur, c\'est plus que de la nourriture. Voici les questions essentielles à poser avant de signer un contrat.',
    },
    content: {
      en: `<p>Your wedding menu plays a huge role in your guests' experience. When meeting with potential caterers, being prepared with the right questions can help you make the best choice for your big day.</p>
            <h3>1. Are you licensed and insured?</h3>
            <p>This is a non-negotiable. A professional caterer should have liability insurance and the necessary licenses to serve food and alcohol. This protects you and your venue.</p>
            <h3>2. What is included in your pricing?</h3>
            <p>Ask for a detailed breakdown. Does the price per person include food, staff, linens, tableware, and gratuity? Are there any potential extra fees like cake cutting or corkage fees?</p>
            <h3>3. Do you specialize in certain types of cuisine?</h3>
            <p>If you have a specific food style in mind (e.g., farm-to-table, Italian, vegan), ensure the caterer has experience and expertise in that area. Ask to see sample menus.</p>
            <h3>4. Can you accommodate dietary restrictions?</h3>
            <p>This is crucial for ensuring all your guests are well-fed and safe. Ask how they handle allergies, intolerances, and other dietary needs (vegetarian, gluten-free, etc.).</p>
            <h3>5. Can we do a tasting?</h3>
            <p>A tasting is your chance to sample the food and experience the quality firsthand. Ask if the tasting is complimentary and how many people can attend. This is the best way to ensure the menu lives up to your expectations.</p>
            <p>At Domaine des Vacheresses, we work with a curated list of trusted caterers who meet our high standards of quality and service, ensuring your wedding feast is nothing short of spectacular.</p>`,
      fr: `<p>Le menu de votre mariage joue un rôle énorme dans l'expérience de vos invités. Lorsque vous rencontrez des traiteurs potentiels, être préparé avec les bonnes questions peut vous aider à faire le meilleur choix pour votre grand jour.</p>
            <h3>1. Êtes-vous agréé et assuré ?</h3>
            <p>C'est non négociable. Un traiteur professionnel doit avoir une assurance responsabilité civile et les licences nécessaires pour servir de la nourriture et de l'alcool. Cela vous protège, vous et votre lieu.</p>
            <h3>2. Qu'est-ce qui est inclus dans votre prix ?</h3>
            <p>Demandez une ventilation détaillée. Le prix par personne inclut-il la nourriture, le personnel, le linge de table, la vaisselle et le pourboire ? Y a-t-il des frais supplémentaires potentiels comme des frais de coupe du gâteau ou de droit de bouchon ?</p>
            <h3>3. Vous spécialisez-vous dans certains types de cuisine ?</h3>
            <p>Si vous avez un style de cuisine spécifique en tête (par exemple, de la ferme à la table, italien, végétalien), assurez-vous que le traiteur a de l'expérience et de l'expertise dans ce domaine. Demandez à voir des exemples de menus.</p>
            <h3>4. Pouvez-vous accommoder les restrictions alimentaires ?</h3>
            <p>C'est crucial pour garantir que tous vos invités soient bien nourris et en sécurité. Demandez comment ils gèrent les allergies, les intolérances et autres besoins alimentaires (végétarien, sans gluten, etc.).</p>
            <h3>5. Pouvons-nous faire une dégustation ?</h3>
            <p>Une dégustation est votre chance de goûter la nourriture et de découvrir la qualité par vous-même. Demandez si la dégustation est gratuite et combien de personnes peuvent y assister. C'est la meilleure façon de s'assurer que le menu est à la hauteur de vos attentes.</p>
            <p>Au Domaine des Vacheresses, nous travaillons avec une liste de traiteurs de confiance qui répondent à nos normes élevées de qualité et de service, garantissant que votre festin de mariage soit tout simplement spectaculaire.</p>`,
    },
    imageId: 'blog-catering',
  },
];
