import styled from "styled-components";
import { IWarriors } from "../../ifc/IMember";

const Container = styled.div`
  width: 100%;
  padding: 0 0.5rem;
  background-color: #777f87;
  color: white;
  box-sizing: border-box;
  border-radius: 0.25rem;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
`;
const Warrior = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;
const WarriorIcon = styled.i`
  padding-right: 0.5rem;
`;
export default function WarriorTotal({...info}:IWarriors) {
  return (
    <Container>
      <Warrior>
        <div>
          <WarriorIcon className="fas fa-horse-head"></WarriorIcon>{" "}
          <span>{info.cavalery}</span>
        </div>
        <div>
          <WarriorIcon className="fas fa-shield-alt"></WarriorIcon>
          {info.infantry}
        </div>
        <div>
          <WarriorIcon className="fas fa-location-arrow"></WarriorIcon>
          {info.archer}
        </div>
      </Warrior>
    </Container>
  );
}
