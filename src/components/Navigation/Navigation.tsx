import styled from "styled-components";
const Header = styled.header`
  display: flex;
  justify-content: space-evenly;
  padding: 0 2rem;
  background-color: #6c757d;
  background-image: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0)
  );
  color: #ffffff;
`;
const NavItem = styled.span`
  display: flex;
  justify-content: center;
  flex: 1 0 0;
  padding: 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color .2s ease-in;
  &:hover {
    background-color: #ffffff1c;
  }
`;
export default function Navigation() {
  return (
    <Header>
      <NavItem>Osiris</NavItem>
      <NavItem>Map</NavItem>
      <NavItem>Friends</NavItem>
      <NavItem>Another</NavItem>
      <NavItem>Profile</NavItem>
    </Header>
  );
}
