import React from 'react';
import { fireEvent, waitForDomChange, within } from '@testing-library/react';
import { renderWithReduxAndRouter } from '../../test/render';
import { movieAPI } from '../../api';
import HomePage from '../HomePage';

jest.mock('../../api');

it('should make api calls for popular, nowPlaying, upcoming movies', () => {
  renderWithReduxAndRouter(<HomePage />);

  expect(movieAPI.getMoviesByCategory).toHaveBeenCalledTimes(3);
  expect(movieAPI.getMoviesByCategory.mock.calls[0][0]).toBe('popular');
  expect(movieAPI.getMoviesByCategory.mock.calls[1][0]).toBe('nowPlaying');
  expect(movieAPI.getMoviesByCategory.mock.calls[2][0]).toBe('upcoming');
});

it('should render welcome message', () => {
  const { getByText } = renderWithReduxAndRouter(<HomePage />);
  expect(getByText(/welcome.*/i)).toBeInTheDocument();
});

it('should render app purpose message', () => {
  const { getByText } = renderWithReduxAndRouter(<HomePage />);
  expect(
    getByText(/find information about any movie or actor\/actress/i)
  ).toBeInTheDocument();
});

it.each([
  ['popular', 'movie-section-popular', /popular movies/i],
  ['now-playing', 'movie-section-nowPlaying', /now playing movies/i],
  ['upcoming', 'movie-section-upcoming', /upcoming movies/i]
])(
  'it should render %s movies section',
  async (category, sectionTestId, sectionTitle) => {
    const { getByTestId: getByTestIdInHomePage } = renderWithReduxAndRouter(
      <HomePage />
    );

    await waitForDomChange();

    const section = getByTestIdInHomePage(sectionTestId);
    expect(section).toBeInTheDocument();
    const { getAllByTestId, getByText } = within(section);
    expect(getAllByTestId('grid-item').length).toBe(4);
    expect(section).toContainElement(getByText(sectionTitle));
    expect(section).toContainElement(getByText(/see more/i));
  }
);

it('should allow navigating to specific movies page by clicking respective "see more" button of each section', async () => {
  const {
    getByTestId: getByTestIdInHomePage,
    history
  } = renderWithReduxAndRouter(<HomePage />);

  await waitForDomChange();

  fireEvent.click(
    within(getByTestIdInHomePage('movie-section-popular')).getByText(
      /see more/i
    )
  );
  expect(history.location.pathname).toBe('/movie/popular');

  fireEvent.click(
    within(getByTestIdInHomePage('movie-section-nowPlaying')).getByText(
      /see more/i
    )
  );
  expect(history.location.pathname).toBe('/movie/now-playing');

  fireEvent.click(
    within(getByTestIdInHomePage('movie-section-upcoming')).getByText(
      /see more/i
    )
  );
  expect(history.location.pathname).toBe('/movie/upcoming');
});

it("should navigate to movie's page if card is clicked", async () => {
  const { getAllByTestId, history } = renderWithReduxAndRouter(<HomePage />);

  await waitForDomChange();

  const target = getAllByTestId('movie-card')[0];
  fireEvent.click(target);
  expect(history.location.pathname).toBe('/movie/320288');
});
