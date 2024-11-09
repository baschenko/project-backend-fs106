import createHttpError from 'http-errors';
import * as movieServices from '../services/movies.js';

export const getMoviesController = async (req, res) => {
  const data = await movieServices.getMovies();
  console;

  res.json({
    status: 200,
    message: 'Successfully find movies',
    data,
  });
};

export const getMovieByIdController = async (req, res) => {
  const { id } = req.params;

  const data = await movieServices.getMovieById(id);

  if (!data) {
    throw createHttpError(404, `Movie with id=${id} not found`);
  }
  res.json({
    status: 200,
    message: 'Movie successfully find',
    data,
  });
};

export const addMovieControler = async (req, res) => {
  const data = await movieServices.addMovie(req.body);

  res.status(201).json({
    status: 201,
    message: 'Movie successfully add',
    data,
  });
};

export const upsertMovieController = async (req, res) => {
  const { id: _id } = req.params;

  const result = await movieServices.updateMovie({
    _id,
    payload: req.body,
    options: {
      upsert: true,
    },
  });

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status: status,
    message: 'Movie upserted successfylly',
    data: result.data,
  });
};

export const patchMovieController = async (req, res) => {
  const { id: _id } = req.params;

  const result = await movieServices.updateMovie({ _id, payload: req.body });
  if (!result) {
    throw createHttpError(404, `Movie with id=${_id} not found`);
  }
  res.json({
    status: 200,
    message: 'Movie pathed successfully',
    data: result.data,
  });
};

export const deleteMovieControler = async (req, res) => {
  const { id: _id } = req.params;

  const data = await movieServices.deleteMovie({ _id });

  if (!data) {
    throw createHttpError(404, `Movie with id=${_id} not found`);
  }

  res.status(204).send();
};
