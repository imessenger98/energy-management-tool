/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Line } from '@ant-design/plots';

function LineGraph2(props) {
  const { data } = props;

  const config = {
    data,
    padding: 'auto',
    xField: 'total',
    yField: 'month',
    xAxis: {
      tickCount: 5,
    },
    slider: {
      start: 0.1,
      end: 0.5,
    },
  };
  return <Line {...config} />;
}

export default LineGraph2;
