import {
  client,
  type SanityFetchOptions,
  type SanityQueryParams,
} from './client'

type SanityFetchInput = SanityFetchOptions & {
  query: string;
  params?: SanityQueryParams;
};

export async function sanityFetch<T = unknown>({
  query,
  params,
  ...options
}: SanityFetchInput) {
  const data = await client.fetch<T>(query, params, options);

  return { data };
}
