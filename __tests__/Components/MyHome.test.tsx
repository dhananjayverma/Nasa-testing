import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomePage from '../../Components/MyHome';
import axios from 'axios';

jest.mock('axios');

describe('HomePage', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('fetches data when the "Random Asteriod" button is pressed', async () => {
    const mockData = {
      data: {
        near_earth_objects: [
          { id: '2000433' },
        ],
      },
    };
    (axios.get as jest.Mock).mockResolvedValue(mockData);

    const { getByText } = render(<HomePage />);
    fireEvent.press(getByText('Random Asteriod'));

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith('https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY');
      expect(getByText(mockData.data.near_earth_objects[0].id)).toBeTruthy();
    });
  });

  it('navigates to Asteroid screen when the "Submit" button is pressed with a valid asteroid id', () => {
    const mockNavigate = jest.fn();
    const { getByText, getByPlaceholderText } = render(<HomePage />);
    const asteroidId = '123';

    fireEvent.changeText(getByPlaceholderText('Enter Asteroid Id here '), asteroidId);
    fireEvent.press(getByText('Submit'));

    expect(mockNavigate).toHaveBeenCalledWith('Asteroid', { AsteroidData: asteroidId });
  });

  it('disables the "Submit" button when no asteroid id is entered', () => {
    const { getByText, getByPlaceholderText } = render(<HomePage />);

    expect(getByText('Submit').props.disabled).toBe(true);

    fireEvent.changeText(getByPlaceholderText('Enter Asteroid Id here '), '123');

    expect(getByText('Submit').props.disabled).toBe(false);
  });
});



