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
    return (
      <section className="flex flex-col items-center justify-center min-h-[40vh] px-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-solid mb-4"></div>
        <span className="text-primary text-lg font-medium">Loading...</span>
      </section>
    );
  }

  return (
    <>
      <section className="flex flex-col items-center w-full pt-6 pb-8 sm:pt-8 sm:pb-12 md:pt-10 md:pb-16 lg:pt-12 lg:pb-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
        <div className="text-center mb-3 sm:mb-4 md:mb-6 text-xs sm:text-sm md:text-base tracking-wide text-themeText/60">
          {servicesText.offerTxt}
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 px-2">
          {servicesText.heading}
        </h1>

        {/* Introduction Text */}
        <div className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-sm sm:text-base md:text-lg lg:text-xl text-themeText/80 mx-auto px-2 sm:px-4 leading-relaxed">
          {servicesText.shortIntro}
        </div>

        <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent">
          <div className="flex flex-nowrap md:justify-center gap-4 sm:gap-6 md:gap-8 px-2 sm:px-4 pb-2 w-max min-w-full">
            {services.map((service) => (
              <div
                onClick={() => {
                  setSelectedService(service);
                  setOpenModal(true);
                }}
                key={service._id}
                className={`flex-shrink-0 flex flex-col items-start rounded-xl border border-themeText/20 bg-themeBackground shadow-custom p-3 sm:p-6 md:p-8 w-[85vw] max-w-[260px] sm:min-w-[260px] md:min-w-[280px] sm:max-w-[300px] md:max-w-[360px] transition-all duration-300 cursor-pointer my-2 sm:my-3 group relative overflow-hidden hover:shadow-xl hover:border-primary/70 hover:scale-[1.02] sm:hover:scale-[1.03]`}
              >
                <div className="mb-3 sm:mb-4 rounded-lg p-3 sm:p-4 flex items-center justify-center bg-primary/10 border border-primary/20 text-primary z-10">
                  {service.icon && (
                    <img
                      src={
                        service.icon.includes("imagekit.io")
                          ? `${service.icon}?tr=w-80,h-80,bg-FFFFFF00,fit-contain`
                          : service.icon
                      }
                      alt="icon"
                      className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain"
                    />
                  )}
                </div>
                <div className="font-semibold text-sm sm:text-lg md:text-xl mb-2 sm:mb-3 text-themeText z-10">
                  {service.service}
                </div>
                <div className="text-xs sm:text-sm md:text-base text-themeText/70 mb-3 sm:mb-6 z-10">
                  {service.description.slice(0, 500) + "..."}
                </div>
                <div className="flex items-center gap-1 text-xs sm:text-sm md:text-base font-medium text-primary group-hover:gap-2 transition-all z-10 mt-auto">
                  Read more
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {openModal && selectedService && (
        <CardModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          modalRef={modalRef}
          title={selectedService.service}
          className="flex flex-col overflow-hidden max-h-[70vh] sm:max-h-[80vh]"
        >
          {selectedService.description}
        </CardModal>
      )}
    </>
  );
};

export default Services;
