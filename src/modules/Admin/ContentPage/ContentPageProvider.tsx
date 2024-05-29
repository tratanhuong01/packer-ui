import { ReactNode, createContext } from "react";
import {
  initialState,
  useCustomContext,
} from "../../../hooks/useCustomContext";
import { ContextType } from "../../../hooks/useCustomContext";
import Component from "../interfaces/Component";

type ContentPageProps = {
  result: Component | null;
};

const init: ContentPageProps = {
  result: null,
};

const initContext: ContextType<ContentPageProps> =
  initialState<ContentPageProps>(init);

const ContentPageContext =
  createContext<ContextType<ContentPageProps>>(initContext);

const ContentPageProvider = ({ children }: { children: ReactNode }) => {
  const CustomProvider = useCustomContext(init, ContentPageContext);
  return <CustomProvider>{children}</CustomProvider>;
};

const ContentPageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <ContentPageProvider>
      <div className="w-full h-full flex flex-col">{children}</div>
    </ContentPageProvider>
  );
};

export { ContentPageContext, ContentPageWrapper };
