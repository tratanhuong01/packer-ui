import TitleDescription from "../../../modules/UI Components/components/TitleDescription";
import ShowComponent from "../../../modules/UI Components/components/ShowComponent";
import { BasicModal, basicModalExpand } from "./basicModal";
import { basicButtonCollapse } from "../Button/basicButton";

const ModalPage = () => {
  //
  //
  return (
    <div>
      <TitleDescription type="big">Modal</TitleDescription>
      <p>
        The modal component provides a solid foundation for creating dialogs,
        popovers, lightboxes, or whatever else.
      </p>
      <p>
        The component renders its children node in front of a backdrop
        component. The Modal offers important features:
      </p>
      <ol className="list-disc pl-5 flex flex-col gap-2 my-3">
        <li>💄 Manages modal stacking when one-at-a-time just isn't enough.</li>
        <li>
          🔐 Creates a backdrop, for disabling interaction below the modal.
        </li>
        <li>🔐 It disables scrolling of the page content while open.</li>
        <li>
          ♿️ It properly manages focus; moving to the modal content, and
          keeping it there until the modal is closed.
        </li>
        <li>♿️ Adds the appropriate ARIA roles automatically.</li>
      </ol>
      <TitleDescription type="normal">Basic modal</TitleDescription>

      <ShowComponent
        title="Contained Button"
        component={<BasicModal />}
        code={{
          expand: basicModalExpand,
          collapse: basicButtonCollapse,
        }}
      />
    </div>
  );
};

export default ModalPage;
