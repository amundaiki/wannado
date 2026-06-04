import { apiVersion, dataset, projectId } from '../env'

export type SanityQueryParams = Record<string, unknown>;

export type SanityFetchOptions = {
  perspective?: string;
  cache?: RequestCache;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
  signal?: AbortSignal;
};

type SanityQueryResponse<T> = {
  result: T;
};

const querySizeLimit = 11264;

function buildSearchParams(
  query: string,
  params: SanityQueryParams = {},
  options: SanityFetchOptions = {},
) {
  const searchParams = new URLSearchParams();

  searchParams.set('query', query);

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      searchParams.set(`$${key}`, JSON.stringify(value));
    }
  }

  if (options.perspective) {
    searchParams.set('perspective', options.perspective);
  }

  return searchParams;
}

async function fetchSanity<T>(
  query: string,
  params: SanityQueryParams = {},
  options: SanityFetchOptions = {},
) {
  const searchParams = buildSearchParams(query, params, options);
  const queryString = searchParams.toString();
  const useGet = queryString.length < querySizeLimit;
  const host = useGet ? 'apicdn' : 'api';
  const endpoint = `https://${projectId}.${host}.sanity.io/v${apiVersion}/data/query/${dataset}`;
  const requestInit: RequestInit & { next?: SanityFetchOptions['next'] } = {
    method: useGet ? 'GET' : 'POST',
    headers: {
      Accept: 'application/json',
      ...(useGet ? {} : { 'Content-Type': 'application/json' }),
    },
    cache: options.cache,
    next: options.next,
    signal: options.signal,
  };
  const url = useGet
    ? `${endpoint}?${queryString}`
    : `${endpoint}${options.perspective ? `?perspective=${encodeURIComponent(options.perspective)}` : ''}`;

  if (!useGet) {
    requestInit.body = JSON.stringify({ query, params });
  }

  const response = await fetch(url, requestInit);

  if (!response.ok) {
    throw new Error(`Sanity query failed with status ${response.status}`);
  }

  const payload = (await response.json()) as SanityQueryResponse<T>;
  return payload.result;
}

export const client = {
  fetch<T = unknown>(
    query: string,
    params?: SanityQueryParams,
    options?: SanityFetchOptions,
  ) {
    return fetchSanity<T>(query, params, options);
  },
};
