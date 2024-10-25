"use client";

import {useState} from "react";
import {Minus, Plus} from "lucide-react";
import Swal from "sweetalert2";

import {Button} from "@/components/ui/button";

export default function TrucoCounter() {
  const [counter, setCounter] = useState(0);
  const [secondCont, setSecondCont] = useState(0);

  const [ourBuenas, setOurBuenas] = useState<boolean>(false);
  const [theyBuenas, setTheyBuenas] = useState<boolean>(false);

  const [win, setWin] = useState<boolean | null>(null);

  const handleOurSum = () => {
    setCounter((prev) => {
      const newValue = prev + 1;

      if (newValue >= 15 && !ourBuenas) {
        setOurBuenas(true);
      }

      return newValue;
    });
    checkWinner();
  };

  const handleOurRest = () => {
    if (counter > 0) {
      setCounter((prev) => prev - 1);
      if (counter - 1 < 15 && ourBuenas) {
        setOurBuenas(false);
      }
    }
  };

  const handleTheySum = () => {
    setSecondCont((prev) => {
      const newValue = prev + 1;

      if (newValue >= 15 && !theyBuenas) {
        setTheyBuenas(true);
      }

      return newValue;
    });
    checkWinner();
  };

  const handleTheyRestar = () => {
    if (secondCont > 0) {
      setSecondCont((prev) => prev - 1);
      if (secondCont - 1 < 15 && theyBuenas) {
        setTheyBuenas(false);
      }
    }
  };

  const resetGame = () => {
    setCounter(0);
    setSecondCont(0);
    setOurBuenas(false);
    setTheyBuenas(false);
  };

  const checkWinner = () => {
    if (win === null) {
      if (counter === 29) {
        setWin(true);
        Swal.fire({
          title: `¡Ganaron Nosotros!`,
          icon: "success",
          confirmButtonText: "Reiniciar",
        }).then(() => {
          resetGame();
          setWin(null);
        });
      } else if (secondCont === 29) {
        setWin(false);
        Swal.fire({
          title: `¡Ganaron Ellos!`,
          icon: "success",
          confirmButtonText: "Reiniciar",
        }).then(() => {
          resetGame();
          setWin(null);
        });
      }
    }
  };

  return (
    <div className="flex  flex-col items-center ">
      <section className="grid w-3/4 grid-cols-2 divide-x divide-gray-500 border border-gray-400 bg-black p-8 text-center text-white">
        {/* Nosotros */}
        <div>
          <h1 className="mb-4 text-5xl font-bold text-orange-500">NOS</h1>
          <hr className="mx-auto my-4 w-3/4 border-t-2 border-gray-500" />{" "}
          <p className="text-2xl text-orange-500">{ourBuenas ? "BUENAS" : "MALAS"}</p>
          <p className="font-mono text-9xl text-orange-500">{counter}</p>
          <div className="mt-4 flex justify-center gap-4">
            <Button className="text-3xl" onClick={handleOurSum}>
              <Plus />
            </Button>
            <Button className="text-3xl" onClick={handleOurRest}>
              <Minus />
            </Button>
          </div>
        </div>

        {/* Ellos */}
        <div>
          <h1 className="mb-4 text-5xl font-bold text-orange-500">ELLOS</h1>
          <hr className="mx-auto my-4 w-3/4 border-t-2 border-gray-500" />{" "}
          <p className="text-xl text-orange-500">{theyBuenas ? "BUENAS" : "MALAS"}</p>
          <p className="font-mono text-9xl text-orange-500 ">{secondCont}</p>
          <div className="mt-4 flex justify-center gap-4">
            <Button className="text-3xl" onClick={handleTheySum}>
              <Plus />
            </Button>
            <Button className="text-3xl" onClick={handleTheyRestar}>
              <Minus />
            </Button>
          </div>
        </div>
      </section>

      {/* Botón de reiniciar */}
      <Button
        className=" mt-8 border border-orange-500 px-4 py-2 text-2xl text-orange-500"
        onClick={resetGame}
      >
        RESTART
      </Button>
    </div>
  );
}
