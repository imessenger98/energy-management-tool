/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Column } from '@ant-design/plots';

function BarGraph(props) {
  const { data } = props;

  const config = {
    data,
    xField: 'username',
    yField: 'amount',
    columnWidthRatio: 0.6,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: true,
      },
    },
  };
  return <Column {...config} />;
}

export default BarGraph;
