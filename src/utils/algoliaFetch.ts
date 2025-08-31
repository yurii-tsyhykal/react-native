import {algoliaClient} from '../config/algoliaConfig';
import {IPets} from '../screen/Home';
import {Hit} from 'algoliasearch';
import {filterToString} from './filterToString';
import {ISettings} from '../screen/Filter';
import {getIndex} from './getIndex';

export type AlgoliaHit = IPets & Hit;

interface IAlgoliaFetch {
  text: string;
  attributes?: string[];
  filter?: ISettings;
}

export default async function algoliaFetch({
  text,
  attributes = [],
  filter,
}: IAlgoliaFetch): Promise<AlgoliaHit[]> {
  const timeStamp = filter?.timeStamp ?? null;
  const filtersToString = filter ? filterToString(filter) : '';
  const index = getIndex(timeStamp);

  try {

    const result = await algoliaClient.searchSingleIndex({
      indexName: index,
      searchParams: {
        query: text,
        ...(attributes.length > 0 && {
          restrictSearchableAttributes: attributes,
        }),
        ...(filter && {filters: filtersToString}),
        typoTolerance: false,
      },
    });
    return result.hits as AlgoliaHit[];
  } catch (error) {
    console.log('error algolia', error);
    return [];
  }
}
