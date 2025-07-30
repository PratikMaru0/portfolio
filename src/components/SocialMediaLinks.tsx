import Fab from "./Fab";

interface SocialMediaLinksProps {
  socialMediaLinks: any[];
}

const SocialMediaLinks = ({ socialMediaLinks }: SocialMediaLinksProps) => {
  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <Fab actions={socialMediaLinks} />
    </div>
  );
};

export default SocialMediaLinks;
