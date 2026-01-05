
export type Locale = 'en' | 'fr';

export type Translation = {
  header: {
    home: string;
    packages: string;
    elopement: string;
    faq: string;
    services: string;
    configurator: string;
    blog: string;
    availability: string;
    portal: string;
    stay: string;
    domain: string;
    english: string;
    french: string;
  };
  hero: {
    title: string;
    subtitle: string;
    buttonExplore: string;
    buttonPlan: string;
  };
  packages: {
    title: string;
    subtitle: string;
    selectDatesInfo: string;
    selectAndContinue: string;
    classic_title: string;
    classic_desc: string;
    classic_features: string[];
    premium_title: string;
    premium_desc: string;
    premium_features: string[];
    luxury_title: string;
    luxury_desc: string;
    luxury_features: string[];
    button: string;
    discover: string;
  };
  visualTour: {
    title: string;
    subtitle: string;
    dialogTitle: string;
    dialogDescription: string;
    viewDomain: string;
    close: string;
  };
  availability: {
    title: string;
    subtitle: string;
    unavailable: string;
  };
  testimonials: {
    title: string;
    subtitle: string;
    quote_1: string;
    quote_2: string;
    quote_3: string;
  };
  access: {
    title: string;
    subtitle: string;
    byCar: string;
    byTrain: string;
    byAir: string;
    distances?: {
      byCar: string[];
      byTrain: string[];
      byAir: string[];
    };
  };
  proprietors?: {
    title: string;
    subtitle: string;
    description1: string;
    description2: string;
  };
  faq?: {
    title: string;
    subtitle: string;
    intro: string;
    sidebarTitle: string;
    sidebarDesc: string;
    emailButton: string;
    phoneButton: string;
    viewPackages: string;
    items: { id: string; question: string; answer: string }[];
  };
  services: {
    title: string;
    subtitle: string;
    included_title: string;
    included_1: string;
    included_2: string;
    included_3: string;
    included_4: string;
    included_5: string;
    included_6: string;
    caterer_title: string;
    caterer_desc: string;
    optional_title: string;
    optional_subtitle: string;
    option_rolls_title: string;
    option_rolls_desc: string;
    option_lanterns_title: string;
    option_lanterns_desc: string;
    option_chairs_title: string;
    option_chairs_desc: string;
    option_bbq_title: string;
    option_bbq_desc: string;
    option_flowers_title: string;
    option_flowers_desc: string;
    option_balloon_title: string;
    option_balloon_desc: string;
    on_request: string;
    learn_more: string;
  };
  configurator: {
    title: string;
    subtitle: string;
    customize_title: string;
    guests: string;
    package: string;
    addons: string;
    addon_rolls: string;
    addon_lanterns: string;
    addon_chairs: string;
    addon_bbq: string;
    addon_flowers: string;
    addon_balloon: string;
    budget_title: string;
    budget_subtitle: string;
    base_package: string;
    guest_surcharge: string;
    addons_total: string;
    total_estimate: string;
    request_consultation: string;
  };
  login: {
    title: string;
    description: string;
    login_tab: string;
    signup_tab: string;
    email_label: string;
    password_label: string;
    login_button: string;
    admin_hint: string;
    name_label: string;
    signup_button: string;
    admin_success_title: string;
    admin_success_desc: string;
    client_success_title: string;
    client_success_desc: string;
    invalid_credentials_title: string;
    invalid_credentials_desc: string;
    signup_success_title: string;
    signup_success_desc: string;
    missing_info_title: string;
    missing_info_desc: string;
  };
  footer: {
      copyright: string;
      legal: string;
  };
  legal: {
    title: string;
    section1_title: string;
    section1_p1: string;
    owner_title: string;
    owner_name: string;
    owner_address: string;
    owner_phone: string;
    owner_email: string;
    owner_siren: string;
    realization_title: string;
    realization_name: string;
    realization_address: string;
    realization_phone: string;
    realization_email: string;
    realization_siret: string;
    hosting_title: string;
    hosting_name: string;
    hosting_address: string;
    hosting_vat: string;
    section2_title: string;
    section2_p1: string;
    section2_p2: string;
    section2_p3: string;
    section3_title: string;
    section3_p1: string;
    section3_p2: string;
    section4_title: string;
    section4_p1: string;
    section4_p2: string;
    section4_p3: string;
    section5_title: string;
    section5_p1: string;
    section6_title: string;
    section6_p1: string;
    section6_p2: string;
    section6_1_title: string;
    section6_1_p1: string;
    section6_1_p2: string;
    section6_1_p3: string;
    section6_1_p4: string;
    section6_2_title: string;
    section6_2_p1: string;
    section6_2_l1: string;
    section6_2_l2: string;
    section6_2_l3: string;
    section6_2_l4: string;
    section6_2_p2: string;
    section6_3_title: string;
    section6_3_p1: string;
    section6_3_l1: string;
    section6_3_l2: string;
    section6_3_l3: string;
    section6_3_l4: string;
    section6_3_l5: string;
    section6_3_p2: string;
    section6_3_p3: string;
    section6_3_p4: string;
    section6_3_p5: string;
    section6_3_p6: string;
    section6_3_p7: string;
    section6_4_title: string;
    section6_4_p1: string;
    section6_4_p2: string;
    section6_4_p3: string;
    section6_5_title: string;
    section6_5_p1: string;
    section6_5_p2: string;
    section6_5_p3: string;
    section7_title: string;
    section7_1_title: string;
    section7_1_p1: string;
    section7_1_p2: string;
    section7_2_title: string;
    section7_2_p1: string;
    section8_title: string;
    section8_p1: string;
    section8_p2: string;
  };
  blog: {
    title: string;
    subtitle: string;
    readMore: string;
    backToBlog: string;
    pressTitle?: string;
    pressSubtitle?: string;
    pressButton?: string;
    momentsTitle?: string;
    momentsSubtitle?: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    contact_planner: string;
    tabs: {
      overview: string;
      contracts: string;
      payments: string;
      messages: string;
    };
    overview: {
      title: string;
      date_title: string;
      date_value: string;
      guests_title: string;
      guests_value: string;
      package_title: string;
      package_value: string;
    };
    contracts: {
      title: string;
      description: string;
      col_document: string;
      col_status: string;
      col_date: string;
      col_action: string;
      doc_main: string;
      doc_catering: string;
      status_awaiting: string;
      status_completed: string;
      action_sign: string;
      action_view: string;
    };
    payments: {
      title: string;
      description: string;
      col_item: string;
      col_amount: string;
      col_due: string;
      col_status: string;
      col_action: string;
      item_deposit: string;
      item_initial: string;
      item_booking: string;
      status_due: string;
      status_pending: string;
      status_paid: string;
      action_pay: string;
      action_paid: string;
    };
    messages: {
      title: string;
      message1: string;
      message2: string;
      placeholder: string;
      send_button: string;
    };
    toast: {
      title: string;
      description: string;
    };
    view_contract: {
      for: string;
      p1: string;
      h4_1: string;
      p2: string;
      h4_2: string;
      p3: string;
      h4_3: string;
      p4: string;
      status: string;
      close: string;
      sign: string;
    };
  };
  admin: {
    title: string;
    new_contract: string;
    tabs: {
      dashboard: string;
      clients: string;
      calendar: string;
      contracts: string;
    };
    revenue_title: string;
    revenue_desc: string;
    upcoming_title: string;
    upcoming_desc: string;
    inquiries_title: string;
    inquiries_desc: string;
    client_management: {
      title: string;
      description: string;
      col_name: string;
      col_date: string;
      col_package: string;
      col_status: string;
      col_actions: string;
      status_booked: string;
      status_inquiry: string;
      view_button: string;
    };
    venue_calendar: {
      title: string;
      description: string;
    };
    all_contracts: {
      title: string;
      description: string;
      col_client: string;
      col_document: string;
      col_status: string;
      col_actions: string;
      doc_main: string;
      status_awaiting: string;
      status_completed: string;
      send_reminder: string;
      view_button: string;
    };
    form: {
      select_package: string;
      cancel: string;
      create: string;
    };
    view_contract: {
      title: string;
      for: string;
      p1: string;
      h4_1: string;
      p2: string;
      h4_2: string;
      p3: string;
      h4_3: string;
      p4: string;
      status: string;
      close: string;
    };
  };
  stay: {
    title: string;
    subtitle: string;
    intro_title: string;
    intro_description: string;
    maison_potager_title: string;
    maison_potager_subtitle: string;
    maison_potager_description: string;
    maison_potager_common_area: string;
    privatize_title: string;
    privatize_description: string;
    view_details: string;
    reserve_online: string;
    contact_us: string;
    rooms: {
      heures_du_jour: {
        name: string;
        type: string;
        capacity: string;
        bedding: string;
        surface: string;
        description: string;
      };
      ruines_antiques: {
        name: string;
        type: string;
        capacity: string;
        bedding: string;
        surface: string;
        description: string;
      };
      jardins_tivoli: {
        name: string;
        type: string;
        capacity: string;
        bedding: string;
        surface: string;
        description: string;
      };
      petit_trianon: {
        name: string;
        type: string;
        capacity: string;
        bedding: string;
        surface: string;
        description: string;
      };
      voyage_ballon: {
        name: string;
        type: string;
        capacity: string;
        bedding: string;
        surface: string;
        description: string;
      };
      la_loge: {
        name: string;
        type: string;
        capacity: string;
        bedding: string;
        surface: string;
        description: string;
      };
    };
    equipment: {
      title: string;
      bathroom: string;
      bed_queen: string;
      bed_single: string;
      curtains: string;
      wifi: string;
      courtesy_tray: string;
      tv: string;
      toiletries: string;
      mirror: string;
      hairdryer: string;
      linens: string;
    };
  };
  domain: {
    title: string;
    subtitle: string;
    spirit_title: string;
    spirit_content: string;
    history_title: string;
    discover_more: string;
    age_or_title: string;
    age_or_content: string;
    renaissance_title: string;
    renaissance_content: string;
    noailles_title: string;
    noailles_content: string;
    modern_title: string;
    modern_content: string;
    poi: {
      cour_honneur: {
        title: string;
        subtitle: string;
        content: string;
      },
      salle_reception: {
        title: string;
        subtitle: string;
        content: string;
      },
      salle_exposition: {
        title: string;
        subtitle: string;
        content: string;
      },
      parc: {
        title: string;
        subtitle: string;
        content: string;
      },
      preau_verger: {
        title: string;
        subtitle: string;
        content: string;
      },
      potager: {
        title: string;
        subtitle: string;
        content: string;
      },
      salle_blanche: {
        title: string;
        subtitle: string;
        content: string;
      },
      orangerie: {
        title: string;
        subtitle: string;
        content: string;
      },
      chapelle: {
        title: string;
        subtitle: string;
        content: string;
      },
      terrasses: {
        title: string;
        subtitle: string;
        content: string;
      },
      roseraie: {
        title: string;
        subtitle: string;
        content: string;
      },
      mare: {
        title: string;
        subtitle: string;
        content: string;
      }
    }
  };
  interactiveMap: {
      title: string;
      subtitle: string;
      exploreSpaces?: string;
      discover: string;
      close: string;
      legend_accommodation: string;
      legend_poi: string;
      legend_space: string;
    };
  contact: {
    title: string;
    subtitle: string;
  };
  dateSelector: {
    title: string;
    subtitle: string;
    selectedDate: string;
    helpText: string;
    dialogTitle: string;
    dialogDescription: string;
    cancel: string;
    confirm: string;
  };
  instagram: {
    title: string;
    subtitle: string;
    button: string;
  };
};

export const translations: Record<Locale, Translation> = {
  en: {
    header: {
      home: "Home",
      packages: "Wedding Packages",
      elopement: "Elopement",
      faq: "FAQ",
      services: "Services",
      configurator: "Configurator",
      blog: "Blog",
      availability: "Availability",
      portal: "Portal",
      stay: "Stay",
      domain: "The Estate",
      english: "English",
      french: "Français",
    },
    hero: {
      title: "Your Dream Wedding Starts Here",
      subtitle: "Discover the enchanting Domaine des Vacheresses, where timeless elegance meets the serene beauty of the French countryside.",
      buttonExplore: "Explore Packages",
      buttonPlan: "Plan Your Day",
    },
    packages: {
        title: "Wedding Packages",
        subtitle: "Choose from one of our curated packages, or build your own for a truly bespoke experience.",
        selectDatesInfo: "Select a date above or choose a package to select your event date",
        selectAndContinue: "Select date & continue",
        classic_title: "Classic Elegance",
        classic_desc: "Our essential package for a beautiful and memorable day.",
        classic_features: [
          "Venue rental for 8 hours",
          "Seating for up to 100 guests",
          "Standard floral arrangements",
          "Three-course dinner menu",
        ],
        premium_title: "Premium Romance",
        premium_desc: "An enhanced experience with premium services and details.",
        premium_features: [
          "Full-day venue rental",
          "Seating for up to 150 guests",
          "Custom floral design",
          "Five-course dinner & cocktail hour",
          "Live string quartet for ceremony",
        ],
        luxury_title: "Luxury Dream",
        luxury_desc: "The ultimate all-inclusive package for a truly magical wedding.",
        luxury_features: [
          "Weekend venue access",
          "Seating for up to 200 guests",
          "Designer floral installations",
          "Gourmet tasting menu & open bar",
          "Full wedding planning service",
          "Fireworks display",
        ],
        button: "Select Package",
        discover: "Discover",
    },
    visualTour: {
        title: "An Immersive Visual Tour",
        subtitle: "Explore the breathtaking beauty of Domaine des Vacheresses from every angle.",
        dialogTitle: "Discover the Estate",
        dialogDescription: "Immerse yourself in the history and elegance of Domaine des Vacheresses.",
        viewDomain: "View the Estate",
        close: "Close",
    },
    availability: {
        title: "Check Our Availability",
        subtitle: "Select a date to see if your dream wedding day is available. We recommend booking well in advance.",
        unavailable: "Dates marked in gray are unavailable.",
    },
    testimonials: {
        title: "Words from Our Couples",
        subtitle: "Hear what others have to say about their magical day at Domaine des Vacheresses.",
        quote_1: "Our wedding at Vacheresses was a fairytale. The team went above and beyond to make our day perfect. The venue is even more beautiful in person!",
        quote_2: "We couldn't have asked for a more stunning backdrop for our special day. Every detail was handled with care, and our guests are still talking about it.",
        quote_3: "The entire process was seamless, from planning to the day itself. The food was exquisite, the staff was incredible, and the venue was simply breathtaking.",
    },
    access: {
      title: "Easy to Access",
      subtitle: "Conveniently located, our estate is easily reachable by car, train, and from major airports.",
      byCar: "By Car",
      byTrain: "By Train",
      byAir: "By Air",
      distances: {
        byCar: [
          "47 miles from Paris (~1h 15min)",
          "28 miles from Versailles (~45 min)",
          "19 miles from Chartres (~30 min)",
          "14 miles from Rambouillet (~25 min)",
          "4 miles from Maintenon (~10 min)",
        ],
        byTrain: [
          "Maintenon station (55 min from Gare Montparnasse)",
        ],
        byAir: [
          "Paris Orly: 53 miles",
          "Paris Roissy Charles de Gaulle: 72 miles",
        ],
      },
    },
    proprietors: {
      title: "Our Proprietors",
      subtitle: "Frédérique & Philippe",
      description1: "Passionate about art, history and old stones, Frédérique and Philippe succumbed to the authenticity and architecture of the building which reminded Philippe of childhood memories and his English origins.",
      description2: "Since 2017, they have undertaken renovation work and opened this family home to create new emotions and share values dear to them: conviviality, generosity, elegance, the French art of living…",
    },
    faq: {
      title: "FAQ",
      subtitle: "Frequently Asked Questions",
      intro: "Find answers to common questions about weddings at Domaine des Vacheresses.",
      sidebarTitle: "Still have questions?",
      sidebarDesc: "Our team is here to help you plan your perfect day.",
      emailButton: "Email Us",
      phoneButton: "Call Us",
      viewPackages: "View Packages",
      items: [
        {
          id: "booking",
          question: "How do I book a wedding date at the Manor?",
          answer: "To book a wedding date, please contact us directly via email or phone. We recommend booking at least 12-18 months in advance for popular dates. A 50% deposit is required to secure your date, with the balance due 30 days before the event.",
        },
        {
          id: "packages",
          question: "What's included in your wedding packages?",
          answer: "Our wedding packages include venue rental, seating arrangements, basic floral decorations, and access to all estate facilities for your event duration. Premium and Luxury packages include additional services like catering coordination, enhanced floral design, and entertainment options. All packages include accommodation for 21 guests in the estate.",
        },
        {
          id: "guests",
          question: "How many guests can the Manor accommodate?",
          answer: "Our estate can comfortably accommodate up to 200 guests for a seated dinner. The exact capacity depends on your chosen package and layout preferences. We can also arrange additional accommodations at nearby partner hotels for larger groups.",
        },
        {
          id: "catering",
          question: "Do you provide catering services?",
          answer: "We work with a curated list of experienced caterers who specialize in wedding events. While we don't provide catering directly, we coordinate with our preferred vendors to ensure seamless service. You're also welcome to work with your own caterer if you prefer.",
        },
        {
          id: "decor",
          question: "Can I bring my own decorations?",
          answer: "Absolutely! We encourage personal touches that reflect your style. However, we ask that you coordinate with our team to ensure your decorations align with our venue guidelines and won't damage the historic property. Our team can also provide advice on what works best in our spaces.",
        },
        {
          id: "weather",
          question: "What happens if it rains on my wedding day?",
          answer: "Our estate offers both indoor and outdoor spaces, providing flexibility for weather changes. The Reception Hall, Exhibition Hall, and Courtyard can accommodate your ceremony or reception in case of rain. We also provide marquees that can be set up for additional covered areas if needed.",
        },
        {
          id: "accommodation",
          question: "What accommodation options are available for guests?",
          answer: "The Manor offers accommodation for 21 guests in our beautifully appointed rooms. For larger groups, we partner with nearby hotels and guesthouses. We can facilitate bookings at these partner accommodations and often secure preferential rates for our wedding parties.",
        },
        {
          id: "accessibility",
          question: "Is the Manor accessible for guests with mobility issues?",
          answer: "We have made efforts to accommodate guests with mobility issues. The Jardins Tivoli room is specifically designed for wheelchair access. Other areas of the estate have varying levels of accessibility due to the historic nature of the buildings. Please contact us to discuss specific requirements, and we'll do our best to accommodate your needs.",
        },
      ],
    },
    services: {
        title: "Our Services",
        subtitle: "Discover the services included in the privatization of the estate and our optional offers to enhance your wedding.",
        included_title: "Privatization of the Estate",
        included_1: "Wedding hall with office (100 people), exhibition room (20 to 30 children), main courtyard, wooded park, orchard and its covered area (130 people for the cocktail or the secular ceremony), medieval vegetable garden.",
        included_2: "Provision of round tables and white Napoleon III chairs for 110 people, oval bridal table, screen, chairs and wrought iron garden furniture.",
        included_3: "Decorative elements for the interior and exterior: Medici vases for the wedding hall, easel, vases, frame for the table plan, zinc basins, small cart, wooden logs...",
        included_4: "Advice on decoration and organization throughout your preparations, help and coordination for the D-day.",
        included_5: "Exterior lighting.",
        included_6: "Private parking.",
        caterer_title: "Caterer",
        caterer_desc: "We have selected a list of caterers with extensive experience in the wedding world to best meet your expectations. List available on request.",
        optional_title: "Optional Services",
        optional_subtitle: "Enhance your day with our exclusive à la carte services.",
        option_rolls_title: "Rolls-Royce with Chauffeur",
        option_rolls_desc: "The 1957 Rolls-Royce Silver Cloud, a family car, is available to the Vacheresses bride and groom to pick them up from the town hall, the church and bring them back to the Manor.",
        option_lanterns_title: "Lanterns",
        option_lanterns_desc: "Of ancient architecture, 1.20 m high wrought iron lanterns can adorn the main courtyard, the orchard. Candles will give them a sparkling glow throughout the night.",
        option_chairs_title: "Outdoor Napoleon III Chairs",
        option_chairs_desc: "For your secular ceremony or your outdoor brunch, we offer white Napoleon III chairs designed for the outdoors.",
        option_bbq_title: "Ofyr BBQ",
        option_bbq_desc: "A prime rib or grilled vegetables? An Ofyr barbecue, both a brazier and a plancha, can be installed and will transform the cooking space into a warm, friendly and welcoming moment for friends and family.",
        option_flowers_title: "Flower Bar",
        option_flowers_desc: "Want to give a gift to your guests? How about a custom-made flower jewelry animation to surprise your guests during the cocktail reception?",
        option_balloon_title: "Hot Air Balloon Flights",
        option_balloon_desc: "What if your guests enjoyed a captive hot air balloon flight in the meadow to discover the park, the view of the manor and the Néron valley from above?",
        on_request: "Quote on request",
        learn_more: "Learn More",
    },
    configurator: {
        title: "Wedding Configurator",
        subtitle: "Design your perfect day and get an instant budget estimate. This tool helps you explore options for your dream wedding at Vacheresses.",
        customize_title: "Customize Your Wedding",
        guests: "Number of Guests",
        package: "Wedding Package",
        addons: "Optional Add-ons",
        addon_rolls: "Rolls-Royce with Chauffeur",
        addon_lanterns: "Lanterns",
        addon_chairs: "Outdoor Napoleon III Chairs",
        addon_bbq: "Ofyr BBQ",
        addon_flowers: "Flower Bar",
        addon_balloon: "Hot Air Balloon Flights",
        budget_title: "Budget Estimate",
        budget_subtitle: "This is an initial estimate. A detailed quote will be provided upon consultation.",
        base_package: "Base Package",
        guest_surcharge: "Guest Surcharge",
        addons_total: "Add-ons",
        total_estimate: "Total Estimated Cost",
        request_consultation: "Request a Consultation",
    },
    login: {
        title: "Client & Admin Portal",
        description: "Access your wedding dashboard or sign up.",
        login_tab: "Login",
        signup_tab: "Sign Up",
        email_label: "Email",
        password_label: "Password",
        login_button: "Login",
        admin_hint: "Hint: Use admin@example.com / password for admin access.",
        name_label: "Name",
        signup_button: "Create Account",
        admin_success_title: "Admin Login Successful",
        admin_success_desc: "Redirecting to admin dashboard...",
        client_success_title: "Client Login Successful",
        client_success_desc: "Redirecting to client dashboard...",
        invalid_credentials_title: "Invalid Credentials",
        invalid_credentials_desc: "Please check your email and password.",
        signup_success_title: "Registration Successful",
        signup_success_desc: "Welcome! Redirecting to your dashboard...",
        missing_info_title: "Missing Information",
        missing_info_desc: "Please fill out all fields to register.",
    },
    footer: {
      copyright: "© {year} Domaine des Vacheresses. All rights reserved.",
      legal: "Legal Notice",
    },
    legal: {
        title: 'Legal Notice',
        section1_title: '1. Site Presentation',
        section1_p1: 'Under Article 6 of Law No. 2004-575 of June 21, 2004 for confidence in the digital economy, users of the manoirdevacheresses.com site are informed of the identity of the various parties involved in its creation and monitoring:',
        owner_title: 'Owner:',
        owner_name: 'Manoir de Vacheresses – CARDINAL FINANCE',
        owner_address: 'Address: rue du Manoir, 28210 Nogent-le-Roi',
        owner_phone: 'Phone: 06 11 84 20 21',
        owner_email: 'Email: contact@manoirdevacheresses.com',
        owner_siren: 'Siren: 528 949 605',
        realization_title: 'Realization:',
        realization_name: 'RIGONE – Web4Gites',
        realization_address: 'Address: 52 rue Saint Brice, 28000 Chartres',
        realization_phone: 'Phone: 07 49 58 61 74',
        realization_email: 'Email: contact@web4gites.com',
        realization_siret: 'Siret: 835 331 588 00011',
        hosting_title: 'Hosting:',
        hosting_name: 'OVH Company',
        hosting_address: 'Address: 2, rue Kellermann BP 80157 59053 ROUBAIX Cedex 1',
        hosting_vat: 'VAT No.: FR 22 424 761 419',
        section2_title: '2. General conditions of use of the site and the services offered.',
        section2_p1: 'Access, consultation, navigation and/or use of the manoirdevacheresses.com site (hereinafter the "Site") and its services implies full and complete acceptance of these general conditions of use (hereinafter "GCU") which aim to define the terms of use of the Site and its services by any person accessing, consulting, browsing and/or using all or part of the Site and its services (hereinafter "User"). These GCU are likely to be modified or supplemented at any time, Users of the Site are therefore invited to consult the GCU with each new access to the Site.',
        section2_p2: 'This version of the GCU replaces all previous versions.',
        section2_p3: 'The Site is normally accessible to users at all times, subject to the occurrence of a case of force majeure, possible breakdowns or any maintenance operation necessary for the proper functioning of the Site and its services. In the event of an interruption for technical maintenance reasons, CARDINAL FINANCE will endeavor to communicate the dates and times of the intervention to Users in advance.',
        section3_title: '3. Description of the services provided.',
        section3_p1: 'The purpose of the Site is to provide information concerning all of CARDINAL FINANCE\'s services. However, it cannot be held responsible for omissions, inaccuracies and deficiencies in the update, whether of its own making or of the third-party partners who provide it with this information.',
        section3_p2: 'All the information indicated on the Site is given for information purposes, and is likely to evolve. Furthermore, the information on the Site is not exhaustive. It is given subject to modifications having been made since it was put online.',
        section4_title: '4. Intellectual Property',
        section4_p1: 'All elements of the Site that are made available to Users, including trademarks, logos, photographs, programs, source codes, graphics, videos, texts, layout, appearance, structure, as well as any other element not linked to hyperlinks to third-party sites, are the property of CARDINAL FINANCE.',
        section4_p2: 'Subject to the rights of use, written, granted to the User by CARDINAL FINANCE, any reproduction, representation, modification, publication, adaptation of all or part of the elements of the site, whatever the means or process used, is prohibited.',
        section4_p3: 'Any unauthorized use of the site or of any of the elements it contains will be considered as constituting an infringement and prosecuted in accordance with the provisions of articles L.335-2 and following of the Intellectual Property Code.',
        section5_title: '5. Limitation of Liability',
        section5_p1: 'CARDINAL FINANCE and all companies that contributed to the creation and implementation of the Site cannot be held responsible for any damage, costs, losses, direct, accidental or indirect or for any other risk resulting from access to or use of the Site by the User.',
        section6_title: '6. Management of personal data',
        section6_p1: 'In France, personal data is notably protected by Law No. 78-87 of January 6, 1978, Law No. 2004-801 of August 6, 2004, Article L. 226-13 of the Penal Code and the European Directive of October 24, 1995.',
        section6_p2: 'As part of the access, consultation, navigation and use of the Site and the services it offers, you are required to communicate personal data concerning you to CARDINAL FINANCE.',
        section6_1_title: '6.1 Data Collection Managers',
        section6_1_p1: 'For Personal Data collected as part of the User\'s connection with CARDINAL FINANCE, the data controller for Personal Data is CARDINAL FINANCE.',
        section6_1_p2: 'In this collection case, data processing is necessary for administration and commercial prospecting purposes, when the User provides their own Personal Data in order to be contacted. The optional information is intended to better know the User and thus to improve the services offered to them. The user provides this information with full knowledge of the facts, particularly when they enter it themselves. It is then specified to the user of the Site whether or not it is obligatory to provide this information.',
        section6_1_p3: 'For Personal Data collected as part of the User\'s navigation on the Site, the data controller for Personal Data is RIGONE – Web4gites.',
        section6_1_p4: 'During the use of the Site, the following may be collected: the URL of the links through which the user accessed the Site, the user\'s access provider, the user\'s Internet Protocol (IP) address.',
        section6_2_title: '6.2 Purpose of the data collected',
        section6_2_p1: 'The site is likely to process all or part of the data:',
        section6_2_l1: 'to allow navigation on the Site and the management and traceability of the services ordered by the User: connection and use data of the Site',
        section6_2_l2: 'to prevent and fight against computer fraud (spamming, hacking, etc.): computer equipment used for navigation, IP address, etc.',
        section6_2_l3: 'to improve navigation on the Site: connection and use data',
        section6_2_l4: 'to communicate with the User: last name, first name, telephone number and email address',
        section6_2_p2: 'CARDINAL FINANCE and all companies that contributed to the creation and implementation of the Site do not market your personal data, which is therefore only used out of necessity or for statistical and analysis purposes.',
        section6_3_title: '6.3 Right of access, rectification and opposition',
        section6_3_p1: 'In accordance with current European regulations, Users of the Site have the following rights:',
        section6_3_l1: 'right of access (article 15 GDPR) and rectification (article 16 GDPR), updating, completeness of User data right to block or erase personal User data (article 17 of the GDPR), when they are inaccurate, incomplete, ambiguous, outdated, or whose collection, use, communication or storage is prohibited',
        section6_3_l2: 'right to withdraw consent at any time (article 13-2c GDPR)',
        section6_3_l3: 'right to limit the processing of User data (article 18 GDPR)',
        section6_3_l4: 'right to object to the processing of User data (article 21 GDPR)',
        section6_3_l5: 'right to the portability of the data that Users will have provided, when this data is subject to automated processing based on their consent or on a contract (article 20 GDPR)',
        section6_3_p2: 'As soon as the Site becomes aware of the death of a User and in the absence of instructions from them, it undertakes to destroy their data, unless their retention is necessary for evidentiary purposes or to meet a legal obligation.',
        section6_3_p3: 'If the User wishes to know how the site uses their Personal Data, request to rectify them or oppose their processing, the User can contact the site in writing at the following address: RIGONE, the data protection officer, 52 rue Saint-Brice, 28000 Chartres – contact@Web4gites.com',
        section6_3_p4: 'In this case, the User must indicate the Personal Data that they would like the site to correct, update or delete, by identifying themselves precisely with a copy of an identity document (identity card or passport).',
        section6_3_p5: 'Personal data will be kept for the time necessary to fulfill the purpose for which it was collected. It will then be deleted. By exception, this data may be archived to manage ongoing complaints and litigation as well as to meet our legal and regulatory obligations.',
        section6_3_p6: 'Requests for the deletion of Personal Data will be subject to the obligations imposed on the site by law, particularly with regard to the preservation or archiving of documents. Finally, Users of the site can file a complaint with the supervisory authorities, and in particular with the CNIL (https://www.cnil.fr/fr/plaintes).',
        section6_3_p7: 'We inform you of the existence of the "Bloctel" telephone canvassing opposition list, on which you can register here: https://conso.bloctel.fr/',
        section6_4_title: '6.4 Non-disclosure of personal data',
        section6_4_p1: 'The site refrains from processing, hosting or transferring the Information collected on its Users to a country located outside the European Union or recognized as "unsuitable" by the European Commission without first informing CARDINAL FINANCE. However, the Site remains free to choose its technical and commercial subcontractors provided that they present sufficient guarantees with regard to the requirements of the General Data Protection Regulation (GDPR: No. 2016-679).',
        section6_4_p2: 'The Site undertakes to take all necessary precautions to preserve the security of the Information and in particular that it is not communicated to unauthorized persons. However, if an incident affecting the integrity or confidentiality of the Information is brought to the attention of the Site, the latter must as soon as possible inform CARDINAL FINANCE and communicate the corrective measures taken. Furthermore, the Site does not collect any "sensitive data".',
        section6_4_p3: 'Within the limits of their respective attributions and for the purposes recalled above, the main people likely to have access to the data of the site\'s Users are mainly the agents of CARDINAL FINANCE and RIGONE.',
        section6_5_title: '6.5 Types of data collected',
        section6_5_p1: 'The Personal Data name, email and telephone are collected by email.',
        section6_5_p2: 'The site also collects information that improves the user experience and offers contextualized advice: Google Analytics and Smartjet.',
        section6_5_p3: 'This Personal Data and information will be kept for the time necessary to fulfill the purpose for which it was collected. It will then be deleted. By exception, this data may be archived to manage ongoing complaints and litigation as well as to meet our legal and regulatory obligations.',
        section7_title: '7. Hyperlinks and cookies',
        section7_1_title: '7.1 Cookies',
        section7_1_p1: 'Cookies are small files placed on your computer. A cookie does not allow us to identify you but it records information relating to the navigation of your computer on our site that we can read during your subsequent visits in order to facilitate navigation, optimize the connection and personalize the use of the site.',
        section7_1_p2: 'The configuration of the navigation software allows you to be informed of the presence of a cookie and possibly, to refuse it in the manner described at the following address: www.cnil.fr. The user can however configure their computer\'s browser to refuse the installation of cookies, knowing that refusing to install a cookie may make it impossible to access certain services. For any blocking of cookies, type in your search engine: blocking of cookies under IE or firefox and follow the instructions depending on your version.',
        section7_2_title: '7.2 Hyperlinks',
        section7_2_p1: 'The Site declines all responsibility for the content of the information provided on these sites upon activation of the hyperlink.',
        section8_title: '8. Photo and icon credits',
        section8_p1: 'CARDINAL FINANCE',
        section8_p2: 'Istockphoto.com – All rights reserved.',
    },
    blog: {
      title: "Our Blog",
      subtitle: "Inspiration, tips, and stories for your perfect wedding.",
      readMore: "Read More",
      backToBlog: "Back to Blog",
      pressTitle: "Press & Media",
      pressSubtitle: "Discover the press features highlighting Domaine des Vacheresses",
      pressButton: "View press articles",
      momentsTitle: "Unforgettable Moments",
      momentsSubtitle: "Discover the magic of our weddings through these images",
    },
    dashboard: {
      title: "Alex & Jordan's Wedding",
      subtitle: "Welcome to your personal wedding portal.",
      contact_planner: "Contact Planner",
      tabs: {
        overview: "Overview",
        contracts: "Contracts",
        payments: "Payments",
        messages: "Messages",
      },
      overview: {
        title: "Wedding Overview",
        date_title: "Wedding Date",
        date_value: "Saturday, June 14, 2025",
        guests_title: "Guest Count",
        guests_value: "125 Guests",
        package_title: "Package",
        package_value: "Premium Romance",
      },
      contracts: {
        title: "Contracts",
        description: "Review and sign your contracts here.",
        col_document: "Document",
        col_status: "Status",
        col_date: "Date Sent",
        col_action: "Action",
        doc_main: "Main Venue Agreement",
        doc_catering: "Catering Addendum",
        status_awaiting: "Awaiting Signature",
        status_completed: "Completed",
        action_sign: "View & Sign",
        action_view: "View",
      },
      payments: {
        title: "Payment Schedule",
        description: "Track your payments and due dates.",
        col_item: "Item",
        col_amount: "Amount",
        col_due: "Due Date",
        col_status: "Status",
        col_action: "Action",
        item_deposit: "Deposit",
        item_initial: "Initial Payment",
        item_booking: "Booking Fee",
        status_due: "Due",
        status_pending: "Pending",
        status_paid: "Paid",
        action_pay: "Pay Now",
        action_paid: "Paid",
      },
      messages: {
        title: "Your Planner: Sophie",
        message1: "Hi Alex and Jordan! Just wanted to confirm your tasting session for next Tuesday at 2 PM. So excited for you to try the menu!",
        message2: "Hi Sophie! That sounds great, we'll be there. Can't wait!",
        placeholder: "Type a message...",
        send_button: "Send",
      },
      toast: {
        title: "Contract Signed!",
        description: "The {document} has been successfully signed."
      },
      view_contract: {
        for: "for",
        p1: "This document outlines the terms and conditions for the rental of Domaine des Vacheresses for the event on {date}.",
        h4_1: "1. Services Included",
        p2: "The Premium Romance package includes full-day venue rental, seating for up to 150 guests, custom floral design, a five-course dinner & cocktail hour, and a live string quartet for the ceremony.",
        h4_2: "2. Payment Schedule",
        p3: "A deposit of 50% is due upon signing. The remaining balance is due 30 days prior to the event date.",
        h4_3: "3. Cancellation Policy",
        p4: "Cancellations made more than 90 days before the event will receive a full refund of the deposit. Cancellations made within 90 days are non-refundable.",
        status: "Status",
        close: "Close",
        sign: "Sign Contract",
      },
    },
    admin: {
        title: "Admin Dashboard",
        new_contract: "Create New Contract",
        tabs: {
            dashboard: "Dashboard",
            clients: "Clients",
            calendar: "Calendar",
            contracts: "Contracts",
        },
        revenue_title: "Total Revenue (2025)",
        revenue_desc: "+15% from last year",
        upcoming_title: "Upcoming Weddings",
        upcoming_desc: "+5 this month",
        inquiries_title: "New Inquiries",
        inquiries_desc: "in the last 30 days",
        client_management: {
            title: "Client Management",
            description: "View and manage all client information.",
            col_name: "Client Name",
            col_date: "Wedding Date",
            col_package: "Package",
            col_status: "Status",
            col_actions: "Actions",
            status_booked: "Booked",
            status_inquiry: "Inquiry",
            view_button: "View",
        },
        venue_calendar: {
            title: "Venue Calendar",
            description: "Manage bookings and availability.",
        },
        all_contracts: {
            title: "All Contracts",
            description: "Track the status of all client contracts.",
            col_client: "Client",
            col_document: "Document",
            col_status: "Status",
            col_actions: "Actions",
            doc_main: "Main Venue Agreement",
            status_awaiting: "Awaiting Signature",
            status_completed: "Completed",
            send_reminder: "Send Reminder",
            view_button: "View",
        },
        form: {
            select_package: "Select a package",
            cancel: "Cancel",
            create: "Create",
        },
        view_contract: {
          title: "View Contract",
          for: "for",
          p1: "This document outlines the terms and conditions for the rental of Domaine des Vacheresses for the event on {date}.",
          h4_1: "1. Services Included",
          p2: "The Premium Romance package includes full-day venue rental, seating for up to 150 guests, custom floral design, a five-course dinner & cocktail hour, and a live string quartet for the ceremony.",
          h4_2: "2. Payment Schedule",
          p3: "A deposit of 50% is due upon signing. The remaining balance is due 30 days prior to the event date.",
          h4_3: "3. Cancellation Policy",
          p4: "Cancellations made more than 90 days before the event will receive a full refund of the deposit. Cancellations made within 90 days are non-refundable.",
          status: "Status",
          close: "Close",
        },
    },
    stay: {
      title: "Stay",
      subtitle: "MANOIR DE VACHERESSES",
      intro_title: "STAY WITH US",
      intro_description: "The Manoir de Vacheresses offers accommodations for an evening, a weekend or a week in the Maison du Potager and the small house in the main courtyard.\n\nDecorated with our love for antiques, we wanted refined simplicity combining old and modern, an art of living in the present...",
      maison_potager_title: "THE VEGETABLE GARDEN HOUSE",
      maison_potager_subtitle: "LA MAISON DU POTAGER",
      maison_potager_description: "In one of the Manor's outbuildings, in front of the medieval-inspired vegetable garden, between fruit trees and ancient plants, 5 rooms with personalized and refined decor will allow you to enjoy nature and calm in an environment conducive to daydreaming, relaxation or meditation.",
      maison_potager_common_area: "A 35 m² shared living room with a fully equipped kitchen (refrigerator, ceramic hob, dishwasher, oven, kettle, dishes...) will allow you to cook and take your meals when you please.\n\nYou can of course have lunch, stroll in front of the medieval vegetable garden, rest in the park or enjoy the shade under the canopy in the orchard, as you wish.",
      privatize_title: "PRIVATIZE THE PLACE",
      privatize_description: "Possibility to privatize the premises (5 rooms for 15 people in total) for weddings, seminars, family reunions, residential courses (Contact us).\nThe living room can be transformed into a meeting room.",
      view_details: "View Details",
      reserve_online: "Book Online",
      contact_us: "Contact Us",
      rooms: {
        heures_du_jour: {
          name: "Les Heures du Jour",
          type: "Duplex, up to 4 people",
          capacity: "4 people",
          bedding: "1 Queen Size double bed, 2 single beds",
          surface: "32 m²",
          description: "This family suite on 2 levels includes 4 beds (1 double bed on the ground floor and 2 single beds upstairs). Its decor reminds us of Charles-Le-Brun's drawings intended for the sculptors of the Grande Commande at Versailles...",
        },
        ruines_antiques: {
          name: "Ruines Antiques",
          type: "Duplex, up to 4 people",
          capacity: "4 people",
          bedding: "1 Queen Size double bed, 2 single beds",
          surface: "32 m²",
          description: "This family suite includes 4 beds on 2 levels. Its atmosphere takes us back to ancient Italy.",
        },
        jardins_tivoli: {
          name: "Les Jardins Tivoli",
          type: "Room, up to 3 people",
          capacity: "3 people",
          bedding: "1 Queen Size double bed, 1 sofa bed",
          surface: "24 m²",
          description: "Designed to accommodate people with reduced mobility, this room transports you to the idyllic atmosphere of Italian gardens where it is pleasant to stroll and relax.",
        },
        petit_trianon: {
          name: "Le Petit Trianon",
          type: "Room, 2 people",
          capacity: "2 people",
          bedding: "1 Queen Size double bed",
          surface: "16 m²",
          description: "This room with a double bed reminds us of the Queen's Hamlet wanted as a place for walks and receptions.",
        },
        voyage_ballon: {
          name: "Voyage en Ballon",
          type: "Room, 2 people",
          capacity: "2 people",
          bedding: "1 Queen Size double bed",
          surface: "13 m²",
          description: "This room with 2 single beds reminds us of the incredible history of hot air balloons! Man's old dream of flying, free as the air...",
        },
        la_loge: {
          name: "La Loge",
          type: "Guest House, 6 people",
          capacity: "6 people",
          bedding: "1 Queen Size double bed, 4 single beds",
          surface: "32 m²",
          description: "Arranged like a cozy little nest, this Guesthouse can accommodate up to 6 people.",
        },
      },
      equipment: {
        title: "Equipment",
        bathroom: "Bathroom with walk-in shower and private toilet",
        bed_queen: "1 Queen size bed (160 cm x 200 cm)",
        bed_single: "Single beds (90 cm x 200 cm)",
        curtains: "Blackout curtains",
        wifi: "Wifi",
        courtesy_tray: "Courtesy tray with kettle and a selection of tea, herbal tea and instant coffee",
        tv: "Flat-screen HD TV",
        toiletries: "Toiletries",
        mirror: "Mirror",
        hairdryer: "Hair dryer",
        linens: "Sheets and towels provided",
      },
    },
    domain: {
      title: "The Estate",
      subtitle: "MANOIR DE VACHERESSES",
      spirit_title: "THE SPIRIT",
      spirit_content: "Passionate about art, history and old stones, Frédérique and Philippe succumbed to the authenticity and architecture of the building which reminded the owner of childhood memories and his English origins.\n\nSince 2017, they have undertaken renovation work and opened this family home to create new emotions and share values that are dear to them: conviviality, generosity, elegance, the French art of living...\n\nToday, the opening of the Vegetable Garden Guesthouse and the Small House in the main courtyard will allow you to escape from the city to rediscover the simple pleasures of country life, the birdsong, the charm of old stones and the beauty of rare species...",
      history_title: "THE HISTORY",
      discover_more: "Discover More",
      age_or_title: "The Golden Age of the Lords",
      age_or_content: "It was an estate that experienced twists and turns in history.\n\nIf the date of the first foundations of the manor dates back to 1393, it was in 1478 that the name of the first lord of Vacheresses, Master Fleurant des Feugerets, appeared for the first time. His coat of arms bears \"argent with three branches of gules ferns\". Several descendants of this feudal family, originally from Perche, will succeed one another. In 1535, Florant des Feugerets made a pact with the monks of Coulombs Abbey by which Louis de Graffard inherited Vacheresses by virtue of his birthright; the de Graffard family, originally from Normandy, having become owner of the des Feugerets fief by alliance.",
      renaissance_title: "At the Dawn of the Renaissance",
      renaissance_content: "In 1587, the fief of Coulombs Abbey was alienated by Madame de l'Aulnay who sold it to the Count of Nogent. From this time, the lordship of Vacheresses will follow the influence of the Nogent-Le-Roi domain until the revolution of 1789.\n\nBetween 1677 and 1678, the estate passed into the hands of Diane de Caumont-Lauzun, widow of the powerful lord Armand de Bautru, Count of Nogent-Le-Roi.\n\nHer daughter, Emilie de Bautru, designated in the acts as sole heiress, will unfortunately marry, in 1742, Louis, Marquis de Melun. To cover the latter's debts, Nogent and consequently Vacheresses will be sold by forced decree in 1747.",
      noailles_title: "The Noailles Dynasty",
      noailles_content: "The manor fell into the hands of the illustrious Noailles family. Several descendants will succeed each other.\n\nIn 1777, Vacheresses was described as consisting of land, vineyards, meadows, warrens and river. 38 arpents of land were also cleared in two pieces: 10 arpents of land called the Vacheresses Warren and 28 arpents named the Vacheresses Park.\n\nIn 1873, the estate was sold by Henry Emmanuel, Marquis de Noailles, Minister of France to the United States, residing in Washington.",
      modern_title: "The Manor and Modern Times",
      modern_content: "It was at this time that the manor lost its primary function to become a pleasure residence.\n\nThe World of Arts has marked its history. Joseph Hémard, famous illustrator of the first half of the 20th century, lived there for about twenty years. Then, Gilbert Dupé, writer and theater director, will compose a large number of his novels there. Finally, Michèle Battut, internationally renowned artist and official painter of the French Navy, will stay there for more than thirty years.\n\nToday, the manor perpetuates the tradition and becomes a family home inhabited year-round. Lovers of heritage, we will try to protect it, restore it for future generations and open it to the public during receptions, weddings or family ceremonies...",
      poi: {
        cour_honneur: {
            title: "Cour d'Honneur",
            subtitle: "A majestic welcome",
            content: "You will open the gate and there, your guests will succumb to the magic of the old stones and the size of the famous yew balls, a true identity of the manor. Surprised and happy, your guests will not fail to compliment you on the beauty of the place upon their arrival..."
        },
        salle_reception: {
            title: "Reception Hall",
            subtitle: "Elegance and History",
            content: "An old stable in the 1900s, this room, with its monumental fireplace, will allow you to accommodate between 30 and 110 seated guests. Upstairs, a mezzanine allows you to create, according to your desires, a lounge area, a photobooth animation… Its imposing cathedral ceiling gives it a subtle charm to make it even more magical during the evening, by personalizing it to your image…"
        },
        salle_exposition: {
            title: "Exhibition Hall",
            subtitle: "A versatile space",
            content: "This building located on the east wing of the building can be arranged in addition to the reception hall to organize a cocktail party or a space for children."
        },
        parc: {
            title: "The Park",
            subtitle: "A romantic setting",
            content: "This romantic English-style park is the privileged setting for your cocktail, secular ceremony or your couple photos. Leave the city behind and immerse yourself in the middle of this bubble among many species, in the shade of giant sequoias, purple beech, ginkgo biloba, araucaria… You will discover on the left the dovecote that supplied the court of Versailles with small pigeons under the de Noailles. You will also listen to the song of the birds and you may have the chance to cross paths with warrens, squirrels, does or pheasants coming out of the woods…"
        },
        preau_verger: {
            title: "The Préau and its Orchard",
            subtitle: "Chic country charm",
            content: "You will pass through the freestone arch, an exclusive setting to organize your secular ceremony. It is also one of the favorite places for photographers for group photos with family or friends… In the shade of apple and hazelnut trees, your guests can circulate and discover the culinary animations during your wine of honor. An old hayloft, the préau becomes a confidential and intimate place for a secular ceremony or a cocktail in case of capricious weather. In the evening, the light from its chandeliers gives it a chic bohemian style, very appreciated by the guests…"
        },
        potager: {
            title: "The Medieval Vegetable Garden",
            subtitle: "An enchanting journey",
            content: "Inspired by a drawing by Joseph Hémard, an illustrious owner in the 1920s, we have reconstituted a medieval-inspired vegetable garden according to the principles of permaculture. A truly enchanting place, you will discover or rediscover the wonders of nature: palmette fruit trees, aromatic, medicinal, decorative herbs…"
        },
        salle_blanche: {
            title: "Salle Blanche",
            subtitle: "Elegant space for ceremonies",
            content: "A bright and elegant space perfect for intimate ceremonies and civil weddings."
        },
        orangerie: {
            title: "Orangerie",
            subtitle: "Historic venue for cocktails",
            content: "A charming historic space ideal for cocktail receptions and intimate gatherings."
        },
        chapelle: {
            title: "Chapel",
            subtitle: "Spiritual venue for religious weddings",
            content: "A peaceful spiritual space for religious ceremonies and blessings."
        },
        terrasses: {
            title: "Terraces",
            subtitle: "Outdoor spaces with panoramic views",
            content: "Beautiful terraces offering stunning panoramic views of the estate and surrounding countryside."
        },
        roseraie: {
            title: "Rose Garden",
            subtitle: "Romantic garden for photos",
            content: "A romantic rose garden perfect for couple portraits and intimate moments."
        },
        mare: {
            title: "Pond",
            subtitle: "Picturesque water feature for ceremonies",
            content: "A serene pond setting that creates a magical atmosphere for ceremonies and photos."
        }
      }
    },
    interactiveMap: {
      title: "Explore the Estate",
      subtitle: "Discover our accommodations and spaces by clicking on the map points",
      exploreSpaces: "Discover the Estate Spaces",
      discover: "Discover",
      close: "Close",
      legend_accommodation: "Accommodations",
      legend_poi: "Points of Interest",
      legend_space: "Spaces",
    },
    contact: {
      title: "Contact Us",
      subtitle: "We are here to answer all your questions",
    },
    dateSelector: {
      title: "Choose your event date",
      subtitle: "Select the date of your wedding or event to discover our packages",
      selectedDate: "Selected date",
      helpText: "Click on a date to continue",
      dialogTitle: "Select your event date",
      dialogDescription: "Choose the date of your wedding or event to continue",
      cancel: "Cancel",
      confirm: "Confirm",
    },
    instagram: {
      title: "Follow us on Instagram",
      subtitle: "@manoirdevacheresses",
      button: "View on Instagram"
    }
  },
  fr: {
    header: {
      home: "Accueil",
      packages: "Forfaits Mariage",
      elopement: "Élopement",
      faq: "FAQ",
      services: "Prestations",
      configurator: "Configurateur",
      blog: "Blog",
      availability: "Disponibilité",
      portal: "Portail",
      stay: "Séjourner",
      domain: "Le Domaine",
      english: "English",
      french: "Français",
    },
    hero: {
      title: "Le mariage de vos rêves commence ici",
      subtitle: "Découvrez le domaine enchanteur des Vacheresses, où l'élégance intemporelle rencontre la beauté sereine de la campagne française.",
      buttonExplore: "Découvrir les forfaits",
      buttonPlan: "Planifiez votre journée",
    },
    packages: {
        title: "Forfaits Mariage",
        subtitle: "Choisissez parmi nos forfaits organisés ou créez le vôtre pour une expérience vraiment sur mesure.",
        selectDatesInfo: "Sélectionnez une date ci-dessus ou choisissez un forfait pour sélectionner la date de votre événement",
        selectAndContinue: "Sélectionner la date et continuer",
        classic_title: "Élégance Classique",
        classic_desc: "Notre forfait essentiel pour une journée magnifique et mémorable.",
        classic_features: [
          "Location du lieu pour 8 heures",
          "Places assises pour 100 invités",
          "Arrangements floraux standards",
          "Menu dîner trois services",
        ],
        premium_title: "Romance Premium",
        premium_desc: "Une expérience améliorée avec des services et des détails haut de gamme.",
        premium_features: [
          "Location du lieu pour la journée complète",
          "Places assises pour 150 invités",
          "Conception florale personnalisée",
          "Dîner cinq services et cocktail",
          "Quatuor à cordes pour la cérémonie",
        ],
        luxury_title: "Rêve de Luxe",
        luxury_desc: "Le forfait tout compris ultime pour un mariage vraiment magique.",
        luxury_features: [
          "Accès au lieu pour le week-end",
          "Places assises pour 200 invités",
          "Installations florales de designer",
          "Menu dégustation gastronomique et bar ouvert",
          "Service complet de planification de mariage",
          "Feu d'artifice",
        ],
        button: "Sélectionner le forfait",
        discover: "Découvrir",
    },
    visualTour: {
        title: "Une visite visuelle immersive",
        subtitle: "Explorez la beauté à couper le souffle du Domaine des Vacheresses sous tous les angles.",
        dialogTitle: "Découvrir le Domaine",
        dialogDescription: "Plongez dans l'histoire et l'élégance du Domaine des Vacheresses.",
        viewDomain: "Voir le Domaine",
        close: "Fermer",
    },
    availability: {
        title: "Consultez nos disponibilités",
        subtitle: "Sélectionnez une date pour voir si le jour de mariage de vos rêves est disponible. Nous vous recommandons de réserver bien à l'avance.",
        unavailable: "Les dates grisées ne sont pas disponibles.",
    },
    testimonials: {
        title: "Paroles de nos couples",
        subtitle: "Découvrez ce que les autres ont à dire sur leur journée magique au Domaine des Vacheresses.",
        quote_1: "Notre mariage aux Vacheresses était un conte de fées. L'équipe s'est surpassée pour rendre notre journée parfaite. Le lieu est encore plus beau en personne !",
        quote_2: "Nous n'aurions pas pu rêver d'un plus beau décor pour notre journée spéciale. Chaque détail a été traité avec soin, et nos invités en parlent encore.",
        quote_3: "L'ensemble du processus s'est déroulé sans accroc, de la planification au jour même. La nourriture était exquise, le personnel incroyable et le lieu tout simplement à couper le souffle.",
    },
    access: {
      title: "Facile d'accès",
      subtitle: "Idéalement situé, notre domaine est facilement accessible en voiture, en train et depuis les principaux aéroports.",
      byCar: "En Voiture",
      byTrain: "En Train",
      byAir: "Via les Aéroports",
      distances: {
        byCar: [
          "75 km de Paris (~1h 15min)",
          "45 km de Versailles (~45 min)",
          "30 km de Chartres (~30 min)",
          "22 km de Rambouillet (~25 min)",
          "6 km de Maintenon (~10 min)",
        ],
        byTrain: [
          "Gare de Maintenon (55 mn de la Gare Montparnasse)",
        ],
        byAir: [
          "Paris Orly : 86 km",
          "Paris Roissy Charles de Gaulle : 116 km",
        ],
      },
    },
    proprietors: {
      title: "Nos Propriétaires",
      subtitle: "Frédérique & Philippe",
      description1: "Passionnés d'art, d'histoire et de vieilles pierres, Frédérique et Philippe ont succombé à l'authenticité et à l'architecture du bâti qui rappelait à Philippe des souvenirs d'enfance et ses origines anglaises.",
      description2: "Depuis 2017, ils ont entrepris des travaux de rénovation et ouvrent cette demeure de famille pour faire naître de nouvelles émotions et partager des valeurs qui leur sont chères : convivialité, générosité, élégance, art de vivre à la française…",
    },
    faq: {
      title: "FAQ",
      subtitle: "Questions Fréquentes",
      intro: "Trouvez les réponses aux questions courantes sur les mariages au Domaine des Vacheresses.",
      sidebarTitle: "Vous avez d'autres questions ?",
      sidebarDesc: "Notre équipe est là pour vous aider à planifier votre journée parfaite.",
      emailButton: "Nous Écrire",
      phoneButton: "Nous Appeler",
      viewPackages: "Voir les Forfaits",
      items: [
        {
          id: "booking",
          question: "Comment réserver une date de mariage au Manoir ?",
          answer: "Pour réserver une date de mariage, veuillez nous contacter directement par email ou téléphone. Nous recommandons de réserver au moins 12-18 mois à l'avance pour les dates prisées. Un acompte de 50% est requis pour sécuriser votre date, le solde étant dû 30 jours avant l'événement.",
        },
        {
          id: "packages",
          question: "Que comprennent vos forfaits de mariage ?",
          answer: "Nos forfaits de mariage comprennent la location du lieu, les aménagements de sièges, les décorations florales de base et l'accès à toutes les installations du domaine pendant la durée de votre événement. Les forfaits Premium et Luxe incluent des services supplémentaires comme la coordination du traiteur, une conception florale améliorée et des options de divertissement. Tous les forfaits incluent l'hébergement pour 21 invités dans le domaine.",
        },
        {
          id: "guests",
          question: "Combien d'invités le Manoir peut-il accueillir ?",
          answer: "Notre domaine peut accueillir confortablement jusqu'à 200 invités pour un dîner assis. La capacité exacte dépend de votre forfait choisi et de vos préférences d'aménagement. Nous pouvons également organiser des hébergements supplémentaires dans des hôtels partenaires à proximité pour des groupes plus importants.",
        },
        {
          id: "catering",
          question: "Proposez-vous des services de restauration ?",
          answer: "Nous travaillons avec une liste sélectionnée de traiteurs expérimentés spécialisés dans les événements de mariage. Bien que nous ne fournissions pas directement la restauration, nous coordonnons avec nos fournisseurs préférés pour garantir un service sans faille. Vous pouvez également travailler avec votre propre traiteur si vous préférez.",
        },
        {
          id: "decor",
          question: "Puis-je apporter mes propres décorations ?",
          answer: "Absolument ! Nous encourageons les touches personnelles qui reflètent votre style. Cependant, nous vous demandons de coordonner avec notre équipe pour vous assurer que vos décorations respectent les directives de notre lieu et n'endommageront pas la propriété historique. Notre équipe peut également vous conseiller sur ce qui fonctionne le mieux dans nos espaces.",
        },
        {
          id: "weather",
          question: "Que se passe-t-il s'il pleut le jour de mon mariage ?",
          answer: "Notre domaine offre à la fois des espaces intérieurs et extérieurs, offrant une flexibilité pour les changements de temps. La Salle de Réception, la Salle d'Exposition et la Cour d'Honneur peuvent accueillir votre cérémonie ou votre réception en cas de pluie. Nous fournissons également des chapiteaux qui peuvent être installés pour des zones couvertes supplémentaires si nécessaire.",
        },
        {
          id: "accommodation",
          question: "Quelles options d'hébergement sont disponibles pour les invités ?",
          answer: "Le Manoir offre un hébergement pour 21 invités dans nos chambres magnifiquement aménagées. Pour des groupes plus importants, nous collaborons avec des hôtels et des chambres d'hôtes à proximité. Nous pouvons faciliter les réservations dans ces hébergements partenaires et obtenir souvent des tarifs préférentiels pour nos groupes de mariage.",
        },
        {
          id: "accessibility",
          question: "Le Manoir est-il accessible aux invités ayant des problèmes de mobilité ?",
          answer: "Nous avons fait des efforts pour accueillir les invités ayant des problèmes de mobilité. La chambre Jardins Tivoli est spécifiquement conçue pour l'accès en fauteuil roulant. D'autres zones du domaine ont des niveaux d'accessibilité variables en raison de la nature historique des bâtiments. Veuillez nous contacter pour discuter d'exigences spécifiques, et nous ferons de notre mieux pour répondre à vos besoins.",
        },
      ],
    },
    services: {
        title: "Nos Prestations",
        subtitle: "Découvrez les prestations incluses dans la privatisation du domaine et nos offres en option pour sublimer votre mariage.",
        included_title: "Privatisations du domaine",
        included_1: "Salle des mariages avec office (100 personnes), salle d’exposition (20 à 30 enfants), cour d’honneur, parc arboré, verger et son préau (130 personnes pour le cocktail ou la cérémonie laïque), potager médiéval.",
        included_2: "Mise à disposition de tables rondes et chaises Napoléon III blanches pour 110 personnes, table ovale des mariés, écran, chaises et mobilier de jardin en fer forgé.",
        included_3: "Eléments décoratifs pour l’intérieur et les extérieurs : vases Médicis pour la salle des mariages, chevalet, vases, cadre pour le plan de table, bassines en zingue, petite charrette, rondin de bois…",
        included_4: "Conseils en décoration et organisation tout au long de vos préparatifs, aide et coordination pour le Jour J.",
        included_5: "Eclairage extérieur.",
        included_6: "Parking privé.",
        caterer_title: "Traiteur",
        caterer_desc: "Nous avons sélectionné une liste de traiteurs ayant une forte expérience dans l’univers du mariage afin de satisfaire au mieux vos attentes. Liste disponible sur demande.",
        optional_title: "Services en option",
        optional_subtitle: "Sublimez votre journée avec nos prestations exclusives à la carte.",
        option_rolls_title: "Rolls-Royce avec chauffeur",
        option_rolls_desc: "La Rolls-Royce Silver Cloud de 1957, voiture de famille, est à la disposition des mariés de Vacheresses pour aller les chercher à la mairie, à l’église et les ramener au Manoir.",
        option_lanterns_title: "Lanternes",
        option_lanterns_desc: "D’architecture ancienne, des lanternes en fer forgé de 1,20 m de hauteur peuvent venir orner la cour d’honneur, le verger. Des bougies leur donneront un éclat étincelant tout au long de la nuit.",
        option_chairs_title: "Chaises Napoléon III Outdoor",
        option_chairs_desc: "Pour votre cérémonie laïque ou votre brunch en extérieur, nous vous proposons des chaises Napoléon III blanches conçues pour l’extérieur.",
        option_bbq_title: "Barbecue Ofyr",
        option_bbq_desc: "Une côte de bœuf ou des petits légumes grillés ? Un barbecue Ofyr, à la fois brasero et plancha, pourra être installé et transformera l’espace de cuisson en un moment chaleureux, convivial et accueillant pour les amis et la famille.",
        option_flowers_title: "Bar à Fleurs",
        option_flowers_desc: "Envie d’offrir un présent à vos convives ? Que diriez-vous d’une animation de bijoux fleurs sur-mesure pour surprendre vos convives pendant le vin d’honneur ?",
        option_balloon_title: "Vols en Montgolfière",
        option_balloon_desc: "Et si vos invités profitaient d'un vol captif en montgolfière dans le pré pour découvrir d'en haut le parc, la vue du manoir et la vallée du Néron ?",
        on_request: "Devis sur demande",
        learn_more: "En savoir plus",
    },
    configurator: {
        title: "Configurateur de mariage",
        subtitle: "Concevez votre journée parfaite et obtenez une estimation budgétaire instantanée. Cet outil vous aide à explorer les options pour votre mariage de rêve aux Vacheresses.",
        customize_title: "Personnalisez votre mariage",
        guests: "Nombre d'invités",
        package: "Forfait Mariage",
        addons: "Options supplémentaires",
        addon_rolls: "Rolls-Royce avec chauffeur",
        addon_lanterns: "Lanternes",
        addon_chairs: "Chaises Napoléon III Outdoor",
        addon_bbq: "Barbecue Ofyr",
        addon_flowers: "Bar à Fleurs",
        addon_balloon: "Vols en Montgolfière",
        budget_title: "Estimation du budget",
        budget_subtitle: "Ceci est une estimation initiale. Un devis détaillé sera fourni lors de la consultation.",
        base_package: "Forfait de base",
        guest_surcharge: "Supplément par invité",
        addons_total: "Options",
        total_estimate: "Coût total estimé",
        request_consultation: "Demander une consultation",
    },
    login: {
        title: "Portail Client & Admin",
        description: "Accédez à votre tableau de bord de mariage ou inscrivez-vous.",
        login_tab: "Connexion",
        signup_tab: "Inscription",
        email_label: "Email",
        password_label: "Mot de passe",
        login_button: "Connexion",
        admin_hint: "Astuce : Utilisez admin@example.com / password pour l'accès admin.",
        name_label: "Nom",
        signup_button: "Créer un compte",
        admin_success_title: "Connexion admin réussie",
        admin_success_desc: "Redirection vers le tableau de bord admin...",
        client_success_title: "Connexion client réussie",
        client_success_desc: "Redirection vers le tableau de bord client...",
        invalid_credentials_title: "Identifiants invalides",
        invalid_credentials_desc: "Veuillez vérifier votre email et votre mot de passe.",
        signup_success_title: "Inscription réussie",
        signup_success_desc: "Bienvenue ! Redirection vers votre tableau de bord...",
        missing_info_title: "Informations manquantes",
        missing_info_desc: "Veuillez remplir tous les champs pour vous inscrire.",
    },
    footer: {
      copyright: "© {year} Domaine des Vacheresses. Tous droits réservés.",
      legal: "Mentions légales",
    },
    legal: {
        title: "Mentions légales",
        section1_title: "1. Présentation du site",
        section1_p1: "En vertu de l’article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique, il est précisé aux utilisateurs du site manoirdevacheresses.com l’identité des différents intervenants dans le cadre de sa réalisation et de son suivi :",
        owner_title: "Propriétaire :",
        owner_name: "Manoir de Vacheresses – CARDINAL FINANCE",
        owner_address: "Adresse : rue du Manoir, 28210 Nogent-le-Roi",
        owner_phone: "Téléphone : 06 11 84 20 21",
        owner_email: "Email : contact@manoirdevacheresses.com",
        owner_siren: "Siren : 528 949 605",
        realization_title: "Réalisation :",
        realization_name: "RIGONE – Web4Gites",
        realization_address: "Adresse : 52 rue Saint Brice, 28000 Chartres",
        realization_phone: "Téléphone : 07 49 58 61 74",
        realization_email: "Email : contact@web4gites.com",
        realization_siret: "Siret : 835 331 588 00011",
        hosting_title: "Hébergement :",
        hosting_name: "Société OVH",
        hosting_address: "Adresse : 2, rue Kellermann BP 80157 59053 ROUBAIX Cedex 1",
        hosting_vat: "N° TVA : FR 22 424 761 419",
        section2_title: "2. Conditions générales d’utilisation du site et des services proposés.",
        section2_p1: "L’accès, la consultation, la navigation et/ou l’utilisation du site manoirdevacheresses.com (ci-après le « Site ») et de ses services vaut acceptation pleine et entière des présentes conditions générales d’utilisation (ci-après « CGU ») qui ont pour objet de définir les modalités d’utilisation du Site et de ses services par toute personne accédant, consultant, naviguant et/ou utilisant tout ou partie du Site et de ses services (ci-après « Utilisateur »). Ces CGU sont susceptibles d’être modifiées ou complétées à tout moment, les Utilisateurs du Site sont donc invités à consulter les CGU à chaque nouvel accès au Site.",
        section2_p2: "La présente version des CGU remplace toutes les versions antérieures.",
        section2_p3: "Le Site est normalement accessible à tout moment aux utilisateurs, sous réserve de la survenance d’un cas de force majeure, de pannes éventuelles ou de toute opération de maintenance nécessaire au bon fonctionnement du Site et de ses services. En cas d’interruption pour raison de maintenance technique, CARDINAL FINANCE s’efforcera de communiquer préalablement aux Utilisateurs les dates et heures de l’intervention.",
        section3_title: "3. Description des services fournis.",
        section3_p1: "Le Site a pour objet de fournir une information concernant l’ensemble des prestations de CARDINAL FINANCE. Toutefois, il ne pourra être tenu responsable des oublis, des inexactitudes et des carences dans la mise à jour, qu’elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.",
        section3_p2: "Toutes les informations indiquées sur le Site sont données à titre indicatif, et sont susceptibles d’évoluer. Par ailleurs, les renseignements figurant sur le Site ne sont pas exhaustifs. Ils sont donnés sous réserve de modifications ayant été apportées depuis leur mise en ligne.",
        section4_title: "4. Propriété intellectuelle",
        section4_p1: "Tous les éléments du Site qui sont mis à disposition des Utilisateurs, notamment les marques, logos, photographies, programmes, codes sources, graphismes, vidéos, textes, agencement, apparence, structure, ainsi que tout autre élément non lié à des liens hypertextes vers des sites tiers, sont la propriété de CARDINAL FINANCE.",
        section4_p2: "Sous réserve des droits d’utilisation, écrits, consentis à l’Utilisateur par CARDINAL FINANCE, toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite.",
        section4_p3: "Toute exploitation non autorisée du site ou de l’un quelconque des éléments qu’il contient sera considérée comme constitutive d’une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.",
        section5_title: "5. Limitation de responsabilité",
        section5_p1: "CARDINAL FINANCE et toutes sociétés ayant contribué à la création et à la mise en place du Site ne peuvent être tenues pour responsable d’éventuels dommages, coûts, pertes, directs, accidentels ou indirects ou pour tout autre risque faisant suite à l’accès ou à l’utilisation du Site par l’Utilisateur.",
        section6_title: "6. Gestion des données personnelles",
        section6_p1: "En France, les données personnelles sont notamment protégées par la loi n° 78-87 du 6 janvier 1978, la loi n° 2004-801 du 6 août 2004, l’article L. 226-13 du Code pénal et la Directive Européenne du 24 octobre 1995.",
        section6_p2: "Dans le cadre de l’accès, la consultation, la navigation et l’utilisation du Site et des services qu’il propose, vous êtes amené à communiquer à CARDINAL FINANCE des données personnelles vous concernant.",
        section6_1_title: "6.1 Responsables de la collecte des données personnelles",
        section6_1_p1: "Pour les Données Personnelles collectées dans le cadre de la mise en relation de l’Utilisateur avec CARDINAL FINANCE, le responsable du traitement des Données Personnelles est CARDINAL FINANCE.",
        section6_1_p2: "Dans ce cas de collecte, le traitement des données est nécessaire à des fins d’administration et de prospection commerciale, lorsque l’Utilisateur fournit lui-même des Données Personnelles en vue d’être contacté. Les informations facultatives sont destinées à mieux connaître l’Utilisateur et ainsi à améliorer les services qui lui sont proposés. L’utilisateur fournit ces informations en toute connaissance de cause, notamment lorsqu’il procède par lui-même à leur saisie. Il est alors précisé à l’utilisateur du Site l’obligation ou non de fournir ces informations.",
        section6_1_p3: "Pour les Données Personnelles collectées dans le cadre de la navigation de l’Utilisateur sur le Site, le responsable du traitement des Données Personnelles est RIGONE – Web4gites.",
        section6_1_p4: "A l’occasion de l’utilisation du Site, peuvent êtres recueillies : l’URL des liens par l’intermédiaire desquels l’utilisateur a accédé au Site, le fournisseur d’accès de l’utilisateur, l’adresse de protocole Internet (IP) de l’utilisateur.",
        section6_2_title: "6.2 Finalité des données collectées",
        section6_2_p1: "Le site est susceptible de traiter tout ou partie des données :",
        section6_2_l1: "pour permettre la navigation sur le Site et la gestion et la traçabilité des prestations et services commandés par l’Utilisateur : données de connexion et d’utilisation du Site",
        section6_2_l2: "pour prévenir et lutter contre la fraude informatique (spamming, hacking…) : matériel informatique utilisé pour la navigation, l’adresse IP, etc.",
        section6_2_l3: "pour améliorer la navigation sur le Site : données de connexion et d’utilisation",
        section6_2_l4: "pour communiquer avec l’Utilisateur : nom, prénom, téléphone et adresse email",
        section6_2_p2: "CARDINAL FINANCE et toutes sociétés ayant contribué à la création et à la mise en place du Site ne commercialisent pas vos données personnelles qui sont donc uniquement utilisées par nécessité ou à des fins statistiques et d’analyses.",
        section6_3_title: "6.3 Droit d’accès, de rectification et d’opposition",
        section6_3_p1: "Conformément à la réglementation européenne en vigueur, les Utilisateurs du Site disposent des droits suivants :",
        section6_3_l1: "droit d’accès (article 15 RGPD) et de rectification (article 16 RGPD), de mise à jour, de complétude des données des Utilisateurs droit de verrouillage ou d’effacement des données des Utilisateurs à caractère personnel (article 17 du RGPD), lorsqu’elles sont inexactes, incomplètes, équivoques, périmées, ou dont la collecte, l’utilisation, la communication ou la conservation est interdite",
        section6_3_l2: "droit de retirer à tout moment un consentement (article 13-2c RGPD)",
        section6_3_l3: "droit à la limitation du traitement des données des Utilisateurs (article 18 RGPD)",
        section6_3_l4: "droit d’opposition au traitement des données des Utilisateurs (article 21 RGPD)",
        section6_3_l5: "droit à la portabilité des données que les Utilisateurs auront fournies, lorsque ces données font l’objet de traitements automatisés fondés sur leur consentement ou sur un contrat (article 20 RGPD)",
        section6_3_p2: "Dès que le Site a connaissance du décès d’un Utilisateur et à défaut d’instructions de sa part, il s’engage à détruire ses données, sauf si leur conservation s’avère nécessaire à des fins probatoires ou pour répondre à une obligation légale.",
        section6_3_p3: "Si l’Utilisateur souhaite savoir comment le site utilise ses Données Personnelles, demander à les rectifier ou s’oppose à leur traitement, l’Utilisateur peut contacter le site par écrit à l’adresse suivante : RIGONE, monsieur le délégué à la protection des données, 52 rue Saint-Brice, 28000 Chartres – contact@Web4gites.com",
        section6_3_p4: "Dans ce cas, l’Utilisateur doit indiquer les Données Personnelles qu’il souhaiterait que le site corrige, mette à jour ou supprime, en s’identifiant précisément avec une copie d’une pièce d’identité (carte d’identité ou passeport).",
        section6_3_p5: "Les données personnelles seront conservées pour la durée nécessaire à l’accomplissement de la finalité pour laquelle elles ont été collectées. Elles seront ensuite supprimées. Par exception, ces données pourront être archivées pour gérer les réclamations et contentieux en cours ainsi que pour répondre à nos obligations légales et règlementaires.",
        section6_3_p6: "Les demandes de suppression de Données Personnelles seront soumises aux obligations qui sont imposées au site par la loi, notamment en matière de conservation ou d’archivage des documents. Enfin, les Utilisateurs du site peuvent déposer une réclamation auprès des autorités de contrôle, et notamment de la CNIL (https://www.cnil.fr/fr/plaintes).",
        section6_3_p7: "Nous vous informons de l’existence de la liste d’opposition au démarchage téléphonique « Bloctel », sur laquelle vous pouvez vous inscrire ici : https://conso.bloctel.fr/",
        section6_4_title: "6.4 Non-communication des données personnelles",
        section6_4_p1: "Le site s’interdit de traiter, héberger ou transférer les Informations collectées sur ses Utilisateurs vers un pays situé en dehors de l’Union européenne ou reconnu comme « non adéquat » par la Commission européenne sans en informer préalablement CARDINAL FINANCE. Pour autant, le Site reste libre du choix de ses sous-traitants techniques et commerciaux à la condition qu’il présentent les garanties suffisantes au regard des exigences du Règlement Général sur la Protection des Données (RGPD : n° 2016-679).",
        section6_4_p2: "Le Site s’engage à prendre toutes les précautions nécessaires afin de préserver la sécurité des Informations et notamment qu’elles ne soient pas communiquées à des personnes non autorisées. Cependant, si un incident impactant l’intégrité ou la confidentialité des Informations de  est portée à la connaissance du Site, celle-ci devra dans les meilleurs délais informer CARDINAL FINANCE et lui communiquer les mesures de corrections prises. Par ailleurs le Site ne collecte aucune « données sensibles ».",
        section6_4_p3: "Dans la limite de leurs attributions respectives et pour les finalités rappelées ci-dessus, les principales personnes susceptibles d’avoir accès aux données des Utilisateurs du site sont principalement les agents de CARDINAL FINANCE et RIGONE.",
        section6_5_title: "6.5 Types de données collectées",
        section6_5_p1: "Les Données Personnelles nom, email et téléphone sont recueillis par email.",
        section6_5_p2: "Le site collecte en outre des informations qui permettent d’améliorer l’expérience utilisateur et de proposer des conseils contextualisés : Google Analytics et Smartjet.",
        section6_5_p3: "Ces Données Personnelles et informations seront conservées pour la durée nécessaire à l’accomplissement de la finalité pour laquelle elles ont été collectées. Elles seront ensuite supprimées. Par exception, ces données pourront être archivées pour gérer les réclamations et contentieux en cours ainsi que pour répondre à nos obligations légales et règlementaires.",
        section7_title: "7. Liens hypertextes et cookies",
        section7_1_title: "7.1 Cookies",
        section7_1_p1: "Les cookies sont de petits fichiers implantés sur votre ordinateur. Un cookie ne nous permet pas de vous identifier mais il enregistre des informations relatives à la navigation de votre ordinateur sur notre site que nous pourrons lire lors de vos visites ultérieures afin de faciliter la navigation, d’optimiser la connexion et de personnaliser l’utilisation du site.",
        section7_1_p2: "Le paramétrage du logiciel de navigation permet d’informer de la présence de cookie et éventuellement, de la refuser de la manière décrite à l’adresse suivante : www.cnil.fr. L’utilisateur peut toutefois configurer le navigateur de son ordinateur pour refuser l’installation des cookies, sachant que le refus d’installation d’un cookie peut entraîner l’impossibilité d’accéder à certains services. Pour tout bloquage des cookies, tapez dans votre moteur de recherche : bloquage des cookies sous IE ou firefox et suivez les instructions en fonction de votre version.",
        section7_2_title: "7.2 Liens hypertextes",
        section7_2_p1: "Le Site décline toute responsabilité quant au contenu des informations fournies sur ces sites au titre de l’activation du lien hypertexte.",
        section8_title: "8. Crédits photos et icones",
        section8_p1: "CARDINAL FINANCE",
        section8_p2: "Istockphoto.com – Tous droits réservés.",
    },
    blog: {
      title: "Notre Blog",
      subtitle: "Inspirations, conseils et récits pour votre mariage parfait.",
      readMore: "Lire la suite",
      backToBlog: "Retour au blog",
      pressTitle: "Presse & Médias",
      pressSubtitle: "Découvrez les articles de presse qui ont mis en lumière le Manoir de Vacheresses",
      pressButton: "Voir les articles de presse",
      momentsTitle: "Moments Inoubliables",
      momentsSubtitle: "Découvrez la magie de nos mariages à travers ces images",
    },
    dashboard: {
      title: "Mariage de Alex & Chloé",
      subtitle: "Bienvenue sur votre portail de mariage personnel.",
      contact_planner: "Contacter l'organisateur",
      tabs: {
        overview: "Aperçu",
        contracts: "Contrats",
        payments: "Paiements",
        messages: "Messages",
      },
      overview: {
        title: "Aperçu du mariage",
        date_title: "Date du mariage",
        date_value: "Samedi 14 juin 2025",
        guests_title: "Nombre d'invités",
        guests_value: "125 invités",
        package_title: "Forfait",
        package_value: "Romance Premium",
      },
      contracts: {
        title: "Contrats",
        description: "Consultez et signez vos contrats ici.",
        col_document: "Document",
        col_status: "Statut",
        col_date: "Date d'envoi",
        col_action: "Action",
        doc_main: "Contrat principal du lieu",
        doc_catering: "Avenant traiteur",
        status_awaiting: "En attente de signature",
        status_completed: "Terminé",
        action_sign: "Voir & Signer",
        action_view: "Voir",
      },
      payments: {
        title: "Échéancier de paiement",
        description: "Suivez vos paiements et leurs dates d'échéance.",
        col_item: "Article",
        col_amount: "Montant",
        col_due: "Date d'échéance",
        col_status: "Statut",
        col_action: "Action",
        item_deposit: "Acompte",
        item_initial: "Paiement initial",
        item_booking: "Frais de réservation",
        status_due: "Dû",
        status_pending: "En attente",
        status_paid: "Payé",
        action_pay: "Payer maintenant",
        action_paid: "Payé",
      },
      messages: {
        title: "Votre organisatrice : Sophie",
        message1: "Bonjour Alex et Chloé ! Je voulais juste confirmer votre séance de dégustation pour mardi prochain à 14h. J'ai hâte que vous goûtiez le menu !",
        message2: "Salut Sophie ! Ça nous va très bien, nous serons là. On a hâte !",
        placeholder: "Écrire un message...",
        send_button: "Envoyer",
      },
      toast: {
        title: "Contrat signé !",
        description: "Le document {document} a été signé avec succès."
      },
      view_contract: {
        for: "pour",
        p1: "Ce document décrit les termes et conditions de la location du Domaine des Vacheresses pour l'événement du {date}.",
        h4_1: "1. Services Inclus",
        p2: "Le forfait Romance Premium inclut la location du lieu pour une journée complète, des places pour 150 invités, une conception florale personnalisée, un dîner cinq services avec cocktail et un quatuor à cordes pour la cérémonie.",
        h4_2: "2. Échéancier de paiement",
        p3: "Un acompte de 50% est dû à la signature. Le solde est dû 30 jours avant la date de l'événement.",
        h4_3: "3. Politique d'annulation",
        p4: "Les annulations effectuées plus de 90 jours avant l'événement recevront un remboursement complet de l'acompte. Les annulations dans les 90 jours ne sont pas remboursables.",
        status: "Statut",
        close: "Fermer",
        sign: "Signer le contrat",
      },
    },
    admin: {
        title: "Tableau de Bord Admin",
        new_contract: "Créer un nouveau contrat",
        tabs: {
            dashboard: "Tableau de bord",
            clients: "Clients",
            calendar: "Calendrier",
            contracts: "Contrats",
        },
        revenue_title: "Revenu Total (2025)",
        revenue_desc: "+15% par rapport à l'année dernière",
        upcoming_title: "Mariages à venir",
        upcoming_desc: "+5 ce mois-ci",
        inquiries_title: "Nouvelles demandes",
        inquiries_desc: "dans les 30 derniers jours",
        client_management: {
            title: "Gestion des clients",
            description: "Affichez et gérez toutes les informations client.",
            col_name: "Nom du client",
            col_date: "Date du mariage",
            col_package: "Forfait",
            col_status: "Statut",
            col_actions: "Actions",
            status_booked: "Réservé",
            status_inquiry: "Demande",
            view_button: "Voir",
        },
        venue_calendar: {
            title: "Calendrier du lieu",
            description: "Gérez les réservations et la disponibilité.",
        },
        all_contracts: {
            title: "Tous les contrats",
            description: "Suivez le statut de tous les contrats clients.",
            col_client: "Client",
            col_document: "Document",
            col_status: "Statut",
            col_actions: "Actions",
            doc_main: "Contrat principal du lieu",
            status_awaiting: "En attente de signature",
            status_completed: "Terminé",
            send_reminder: "Envoyer un rappel",
            view_button: "Voir",
        },
        form: {
            select_package: "Sélectionnez un forfait",
            cancel: "Annuler",
            create: "Créer",
        },
        view_contract: {
          title: "Voir le contrat",
          for: "pour",
          p1: "Ce document décrit les termes et conditions de la location du Domaine des Vacheresses pour l'événement du {date}.",
          h4_1: "1. Services Inclus",
          p2: "Le forfait Romance Premium inclut la location du lieu pour une journée complète, des places pour 150 invités, une conception florale personnalisée, un dîner cinq services avec cocktail et un quatuor à cordes pour la cérémonie.",
          h4_2: "2. Échéancier de paiement",
          p3: "Un acompte de 50% est dû à la signature. Le solde est dû 30 jours avant la date de l'événement.",
          h4_3: "3. Politique d'annulation",
          p4: "Les annulations effectuées plus de 90 jours avant l'événement recevront un remboursement complet de l'acompte. Les annulations dans les 90 jours ne sont pas remboursables.",
          status: "Statut",
          close: "Fermer",
        },
    },
    stay: {
      title: "Séjourner",
      subtitle: "MANOIR DE VACHERESSES",
      intro_title: "SÉJOURNER",
      intro_description: "Le Manoir de Vacheresses propose des hébergements le temps d'une soirée, d'un weekend ou d'une semaine dans la Maison du Potager et la petite Maison de la cour d'honneur.\n\nDécorées avec notre âme de chineur, nous avons souhaité une simplicité raffinée alliant ancien et moderne, un art de vivre au présent…",
      maison_potager_title: "LA MAISON DU POTAGER",
      maison_potager_subtitle: "LA MAISON DU POTAGER",
      maison_potager_description: "Dans l'une des dépendances du Manoir, devant le potager d'inspiration médiévale, entre arbres fruitiers et plantes anciennes, 5 chambres au décor personnalisé et raffiné vous permettront de profiter de la nature et du calme dans un environnement propice à la rêverie, la détente ou la méditation.",
      maison_potager_common_area: "Une pièce de vie commune de 35 m² avec cuisine entièrement équipée (réfrigérateur, plaque vitro-céramique, lave-vaisselle, four, bouilloire, vaisselle…) vous permettra de cuisiner et de prendre vos repas au moment qu'il vous plaira.\n\nVous pourrez bien évidemment déjeuner, flâner devant le potager médiéval, vous reposer dans le parc ou profiter de l'ombre sous le préau dans le verger, à votre guise.",
      privatize_title: "PRIVATISER LES LIEUX",
      privatize_description: "Possibilité de privatiser les lieux (5 chambres pour 15 personnes au total) pour mariages, séminaires, réunions de famille, stage résidentiel (Nous contacter).\nLa pièce de vie pouvant se transformer en salle de réunion.",
      view_details: "Voir les détails",
      reserve_online: "Réserver en ligne",
      contact_us: "Nous contacter",
      rooms: {
        heures_du_jour: {
          name: "Les Heures du Jour",
          type: "Duplex, jusqu'à 4 personnes",
          capacity: "4 personnes",
          bedding: "1 lit double Queen Size, 2 lits simples",
          surface: "32 m²",
          description: "Cette suite familiale sur 2 niveaux comprend 4 couchages (1 lit double au rez-de-chaussée et 2 lits simples à l'étage). Son décor nous rappelle les dessins de Charles-Le-Brun destinés aux sculpteurs de la Grande Commande à Versailles…",
        },
        ruines_antiques: {
          name: "Ruines Antiques",
          type: "Duplex, jusqu'à 4 personnes",
          capacity: "4 personnes",
          bedding: "1 lit double Queen Size, 2 lits simples",
          surface: "32 m²",
          description: "Cette suite familiale comprend 4 couchages sur 2 niveaux. Son ambiance nous ramène dans l'Italie antique.",
        },
        jardins_tivoli: {
          name: "Les Jardins Tivoli",
          type: "Chambre, jusqu'à 3 personnes",
          capacity: "3 personnes",
          bedding: "1 lit double Queen Size, 1 canapé convertible",
          surface: "24 m²",
          description: "Conçue pour accueillir les personnes à mobilité réduite, cette chambre vous transporte dans l'ambiance idyllique des jardins italiens où il fait bon flâner et se détendre.",
        },
        petit_trianon: {
          name: "Le Petit Trianon",
          type: "Chambre, 2 personnes",
          capacity: "2 personnes",
          bedding: "1 lit double Queen Size",
          surface: "16 m²",
          description: "Cette chambre avec un lit double nous rappelle le Hameau de la Reine voulu comme un lieu de promenades et de réceptions.",
        },
        voyage_ballon: {
          name: "Voyage en Ballon",
          type: "Chambre, 2 personnes",
          capacity: "2 personnes",
          bedding: "1 lit double Queen Size",
          surface: "13 m²",
          description: "Cette chambre avec 2 lits simples nous rappelle l'incroyable histoire des montgolfières ! Le vieux rêve de l'homme de voler, libre comme l'air…",
        },
        la_loge: {
          name: "La Loge",
          type: "Guest House, 6 personnes",
          capacity: "6 personnes",
          bedding: "1 lit double Queen Size, 4 lits simples",
          surface: "32 m²",
          description: "Agencée comme un petit nid douillet, cette Guesthouse peut accueillir jusqu'à 6 personnes.",
        },
      },
      equipment: {
        title: "Équipements",
        bathroom: "Salle de bains avec douche à l'italienne et toilettes privatives",
        bed_queen: "1 Lit Queen size (160 cm x 200 cm)",
        bed_single: "Lits 1 personne (90 cm x 200 cm)",
        curtains: "Rideaux occultant",
        wifi: "Wifi",
        courtesy_tray: "Plateau de courtoisie avec bouilloire et une sélection de thé, tisane et café soluble",
        tv: "TV écran plat HD",
        toiletries: "Accessoires de toilette",
        mirror: "Miroir",
        hairdryer: "Sèche-cheveux",
        linens: "Draps et linges de toilette fournis",
      },
    },
    domain: {
      title: "Le Domaine",
      subtitle: "MANOIR DE VACHERESSES",
      spirit_title: "L'ESPRIT",
      spirit_content: "Passionnés d'art, d'histoire et de vieilles pierres, Frédérique et Philippe ont succombé à l'authenticité et à l'architecture du bâti qui rappelait au propriétaire des souvenirs d'enfance et ses origines anglaises.\n\nDepuis 2017, ils ont entrepris des travaux de rénovation et ouvrent cette demeure de famille pour faire naître de nouvelles émotions et partager des valeurs qui leur sont chères : convivialité, générosité, élégance, art de vivre à la française…\n\nAujourd'hui, l'ouverture de la Guesthouse du Potager et de la Petite Maison de la cour d'honneur vous permettront de vous éclipser de la ville pour retrouver les plaisirs simples de la vie à la campagne, le chant des oiseaux, le charme des vieilles pierres et la beauté des essences rares…",
      history_title: "L'HISTOIRE",
      discover_more: "Découvrir l'histoire",
      age_or_title: "L'Âge d'or des seigneurs",
      age_or_content: "Il était un domaine qui connut des rebondissements dans l'histoire.\n\nSi la date des premières fondations du manoir remonte en 1393, c'est en 1478 qu'apparaît pour la première fois le nom du premier seigneur de Vacheresses, Maître Fleurant des Feugerets. Ses armoiries portent « d'argent à trois branches de fougères de gueules ». Plusieurs descendants de cette famille féodale, originaire du Perche, se succèderont. En 1535, Florant des Feugerets passe un pacte avec les moines de l'Abbaye de Coulombs par lequel Louis de Graffard hérite en vertu de son droit d'aînesse de Vacheresses ; la famille de Graffard, originaire de Normandie, étant devenue propriétaire du fief des Feugerets par alliance.",
      renaissance_title: "À l'aube de la Renaissance",
      renaissance_content: "En 1587, le fief de l'Abbaye de Coulombs fut aliéné par Madame de l'Aulnay qui le vendit au Comte de Nogent. À partir de cette époque, la seigneurie de Vacheresses suivra la mouvance du domaine de Nogent-Le-Roi jusqu'à la révolution de 1789.\n\nEntre 1677 et 1678, le domaine passe aux mains de Diane de Caumont-Lauzun, veuve du puissant seigneur Armand de Bautru, comte de Nogent-Le-Roi.\n\nSa fille, Émilie de Bautru, désignée dans les actes comme unique héritière, épousera malencontreusement, en 1742, Louis, Marquis de Melun. Pour couvrir les dettes de ce dernier, Nogent et par conséquent Vacheresses seront vendus par décret forcé en 1747.",
      noailles_title: "La dynastie de Noailles",
      noailles_content: "Le manoir tombe dans l'escarcelle de l'illustre famille de Noailles. Plusieurs descendants s'y succèderont.\n\nEn 1777, on décrit Vacheresses, constitué de terres, vignes, prés, garennes et rivière. On défriche aussi 38 arpents de terre en deux pièces : 10 arpents de terre appelés la Garenne de Vacheresses et 28 arpents nommés le Parc de Vacheresses.\n\nEn 1873, le domaine est vendu par Henry Emmanuel, Marquis de Noailles, Ministre de France aux États-Unis, demeurant à Washington.",
      modern_title: "Le Manoir et les Temps Modernes",
      modern_content: "C'est à cette époque que le manoir perd sa fonction première pour devenir résidence d'agrément.\n\nLe Monde des Arts a marqué son histoire. Joseph Hémard, célèbre dessinateur et illustrateur de la première moitié du XXème siècle y a vécu une vingtaine d'années. Puis, Gilbert Dupé, écrivain et directeur de théâtre, y composera un grand nombre de ses romans. Enfin, Michèle Battut, artiste de renommée internationale et peintre officielle de la Marine Nationale y séjournera pendant plus de trente ans.\n\nAujourd'hui, le manoir perpétue la tradition et devient une maison de famille habitée à l'année. Amoureux du patrimoine, nous tenterons de le protéger, le restaurer pour les générations futures et de l'ouvrir au public lors de réceptions, mariages ou cérémonies familiales…",
      poi: {
        cour_honneur: {
          title: "Cour d’honneur",
          subtitle: "Un accueil majestueux",
          content: "Vous ouvrirez le portail et là, vos convives succomberont à la magie des vieilles pierres et à la taille des célèbres boules d’ifs, véritable identité du manoir. Surpris et heureux, vos invités ne manqueront pas de vous complimenter sur la beauté des lieux dès leur arrivée…"
        },
        salle_reception: {
          title: "Salle de réception",
          subtitle: "Élégance et Histoire",
          content: "Ancienne écurie dans les années 1900, cette salle, avec sa cheminée monumentale, vous permettra d’accueillir entre 30 et 110 convives assis. A l’étage, une mezzanine permet de créer selon vos envies un coin lounge, une animation photoboost…\n\nSon imposant plafond cathédrale lui confère un charme subtil pour la rendre encore plus féérique lors de la soirée, en la personnalisant à votre image…"
        },
        salle_exposition: {
            title: "Salle d’exposition",
            subtitle: "Un espace polyvalent",
            content: "Ce corps de bâtiment situé sur l’aile Est de la bâtisse peut être aménagé en complément de la salle de réception pour organiser un cocktail ou un espace pour les enfants."
        },
        parc: {
          title: "Parc",
          subtitle: "Un écrin romantique",
          content: "Ce parc romantique à l’anglaise est le théâtre privilégié pour votre cocktail, cérémonie laïque ou vos photos de couple. Laissez la ville derrière vous et plongez-vous au milieu de cette bulle parmi de nombreuses essences, à l’ombre des séquoias géants, hêtre pourpre, ginkgo biloba, araucaria…\n\nVous découvrirez sur la gauche le pigeonnier qui alimentait la cour de Versailles en petits pigeons sous les de Noailles. Vous écouterez aussi le chant des oiseaux et vous aurez peut-être la chance de croiser garennes, écureuils, biches ou faisans qui sortent du bois…"
        },
        preau_verger: {
          title: "Préau et son verger",
          subtitle: "Charme champêtre chic",
          content: "Vous passerez l’arche en pierre de taille, cadre exclusif pour organiser votre cérémonie laïque. C’est aussi l’un des endroits préférés des photographes pour les photos de groupe en famille ou entre amis…\n\nA l’ombre des pommiers et noisetiers, vos convives pourront circuler et découvrir les animations culinaires pendant votre vin d’honneur.\nAncien grenier à foin, le préau devient un lieu confidentiel et intime pour une cérémonie laïque ou un cocktail en cas de temps capricieux.\n\nEn soirée, la lumière de ses lustres lui confère un style bohême chic, très apprécié des invités…"
        },
        potager: {
          title: "Le Potager médiéval",
          subtitle: "Un voyage enchanteur",
          content: "Inspiré d’un dessin de Joseph Hémard, illustre propriétaire dans les années 20, nous avons reconstitué un potager d’inspiration médiévale selon les principes de la permaculture.\n\nVéritable lieu enchanteur, vous découvrirez ou redécouvrirez les merveilles de la nature : arbres fruitiers à palmette, herbes aromatiques, médicinales, décoratives…"
        },
        salle_blanche: {
          title: "Salle Blanche",
          subtitle: "Espace élégant pour les cérémonies",
          content: "Un espace lumineux et élégant parfait pour les cérémonies intimes et les mariages civils."
        },
        orangerie: {
          title: "Orangerie",
          subtitle: "Lieu historique pour les cocktails",
          content: "Un espace historique charmant idéal pour les cocktails et les rassemblements intimes."
        },
        chapelle: {
          title: "Chapelle",
          subtitle: "Lieu spirituel pour les mariages religieux",
          content: "Un espace spirituel paisible pour les cérémonies religieuses et les bénédictions."
        },
        terrasses: {
          title: "Terrasses",
          subtitle: "Espaces extérieurs avec vue panoramique",
          content: "De belles terrasses offrant des vues panoramiques époustouflantes sur le domaine et la campagne environnante."
        },
        roseraie: {
          title: "Roseraie",
          subtitle: "Jardin romantique pour les photos",
          content: "Un jardin romantique de roses parfait pour les portraits de couple et les moments intimes."
        },
        mare: {
          title: "Mare",
          subtitle: "Point d'eau pittoresque pour les cérémonies",
          content: "Un cadre serein avec une mare qui crée une atmosphère magique pour les cérémonies et les photos."
        }
      }
    },
    interactiveMap: {
      title: "Explorez le Domaine",
      subtitle: "Découvrez nos hébergements et espaces en cliquant sur les points de la carte",
      exploreSpaces: "Découvrez les Espaces du Domaine",
      discover: "Découvrir",
      close: "Fermer",
      legend_accommodation: "Hébergements",
      legend_poi: "Lieux d'intérêt",
      legend_space: "Espaces",
    },
    contact: {
      title: "Contactez-nous",
      subtitle: "Nous sommes à votre écoute pour répondre à toutes vos questions",
    },
    dateSelector: {
      title: "Choisissez la date de votre événement",
      subtitle: "Sélectionnez la date de votre mariage ou événement pour découvrir nos forfaits",
      selectedDate: "Date sélectionnée",
      helpText: "Cliquez sur une date pour continuer",
      dialogTitle: "Sélectionnez la date de votre événement",
      dialogDescription: "Choisissez la date de votre mariage ou événement pour continuer",
      cancel: "Annuler",
      confirm: "Confirmer",
    },
    instagram: {
      title: "Suivez-nous sur Instagram",
      subtitle: "@manoirdevacheresses",
      button: "Voir sur Instagram"
    }
  },
};
