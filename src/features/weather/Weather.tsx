import React, { useEffect } from 'react';
import { Col, Descriptions, Divider, Image, Row } from 'antd';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import styles from './Weather.module.css';
import '../../ultils.css';

import { getWeatherAsync, selectSetting, selectWeather } from './WeatherSlice';
import moment from 'moment';

export function Weather() {
  const dispatch = useAppDispatch();
  const weatherData = useAppSelector(selectWeather);
  const SettingData = useAppSelector(selectSetting);
  const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@4x.png`;

  useEffect(() => {
    getLocationAndWeatherData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getLocationAndWeatherData = () => {
    navigator.geolocation.getCurrentPosition((position) =>
      dispatch(getWeatherAsync({ lon: position.coords.longitude, lat: position.coords.latitude }))
    );
  };

  return (
    <div className={styles.box}>
      <Row id={styles.upper} justify="space-between">
        <Col className={styles.title} style={{ padding: '20px' }} span={16}>
          <div id={styles.location}>{`${weatherData?.name},${weatherData?.sys.country}`}</div>
          <div>{weatherData?.weather[0].description}</div>
        </Col>
        <Col span={8}>
          <Image className={styles.maxImg} height={'150px'} width={'150px'} src={weatherIconUrl} />
        </Col>
      </Row>

      <Row style={{ backgroundColor: 'white' }}>
        <Col span={12}>
          <div id={styles.temp}>
            {weatherData?.main.temp && `${Math.ceil(weatherData?.main.temp)}\xB0C`}
          </div>
        </Col>
        <Col span={12}>
          <Descriptions title="Details" column={1} style={{ padding: '0px 25%' }} colon={false}>
            <Descriptions.Item label="Feels Like">
              {weatherData?.main && `${Math.ceil(weatherData?.main.feels_like)}\xB0C`}
            </Descriptions.Item>
            <Descriptions.Item label="Wind">{`${weatherData?.wind.speed} m/s`}</Descriptions.Item>
            <Descriptions.Item label="Humidity">{`${weatherData?.main.humidity} %`}</Descriptions.Item>
            <Descriptions.Item label="Pressure">{`${weatherData?.main.pressure} hPa`}</Descriptions.Item>
            <Descriptions.Item label="Max Temperature">{`${weatherData?.main.temp_max} \xB0C`}</Descriptions.Item>
            <Descriptions.Item label="Min Temperature">{`${weatherData?.main.temp_min} \xB0C`}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
      <div style={{ textAlign: 'right', padding: '5px' }} id={styles.upper}>
        {moment().format('MMM Do YY')}
      </div>
    </div>
  );
}
