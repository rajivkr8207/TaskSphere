import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import InputCus from "../../Components/InputCus";
import ButtonCs from "../../Components/ButtonCs";
import Editor, {
  BtnBold,
  BtnItalic,
  BtnRedo,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  ContentEditableEvent,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { useNavigate } from "react-router-dom";

interface Notes {
  id: number;
  title: string;
  description: string;
  create_date: Date;
  update_date: Date;
  ispin: boolean;
  ispinid?: number;
}
const NoteEdit: React.FC = () => {
  const { id } = useParams();
  const [addnotes, setAddnotes] = useState<Notes>({
    id: 0,
    title: "",
    description: "",
    create_date: new Date(),
    update_date: new Date(),
    ispin: false,
    ispinid: 0,
  });
  const navigate = useNavigate();
  useEffect(() => {
    const notes = localStorage.getItem("notepad");
    if (notes) {
      const allnotes = JSON.parse(notes);
      const note = allnotes.find((item: Notes) => item.id === Number(id));
      setAddnotes({
        id: note.id,
        title: note.title,
        description: note.description,
        create_date: note.create_date,
        update_date: note.update_date,
        ispin: note.ispin,
        ispinid: note.ispinid,
      });
    }
  
  }, [id]);
  const handletitlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddnotes({
      ...addnotes,
      title: e.target.value,
    });
  };

  const handledeschange = (e: ContentEditableEvent) => {
    setAddnotes({
      ...addnotes,
      description: e.target.value,
    });
  };
  const handlesubmit = () => {
    const updatenote = {
        id: addnotes.id,
        title: addnotes.title.trim(),
        description: addnotes.description,
        create_date: addnotes.create_date,
        update_date: new Date(),
        ispin: addnotes.ispin,
        ispinid: addnotes.ispinid,
    }
    const allnotes = localStorage.getItem("notepad");
    const allnoteslg = allnotes ? JSON.parse(allnotes) : [];
    const newnotes = allnoteslg.map((item: Notes) => {
        if (item.id === addnotes.id) {
            return updatenote;
        }
        return item;
        });
    localStorage.setItem("notepad", JSON.stringify(newnotes));
    navigate('/notepad');
  }
  return (
    <>
      <div className="">
        <div className="my-2 flex justify-center">
          <div className="lg:w-8/12 w-12/12 lg:p-4 p-2 card_style relative shadow-2xl  rounded-2xl">
            <h1 className="text-3xl text-center font-semibold my-2 text_style">
              Add Note
            </h1>
            <div
              onClick={() => {
                navigate("/notepad");
              }}
              className="absolute text-3xl cursor-pointer p-1 top-5 right-5 rounded-full btn_style"
            >
              <IoCloseSharp />
            </div>
            <div className="my-2">
              <label
                htmlFor="text"
                className="text-base text_style font-semibold"
              >
                Title:-
              </label>
              <InputCus
                type={"text"}
                id={"text"}
                placeholder={"Enter Title.. "}
                value={addnotes.title}
                onChange={handletitlechange}
              />
            </div>
            <div className="my-2">
              <Editor
                containerProps={{ style: { resize: "vertical" } }}
                value={addnotes.description}
                onChange={handledeschange}
              >
                <Toolbar>
                  <BtnUndo />
                  <BtnRedo />
                  <Separator />
                  <BtnBold />
                  <BtnItalic />
                  <BtnUnderline />
                  <Separator />
                  <BtnStyles className="text-black" />
                </Toolbar>
              </Editor>
            </div>

            <div className="my-4 p-4 card_style">
              <h2 className="text-lg font-semibold">Note Preview:</h2>
              <div
                className="p-2 rounded "
                dangerouslySetInnerHTML={{ __html: addnotes.description }}
              />
            </div>
            <div className="flex justify-center mt-4">
              <ButtonCs name="add note" onclick={handlesubmit} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteEdit;
