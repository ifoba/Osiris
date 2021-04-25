import Team from "./features/Team/Team";
import Navigation from "./components/Navigation/Navigation";
import styles from "./App.module.css";
import { useEffect } from "react";
import { useAppDispatch} from "./app/hooks";
import { setOrderA, setOrderB } from "./features/Team/TeamSlice";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const teamA = localStorage.getItem("teamA");
    if (teamA) dispatch(setOrderA(JSON.parse(teamA)));
    const teamB = localStorage.getItem("teamB");
    if (teamB) dispatch(setOrderB(JSON.parse(teamB)));
  });

  return (
    <div className={styles.App}>
      <Navigation />
      <div className={styles["teams__container"]}>
        <Team />
      </div>
    </div>
  );
}

export default App;
