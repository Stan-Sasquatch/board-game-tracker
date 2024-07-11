import { type ValidUrlQueryKeys } from "./models";

export function setUrlParams(
  params: URLSearchParams,
  key: ValidUrlQueryKeys,
  value: string,
) {
  params.set(key, value);
  return params;
}

export function getUrlParam(params: URLSearchParams, key: ValidUrlQueryKeys) {
  return params.get(key);
}
