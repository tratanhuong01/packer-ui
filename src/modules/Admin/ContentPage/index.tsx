import { useContext, useState } from "react";
import ContentPropPage from "../ContentPropPage";
import { ContentPageContext, ContentPageWrapper } from "./ContentPageProvider";
import { getComponentById } from "../apis";
import ContentPageMain from "./ContentPageMain";

const ContentPage = () => {
  //
  //
  return (
    <ContentPageWrapper>
      <ContentPageChild />
    </ContentPageWrapper>
  );
};

const ContentPageChild = () => {
  const [selected, setSelected] = useState<any>();
  const {
    custom: { result },
    dispatch,
    actions: { updateData },
  } = useContext(ContentPageContext);
  return (
    <ContentPropPage
      itemHandle={async (item: any) => {
        const result = await getComponentById(item.id).then((res) =>
          res.json()
        );
        if (result) {
          if (!result.component) result.component = [];
          if (!result.props) result.props = [];
          dispatch(updateData("result", result));
        }
      }}
      selected={selected}
      setSelected={setSelected}
    >
      {result && <ContentPageMain />}
    </ContentPropPage>
  );
};
export default ContentPage;
