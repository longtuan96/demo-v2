import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../api';
import { RootState } from '../../app/store';
import { NormalResponse, Weather } from '../../models';

interface Location {
  lon: number;
  lat: number;
}
export interface Setting {
  feelsLike: boolean;
  wind: boolean;
  tempMax: boolean;
  tempMin: boolean;
  pressure: boolean;
  humidity: boolean;
  unit: string;
}

const apiKey = 'b91869d180f15754d243548d55d021ce';

export interface WeatherState {
  currentData?: NormalResponse<Weather>;

  setting: Setting;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: WeatherState = {
  currentData: undefined,

  setting: {
    feelsLike: true,
    wind: true,
    tempMax: false,
    tempMin: false,
    pressure: true,
    humidity: true,
    unit: 'metric',
  },
  status: 'idle',
};

//thunk
export const getWeatherAsync = createAsyncThunk(
  'weather/getWeather',
  async (location: Location) => {
    // const url = `weather?id=2172797&appid=${apiKey}&units=metric`;
    const url = `weather?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&units=metric`;
    const response = await api.get(url);
    let data = response as unknown as NormalResponse<Weather>;
    // The value we return becomes the `fulfilled` action payload
    return data;
  }
);

//createSlice
export const WeatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    updateSetting(state, action: PayloadAction<Setting>) {
      state.setting = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWeatherAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getWeatherAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.currentData = action.payload;
      });
  },
});

export const { updateSetting } = WeatherSlice.actions;

export const selectWeather = (state: RootState) => state.reducers.weatherReducer.currentData;

export const selectSetting = (state: RootState) => state.reducers.weatherReducer.setting;

export default WeatherSlice.reducer;
