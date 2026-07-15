import { useState } from "react";
import { EmptyQuizez } from "./components/emptyQuizes";
import Header from "./components/header.tsx";

export function App() {
  const [setsOfQuestions, setSetsOfQuestions] = useState(() => {
    const saved = localStorage.getItem("setsOfQuestions");
    return saved ? JSON.parse(saved) : [];
  });

  return (
    <>
      <Header />
      {setsOfQuestions.length > 0 ? <div>aaa</div> : <EmptyQuizez />};
    </>
  );
}

export default App;
