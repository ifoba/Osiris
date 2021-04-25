import { IMember } from "../ifc/IMember";

export default function GenerateId(team: IMember[]) {
  const id: number[] = team.map((el) => +el.id);
  return String(team.length ? id.sort((a, b) => a - b)[id.length - 1] + 1 : 0);
}
