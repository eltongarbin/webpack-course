import fetch from 'cross-fetch';

export const fetchArticle = (site, slug) => async (dispatch) => {
  if (!site || !slug) return;

  try {
    const response = await fetch(
      `http://${site}:8080/api/articles/${slug}`
    );
    const items = await response.json();
    dispatch(fetchSuccess(items));
  } catch (error) {
    dispatch(fetchError(err));
  }
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
