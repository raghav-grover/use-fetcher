export function useFetcher(url: String, initialValue: any, options:{
    method: String,
    body:Object,
    timeout: number,
    headers: Object,
    runWhenSpecificPropsChanges: Array,
    calculateTimeTaken: Boolean,
    returnRawFetchResponse: Boolean
}):{
    data: Object,
    success: Boolean,
    error: Object,
    abort: () => Boolean
}