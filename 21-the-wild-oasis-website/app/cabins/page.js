import Counter from "@/app/_components/Counter";

export default async function Cabins() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users")
  const data = await res.json();

  return (
    <div>
      <h1>Cabins</h1>
    </div>
  );
}