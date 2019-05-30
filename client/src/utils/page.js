import { getSingleParamFromQueryString } from './url';

// FROM TMDB API.
const MIN_PAGE = 1;
const MAX_PAGE = 1000;
const DEFAULT_PAGE = 1;

export function getPageFromQueryString(queryString) {
    return getSingleParamFromQueryString(queryString, {
        paramName: 'page',
        fallbackValue: DEFAULT_PAGE,
        transform: pageString => {
            const page = parseInt(pageString, 10);

            if (
                isNaN(page)
                || page < MIN_PAGE
                || page === 0
                || page > MAX_PAGE
            ) {
                return DEFAULT_PAGE;
            }

            return page
        }
    });
}
