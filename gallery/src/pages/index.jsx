import { graphql } from 'gatsby';
import get from 'lodash/get';
import React from 'react';

import Header from '../components/header';
import Layout from '../components/layout';
import SectionGames from '../components/section-games';
import SectionEvents from '../components/section-events';
import SEO from '../components/seo';

const Index = ({ data }) => {
  const games = get(data, 'site.siteMetadata.games', false);
  const events = get(data, 'site.siteMetadata.events', false);

  return (
    <Layout>
      <SEO />
      <Header metadata={data.site.siteMetadata} />
      {games && games.length && (
        <SectionGames games={games} />
      )}
      {events && events.length && (
        <SectionEvents events={events} />
      )}
    </Layout>
  );
};

export default Index;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        name
        title
        description
        author
        games {
          name
          releaseYear
          screenLanguages
          igdb
          imgSrc
          platforms {
            name
            link
          }
        }
        events {
          name
          year
          country
          link
          website
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 5
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`;
