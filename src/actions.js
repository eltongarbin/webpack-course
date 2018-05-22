import fetch from 'cross-fetch';

export const fetchArticle = (site, slug) => (dispatch) => {
  if (!site || !slug) return;
  fetch(`http://${site}.local:8080/api/articles/${slug}`)
    .catch((err) => fetch(`http://${site}:8080/api/articles/${slug}`))
    .then((res) => res.json())
    .then((data) => dispatch(fetchSuccess(data)))
    .catch((err) => dispatch(fetchFailure(err)));
};

export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const fetchSuccess = (response) => ({
  type: FETCH_SUCCESS,
  payload: response
});

export const FETCH_FAILURE = 'FETCH_FAILURE';
export const fetchFailure = (error) => ({
  type: FETCH_FAILURE,
  payload: error
});
