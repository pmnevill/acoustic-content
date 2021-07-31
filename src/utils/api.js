import { BASE_RENDER_URL, BASE_DELIVERY_URL } from './endpoints';
import {client} from './api-client'

const getContentById = id => client(`${BASE_RENDER_URL}/${id}`);

const search = query => client(`${BASE_DELIVERY_URL}/search?${query}`);

const searchDocument = ({text, type}) => search(`q=text:(*${text}*)&sort=lastModified%20desc&rows=200&fl=document:[json]&fq=type:(${type})`);

export {
  getContentById,
  searchDocument,
  search,
};
