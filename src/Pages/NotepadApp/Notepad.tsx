import { useEffect, useState } from "react";
import TopHeading from "../../Components/TopHeading";
import { GoPlus } from "react-icons/go";
import { MdDelete, MdEditSquare, MdOutlinePushPin } from "react-icons/md";
import { Link } from "react-router-dom";
import { MdPushPin } from "react-icons/md";
interface Notes {
  id: number;
  title: string;
  description: string;
  create_date: Date;
  update_date: Date;
  ispin: boolean;
  ispinid?: number | undefined;
}
const Notepad: React.FC = () => {
  const notename: string = "notepad";
  const [ispinnotes, setIspinnotes] = useState<Notes[]>([]);
  const [allnotes, setAllnotes] = useState<Notes[]>([]);

  useEffect(() => {
    refreshnotepad();
  }, []);
  function refreshnotepad() {
    const notes = localStorage.getItem(notename);
    if (notes) {
      const notespin = JSON.parse(notes);
      setIspinnotes(notespin.filter((item: Notes) => item.ispin === true));
      setAllnotes(notespin.filter((item: Notes) => item.ispin === false));
    }
  }
  const handledeletenote = (id: number) => {
    const allstnote = localStorage.getItem(notename);
    const allnoteslg = allstnote ? JSON.parse(allstnote) : [];
    const newnotes = allnoteslg?.filter((item: Notes) => item.id !== id);
    localStorage.setItem(notename, JSON.stringify(newnotes));
    refreshnotepad();
  };
  const handleispin = (id: number) => {
    console.log(id);
    const allnote = localStorage.getItem(notename);
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

    console.log(ispinmax);
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
    localStorage.setItem(notename, JSON.stringify(newnotes));
    refreshnotepad();
  };
  const handleunpin = (id: number) => {
    const allnote = localStorage.getItem(notename);
    const allnoteslg = allnote ? JSON.parse(allnote) : [];
    const newnotes = allnoteslg.map((item: Notes) => {
      if (item.id === id) {
        return {
          ...item,
          ispin: false,
          ispinid: 0,
        };
      }
      return item;
    });
    localStorage.setItem(notename, JSON.stringify(newnotes));
    refreshnotepad();
  };

  return (
    <div className="w-full h-auto">
      <TopHeading name="notepad app" />
      <div className="">
        <Link
          to="/notepad/addnote"
          className="btn_style p-2 rounded-full fixed left-[50%] bottom-10 z-10"
        >
          <GoPlus className="text-3xl font-semibold" />
        </Link>
      </div>
      <div className="h-auto  mb-3">
        {ispinnotes.length > 0 && (
          <h3 className="text-2xl font-semibold capitalize ml-5">
            Pinned note
          </h3>
        )}
        <div className="h-autp grid lg:grid-cols-4 gap-3 md:grid-cols-2 grid-cols-1  mt-3  py-2">
          {[...ispinnotes]
            .filter((item) => item.ispin)
            .sort((a, b) => (b.ispinid || 0) - (a.ispinid || 0))
            .map((item, index) => {
              return (
                <div
                  key={index}
                  className="h-40 w-72 card_style mx-auto p-2 rounded-2xl relative overflow-hidden"
                >
                  <div className="absolute top-3 right-4 flex gap-4 text-2xl">
                    {item.ispin ? (
                      <MdPushPin
                        onClick={() => handleunpin(item.id)}
                        className="text-2xl "
                      />
                    ) : (
                      <MdOutlinePushPin
                        onClick={() => handleispin(item.id)}
                        className="text-2xl "
                      />
                    )}
                    <Link to={`/notepad/edit/${item.id}`} className="">
                      <MdEditSquare className="hover:text-green-500" />
                    </Link>
                    <MdDelete
                      onClick={() => handledeletenote(item.id)}
                      className="hover:text-red-500"
                    />
                  </div>
                  <Link to={`/notepad/read/${item.id}`} className="">
                    <h3 className="text-xl font-semibold  capitalize">
                      {item.title.slice(0, 10)}...{" "}
                    </h3>
                    <div
                      className=" p-2 rounded h-full overflow-hidden"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
      <hr />
      <div className="h-[75vh] grid lg:grid-cols-4 gap-3 md:grid-cols-2 grid-cols-1  mt-3  py-2">
        {[...allnotes]
          .filter((item) => item.ispin == false) // Filter only pinned notes
          .sort((a, b) => b.id - a.id)
          .map((item, index) => {
            if (item.ispin == false) {
              return (
                <div
                  key={index}
                  className="h-40 w-72 card_style mx-auto p-2 rounded-2xl relative overflow-hidden"
                >
                  <div className="absolute top-3 right-4 flex gap-4 text-2xl">
                    {item.ispin ? (
                      <MdPushPin className="text-2xl " />
                    ) : (
                      <MdOutlinePushPin
                        onClick={() => handleispin(item.id)}
                        className="text-2xl "
                      />
                    )}
                    <Link to={`/notepad/edit/${item.id}`} className="">
                      <MdEditSquare className="hover:text-green-500" />
                    </Link>
                    <MdDelete
                      onClick={() => handledeletenote(item.id)}
                      className="hover:text-red-500"
                    />
                  </div>
                  <Link to={`/notepad/read/${item.id}`} className="">
                    <h3 className="text-xl font-semibold  capitalize">
                      {item.title.slice(0, 10)}...{" "}
                    </h3>
                    <div
                      className=" p-2 rounded h-full overflow-hidden"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </Link>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default Notepad;
