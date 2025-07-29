import Fab from "./Fab";

interface SocialMediaLinksProps {
  socialMediaLinks: string[];
}

const SocialMediaLinks = ({ socialMediaLinks }: SocialMediaLinksProps) => {
  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <Fab
        actions={[
          {
            icon: "👨",
            onClick: () => console.log("clicked"),
          },
          {
            icon: "👨",
            onClick: () => console.log("clicked"),
          },
          {
            icon: "👨",
            onClick: () => console.log("clicked"),
          },
          {
            icon: "👨",
            onClick: () => console.log("clicked"),
          },
        ]}
      />
    </div>
  );
};

export default SocialMediaLinks;
