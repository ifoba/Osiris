import { IMember } from "../../ifc/IMember";
import styled from "styled-components";
import { useAppDispatch } from "../../app/hooks";
import { deleteMember } from "../../features/Team/TeamSlice";
interface Props {
  info: IMember;
}

const Container = styled.div`
  width: 100%;
  padding: 0 0.5rem;
  margin-bottom: 0.5rem;
  position: relative;
  box-sizing: border-box;
  background-color: white;
  border-radius: 0.25rem;
  color: #6c757d !important;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
`;
const Title = styled.div`
  font-size: 1rem;
  text-align: center;
  padding-bottom: 1rem;
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
const DeleteIcon = styled.i`
  position: absolute;
  right: 2px;
  top: 2px;
  padding: .25rem;
  color: tomato;
  cursor: pointer;
`;
export default function Member({ info }: Props) {
  const dispatch = useAppDispatch();

  return (
    <Container>
      <Title>{info.name}</Title>
      <DeleteIcon
        onClick={() => {
          dispatch(deleteMember(info.id));
        }}
        className="fas fa-user-minus"
      ></DeleteIcon>
      <Warrior>
        <div>
          <WarriorIcon className="fas fa-horse-head"></WarriorIcon>{" "}
          <span>{info.warriors.cavalery}</span>
        </div>
        <div>
          <WarriorIcon className="fas fa-shield-alt"></WarriorIcon>
          {info.warriors.infantry}
        </div>
        <div>
          <WarriorIcon className="fas fa-location-arrow"></WarriorIcon>
          {info.warriors.archer}
        </div>
      </Warrior>
    </Container>
  );
}
