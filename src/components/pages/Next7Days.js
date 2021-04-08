import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContextDispatch, useAppContextState } from '../../context/context';
import dayjs from 'dayjs';
import * as icons from '../utils/weather-icons';
import { useTrail, animated } from 'react-spring';

function Next7Days() {
  const { next7Days, loading, place, unit, alert } = useAppContextState();
  const { setPlace, findByName } = useAppContextDispatch();
  const [trail, setTrail] = useTrail(next7Days.length, () => ({
    config: {
      mass: 1,
      tension: 120,
      friction: 14,
    },
    from: {
      opacity: 0,
      transform: 'translateY(8px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  }));
  const { city } = useParams();

  useEffect(() => {
    if (place !== city) {
      findByName(city, unit);
      setPlace(city);
    }
    setTrail({});
    // eslint-disable-next-line
  }, []);

  if (loading || alert) {
    return (
      <div
        className=' w-screen flex justify-center items-center'
        style={{
          height: 'calc(100vh - 60px)',
        }}>
        <div className='loader animate-spin w-12 h-12 border-4 border-blue-500 rounded-full'></div>
      </div>
    );
  }

  return (
    <div
      className='h-full w-screen text-white bg-gradient-to-b bg-no-repeat from-purple-600 to-teal-500 relative px-5'
      style={{
        height: 'calc(100vh - 60px)',
      }}>
      <div className='vertical-scroll h-full w-full overflow-auto container md:px-2 mx-auto'>
        <h2 className='text-center font-bold text-lg my-5'>Next 7 days</h2>
        {next7Days.map(
          ({ dt, weather, temp, pressure, humidity, uvi, wind_speed, wind_deg }, index) => (
            <animated.div
              style={trail[index]}
              key={dt}
              className='bg-gray-100 bg-opacity-25 p-5 rounded-lg my-2'>
              {
                <h3 className='text-center uppercase mb-2 font-semibold'>
                  {dayjs(dt * 1000).format('dddd')}&nbsp;
                  <span className='text-light'>{dayjs(dt * 1000).format('DD.MM')}</span>
                </h3>
              }
              <div className='flex justify-between'>
                <span className='capitalize'>{weather[0].description}</span>
                <img
                  src={icons['_' + weather[0].icon]}
                  className='w-8 h-8 transform scale-150'
                  alt='weather icon'
                />
                <span className='font-semibold'>
                  {parseInt(temp.max)}&deg;{' '}
                  <span className='font-light text-sm '>{parseInt(temp.min)}&deg;</span>
                </span>
              </div>
              <div className='flex my-2'>
                <div className='w-1/2'>
                  <div className='truncate'>
                    <strong className='semibold'>Pressure: </strong>
                    {pressure} mbar
                  </div>
                  <div>
                    <strong className='semibold'>UV Index: </strong>
                    {uvi}
                  </div>
                </div>
                <div className='w-1/2 pl-2'>
                  <div>
                    <strong className='semibold'>Humidity: </strong>
                    {humidity}%
                  </div>
                  <div>
                    <strong className='semibold'>Wind: </strong>
                    {unit === 'imperial' ? wind_speed + ' mi/hr' : wind_speed + ' m/s'}
                  </div>
                </div>
              </div>
            </animated.div>
          ),
        )}
      </div>
    </div>
  );
}

export default Next7Days;
