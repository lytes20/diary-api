interface Person {
  firstname: string;
  lastname: string;
  age: number;
  height: number;
  weight: number;
}
type NamedPerson = Omit<Person, "age" | "height" | "weight">;
const asaad: NamedPerson = { firstname: "Asaad", lastname: "Saad" };
