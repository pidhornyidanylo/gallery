import React from 'react';

type ArtistSectionProps = {
  artistFirstName: string;
  artistSecondName: string;
  artistPhoto: string;
  artistWorks: string[];
};

const ArtistSection: React.FC<
  ArtistSectionProps
> = ({}: ArtistSectionProps) => {
  return <div></div>;
};

export default ArtistSection;
