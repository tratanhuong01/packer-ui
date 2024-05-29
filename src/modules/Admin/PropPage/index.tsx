import { useContext, useState } from "react";
import { getPropsByIdComponent } from "../apis";
import FeatureComponent from "../FeatureComponent";
import { AdminContext } from "../../../contexts/AdminContext/AdminContext";
import ContentPropPage from "../ContentPropPage";

const PropPage = () => {
  //
  const {
    dispatch,
    actions: { updateProps },
  } = useContext(AdminContext);
  const [selected, setSelected] = useState<any>();
  //
  return (
    <ContentPropPage
      itemHandle={async (item: any) => {
        const result = await getPropsByIdComponent(item.id).then((res) =>
          res.json()
        );
        dispatch(updateProps("component", result));
        dispatch(updateProps("done", result));
      }}
      selected={selected}
      setSelected={setSelected}
    >
      <FeatureComponent selected={selected} />
    </ContentPropPage>
  );
};

export default PropPage;
