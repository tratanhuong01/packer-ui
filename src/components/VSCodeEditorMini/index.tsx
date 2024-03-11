const VSCodeEditorMini = () => {
  return (
    <div className="w-full flex-1 text-gray-500 text-sm border-2 border-solid border-gray-100 p-2 h-screen">
      <div className="flex justify-between items-center">
        <ul className="flex items-center gap-1">
          <li className="mr-3">
            <i className="bx bxl-visual-studio text-xl text-blue-500"></i>
          </li>
          {[
            "File",
            "Edit",
            "Selection",
            "View",
            "Go",
            "Run",
            "Terminal",
            "Help",
          ].map((item) => (
            <li className="cursor-pointer px-2 hover:bg-gray-100" key={item}>
              {item}
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <span className="bx bx-left-arrow-alt"></span>
          <span className="bx bx-right-arrow-alt"></span>
          <input type="text" className="w-80 p-1 rounded-lg bg-gray-100" />
        </div>
        <ul className="flex gap-2">
          {[
            "bx bx-dock-left",
            "bx bx-dock-bottom",
            "bx bx-dock-right",
            "bx bx-customize",
            "bx bx-minus",
            "bx bx-copy",
            "bx bx-x",
          ].map((item) => (
            <li key={item} className={`${item} cursor-pointer text-xl`}></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VSCodeEditorMini;
