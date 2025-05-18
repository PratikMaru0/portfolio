import { servicesText } from "../constants/texts";
import { services } from "../mockData";

const Services = () => {
  return (
    <div className="flex flex-col items-center w-full pt-8">
      <div className="text-center mb-2 text-sm tracking-wide opacity-70">
        {servicesText.offerTxt}
      </div>
      <h1 className="text-4xl font-bold text-center mb-4">
        {servicesText.heading}
      </h1>
      <div className="max-w-2xl text-center mb-10 text-base opacity-80 mx-auto">
        {servicesText.shortIntro}
      </div>

      {/* Scroll container */}
      <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        <div className="flex flex-nowrap md:justify-center gap-6 px-4 pb-2 w-max min-w-full">
          {services.map((service) => (
            <div
              key={service.title}
              className={
                "flex-shrink-0 flex flex-col items-start rounded-xl border-2 p-8 min-w-[260px] max-w-[300px] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer my-3 hover:bg-primary/30"
              }
            >
              <div
                className="mb-4 rounded-lg p-3 flex items-center justify-center"
                style={{ background: "#ffe3f3" }}
              >
                {service.icon}
              </div>
              <div className="font-semibold text-lg mb-2">{service.title}</div>
              <div className="text-sm opacity-80 mb-6">{service.desc}</div>
              <a
                href={service.link}
                className="flex items-center gap-1 text-sm font-medium group"
              >
                Read more
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
