import React, { useEffect, useState } from "react";
import InputCus from "../../Components/InputCus";
import ButtonCs from "../../Components/ButtonCs";
import { toast, ToastContainer } from "react-toastify";
import { IoCloseSharp } from "react-icons/io5";
import TopHeading from "../../Components/TopHeading";
interface ExpenseTrack {
  name: string;
  amount: number;
  isincome: boolean;
}
interface IncomeTracker {
  income: number;
}

const TrackerApp: React.FC = () => {
  const Tracker: string = "ExpenseTracker";
  const [expenses, setExpenses] = React.useState<ExpenseTrack[]>([]);
  const [income, setIncome] = React.useState<IncomeTracker>({ income: 0 });
  const [expensetracker, setExpensetracker] = React.useState<ExpenseTrack>({
    name: "",
    amount: 0,
    isincome: false,
  });
  const [remaintrack, setRemaintrack] = useState({
    remain: 0,
    expense: 0,
  });
  const [addexpense, setAddexpense] = useState<boolean>(false);
  const [addincomeis, setAddincomeis] = useState<boolean>(true);

  const handlenamechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpensetracker({ ...expensetracker, name: e.target.value });
  };
  const handleamountchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpensetracker({ ...expensetracker, amount: parseInt(e.target.value) });
  };

  useEffect(() => {
    const store = localStorage.getItem(Tracker);
    if (store) {
      const data: [ExpenseTrack] = JSON.parse(store);
      setExpenses(data);
      const isadminamoount = data
        .filter((item) => item.isincome)
        .map((item) => item.amount);
      const isadminamoountsum = isadminamoount.reduce((a, b) => a + b, 0);
      setIncome({
        income: isadminamoountsum,
      });
      const isexpenseamoount = data
        .filter((item) => item.isincome == false)
        .map((item) => item.amount);
      const isexpenseamoountsum = isexpenseamoount.reduce((a, b) => a + b, 0);
      setRemaintrack({
        remain: isadminamoountsum - isexpenseamoountsum,
        expense: isexpenseamoountsum,
      });
    }
  }, []);
  const handleaddexpense = () => {
    if (expensetracker.name != "" && expensetracker.amount > 0) {
      setExpenses([...expenses, expensetracker]);
      setRemaintrack({
        remain: remaintrack.remain - expensetracker.amount,
        expense: remaintrack.expense + expensetracker.amount,
      });
      const store = localStorage.getItem(Tracker);
      const newStore = store
        ? [...JSON.parse(store), expensetracker]
        : [expensetracker];
      localStorage.setItem(Tracker, JSON.stringify(newStore));
      setExpensetracker({ name: "", amount: 0, isincome: false });
    } else {
      toast.error(
        "Please fill all the fields and ensure you have enough money to spend"
      );
    }
    setExpensetracker({
      name: "",
      amount: 0,
      isincome: false,
    });
  };

  const handledelete = (index: number) => {
    if (expenses[index].isincome) {
      setIncome({ ...income, income: income.income - expenses[index].amount });
      setRemaintrack({
        remain: remaintrack.remain - expenses[index].amount,
        expense: remaintrack.expense,
      });
    } else {
      setRemaintrack({
        remain: remaintrack.remain + expenses[index].amount,
        expense: remaintrack.expense - expenses[index].amount,
      });
    }

    const newexpense = expenses.filter((_, i) => i !== index);
    localStorage.setItem(Tracker, JSON.stringify(newexpense));
    setExpenses(newexpense);
  };

  const handleaddincome = () => {
    const addincome = {
      name: expensetracker.name,
      amount: expensetracker.amount,
      isincome: true,
    };
    if (expensetracker.amount > 0) {
      setIncome({
        income: income.income + expensetracker.amount,
      });
      setRemaintrack({
        remain: remaintrack.remain + expensetracker.amount,
        expense: remaintrack.expense,
      });
      setExpenses([...expenses, addincome]);
    }
    const store = localStorage.getItem(Tracker);
    const newStore = store ? [...JSON.parse(store), addincome] : [addincome];
    localStorage.setItem(Tracker, JSON.stringify(newStore));
    setExpensetracker({
      name: "",
      amount: 0,
      isincome: false,
    });
  };

  return (
    <>
      <div className="w-full min-h-[88vh  absolute top-17">
        <TopHeading name="Expense Tracker" />
        <div className="flex justify-center items-center flex-col my-2">
          <h5 className="text-2xl font-semibold text_style capitalize">your Income </h5>
          <p className="text-3xl font-bold text-green-500">
            {" "}
            ₹ {income.income}{" "}
          </p>
        </div>
        <div className="flex lg:justify-center gap-3 justify-between ">
          <div className="w-42 h-24  p-2  border-2 flex justify-center gap-3  flex-col ">
            <h5 className="text-center text_style font-medium text-lg">
              Remain balance
            </h5>
            <p
              className={` ${
                remaintrack.remain < 0 ? "text-red-400" : "text-green-400 "
              }  text-center font-semibold text-2xl`}
            >
              ₹{remaintrack.remain}
            </p>
          </div>
          <div className="w-42 h-24  p-2  border-2 flex justify-center gap-3  flex-col ">
            <h5 className="text-center text_style font-medium text-lg">
              Expense balance
            </h5>
            <p className="text-center text-red-400 font-semibold text-2xl">
              ₹ {remaintrack.expense > 0 && "-"}
              {remaintrack.expense}
            </p>
          </div>
        </div>

        <div className=" flex justify-center my-3 ">
          <table className="lg:w-[60vw] w-full lg:mx-0 mx-2 border border-blac    k">
            <thead>
              <tr className="text_style capitalize">
                <th className="border-2 border-gray-400 p-2">id</th>
                <th className="border-2 border-gray-400 p-2">text</th>
                <th className="border-2 border-gray-400 p-2">Amount</th>
                <th className="border-2 border-gray-400 p-2">Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {expenses.length > 0 ? (
                expenses?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="border-2 border-gray-400 p-2 text_style">
                        {index + 1}
                      </td>
                      <td className="border-2 border-gray-400  text_style p-2 capitalize">
                        {item.name}
                      </td>
                      <td
                        className={`border-2 border-gray-400 font-semibold p-2 ${
                          item.isincome ? "text-green-400" : "text-red-500"
                        } `}
                      >
                        ₹{item.isincome ? "+" : "-"}
                        {item.amount}
                      </td>
                      <td className="border-2 border-gray-400 p-2">
                        <button
                          className="bg-red-500 px-3 py-2 rounded-md text-white font-medium hover:bg-red-700 transition-all duration-200"
                          onClick={() => handledelete(index)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <div>
                  <p className="text-center text-red-400 font-semibold text-2xl">
                    No Data
                  </p>
                </div>
              )}
            </tbody>
          </table>
        </div>
        <div className="my-1 flex justify-around">
          <ButtonCs
            name="add expense"
            onclick={() => {
              setAddincomeis(false);
              setAddexpense(!addexpense);
            }}
          />
          <ButtonCs
            name="add income"
            onclick={() => {
              setAddexpense(false);
              setAddincomeis(!addincomeis);
            }}
          />
        </div>

        {addexpense && (
          <div className="my-2 flex justify-center">
            <div className="w-90 p-4 card_style relative shadow-2xl  rounded-2xl">
              <h1 className="text-3xl text-center font-semibold my-2 text_style">
                Add Expense
              </h1>
              <div
                onClick={() => setAddexpense(false)}
                className="absolute text-3xl cursor-pointer p-1 top-5 right-5 rounded-full btn_style"
              >
                <IoCloseSharp />
              </div>
              <div className="my-2">
                <label
                  htmlFor="text"
                  className="text-base text_style font-semibold"
                >
                  Expense Name:-
                </label>
                <InputCus
                  type={"text"}
                  id={"text"}
                  placeholder={"Enter your name"}
                  value={expensetracker.name}
                  onChange={handlenamechange}
                />
              </div>
              <div className="my-2">
                <label
                  htmlFor="amount"
                  className="text-base text_style font-semibold"
                >
                  Amount:-
                </label>
                <InputCus
                  type={"number"}
                  id={"amount"}
                  placeholder={"Enter amount"}
                  value={expensetracker.amount}
                  onChange={handleamountchange}
                />
              </div>
              <div className="flex justify-center mt-4">
                <ButtonCs name="add Expense" onclick={handleaddexpense} />
              </div>
            </div>
          </div>
        )}
        {addincomeis && (
          <div className="my-2 flex justify-center">
            <div className="w-90 p-4  relative card_style shadow-2xl  rounded-2xl">
              <h1 className="text-3xl text-center text_style font-semibold my-2">
                Add Income
              </h1>
              <div
                onClick={() => setAddincomeis(false)}
                className="absolute cursor-pointer text-3xl p-1 top-5 right-5 rounded-full  btn_style "
              >
                <IoCloseSharp />
              </div>
              <div className="my-2">
                <label
                  htmlFor="text"
                  className="text-base text_style font-semibold"
                >
                  Income Name:-
                </label>
                <InputCus
                  type={"text"}
                  id={"text"}
                  placeholder={"Enter your name"}
                  value={expensetracker.name}
                  onChange={handlenamechange}
                />
              </div>
              <div className="my-2">
                <label
                  htmlFor="amount"
                  className="text-base text_style font-semibold"
                >
                  Income:-
                </label>
                <InputCus
                  type={"number"}
                  id={"amount"}
                  placeholder={"Enter amount"}
                  value={expensetracker.amount}
                  onChange={handleamountchange}
                />
              </div>
              <div className="flex justify-center mt-4">
                <ButtonCs name="add income" onclick={handleaddincome} />
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default TrackerApp;
