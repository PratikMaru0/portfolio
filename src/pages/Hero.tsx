import { useEffect, useState } from "react";
import { Button } from "../components/common";
import { BASE_URL } from "../utils/constants";
import heroTxt from "../constants/texts/heroTxt";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [profile, setProfile] = useState({
    profilePicUrl: "",
    firstName: "",
    lastName: "",
    tagline: "",
    shortIntro: "",
    resumeUrl: "",
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
    <section className="text-center py-16 px-4 md:px-8 lg:px-20">
      <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-primary p-1 mx-auto mb-6 flex items-center justify-center">
        <img
          src={profile.profilePicUrl}
          alt="Profile"
          className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
        />
      </div>

      {/* Greeting */}
      <h2 className="font-normal text-lg md:text-xl mb-2 flex items-center justify-center gap-2 ">
        {`${heroTxt.greetingPrefix} ${profile.firstName} ${profile.lastName}`}
        <span role="img" aria-label="wave">
          {heroTxt.waveEmoji}
        </span>
      </h2>

      {/* Headline */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium mb-4 leading-tight ">
        {profile.tagline}
      </h1>

      {/* Description */}
      <p className="/80 text-base sm:text-lg max-w-2xl mx-auto mb-8 px-2">
        {profile.shortIntro}
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mx-4 sm:mx-0">
        <Button
          text={heroTxt.connectWithMe}
          style="w-full sm:w-auto text-center bg-primary  rounded-full px-8 py-3 text-base cursor-pointer transition hover:bg-primary/80"
          onClick={() => navigate("/contact")}
        />
        <Button
          text={heroTxt.resume}
          style="w-full sm:w-auto text-center border border-primary/20 rounded-full px-8 py-3 text-base  bg-themeBackground transition hover:bg-primary/10"
          onClick={() => window.open(profile.resumeUrl, "_blank")}
        />
      </div>
    </section>
  );
};

export default Hero;
