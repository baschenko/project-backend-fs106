import MovieCollection from '../db/models/Movies.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getMovies = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
}) => {
  const skip = (page - 1) * perPage;

  const data = await MovieCollection.find()
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });
  const totalItems = await MovieCollection.countDocuments();
  const paginationData = calculatePaginationData({ totalItems, page, perPage });
  return {
    data,
    ...paginationData,
  };
};

export const getMovieById = (id) => MovieCollection.findById(id);

export const addMovie = (payload) => MovieCollection.create(payload);

export const updateMovie = async ({ _id, payload, options = {} }) => {
  const rawResult = await MovieCollection.findOneAndUpdate({ _id }, payload, {
    ...options,
    // new: true,
    includeResultMetadata: true,
    // runValidators: true,
  });
  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject.upserted),
  };
};

export const deleteMovie = async (filter) =>
  MovieCollection.findOneAndDelete(filter);
