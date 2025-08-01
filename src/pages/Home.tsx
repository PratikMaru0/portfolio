import { useEffect, useState } from "react";
import { Button } from "../components/common";
import { BASE_URL } from "../utils/constants";
import HomeTxt from "../constants/texts/homeTxt";
import { useNavigate } from "react-router-dom";
import SocialMediaLinks from "../components/SocialMediaLinks";
import { handleNavigation } from "../utils/mainScreenUtils";

const Home = () => {
  const [profile, setProfile] = useState({
    profilePicUrl: "",
    firstName: "",
    lastName: "",
    tagline: "",
    shortIntro: "",
    resumeUrl: "",
    socialMediaLinks: [],
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/profile`, {
          credentials: "include",
        });
        const data = await res.json();
        setProfile({
          profilePicUrl: data.data?.profilePicUrl || "",
          firstName: data.data?.firstName || "",
          lastName: data.data?.lastName || "",
          tagline: data.data?.tagline || "",
          shortIntro: data.data?.shortIntro || "",
          resumeUrl: data.data?.resumeUrl || "",
          socialMediaLinks: data.data?.socialMediaLinks || [],
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <section className="flex flex-col items-center justify-center min-h-[40vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-solid mb-4"></div>
        <span className="text-primary text-lg font-medium">Loading...</span>
      </section>
    );
  }

  return (
    <section className="text-center pt-6 pb-8 sm:pt-6 sm:pb-12 md:pt-8 md:pb-16 lg:pt-10 lg:pb-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
      {/* Profile Picture - Responsive sizing */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full border-2 sm:border-3 md:border-4 border-primary p-1 mx-auto mb-4 sm:mb-6 md:mb-8 flex items-center justify-center">
        <img
          src={profile.profilePicUrl}
          alt="Profile"
          className="w-20 h-20 sm:w-26 sm:h-26 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full object-cover"
        />
      </div>

      {/* Greeting - Responsive typography and spacing */}
      <h2 className="font-normal text-base sm:text-lg md:text-xl lg:text-2xl mb-2 sm:mb-3 md:mb-4 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
        <span>{`${HomeTxt.greetingPrefix} ${profile.firstName} ${profile.lastName}`}</span>
        <span
          role="img"
          aria-label="wave"
          className="text-lg sm:text-xl md:text-2xl"
        >
          {HomeTxt.waveEmoji}
        </span>
      </h2>

      {/* Headline - Responsive typography with better line height */}
      <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium mb-4 sm:mb-6 md:mb-8 leading-tight px-2 sm:px-4">
        {profile.tagline}
      </h1>

      {/* Description - Better responsive text and spacing */}
      <p className="text-themeText/60 text-sm sm:text-base md:text-lg lg:text-xl max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 px-2 sm:px-4 leading-relaxed">
        {profile.shortIntro}
      </p>

      {/* Buttons - Improved responsive layout */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10 md:mb-12 px-4 sm:px-0">
        <Button
          text={HomeTxt.connectWithMe}
          style="w-full sm:w-auto text-center bg-primary text-themeText rounded-full px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base md:text-lg font-medium cursor-pointer transition-all duration-300 hover:bg-primary/90 hover:shadow-lg transform hover:scale-105"
          onClick={() => handleNavigation("contact")}
        />
        <Button
          text={HomeTxt.resume}
          style="w-full sm:w-auto text-center border border-primary text-themeText rounded-full px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base md:text-lg font-medium bg-transparent transition-all duration-300 hover:bg-primary/30 hover:text-themeText hover:shadow-lg transform hover:scale-105"
          onClick={() => window.open(profile.resumeUrl, "_blank")}
        />
      </div>

      {/* Social Media Links - Responsive spacing */}
      <div className="mt-6 sm:mt-8 md:mt-10">
        <SocialMediaLinks socialMediaLinks={profile.socialMediaLinks} />
      </div>
    </section>
  );
};

export default Home;
