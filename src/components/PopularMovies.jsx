import MovieCard from "./MovieCard";

const movies = [
  {
    title: "Dune: Part Two",
    year: 2024,
    image: "https://m.media-amazon.com/images/M/MV5BNTc0YmQxMjEtODI5MC00NjFiLTlkMWUtOGQ5NjFmYWUyZGJhXkEyXkFqcGc@._V1_.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=Way9Dexny3w", 
  },
  {
    title: "Oppenheimer",
    year: 2023,
    image: "https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=uYPbbksJxIg",
  },
  {
    title: "The Batman",
    year: 2022,
    image: "https://m.media-amazon.com/images/M/MV5BMmU5NGJlMzAtMGNmOC00YjJjLTgyMzUtNjAyYmE4Njg5YWMyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=mqqft2x_Aa4",
  },
  {
    title: "Avatar: The Way of Water",
    year: 2022,
    image: "https://upload.wikimedia.org/wikipedia/en/5/54/Avatar_The_Way_of_Water_poster.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=d9MyW72ELq0",
  },
  {
    title: "Mission Impossible: Dead Reckoning",
    year: 2023,
    image: "https://upload.wikimedia.org/wikipedia/en/e/ed/Mission-_Impossible_%E2%80%93_Dead_Reckoning_Part_One_poster.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=avz06PDqDbM",
  },
  {
    title: "Black Panther: Wakanda Forever",
    year: 2022,
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Black_Panther_Wakanda_Forever_poster.jpg/250px-Black_Panther_Wakanda_Forever_poster.jpg",
    trailerUrl: "https://youtu.be/huR4p8zEz5E?si=14t2ohqQBlzGUBrA",
  },
  {
    title: "Avatar: The Way of Water",
    year: 2022,
    image: "https://upload.wikimedia.org/wikipedia/en/5/54/Avatar_The_Way_of_Water_poster.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=d9MyW72ELq0",
  },
  {
    title: "Jurassic World: Dominion",
    year: 2022,
    image: "https://images.justwatch.com/poster/300590311/s718/jurassic-world-dominion.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=RFinNxS5KN4",
  },
  {
    title: "The Flash",
    year: 2023,
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/The_Flash_%28film%29_poster.jpg/250px-The_Flash_%28film%29_poster.jpg",
    trailerUrl: "https://youtu.be/YFGQJxpkPg4?si=cMnsObQ6GAh0xsa-",
  },
  {
    title: "Guardians of the Galaxy Vol. 3",
    year: 2023,
    image: "https://images.justwatch.com/poster/304936885/s718/guardians-of-the-galaxy-vol-3.jpg",
    trailerUrl: "https://youtu.be/u3V5KDHRQvk?si=SRymPYyOFC1cUUCY",
  },
  {
    title: "John Wick: Chapter 4",
    year: 2023,
    image: "https://images.justwatch.com/poster/304195811/s718/john-wick-chapter-4.jpg",
    trailerUrl: "https://youtu.be/qEVUtrk8_B4?si=THnz9qqfr0KiF5va",
  },
  {
    title: "Spiderman: No Way Home",
    year: 2021,
    image: "https://images.justwatch.com/poster/300177312/s718/spider-man-no-way-home.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=JfVOs4VSpmA",
  },
  {
    title: "Doctor Strange in the Multiverse of Madness",
    year: 2022,
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/1/17/Doctor_Strange_in_the_Multiverse_of_Madness_poster.jpg/250px-Doctor_Strange_in_the_Multiverse_of_Madness_poster.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=aWzlQ2N6qqg",

  },
    {
    title: "Thor: Love and Thunder",
    year: 2022,
    image: "https://m.media-amazon.com/images/M/MV5BZjRiMDhiZjQtNjk5Yi00ZDcwLTkyYTEtMDc1NjdmNjFhNGIzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=tgB1wUcmbbw",
    },
    {
    title: "Black Adam",
    year: 2022,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrlJk27C8lx34evay1WqT-US2FbGIzSb2fdA&s",
    trailerUrl: "https://youtu.be/on_1UcCENFI?si=nUU1fFRS8EYBegdw",
    },
    {
    title: "Shazam! Fury of the Gods",
    year: 2023,
    image: "https://images.justwatch.com/poster/303853751/s718/shazam-fury-of-the-gods.jpg",
    trailerUrl: "https://youtu.be/Zi88i4CpHe4?si=b9xIGomsV4SHlxeK",
    },
    {
    title: "Aquaman and the Lost Kingdom",
    year: 2023,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpEFUTGSACIFX3I1gUgJV9KjlmXpVHmuj5OQ&s",
    trailerUrl: "https://www.youtube.com/watch?v=WDkg3h8PCVU",
    },
    {
    title: "The Marvels",
    year: 2023,
    image: "https://m.media-amazon.com/images/M/MV5BYzczOWM4MzItMWMyOS00ZDczLWIxMzctNzBmYTgzOTI1MzI3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    trailerUrl: "https://youtu.be/wS_qbDztgVY?si=olaPSaYQ2jmLG8OW",  
    },
    {
    title:"Silent Night",
    year: 2023,
    image: "https://play-lh.googleusercontent.com/EM0a107skGBu3o05dF0sA09_3iCI_d1T5nzh41tZ5nRcwUFwURxt1DlLCzz3hpUpYiBXoOvwIsdkojvlBuw",
    trailerUrl: "https://youtu.be/yBnTqn0lBDA?si=50RYz9S48t2axN8j",
    }
    
];

export default function PopularMovies() {
  return (
    <section className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Popular Movies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.title} movie={movie} />
        ))}
      </div>
    </section>
  );
}
