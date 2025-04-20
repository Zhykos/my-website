import { graphql } from "gatsby";
import get from "lodash/get";
import React from "react";

import Header from "../components/header";
import Layout from "../components/layout";
import SectionAbout from "../components/section-about";
import SectionExperience from "../components/section-experience";
import SectionStages from "../components/section-stages";
import SectionFormations from "../components/section-formations";
import SectionProjects from "../components/section-projects";
import SectionBenevolat from "../components/section-benevolat";
import SectionSkills from "../components/section-skills";
import SEO from "../components/seo";

const Index = ({ data }) => {
	const about = get(data, "site.siteMetadata.about", false);
	const projects = get(data, "site.siteMetadata.projects", false);
	const experience = get(data, "site.siteMetadata.experience", false);
	const stages = get(data, "site.siteMetadata.stages", false);
	const formations = get(data, "site.siteMetadata.formations", false);
	const benevolat = get(data, "site.siteMetadata.benevolat", false);
	const skills = get(data, "site.siteMetadata.skills", false);
	const noBlog = true;

	return (
		<Layout>
			<SEO />
			<Header metadata={data.site.siteMetadata} noBlog={noBlog} />
			{about && <SectionAbout about={about} />}
			{experience && experience.length && (
				<SectionExperience experience={experience} />
			)}
			{projects && projects.length && (
				<SectionProjects projects={projects} />
			)}
			{skills && skills.length && <SectionSkills skills={skills} />}
			{formations && formations.length && (
				<SectionFormations formations={formations} />
			)}
			{stages && stages.length && <SectionStages stages={stages} />}
			{benevolat && benevolat.length && (
				<SectionBenevolat benevolat={benevolat} />
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
        about
        author
        github
        gitlab
        linkedin
        projects {
          name
          description
          link
        }
        experience {
          name
          description
          link
        }
        stages {
          name
          description
          link
        }
        formations {
          name
          description
          link
        }
        benevolat {
          name
          description
          link
        }
        skills {
          name
          description
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
