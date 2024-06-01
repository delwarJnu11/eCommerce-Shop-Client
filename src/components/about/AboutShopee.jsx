import { aboutData } from "../../constants";

const AboutShopee = () => {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 py-16">
      {aboutData.map((data) => (
        <div key={data.id} className="bg-white p-4 rounded-md shadow-md">
          <h2 className="font-bold text-3xl tracking-wider mb-4">
            {data.title}
          </h2>
          <p className="text-[15px] leading-6 tracking-wider text-gray-700">
            {data.description}
          </p>
        </div>
      ))}
    </div>
  );
};
export default AboutShopee;
