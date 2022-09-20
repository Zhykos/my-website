import React from 'react';

import Section from '../section';
import Event from '../event-item';

const SectionEvents = ({ events }) => {
  if (!events.length) return null;

  return (
    <Section title="Events">
      {events.map((item) => (
        <Event
          key={item.name}
          name={item.name}
        />
      ))}
    </Section>
  );
};

export default SectionEvents;
