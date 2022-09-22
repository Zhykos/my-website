import React from 'react';

import Section from '../section';
import SummaryItem from '../summary-item';

const SectionBenevolat = ({ benevolat }) => {
  if (!benevolat.length) return null;

  return (
    <Section title="Bénévolat">
      {benevolat.map((item) => (
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

export default SectionBenevolat;
