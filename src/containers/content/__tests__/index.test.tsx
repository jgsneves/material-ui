import { render } from '@testing-library/react';
import ContentContainer from '..';

describe('Content Container test suite', () => {
  it('should render proper snapshot', () => {
    const { asFragment } = render(
      <ContentContainer>
        <h3>olá!</h3>
      </ContentContainer>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
