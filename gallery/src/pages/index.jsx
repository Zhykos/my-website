import { graphql } from 'gatsby';
import React from 'react';

import Header from '../components/header';
import Layout from '../components/layout';
import SectionGames from '../generated-components/section-games';
import SectionEvents from '../components/section-events';
import SEO from '../components/seo';

const Index = ({ data }) => {
  return (
    <Layout>
      <SEO />
      <Header metadata={data.site.siteMetadata} />
      <SectionGames />
      <SectionEvents />
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
      }
    }
  }
`;
