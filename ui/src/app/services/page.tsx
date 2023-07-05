import Navbar from "@/components/Navbar";

const data = [
  {
    id: "12eed687-2a33-45cb-aad7-c48f362305d2",
    name: "platform-api",
    owner: "1656364e-b59d-478b-b8ec-3e70aef4316c",
    createdAt: "2023-06-27T09:09:40.106Z",
    updatedAt: "2023-06-27T09:09:40.106Z",
  },
];

export default function ServicesPage() {
  return (
    <div>
      <div className="flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <Navbar tabName="Services" className="mx-6" />
          </div>
        </div>
        <h1>Services</h1>
        {data.map((d) => (
          <div>
            <p>{d.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
