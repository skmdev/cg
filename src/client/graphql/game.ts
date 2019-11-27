import gql from 'graphql-tag';

export const GAME_SUBSCRIPTION = gql`
  subscription {
    buttonClicked {
      type
      timestamp
    }
  }
`;

export const GAME_MUTATION = gql`
  mutation($buttonClickInput: ButtonClickInput) {
    buttonClick(buttonClickInput: $buttonClickInput) {
      type
    }
  }
`;
