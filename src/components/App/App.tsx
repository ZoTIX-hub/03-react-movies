<<<<<<< HEAD
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
=======
import { useState } from 'react';
import css from './App.module.css';

import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

import type { Movie } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';

import toast from 'react-hot-toast';

import  ReactPaginate from 'react-paginate';
import { useQuery } from '@tanstack/react-query';

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query !== '',
    staleTime: 1000 * 60 * 5,
  });

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  const handleSearch = (newQuery: string) => {
    if (newQuery === query) return;

    setQuery(newQuery);
    setPage(1);
    setSelectedMovie(null);
  };

  if (!isLoading && movies.length === 0 && query !== '') {
    toast.error('No movies found for your request.');
>>>>>>> 2633ab605872a18297f9d5f0c0fc67ddd67a7c93
  }

  return (
    <div className={css.app}>
      <Toaster position="top-right" />

      <SearchBar onSubmit={handleSearch} />

<<<<<<< HEAD
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

=======
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}

      {totalPages > 1 && (
  <ReactPaginate
    pageCount={totalPages}
    pageRangeDisplayed={5}
    marginPagesDisplayed={1}
    onPageChange={({ selected }) => setPage(selected + 1)}
    forcePage={page - 1}
    containerClassName={css.pagination}
    activeClassName={css.active}
    nextLabel="→"
    previousLabel="←"
  />
)}


>>>>>>> 2633ab605872a18297f9d5f0c0fc67ddd67a7c93
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}
<<<<<<< HEAD
=======

export default App;
>>>>>>> 2633ab605872a18297f9d5f0c0fc67ddd67a7c93
