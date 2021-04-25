import { useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addMemberA, addMemberB } from "../../features/Team/TeamSlice";
import generateId from "../../helpers/generateId";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #00000038;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 0.25rem;
`;
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  text-align: center;
  font-size: 1.3rem;
  color: #7a8289;
  border-bottom: 1px solid #7a828980;
`;
const Input = styled.input`
  outline: none;
  border: 1px solid #7a828980;
  border-radius: 0.25rem;
  padding: 0.5rem;
`;
const Label = styled.label`
  color: #7a8289;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const FormBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 2rem;
`;
const Button = styled.button`
  margin-top: 1rem;
  background-color: #7a8289;
  padding: 0.5rem;
  border: none;
  outline: none;
  color: #ffffff;
  border-radius: 0.25rem;
  cursor: pointer;
  opacity: 0.9;
  transition: all 0.2s ease-in;
  &:hover {
    opacity: 1;
  }
`;
const CloseIcon = styled.i`
  cursor: pointer;
  font-size: 1rem;
`;

interface PropsI {
  team: string;
  close: Function;
}

export default function CreateMemberForm({ team, close }: PropsI) {
  const dispatch = useAppDispatch();
  const teamA = useAppSelector((state) => state.teams.teamA);
  const teamB = useAppSelector((state) => state.teams.teamB);
  const [username, setUsername] = useState("");
  const [cavalery, setCavalery] = useState(0);
  const [infantry, setInfantry] = useState(0);
  const [archers, setArchers] = useState(0);

  const addMember = () => {
    close(false);
    dispatch(
      team === "A"
        ? addMemberA({
            name: username,
            power: 0,
            warriors: {
              archer: archers,
              infantry: infantry,
              cavalery: cavalery,
            },
            group: "A",
            id: generateId(teamA.concat(teamB)),
          })
        : addMemberB({
            name: username,
            power: 0,
            warriors: {
              archer: archers,
              infantry: infantry,
              cavalery: cavalery,
            },
            group: "B",
            id: generateId(teamA.concat(teamB)),
          })
    );
  };
  return (
    <Container>
      <Form>
        <Title>
          <span>Create member</span>{" "}
          <CloseIcon
            onClick={() => {
              close();
            }}
            className="fas fa-times"
          ></CloseIcon>
        </Title>
        <FormBody>
          <InputContainer>
            <Label htmlFor="username">Username</Label>
            <Input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
              name="username"
              type="text"
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="cavalery">Cavalery</Label>
            <Input
              onChange={(e) => {
                if (+e.target.value) {
                  setCavalery(+e.target.value);
                } else setCavalery(0);
              }}
              value={cavalery}
              name="cavalery"
              type="text"
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="infantry">Infantry</Label>
            <Input
              onChange={(e) => {
                if (+e.target.value) {
                  setInfantry(+e.target.value);
                } else setInfantry(0);
              }}
              value={infantry}
              name="infantry"
              type="text"
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="archers">Archers</Label>
            <Input
              onChange={(e) => {
                if (+e.target.value) {
                  setArchers(+e.target.value);
                } else setArchers(0);
              }}
              value={archers}
              name="archers"
              type="text"
            />
          </InputContainer>
          <Button onClick={addMember}>Create</Button>
        </FormBody>
      </Form>
    </Container>
  );
}
