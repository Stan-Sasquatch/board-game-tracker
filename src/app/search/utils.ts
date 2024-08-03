import { type CollectionQueryKeys } from "../collection/models";
import { type SearchPageQueryKeys } from "./models";

type ValidKeys = SearchPageQueryKeys | CollectionQueryKeys;

export function setUrlParams<T extends ValidKeys>(
  params: URLSearchParams,
  key: T,
  value: string,
) {
  params.set(key, value);
  return params;
}

export function getUrlParam(params: URLSearchParams, key: SearchPageQueryKeys) {
  return params.get(key);
}
