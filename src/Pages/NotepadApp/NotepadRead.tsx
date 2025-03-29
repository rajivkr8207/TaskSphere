import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonCs from "../../Components/ButtonCs";
import { MdOutlinePushPin, MdPushPin } from "react-icons/md";
interface Notes {
  id: number | undefined;
  title: string;
  description: string;
  create_date: Date;
  update_date: Date;
  ispin?: boolean;
  ispinid?: number;
}
const NotepadRead: React.FC = () => {
  const { id } = useParams();
  const [note, setNote] = useState<Notes | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const notes = localStorage.getItem("notepad");
    if (notes) {
      const allnotes = JSON.parse(notes);
      const note = allnotes.find((item: Notes) => item.id === Number(id));
      setNote(note);
    }
  }, [id]);
  const handleispin = (id: number) => {
    const allnote = localStorage.getItem("notepad");
    const allnoteslg = allnote ? JSON.parse(allnote) : [];
    const ispinmax =
      allnoteslg
        .filter(
          (item: Notes) => item.ispin === true && item.ispinid !== undefined
        )
        .reduce(
          (max: number, item: Notes) => Math.max(max, item.ispinid || 0),
          0
        ) || 0;

    const newnotes = allnoteslg.map((item: Notes) => {
      if (item.id === id) {
        return {
          ...item,
          ispin: true,
          ispinid: item.ispin ? item.ispinid : ispinmax + 1,
        };
      }
      return item;
    });
    localStorage.setItem("notepad", JSON.stringify(newnotes));
    navigate("/notepad");
  };
  return (
    <div className="w-full min-h-[80vh] card_style shadow-lg rounded-2xl relative p-5 my-5 lg:p-8">
      {/* Action Buttons */}
      <div className="absolute top-4 lg:right-20 right-5 flex gap-3 items-center">
        <ButtonCs
          icon={
            note?.ispin ? (
              <MdPushPin className={`text-2xl cursor-pointer`} />
            ) : (
              <MdOutlinePushPin
                className={`text-2xl cursor-pointer`}
                onClick={() => note?.id !== undefined && handleispin(note.id)}
              />
            )
          }
        />
        <ButtonCs
          name="Edit"
          onclick={() => navigate(`/notepad/edit/${note?.id}`)}
        />
      </div>

      {/* Note Content */}
      {note ? (
        <div className="lg:w-3/4 w-full mx-auto py-10">
          <h1 className="lg:text-4xl text-2xl ml-2 font-bold capitalize mb-4 text_style">
            {note?.title}
          </h1>
          <div
            className="card_style rounded-lg p-4  shadow-inner min-h-64"
            dangerouslySetInnerHTML={{ __html: note.description || "" }}
          />
          {/* Created & Updated Info */}
          <div className="flex justify-between text-sm text_style mt-4">
            <p>Created: {new Date(note.create_date).toLocaleDateString()}</p>
            <p>Updated: {new Date(note.update_date).toLocaleDateString()}</p>
          </div>
        </div>
      ) : (
        <h1 className="text-3xl font-semibold text-center mt-10 text-red-500">
          No Note Found
        </h1>
      )}

      <div className="absolute bottom-4 lg:left-1/2 left-[45%] transform -translate-x-1/2">
        <ButtonCs name="Back" onclick={() => navigate("/notepad")} />
      </div>
    </div>
  );
};

export default NotepadRead;
