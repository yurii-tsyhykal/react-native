import {algoliaClient} from '../config/algoliaConfig';
import {IPets} from '../screen/Home';
import {Hit} from 'algoliasearch';

export type AlgoliaHit = IPets & Hit;

export default async function algoliaFetch(
  query: string,
  filter: string = '',
): Promise<AlgoliaHit[]> {
  try {
    const result = await algoliaClient.searchSingleIndex({
      indexName: 'animals',
      searchParams: {
        query: query,
        filters: filter,
      },
    });
    console.log('algolia utils', result);
    return result.hits as AlgoliaHit[];
  } catch (error) {
    return [];
  }
}
