import heroTxt from "../constants/texts/heroTxt";
import { Button } from "../components/common";
import { profileImg } from "../assets";

const Hero = () => {
  return (
    <section className="text-center py-16 px-4 md:px-8 lg:px-20">
      {/* Profile Image with Primary Color Border */}
      <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-primary p-1 mx-auto mb-6 flex items-center justify-center">
        <img
          src={profileImg}
          alt="Profile"
          className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
        />
      </div>

      {/* Greeting */}
      <h2 className="font-normal text-lg md:text-xl mb-2 flex items-center justify-center gap-2 ">
        {heroTxt.greeting}
        <span role="img" aria-label="wave">
          👋🏻
        </span>
      </h2>

      {/* Headline */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium mb-4 leading-tight ">
        {heroTxt.title}
      </h1>

      {/* Description */}
      <p className="/80 text-base sm:text-lg max-w-2xl mx-auto mb-8 px-2">
        {heroTxt.shortIntro}
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mx-4 sm:mx-0">
        <Button
          text={heroTxt.connectWithMe}
          style="w-full sm:w-auto text-center bg-primary  rounded-full px-8 py-3 text-base cursor-pointer transition hover:bg-primary/80"
        />
        <Button
          text={heroTxt.resume}
          style="w-full sm:w-auto text-center border border-primary/20 rounded-full px-8 py-3 text-base  bg-themeBackground transition hover:bg-primary/10"
          onClick={() => alert("Resume downloaded")}
        />
      </div>
    </section>
  );
};

export default Hero;
