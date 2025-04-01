import { useState } from "react";
import TopHeading from "../../Components/TopHeading";

import { IoMdBackspace } from "react-icons/io";
const CalculatorApp = () => {
  const [inputstate, setInputstate] = useState<string>("");

  const handleinputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputstate(e.target.value);
  };

  const handleclick = (btn: string) => {
    if (btn == "=") {
      try {
        setInputstate(eval(inputstate).toString());
      } catch {
        
        setInputstate("Error");
      }
    } else if (btn == "X") {
      if (inputstate == "Error") {
        setInputstate("");
      } 
      else if (inputstate == "Infinity") {
        setInputstate("");
      } else {
        setInputstate(inputstate.slice(0, -1));
      }
    } else if(btn == 'x'){
      setInputstate((prev)=> prev+'*')
    }
    else if (btn == "C") {
      setInputstate("");
    } else {
      setInputstate((prev) => prev + btn);
    }
  };
  return (
    <div>
      <TopHeading name="Calculator App" />
      <div className="lg:w-3/12 w-auto shadow-2xl lg:h-auto h-auto mx-5 card_style my-3 border lg:mx-auto flex flex-col gap-6 p-4 rounded-xl">
        <input
          type="text"
          value={inputstate}
          onChange={handleinputchange}
          disabled
          className="text-3xl px-2 py-2 h-20 border outline-none rounded-2xl card_style font-semibold w-full"
        />
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 justify-between">
            {["C", "%"].map((btn) => (
              <button
                key={btn}
                onClick={() => handleclick(btn)}
                className="calcul_btn numb  text-xl px-6 py-4 rounded-full "
              >
                {btn}
              </button>
            ))}
            <button
              onClick={() => handleclick("X")}
              className="calcul_btn numb  text-3xl flex justify-center px-4 py-4 rounded-full"
            >
              <IoMdBackspace />
            </button>
            {["/"].map((btn) => (
              <button
                key={btn}
                onClick={() => handleclick(btn)}
                className="calcul_btn numb  text-xl px-6 py-4 rounded-full "
              >
                {btn}
              </button>
            ))}
          </div>
          <div className="flex gap-2 justify-between">
            {["7", "8", "9", "x"].map((btn) => (
              <button
                key={btn}
                onClick={() => handleclick(btn)}
                className="calcul_btn numb  text-xl px-6 py-4 rounded-full "
              >
                {btn}
              </button>
            ))}
          </div>
          <div className="flex gap-2 justify-between">
            {["4", "5", "6", "-"].map((btn) => (
              <button
                key={btn}
                onClick={() => handleclick(btn)}
                className="calcul_btn numb  text-xl px-6 py-4 rounded-full "
              >
                {btn}
              </button>
            ))}
          </div>
          <div className="flex gap-2 justify-between">
            {["1", "2", "3", "+"].map((btn) => (
              <button
                key={btn}
                onClick={() => handleclick(btn)}
                className="calcul_btn numb  text-xl px-6 py-4 rounded-full "
              >
                {btn}
              </button>
            ))}
          </div>
          <div className="flex gap-2 justify-between">
          <button
                onClick={() => handleclick('00')}
                className="calcul_btn numb  text-xl px-5 py-4 rounded-full"
              >
                00
              </button>
            {["0", ".", "="].map((btn) => (
              <button
                key={btn}
                onClick={() => handleclick(btn)}
                className="calcul_btn numb  text-xl px-6 py-4 rounded-full "
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorApp;
