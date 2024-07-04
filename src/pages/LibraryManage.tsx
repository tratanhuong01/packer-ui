import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import Loading from "../components/Loading";
import AutoComplete from "../components/AutoComplete";
import Button from "../components/Button";

const ItemLibrary = ({
  selected,
  setSelected,
  loading,
  item,
}: {
  selected: number[];
  setSelected: Function;
  item: any;
  loading?: boolean;
}) => {
  return (
    <div
      onClick={() => {
        setSelected(
          selected.includes(item)
            ? [...selected].filter((val) => val !== item)
            : [...selected, item]
        );
      }}
      className={`border-2 border-solid shadow-sm overflow-hidden rounded-md 
      cursor-pointer ${
        !selected.includes(item) ? "border-gray-200" : "border-primary"
      } relative`}
    >
      {loading && (
        <div
          className="absolute top-0 left-0 bottom-0 right-0 bg-white bg-opacity-50 flex items-center 
        justify-center z-10"
        >
          <div className="scale-75">
            <Loading />
          </div>
        </div>
      )}
      <input
        type="checkbox"
        checked
        className="absolute top-3 left-3 scale-125 z-10 accent-primary"
        hidden={!selected.includes(item)}
      />
      <div className="w-full relative" style={{ paddingTop: "60%" }}>
        <img
          src={item.download_url}
          className="absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover"
          alt=""
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <p>image.jpg</p>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">Jun 27</span>
        </div>
      </div>
    </div>
  );
};

const LibraryManager = () => {
  //
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [images, setImages] = useState<any[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        "https://picsum.photos/v2/list?page=4&limit=12"
      ).then((res) => res.json());
      setImages(result);
      setLoading(false);
    };
    fetchData();
  }, []);
  //
  return (
    <>
      <div className="flex items-center gap-4">
        <div className="w-80">
          <AutoComplete
            options={["All", "Thumbnail", "Tour"]}
            defaultValue="All"
          />
        </div>
        <Button onClick={() => setShow(true)} mode="outlined">
          Delete
        </Button>
        <Button mode="outlined">Download</Button>
      </div>
      <div className="w-full py-8 grid gap-4 grid-cols-4">
        {loading ? (
          <Loading container />
        ) : (
          images.map((item) => (
            <ItemLibrary
              item={item}
              selected={selected}
              setSelected={setSelected}
              key={item.id}
            />
          ))
        )}
      </div>
      {show && <ModalDelete closeModal={() => setShow(false)} />}
    </>
  );
};

const ModalDelete = ({ closeModal }: { closeModal: Function }) => {
  //
  const [checking, setChecking] = useState(true);
  useEffect(() => {
    let timeOut = setTimeout(() => {
      setChecking(false);
      clearTimeout(timeOut);
    }, 2000);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);
  //
  return (
    <Modal
      mode="modal"
      headerTitle="Delete images or videos"
      closeModal={closeModal}
    >
      {checking && <Loading container />}
    </Modal>
  );
};

export default LibraryManager;
