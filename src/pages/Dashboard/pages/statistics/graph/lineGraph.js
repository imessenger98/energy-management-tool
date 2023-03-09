/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Line } from '@ant-design/plots';

function LineGraph(props) {
  const { data } = props;

  const config = {
    data,
    xField: 'month',
    yField: 'usage',
    seriesField: 'type',
    legend: {
      position: 'top',
    },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
  };

  return <Line {...config} />;
}

export default LineGraph;
