exports.createSchemaCustomization = ({ actions }) => {
	const { createTypes } = actions;
	const typeDefs = `
    type SiteSiteMetadata {
      siteUrl: String
      name: String
      title: String
      description: String
      author: String
      games: [GameItem]
      events: [EventItem]
    }

    type GameItem {
      name: String
      releaseYear: String
      imgName: String
    }

    type EventItem {
      name: String!
      description: String!
      link: String!
    }
  `;
	createTypes(typeDefs);
};
