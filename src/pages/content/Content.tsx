import artists from "../../artists.json";
import ArtistSection from "../../components/artistSection/ArtistSection";

type Artist = {
	name: {
		first: string;
		second: string;
	};
	photo: string;
	artworks: string[];
};

const Content: React.FC = () => {
	return (
		<div className="scroller">
			{artists.map((artist: Artist) => (
				<ArtistSection
					key={artist.name.first + artist.name.second}
					artistFirstName={artist.name.first}
					artistSecondName={artist.name.second}
					artistPhoto={artist.photo}
					artistWorks={artist.artworks}
				/>
			))}
		</div>
	);
};

export default Content;
