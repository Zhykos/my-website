import React from 'react';

import Section from '../section';
import SummaryItem from '../summary-item';

const SectionStages = ({ stages }) => {
  if (!stages.length) return null;

  return (
    <Section title="Stages et projets de fin d’études">
      {stages.map((item) => (
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

export default SectionStages;
