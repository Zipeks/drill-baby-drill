import DialogCloseQuiz from "./Dialogs/DialogCloseQuiz";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@base-ui/react";

interface Props {
  onHandleCloseQuiz: () => void;
  isQuizActive: boolean;
}

export default function Header({ onHandleCloseQuiz, isQuizActive }: Props) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row justify-between">
      {isQuizActive ? (
        <DialogCloseQuiz
          onHandleCloseQuiz={onHandleCloseQuiz}
          customTrigger={
            <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight sm:text-3xl cursor-pointer">
              Drill baby drill
            </h1>
          }
        ></DialogCloseQuiz>
      ) : (
        <h1
          className="scroll-m-24 text-3xl font-semibold tracking-tight sm:text-3xl cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          Drill baby drill
        </h1>
      )}
      <div className="flex items-center gap-4">
        <Button onClick={() => {navigate("/")}}>
          Home
        </Button>
        <Button onClick={() => {
          navigate("/fileformat")
        }}>
          File format
        </Button>
        <Button onClick={() => {
          open("https://github.com/Zipeks/drill-baby-drill")
        }}>
          Source
        </Button>
        

        <ThemeToggle />
      </div>
    </div>
  );
}
