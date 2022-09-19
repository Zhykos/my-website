module.exports = {
  siteMetadata: {
    // Site URL for when it goes live
    siteUrl: `https://www.zhykos.fr/`,
    // Your Name
    name: 'Thomas Cicognani',
    // Main Site Title
    title: `Thomas Cicognani | Ingénieur concepteur`,
    // Description that goes under your name in main bio
    description: `Ingénieur concepteur, open source et plein de trucs.`,
    // Optional: Twitter account handle
    //author: `@rfitzio`,
    // Optional: Github account URL
    github: `https://github.com/Zhykos`,
    gitlab: `https://gitlab.com/zhykos`,
    // Optional: LinkedIn account URL
    linkedin: `https://www.linkedin.com/in/thomas-cicognani/`,
    // Content of the About Me section
    about: `En 13 ans d'expérience dans l'architecture logicielle et l'analyse de Systèmes d'Information de divers
    clients, j'''ai acquis une forte exigence de qualité afin de livrer des produits les plus stables possibles.
    J'aime aussi travailler en équipe, partager mes connaissances, monter en compétence et apprendre de
    nouvelles technologies via des formations au service du produit et des clients. Je mets également en
    pratique ces connaissances dans le monde de l'Open Source.
    Je porte aussi une très grande importance à des techniques comme le Domain-Driven Design,
    l'architecture hexagonale, la qualité et l'agilité qui apporte une certaine rigueur et un cadre sein dans une
    équipe afin de produire le plus efficacement et qualitativement possible.
    J'apprécie également être au service des autres que ce soit professionnellement ou personnellement. Je
    suis dans le monde associatif depuis 2008 où j'ai notamment participé à une émission de radio et été
    rédacteur web. Enfin, je me suis récemment engagé dans une association de secourisme (PSE2 en
    juin2022) afin d'avoir un sentiment d'utilité envers la population.`,
    // Optional: List your projects, they must have `name` and `description`. `link` is optional.
    projects: [
      {
        name: 'VGG (Video Game Gallery)',
        description:
          `Ma galerie de captures d'écran de jeux vidéo. Car le jeu vidéo est aussi un art et la photo aussi. Enfin, quand on a du talent pour la photographie...`,
        link: 'https://www.zhykos.fr/video-game-gallery.html',
      },
      {
        name: 'Advanced Playlist',
        description:
          'Une playlist customisée de vos vidéos YouTube. Une version 2 est en cours de développement',
        link: 'https://github.com/Zhykos/advanced-playlist',
      },
      {
        name: 'Deno Server OpenAPI Generator',
        description:
          `Implémentation d'un générateur OpenAPI pour produire un serveur backend basé sur Deno et le middleware oak`,
        link: 'https://github.com/Zhykos/deno-server-openapi-generator',
      },
      {
        name: 'YMF',
        description:
          `Framework de gestion de méta-modèle, tout comme EMF, mais pas pareil : générateur de code à partir de méta-modèle déclaré en YAML ou autre (1.0 WIP)`,
        link: 'https://gitlab.com/fr.zhykos/YModeL',
      }
    ],
    // Optional: List your experience, they must have `name` and `description`. `link` is optional.
    experience: [
      {
        name: 'cbp (norsys)',
        description: `Ingénieur d’études et développement, février à septembre 2022`,
        link: 'https://www.norsys.fr'
      },
      {
        name: 'Mia-Software - Éditeur logiciel (Sodifrance, puis Sopra-Stéria)',
        description: `Ingénieur concepteur, septembre 2009 à janvier 2022`,
        link: 'https://www.mia-software.com/'
      },
      {
        name: 'MAAF (Sodifrance)',
        description: `Projet MAAF PUMA : développement d'outils pour aider le client lors de sa transition Pacbase vers Cobol (12 mois)`,
        link: 'https://www.soprasteria.fr'
      },
      {
        name: 'RCI Banque (Sodifrance)',
        description: `Intégration d'une application GWT migrée depuis Struts (1 mois)`,
        link: 'https://www.soprasteria.fr'
      },
      {
        name: 'MAAF (Sodifrance)',
        description: `Intégration front-end d'une application HTML Javascript migrée depuis GWT : simulateurs d'assurances habitation et automobile (4 mois)`,
        link: 'https://www.soprasteria.fr'
      },
      {
        name: 'MMA (Sodifrance)',
        description: `Développement d'une application de consolidation de bases de données pour futures analyses de type Big Data (2 mois)`,
        link: 'https://www.soprasteria.fr'
      },
    ],
    stages: [
      {
        name: 'Stage de master chez Mia-Software',
        description: `Création d’une couche de communication entre un back en Smalltalk et un front en Java (2009, 6 mois)`,
        link: 'https://www.mia-software.com/'
      },
      {
        name: 'Projet de fin de maitrise avec Code Lutin ',
        description: `Création du projet Pollen, plateforme de sondage libre : Java, Tapestry (2008, 5 mois)`,
        link: 'https://pollen.cl'
      },
      {
        name: 'Stage de DUT à Coventry University',
        description: `Évolution de l’application de visite 3D de l’université : VRML (2006, 2,5 mois)`,
        link: 'https://www.coventry.ac.uk'
      },
      {
        name: 'Projet de fin d’année d’IUT',
        description: `Simulateur 3D temps réel de cheveux : C++, OpenGL, SDL (2006, 5 mois)`,
        link: 'https://www.iut-rcc.fr'
      },
    ],
    formations: [
      {
        name: 'École du développeur',
        description: `Formation interne norsys de 5 jours (2022)`,
        link: 'https://www.norsys.fr'
      },
      {
        name: 'Kubernetes',
        description: `3 jours par l’entreprise Liksi (2019)`,
        link: 'https://www.liksi.fr'
      },
      {
        name: 'Eclipse RCP',
        description: `3 jours chez ENI Service (2013)`,
        link: 'https://www.eni-service.fr'
      },
      {
        name: 'Master ALMA',
        description: `Université de Nantes - Option Architecture distribuée (2009)`,
        link: 'https://sciences-techniques.univ-nantes.fr/formations/masters/master-informatique'
      },
      {
        name: 'DUT Informatique',
        description: `IUT de Reims - Option Imagerie Numérique (2006)`,
        link: 'https://www.iut-rcc.fr'
      },
      {
        name: `Bac S Sciences de l'Ingénieur`,
        description: `Lycée de Vitry-le-François (2004)`,
        link: 'https://lyc-francois-1er.monbureaunumerique.fr'
      },
      {
        name: `Brevet d'Initiation Aéronautique`,
        description: `Lycée de Vitry-le-François / Aérodrome LFSK (2002)`,
        link: `https://fr.wikipedia.org/wiki/Brevet_d'initiation_a%C3%A9ronautique`
      },
      {
        name: 'Auto-formations',
        description: `Udemy, OCR, etc. : Spring, Spring Boot, React, Vue.js`,
        link: ''
      },
    ],
    benevolat: [
      {
        name: 'Équipier secouriste (PSE2)',
        description: `UNASS Loire-Atlantique, formé PSE2 en avril 2022 (depuis octobre 2021)`,
        link: 'https://unass.fr/association/44-unass-loire-atlantique/'
      },
      {
        name: 'Chroniqueur et réalisateur radio',
        description: `SUN Radio - Émission sur le jeu vidéo et le numérique (entre 2012 et 2016)`,
        link: 'https://lesonunique.com'
      },
    ],
    // Optional: List your skills, they must have `name` and `description`.
    skills: [
      {
        name: 'Avancées',
        description:
          'Java 8 et 11,Node.js, Open API, HTML, JavaScript, TypeScript, Eclipse (RCP, SWT, Nebula, EMF Facet, MoDisco), UML, EMF, Neo4j, Cypher, Git, Jenkins, tests unitaires (front et back), Smalltalk, agilité.',
      },
      {
        name: 'Moyennes',
        description: 'Java 17, Spring (Boot, JPA, Security), Groovy, Spock, logs (Slf4j, Log4j, Kibana), ElasticSearch, Express, PUG, Shell, CSS, OpenTelemetry',
      },
      {
        name: 'Faibles',
        description:
          'React, Vue.js, Cobol, Perl, Ansible',
      },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              wrapperStyle: `margin: 0 0 30px;`,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `ADD YOUR TRACKING ID HERE`, // Optional Google Analytics
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `devfolio`,
        short_name: `devfolio`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`, // This color appears on mobile
        display: `minimal-ui`,
        icon: `src/images/icon.png`,
      },
    },
  ],
};
