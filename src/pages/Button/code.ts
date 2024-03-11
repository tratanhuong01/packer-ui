const basicButton = {
  collapse: `
    <Button mode="text">TEXT</Button>
    <Button mode="contained">CONTAINED</Button>
    <Button mode="outlined">OUTLINED</Button>
  `,
  expand: `
  import Calendar from "@packer-ui/Calendar";
  
  const CalendarComponent = () => {
    //
    return (
        <div className="flex gap-5">
            <Button mode="text">TEXT</Button>
            <Button mode="contained">CONTAINED</Button>
            <Button mode="outlined">OUTLINED</Button>
        </div>
    );
  };
  
  export default CalendarComponent;
  `,
};

const textButton = {
  collapse: `
    <Button>TEXT</Button>
    <Button disabled>DISABLED</Button>
    <Button href="#">LINK</Button>
  `,
  expand: `
  import Calendar from "@packer-ui/Calendar";
  
  const CalendarComponent = () => {
    //
    return (
        <div className="flex gap-5">
            <Button>TEXT</Button>
            <Button disabled>DISABLED</Button>
            <Button href="#">LINK</Button>
        </div>
    );
  };
  
  export default CalendarComponent;
  `,
};

const containedButton = {
  collapse: `
    <Button mode="contained">CONTAINED</Button>
    <Button mode="contained" disabled>
        DISABLED
    </Button>
    <Button mode="contained" href="#">
        LINK
    </Button>
  `,
  expand: `
  import Calendar from "@packer-ui/Calendar";
  
  const CalendarComponent = () => {
    //
    return (
        <div className="flex gap-5">
            <Button mode="contained">CONTAINED</Button>
            <Button mode="contained" disabled>
                DISABLED
            </Button>
            <Button mode="contained" href="#">
                LINK
            </Button>
        </div>
    );
  };
  
  export default CalendarComponent;
  `,
};

export { basicButton, textButton, containedButton };
