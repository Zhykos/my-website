import React from "react";

import Section from "../section";
import SummaryItem from "../summary-item";

const SectionFormations = ({ formations }) => {
	if (!formations.length) return null;

	return (
		<Section title="Formations">
			{formations.map((item) => (
				<SummaryItem
					key={item.name}
					name={item.name}
					description={item.description}
					link={item.link}
				/>
			))}
		</Section>
	);
};

export default SectionFormations;
