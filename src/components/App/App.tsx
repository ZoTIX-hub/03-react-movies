import React from "react";
import css from "./App.module.css";

import { Toaster, toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

import ReactPaginateImport from "react-paginate";

const ReactPaginate =
  (ReactPaginateImport as unknown as { default: typeof ReactPaginateImport })
    .default ?? ReactPaginateImport;


import type { FetchMoviesResponse } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [selectedMovie, setSelectedMovie] = React.useState<Movie | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [query, setQuery] = React.useState("");

  const { data, isLoading, isError, isSuccess } =
    useQuery<FetchMoviesResponse>({
      queryKey: ["movies", query, currentPage],
      queryFn: () => fetchMovies(query, currentPage),
      enabled: query.trim().length > 0,
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      placeholderData: (previousData) => previousData ?? undefined,
    });

  React.useEffect(() => {
    if (isSuccess && data?.results.length === 0) {
      toast.error("No movies found");
    }
  }, [isSuccess, data]);

  function handleSearch(newQuery: string) {
    setQuery(newQuery);
    setCurrentPage(1);
    setSelectedMovie(null);
  }

  return (
    <div className={css.app}>
      <Toaster position="top-right" />

      <SearchBar onSubmit={handleSearch} />

      {data && data.total_pages > 1 && (
        <ReactPaginate
          pageCount={data.total_pages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }: { selected: number }) =>
            setCurrentPage(selected + 1)
          }
          forcePage={currentPage - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {data && data.results.length > 0 && (
        <MovieGrid movies={data.results} onSelect={setSelectedMovie} />
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}
