import { render } from '@testing-library/react';
import User from '..';

describe('User component test suite', () => {
  it('should render letter avatar', () => {
    const { asFragment } = render(
      <User
        name="José da Silva"
        email="jose@teste.com.br"
        mobilePhone="51 99145221"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render image avatar', () => {
    const { asFragment } = render(
      <User
        name="José da Silva"
        email="jose@teste.com.br"
        mobilePhone="51 99145221"
        photoUrl="photo.png"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
