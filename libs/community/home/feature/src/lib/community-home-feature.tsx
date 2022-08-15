import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface CommunityHomeFeatureProps {}

const StyledCommunityHomeFeature = styled.div`
  color: pink;
`;

export function CommunityHomeFeature(props: CommunityHomeFeatureProps) {
  return (
    <StyledCommunityHomeFeature>
      <h1>Welcome to CommunityHomeFeature!</h1>
    </StyledCommunityHomeFeature>
  );
}

export default CommunityHomeFeature;
