/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Pie } from '@ant-design/plots';

export default function PieGraph(props) {
  const { data } = props;

  const config = {
    appendPadding: 10,
    data,
    xField: 'action',
    yField: 'pv',
    angleField: 'value',
    colorField: 'type',
    radius: 1.0,
    autoFit: true,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  return (
    <Pie {...config} />
  );
}
