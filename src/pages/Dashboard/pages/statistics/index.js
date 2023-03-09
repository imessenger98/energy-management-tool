/* eslint-disable */
import React, { useEffect } from 'react';
import {
  Card, Col, Row,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  UserOutlined,
  UserDeleteOutlined,
  KeyOutlined,
  PoundCircleOutlined,
} from '@ant-design/icons';
import styles from './graph.module.css';
import { listStatistics } from '../../../../features/auth/action';
import PieGraph from './graph/pieGraph';
import LineGraph from './graph/lineGraph';
import BarGraph from './graph/barGraph';
import LineGraph2 from './graph/lineGraph2';

function Statistics() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listStatistics());
  }, []);
  const auth = useSelector((state) => state.auth);
  const {
    statisticsData,
    isStatisticsLoading,
  } = auth;
  const {
    totalWalletBalance, totalUsers, disabledUsers,
    totalsPaidAndUnPaid, evcLeft,
    graph1pie,
    graph2pie,
    graph3,
    graph4,
    graph5,
  } = statisticsData || {};

  const return2DecimalPlaces = (num) => (Math.round(num * 100) / 100).toFixed(2);
  return (
    <div
      className={styles.addMargin}
    >
      <h1
        className={styles.h1Heading}
      >
        Statistics
      </h1>
      <Row gutter={16} className={styles.addMargin}>
        <Col
          xs={24}
          md={8}
          className={styles.addMargin}
        >
          <Card
            loading={isStatisticsLoading}
            title="Total Users"
            bordered={false}
          >
            <h1>
              <UserOutlined />
            &nbsp;
              {totalUsers}
            </h1>
          </Card>
        </Col>
        <Col
          xs={24}
          md={8}
          className={styles.addMargin}
        >
          <Card
            loading={isStatisticsLoading}
            title="User Disabled"
            bordered={false}
          >
            <h1>
              {disabledUsers}
              &nbsp;
              <UserDeleteOutlined />
            </h1>
          </Card>
        </Col>
        <Col
          xs={24}
          md={8}
          className={styles.addMargin}
        >
          <Card
            loading={isStatisticsLoading}
            title="Energy Vouchers Left"
            bordered={false}
          >
            <h1>
              <KeyOutlined />
            &nbsp;
              {evcLeft}
            </h1>

          </Card>
        </Col>
        <Col
          xs={24}
          md={8}
          className={styles.addMargin}
        >
          <Card
            loading={isStatisticsLoading}
            title="Users Total Wallet Balance"
            bordered={false}
          >
            <h1>
              <PoundCircleOutlined />
              &nbsp;
              {return2DecimalPlaces(totalWalletBalance)}

            </h1>
          </Card>
        </Col>
        <Col
          xs={24}
          md={8}
          className={styles.addMargin}
        >
          <Card
            loading={isStatisticsLoading}
            title="Total Paid BIlls"
            bordered={false}
          >
            <h1>
              {' '}
              <PoundCircleOutlined />
              &nbsp;
              {return2DecimalPlaces(totalsPaidAndUnPaid?.paid)}

            </h1>
          </Card>
        </Col>
        <Col
          xs={24}
          md={8}
          className={styles.addMargin}
        >
          <Card
            loading={isStatisticsLoading}
            title="Total Unpaid Bills"
            bordered={false}
          >
            <h1>
              {' '}
              <PoundCircleOutlined />
              &nbsp;
              {return2DecimalPlaces(totalsPaidAndUnPaid?.unpaid)}

            </h1>
          </Card>
        </Col>
        <Col
            xs={24}
            md={12}
            className={styles.addMargin}
          >
            <Card
              loading={isStatisticsLoading}
              title="Recharges per month"
              bordered={false}
            >
              {graph3 && (
              <LineGraph2
                data={graph3}
              />
              )}
            </Card>
          </Col>
        <Col
          xs={24}
          md={12}
          className={styles.addMargin}
        >
          <Card
            loading={isStatisticsLoading}
            title="Usage per month"
            bordered={false}
          >
            {graph4 && (
            <LineGraph
              data={graph4}
            />
            )}
          </Card>
        </Col>
        <Col
          xs={24}
          md={8}
          className={styles.addMargin}
        >
          <Card
            loading={isStatisticsLoading}
            title="User Property Types"
            bordered={false}
          >
            {
            graph1pie && (
            <PieGraph
              data={graph1pie}
            />
            )
           }
          </Card>
        </Col>
        <Col
          xs={24}
          md={8}
          className={styles.addMargin}
        >
          <Card
            loading={isStatisticsLoading}
            title="Top  Usages per User"
            bordered={false}
          >
            { graph5 && (
            <BarGraph
              data={graph5}
            />
            )}
          </Card>
        </Col>
        <Col
          xs={24}
          md={8}
          className={styles.addMargin}
        >
          <Card
            loading={isStatisticsLoading}
            title="User Bed Room Count"
            bordered={false}
          >
            {graph2pie && (
            <PieGraph
              data={graph2pie}
            />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Statistics;
