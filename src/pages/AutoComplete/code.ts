const comboBoxCode = {
  collapse: `
<AutoComplete
  options={options}
  nameSearch={"label"}
  itemHandle={(item) => alert(item)}
/>
`,
  expand: `
import AutoComplete from "@packer-ui/AutoComplete";

export default function ComboBox() {
  //
  const options = [
    { id: 1, label: "The Godfather", year: 1972 },
    { id: 2, label: "The Godfather: Part II", year: 1974 },
    { id: 3, label: "The Dark Knight", year: 2008 },
    { id: 4, label: "12 Angry Men", year: 1957 },
    { id: 5, label: "Schindler's List", year: 1993 },
    { id: 6, label: "Pulp Fiction", year: 1994 },
  ];
  //
  return (
    <AutoComplete
      options={options}
      nameSearch={"label"}
      itemHandle={(item) =>
        console.log(typeof item === "object" ? JSON.stringify(item) : item)
      }
    />
  );
}
`,
};

export { comboBoxCode };
