import { styled } from '@/styles';

const SpinnerWrapper = styled('div', {
  display: 'inline-block',
  animation: 'spin 2s linear infinite',
});

const StyledSvg = styled('svg', {
  width: '20px',
  height: '20px',
  fill: 'none',
});

const StyledCircle = styled('circle', {
  cx: '12',
  cy: '12',
  r: '10',
  stroke: '#007FFF',
  strokeWidth: '3',
  strokeLinecap: 'round',
  strokeDasharray: '50 50',
  transformOrigin: 'center',
  animation: 'rotate 0.1s linear infinite',
});


export function Spinner() {
  return (
    <SpinnerWrapper>
      <StyledSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <StyledCircle />
      </StyledSvg>
    </SpinnerWrapper>
  );
}
