import { useEffect, useRef, useState } from "react";
import { CardModal } from "../components/common";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { servicesText } from "../constants/texts";

const Services = () => {
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/services`);
        setServices(res.data.data || []);
      } catch (err) {
        // Optionally handle error
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpenModal(false);
      }
    };

    if (openModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModal]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col items-center w-full pt-8">
        <div className="text-center mb-2 text-sm tracking-wide opacity-70">
          {servicesText.offerTxt}
        </div>
        <h1 className="text-4xl font-bold text-center mb-4">
          {servicesText.heading}
        </h1>

        <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
          <div className="flex flex-nowrap md:justify-center gap-6 px-4 pb-2 w-max min-w-full">
            {services.map((service) => (
              <div
                onClick={() => {
                  setSelectedService(service);
                  setOpenModal(true);
                }}
                key={service._id}
                className={`flex-shrink-0 flex flex-col items-start rounded-2xl border border-themeText/50 bg-themeBackground shadow-custom p-8 min-w-[260px] max-w-[300px] transition-all duration-300 cursor-pointer my-3 group relative overflow-hidden hover:shadow-xl hover:border-primary/70 hover:scale-[1.03]`}
              >
                <div className="mb-4 rounded-lg p-4 flex items-center justify-center bg-primary/40 border border-themeText text-primary shadow-inner z-10">
                  {service.icon && (
                    <img
                      src={
                        service.icon.includes("imagekit.io")
                          ? `${service.icon}?tr=w-80,h-80,bg-FFFFFF00,fit-contain`
                          : service.icon
                      }
                      alt="icon"
                      className="w-8 h-8 object-contain"
                    />
                  )}
                </div>
                <div className="font-semibold text-lg mb-2 text-themeText z-10">
                  {service.service}
                </div>
                <div className="text-sm opacity-80 mb-6 text-themeText z-10 line-clamp-3">
                  {service.description}
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-primary group z-10">
                  Read more
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {openModal && selectedService && (
        <CardModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          modalRef={modalRef}
          title={selectedService.service}
        >
          {selectedService.description}
        </CardModal>
      )}
    </>
  );
};

export default Services;
