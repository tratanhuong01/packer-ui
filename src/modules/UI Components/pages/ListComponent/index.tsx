import Alert from "../../../../components/Alert";
import AutoComplete from "../../../../components/AutoComplete";
import Button from "../../../../components/Button";
import Calendar from "../../../../components/Calendar";
import Pagination from "../../../../components/Pagination";
import Rating from "../../../../components/Rating";
import RenderData from "../../../../components/RenderData";
import StepByStep from "../../../../components/StepByStep";
import Table from "../../../../components/Table";
import Toast from "../../../../components/Toast";
import Tooltip from "../../../../components/Tooltip";
import TransferList from "../../../../components/TransferList";
import VideoMedia from "../../../../components/VideoMedia";
import ShowComponent from "../../components/ShowComponent";

const ListComponent = () => {
  return (
    <div>
      <p className="font-bold text-4xl mb-2 mt-8">AutoComplete</p>
      <ShowComponent
        component={
          <AutoComplete
            options={[
              { id: 1, label: "The Godfather", year: 1972 },
              { id: 2, label: "The Godfather: Part II", year: 1974 },
              { id: 3, label: "The Dark Knight", year: 2008 },
              { id: 4, label: "12 Angry Men", year: 1957 },
              { id: 5, label: "Schindler's List", year: 1993 },
              { id: 6, label: "Pulp Fiction", year: 1994 },
            ]}
            nameSearch={"label"}
            itemHandle={(item) => ""}
          />
        }
        code={{
          expand: "AutoComplete Expand",
          collapse: "AutoComplete Collapse",
        }}
      />
      <p className="font-bold text-4xl mb-2 mt-8">Rating</p>
      <ShowComponent
        component={
          <div>
            <Rating maxStar={5} current={3} />
          </div>
        }
        code={{ expand: "Rating Expand", collapse: "Rating Collapse" }}
      />
      <p className="font-bold text-4xl mb-2 mt-8">RenderData</p>
      <ShowComponent
        component={
          <div className="md:block hidden">
            <RenderData />
          </div>
        }
        code={{ expand: "RenderData Expand", collapse: "RenderData Collapse" }}
      />
      <p className="font-bold text-4xl mb-2 mt-8">Transfer List</p>
      <ShowComponent
        component={
          <div className="md:block hidden">
            <TransferList
              items={[
                { id: 1, name: "John Doe" },
                { id: 2, name: "Jane Smith" },
                { id: 3, name: "Robert Johnson" },
                { id: 4, name: "Emily Davis" },
                { id: 5, name: "Michael Wilson" },
                { id: 6, name: "Elizabeth Brown" },
                { id: 7, name: "Christopher Martin" },
                { id: 8, name: "Olivia White" },
                { id: 9, name: "William Moore" },
                { id: 10, name: "Sophia Anderson" },
              ]}
            />
          </div>
        }
        code={{
          expand: "Transfer List Expand",
          collapse: "Transfer List Collapse",
        }}
      />
      <p className="font-bold text-4xl mb-2 mt-8">Calendar</p>
      <ShowComponent
        component={
          <div>
            <Calendar />
          </div>
        }
        code={{ expand: "Calendar Expand", collapse: "Calendar Collapse" }}
      />
      <p className="font-bold text-4xl mb-2 mt-8">Table</p>
      <ShowComponent
        component={
          <div className="w-full">
            <Table
              columns={[
                {
                  headerName: "ID",
                  field: "id",
                },
                {
                  headerName: "Name",
                  field: "name",
                },
              ]}
            />
          </div>
        }
        code={{ expand: "Table Expand", collapse: "Table Collapse" }}
      />
      <p className="font-bold text-4xl mb-2 mt-8">Alert</p>
      <ShowComponent
        component={
          <div className="flex flex-col gap-5">
            <Alert
              severity="success"
              content={{
                title: "Success",
                description: "One file added",
              }}
            ></Alert>
            <Alert
              severity="error"
              content={{
                title: "Error",
                description: "One file added",
              }}
            ></Alert>
            <Alert
              severity="warning"
              content={{
                title: "Warning",
                description: "One file added",
              }}
            ></Alert>
            <Alert
              severity="info"
              content={{
                title: "Info",
                description: "One file added",
              }}
            ></Alert>
          </div>
        }
        code={{ expand: "Alert Expand", collapse: "Alert Collapse" }}
      />
      <p className="font-bold text-4xl mb-2 mt-8">Step by step</p>
      <ShowComponent
        component={
          <StepByStep
            stepCurrent={2}
            steps={[
              {
                id: Math.random(),
                name: "A",
                index: 1,
                render: () => 1,
              },
              {
                id: Math.random(),
                name: "B",
                index: 2,
                render: () => 1,
              },
              {
                id: Math.random(),
                name: "C",
                index: 3,
                render: () => 1,
              },
            ]}
          />
        }
        code={{ expand: "Alert Expand", collapse: "Alert Collapse" }}
      />
      <p className="font-bold text-4xl mb-2 mt-8">Pagination</p>
      <Pagination limit={5} length={10} current={0} handleItem={() => ""} />
      <p className="font-bold text-4xl mb-2 mt-8">Video Media</p>
      <VideoMedia />
      <p className="font-bold text-4xl mb-2 mt-8">Tooltip</p>
      <Tooltip position="bottom" title="Hello world">
        <Button mode="outlined">Hover me</Button>
      </Tooltip>
      <p className="font-bold text-4xl mb-2 mt-8">Toast</p>
      <Toast
        content={{
          title: "Title",
          description: "Description",
        }}
        severity="success"
      />
      <Toast
        content={{
          title: "Title",
          description: "Description",
        }}
        severity="error"
      />
    </div>
  );
};

export default ListComponent;
