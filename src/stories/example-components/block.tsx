import styled from "react-emotion";

export const Block = styled("div")`
  padding: 8px;
  background: ${(props: { color: string }) => props.color};
  min-height: 64px;
  min-width: 64px;
  display: flex;
  flex-direction: row;
`;
