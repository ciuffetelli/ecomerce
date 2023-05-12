import { objectToQueryString } from "@/helpers/objectToQueryString";

type ApiProps = {
    api: 'local' | 'bestbuy'
    path?: string,
    params?: BestBuyParans
    fetchOptions?: RequestInit,
}

type ApiResult<T> = Promise<{
    error?: boolean
    data?: T
}>
export function api<T>(props: ApiProps): ApiResult<T> {

    switch(props.api) {
        case 'local': return fetchLocalApi<T>(props);
        case 'bestbuy': return fetchBestBuyApi(props);
        default: return Promise.resolve({ error: true })
    }
}

type AppFetchProps = {
    path: string,
    fetchOptions?: RequestInit,
}
function appFetch<T>(props: AppFetchProps): ApiResult<T> {

    return fetch(props.path, props.fetchOptions)
        .then((response) => {
            return response.json() as Promise<T>
        })
        .then((data) => {
            return {
                error: false,
                data,
            }
        })
        .catch((error) => {

            (process.env.NODE_ENV === 'development') && console.log('Api Fetch error.', error)

            return {
                error: true
            }
        })
}

export function fetchLocalApi<T>(props: ApiProps): ApiResult<T> {
    return appFetch<T>({
        ...props,
        path: `/api/${props.path}`,
    })
}

/**
 * BestBuy API
 */

const { BESTBUT_BASE_URL, BESTBUY_API_KEY } = process.env

type BestBuyParans = {
    show?: string
    pagination?: number
    pageSize?: number
    sortOptions?: string
    showOptions?: string
    format?: string
}

export function fetchBestBuyApi<T>(props: ApiProps): ApiResult<T> {
    return appFetch<T>({
        ...props,
        path: `${BESTBUT_BASE_URL}/${props.path}?apiKey=${BESTBUY_API_KEY}&${objectToQueryString({
            ...props.params,
            format: 'json',
        })}`,
    }).then((result) => {

        if(Reflect.has(result.data ?? {}, 'errorCode')) {
            return {
                error: true,
            }
        }

        return result
    })
}