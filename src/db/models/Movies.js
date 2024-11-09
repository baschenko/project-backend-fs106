import { model, Schema } from 'mongoose';

import { typeList } from '../../constants/movies.js';
import { handleSaveError, setUpdateSettings } from './hooks.js';

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      // minLength: 3,
      // maxLength: 6,
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
  },
  { versionKey: false, timestamps: true },
);

movieSchema.post('save', handleSaveError);
movieSchema.pre('findOneAndUpdate', setUpdateSettings);
movieSchema.post('findOneAndUpdate', handleSaveError);

const MovieCollection = model('movies', movieSchema);

export default MovieCollection;
