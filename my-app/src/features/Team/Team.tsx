import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled, { CSSProperties } from "styled-components";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import CreateMemberForm from "../../components/CreateMemberForm/CreateMemberForm";
import Member from "../../components/Member/Member";
import WarriorTotal from "../../components/WarriorTotal/WarriorTotal";
import { move, reorder } from "../../helpers/helpers";
import { IMember } from "../../ifc/IMember";
import { draggableStyleI } from "../../ifc/types";
import { setOrderA, setOrderB } from "./TeamSlice";

const TeamContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const getItemStyle = (
  isDragging: boolean,
  draggableStyle: draggableStyleI
): CSSProperties => {
  return {
    userSelect: "none",
    margin: ".25rem",
    filter: isDragging ? "opacity(0.7)" : "none",
    ...draggableStyle,
  };
};

const getListStyle = (isDraggingOver: boolean): CSSProperties => ({
  background: isDraggingOver ? "#6c757d17" : "#6c757d17",
  width: "45vw",
  textAlign: "center",
  padding: "1rem",
  margin: "1rem",
  borderRadius: ".5rem",
});
const flexJustify = (props: { justify: string }) => props.justify;
const Flex = styled.div`
  display: flex;
  justify-content: ${flexJustify};
  align-items: center;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
`;
const Icon = styled.i`
  opacity: 0.5;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem;
  color: #7a8289;
  &:hover {
    opacity: 1;
  }
`;

export default function Team() {
  const dispatch = useAppDispatch();
  const teamA = useAppSelector((state) => state.teams.teamA);
  const teamB = useAppSelector((state) => state.teams.teamB);
  const [formVisible, setFormVisivle] = useState(false);
  const [teamSelect, setTeamSelect] = useState("A");
  const showModal = (team: string) => {
    setFormVisivle(true);
    setTeamSelect(team);
  };
  const closeModal = () => {
    setFormVisivle(false);
  };
  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const list = source.droppableId === "droppable" ? teamA : teamB;
      const items: any = reorder(list, source.index, destination.index);
      source.droppableId === "droppable"
        ? dispatch(setOrderA(items))
        : dispatch(setOrderB(items));
    } else {
      const result =
        source.droppableId === "droppable"
          ? move(teamA, teamB, source, destination)
          : move(teamB, teamA, source, destination);
      dispatch(setOrderA(result.droppable));
      dispatch(setOrderB(result.droppable2));
    }
  };
  const summ = (arr: IMember[]) => {
    const cavalery = arr.map((el) => el.warriors.cavalery) || 0;
    const infantry = arr.map((el) => el.warriors.infantry) || 0;
    const archer = arr.map((el) => el.warriors.archer) || 0;

    return {
      cavalery: cavalery.length ? cavalery.reduce((acc, curr) => acc + curr) : 0,
      infantry: infantry.length ? infantry.reduce((acc, curr) => acc + curr) : 0,
      archer: archer.length ? archer.reduce((acc, curr) => acc + curr) : 0,
    };
  };

  return (
    <TeamContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              <Flex justify={"space-between"}>
                <span>Team A</span>
                <Icon
                  onClick={() => {
                    showModal("A");
                  }}
                  className="fas fa-user-plus"
                ></Icon>
              </Flex>
              <WarriorTotal {...summ(teamA)}></WarriorTotal>
              {teamA.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <Member info={item} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="droppable2">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              <Flex justify={"space-between"}>
                <span>Team B</span>
                <Icon
                  onClick={() => {
                    showModal("B");
                  }}
                  className="fas fa-user-plus"
                ></Icon>
              </Flex>
              <WarriorTotal {...summ(teamB)}></WarriorTotal>
              {teamB.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <Member info={item} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {formVisible ? (
        <CreateMemberForm team={teamSelect} close={closeModal} />
      ) : null}
    </TeamContainer>
  );
}
