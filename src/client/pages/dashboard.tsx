import Label from '@/components/Label';
import styled from 'styled-components';
import useGame from '@/hooks/useGame';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import QRCode from 'qrcode.react';

const DashboardPage: React.NextFunctionComponent = props => {
  const { orangeCount, blueCount, result } = useGame();

  return (
    <DashboardWrapper>
      <ResponsiveContainer height={450}>
        <LineChart
          data={result}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line
            type="monotone"
            dataKey="blue"
            stroke="#007aff"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="orange"
            stroke="#ff9559"
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 8,
            }}
          />
          <Line
            type="monotone"
            dataKey="black"
            stroke="#000000"
            strokeWidth={4}
            dot={false}
          />
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis dataKey="name" label={{ value: 'Seconds', dy: 12 }} />
          <YAxis label={{ dx: -10, value: 'Click(s)', angle: -90 }} />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
      <CounterContiner>
        <Col>
          <OrangeLabel>{orangeCount}</OrangeLabel>
        </Col>
        <Col>
          <BlueLabel>{blueCount}</BlueLabel>
        </Col>
      </CounterContiner>
      <CenterTextContiner>
        <Row>
          {'Please go to '}
          <a href={`http://${process.env.HOST_NAME}/client`}>
            {`http://${process.env.HOST_NAME}/client`}
          </a>
          {' to join the game.'}
        </Row>
        <Row>
          <QRCode value={`http://${process.env.HOST_NAME}/client`} size={180} />
        </Row>
      </CenterTextContiner>
    </DashboardWrapper>
  );
};

const Row = styled.div`
  margin-top: 10px;
`;

const CenterTextContiner = styled.div`
  text-align: center;
`;

const DashboardWrapper = styled.div`
  padding-top: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const CounterContiner = styled.div`
  display: flex;
`;

const Col = styled.div`
  flex: 0 0 50%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BlueLabel = styled(Label)`
  background-color: #007aff;
  flex: 0 0 70%;
`;

const OrangeLabel = styled(Label)`
  background-color: #ff9559;
  flex: 0 0 70%;
`;

export default DashboardPage;
