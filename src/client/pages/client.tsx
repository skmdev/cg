import styled from 'styled-components';
import BigButton from '@/components/BigButton';
import { useMutation } from '@apollo/react-hooks';
import { GAME_MUTATION } from '@/graphql/game';
import { ButtonType } from '@/enums/button';

const ClientPage: React.NextFunctionComponent = props => {
  const [buttonClick] = useMutation(GAME_MUTATION);

  const handleButtonClick = (type: ButtonType) => {
    buttonClick({ variables: { buttonClickInput: { type } } });
  };

  return (
    <div>
      <PanelWrapper>
        <Col>
          <OrangeBigButton onClick={() => handleButtonClick(ButtonType.Orange)}>
            -
          </OrangeBigButton>
        </Col>
        <Col>
          <BlueBigButton onClick={() => handleButtonClick(ButtonType.Blue)}>
            +
          </BlueBigButton>
        </Col>
      </PanelWrapper>
    </div>
  );
};

const PanelWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const Col = styled.div`
  flex: 0 0 50%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OrangeBigButton = styled(BigButton)`
  background-color: #ff9559;
`;
const BlueBigButton = styled(BigButton)`
  background-color: #007aff;
`;

export default ClientPage;
