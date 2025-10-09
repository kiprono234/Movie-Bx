import PopularMovies from "./components/PopularMovies";
// import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div className="min-h-screen flex justify-center bg-gray-100 py-10">
      <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-4xl">
{/* <SearchBar /> */}
        <PopularMovies />
      </div>
    </div>
  );
}

export default App;
