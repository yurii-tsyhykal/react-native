import {algoliasearch} from 'algoliasearch';
import {ALGOLIA_APP_ID, ALGOLIA_SEARCH_ONLY_API_KEY} from '@env';

export const algoliaClient = algoliasearch(
  ALGOLIA_APP_ID,
  ALGOLIA_SEARCH_ONLY_API_KEY,
);
