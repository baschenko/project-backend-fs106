import { model, Schema } from 'mongoose';

import { typeList } from '../../constants/movies.js';
import { handleSaveError, setUpdateSettings } from './hooks.js';

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
    },
    director: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: typeList,
      default: 'film',
      required: true,
    },
    releaseYear: {
      type: Number,
      min: 1985,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

movieSchema.post('save', handleSaveError);
movieSchema.pre('findOneAndUpdate', setUpdateSettings);
movieSchema.post('findOneAndUpdate', handleSaveError);

export const sortByList = ['title', 'director', 'type'];

const MovieCollection = model('movies', movieSchema);

export default MovieCollection;
