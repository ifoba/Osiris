import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchCount } from "./counterAPI";
import { IMember } from "../../ifc/IMember";

export interface CounterState {
  value: number;
  status: "idle" | "loading" | "failed";
  teamA: IMember[];
  teamB: IMember[];
}

const initialState: CounterState = {
  value: 0,
  status: "idle",
  teamA: [],
  teamB: [],
};

export const incrementAsync = createAsyncThunk(
  "counter/fetchCount",
  async (amount: number) => {
    const response = await fetchCount(amount);
    return response.data;
  }
);

export const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    setOrderA: (state, action: PayloadAction<IMember[]>) => {
      state.teamA = action.payload;
      localStorage.setItem("teamA", JSON.stringify(state.teamA));
    },
    setOrderB: (state, action: PayloadAction<IMember[]>) => {
      state.teamB = action.payload;
      localStorage.setItem("teamB", JSON.stringify(state.teamB));
    },
    addMemberA: (state, action: PayloadAction<IMember>) => {
      state.teamA.push(action.payload);
      localStorage.setItem("teamA", JSON.stringify(state.teamA));
    },
    addMemberB: (state, action: PayloadAction<IMember>) => {
      state.teamB.push(action.payload);
      localStorage.setItem("teamB", JSON.stringify(state.teamB));
    },
    deleteMember: (state, action: PayloadAction<string>) => {
      state.teamA = state.teamA.filter((el) => el.id !== action.payload);
      state.teamB = state.teamB.filter((el) => el.id !== action.payload);
      localStorage.setItem("teamA", JSON.stringify(state.teamA));
      localStorage.setItem("teamB", JSON.stringify(state.teamB));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value += action.payload;
      });
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  setOrderA,
  setOrderB,
  addMemberA,
  addMemberB,
  deleteMember,
} = teamsSlice.actions;

export const selectTeamA = (state: RootState) => state.teams.teamA;
export const selectTeamB = (state: RootState) => state.teams.teamB;

export default teamsSlice.reducer;
