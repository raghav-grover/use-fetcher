# useFetcher
An abortable React Hook for using fetch which supports Error handling, timeouts, deserialisations, time logging and re-fetching based on `props`.

_Warning: Hooks are currently a React [RFC](https://github.com/reactjs/rfcs/pull/68) and **not ready for production**. Use at minimum `react@16.7.0-alpha.0` to use this package._

# Installation
`npm install use-fetcher`

# Example usages
```
import {useFetcher} from 'use-fetcher';
function GitHubUsers(props) {
  const initialState = {};
  const options = {
    method: "GET", //Defaults to GET
    body: {"say":"hello"}, // Defaults to {}, won't work with GET(will be ignored)
    timeout: 1000, // Defaults to 3000ms
    headers: {}, // Defaults to {}
    returnRawFetchResponse:true, //Defaults to false
    runWhenSpecificPropsChanges: [props.reFetchWhenThisPropChanges],// Defaults to []
  }
  const { data, success, abort, error, timeTaken } = useFetcher(
    "https://api.github.com/users",
    initialState,
    options
  );
  //The data would contain the response returned from the URL in case the fetch Call succeeds.
  return <div className="section" />;
}
```
You can also:
  - Specify a `timeout` field in options as an `integer` after which the fetch will be aborted
  - Cancel the fetch call anytime by calling the `abort()` returned from `useFetch`. If abort is supported by browser, `abort()` will return `true`.
  - Specify `calculateTimeTaken` field in options to have a returned `timeTaken` field returned from `useFetch` 
  - Re-fetch based on whether a specific prop has changed or not by specifying prop in `runWhenSpecificPropsChanges` in `options`.
  - Get the raw object returned from fetch by passing `returnRawFetchResponse` in options
  - Get a `blob` object if the Response header is neither a `application/json` or `application/text`

The body and the headers can be passed to fetch using `body` and `headers` in `options` respectively.
##### Note
The `options` doesn't need to be passed necessarily, a merge is performed with what is passed and the default values.


## Acknowledgements
  - Hat tip to anyone who uses and contributes to the code....
  - React Hooks Docs

