import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';

import UserProfile from './user-profile';

it('should be defined', () => {
  expect(UserProfile).toBeDefined();
});

describe('UserProfile Component', () => {
  const mockUserData = {
    name: 'example',
    email: 'example@example.com',
  };

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render with user profile details', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockUserData),
    });

    act(() => {
      render(<UserProfile userId="xxxx-xxxx" />);
    });

    const renderLoading = screen.queryByText('Loading...');
    expect(renderLoading).toBeInTheDocument();

    await waitFor(() => {
      const renderName = screen.queryByText(mockUserData.name);
      const renderEmail = screen.queryByText('Email: ' + mockUserData.email);

      expect(renderName).toBeInTheDocument();
      expect(renderEmail).toBeInTheDocument();
    });
  });

  it('should render error when return response is not ok', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
    });

    act(() => {
      render(<UserProfile userId="xxxx-xxxx" />);
    });

    const renderLoading = screen.queryByText('Loading...');
    expect(renderLoading).toBeInTheDocument();

    await waitFor(() => {
      const renderError = screen.queryByText(
        'Error: Failed to fetch user data'
      );
      expect(renderError).toBeInTheDocument();
    });
  });

  it('should render error when fetch error', async () => {
    const errorMessage = 'Network Error';
    jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error(errorMessage));

    act(() => {
      render(<UserProfile userId="xxxx-xxxx" />);
    });

    const renderLoading = screen.queryByText('Loading...');
    expect(renderLoading).toBeInTheDocument();

    await waitFor(() => {
      const renderError = screen.queryByText('Error: ' + errorMessage);
      expect(renderError).toBeInTheDocument();
    });
  });
});
