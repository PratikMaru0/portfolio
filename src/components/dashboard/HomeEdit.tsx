import { useEffect, useState } from "react";
import Input from "../common/Input";
import { Button, Loader } from "../common";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addAlertMsg } from "../../utils/store/alertSlice";
import homeEditTxt from "./texts/homeEditTxt";

const HomeEdit = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [tagline, setTagline] = useState("");
  const [shortIntro, setShortIntro] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [socialMediaLinks, setSocialMediaLinks] = useState<string[]>([]);
  const [newSocialLink, setNewSocialLink] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchHomeDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/profile`, {
          withCredentials: true,
        });
        const data = res.data.data || {};
        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        setEmailId(data.emailId || "");
        setPhoneNumber(data.phoneNumber || "");
        setProfilePicUrl(data.profilePicUrl || "");
        setTagline(data.tagline || "");
        setShortIntro(data.shortIntro || "");
        setResumeUrl(data.resumeUrl || "");
        setSocialMediaLinks(data.socialMediaLinks || []);
      } catch (err: any) {
        dispatch(
          addAlertMsg({ message: err.response.data.error, status: err.status })
        );
      } finally {
        setLoading(false);
      }
    };
    fetchHomeDetails();
  }, [dispatch]);

  const handleAddSocialLink = () => {
    if (newSocialLink && !socialMediaLinks.includes(newSocialLink)) {
      setSocialMediaLinks([...socialMediaLinks, newSocialLink]);
      setNewSocialLink("");
    }
  };

  const handleRemoveSocialLink = (idx: number) => {
    setSocialMediaLinks(socialMediaLinks.filter((_, i) => i !== idx));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await axios.patch(
        `${BASE_URL}/profile`,
        {
          firstName,
          lastName,
          emailId,
          phoneNumber,
          profilePicUrl,
          tagline,
          shortIntro,
          resumeUrl,
          socialMediaLinks,
        },
        { withCredentials: true }
      );
      dispatch(
        addAlertMsg({ message: res.data.message, status: res.data.status })
      );
    } catch (err: any) {
      dispatch(
        addAlertMsg({ message: err.response.data.error, status: err.status })
      );
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-primary/10 border-2 rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {homeEditTxt.heading}
      </h2>
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={homeEditTxt.firstNameLabel}
            placeholder={homeEditTxt.firstNamePlaceholder}
            type="text"
            val={firstName}
            setVal={setFirstName}
            required
          />
          <Input
            label={homeEditTxt.lastNameLabel}
            placeholder={homeEditTxt.lastNamePlaceholder}
            type="text"
            val={lastName}
            setVal={setLastName}
            required
          />
        </div>
        <Input
          label={homeEditTxt.emailLabel}
          placeholder={homeEditTxt.emailPlaceholder}
          type="email"
          val={emailId}
          setVal={setEmailId}
          required
        />
        <Input
          label={homeEditTxt.phoneNumberLabel}
          placeholder={homeEditTxt.phoneNumberPlaceholder}
          type="text"
          val={phoneNumber}
          setVal={setPhoneNumber}
          required
        />
        <Input
          label={homeEditTxt.profilePicUrlLabel}
          placeholder={homeEditTxt.profilePicUrlPlaceholder}
          type="text"
          val={profilePicUrl}
          setVal={setProfilePicUrl}
          required
        />
        <Input
          label={homeEditTxt.resumeUrlLabel}
          placeholder={homeEditTxt.resumeUrlPlaceholder}
          type="text"
          val={resumeUrl}
          setVal={setResumeUrl}
          required
        />
        <Input
          label={homeEditTxt.shortIntroLabel}
          placeholder={homeEditTxt.shortIntroPlaceholder}
          type="text"
          val={shortIntro}
          setVal={setShortIntro}
          required
        />
        <Input
          label={homeEditTxt.taglineLabel}
          placeholder={homeEditTxt.taglinePlaceholder}
          type="text"
          val={tagline}
          setVal={setTagline}
        />
        <div>
          <label className="block font-medium mb-1">
            {homeEditTxt.socialMediaLinksLabel}{" "}
            <span className="text-xs text-gray-500">
              {homeEditTxt.socialMediaLinksOptional}
            </span>
          </label>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder={homeEditTxt.addSocialLinkPlaceholder}
              type="text"
              val={newSocialLink}
              setVal={setNewSocialLink}
            />
            <Button
              text={homeEditTxt.addSocialLinkBtn}
              type="button"
              style="px-4"
              onClick={handleAddSocialLink}
              disabled={!newSocialLink}
            />
          </div>
          <ul className="flex flex-wrap gap-2">
            {socialMediaLinks.length === 0 && (
              <div className="w-full justify-center">
                <li className="text-xs text-center italic">
                  {homeEditTxt.noSocialLinks}
                </li>
              </div>
            )}
            {socialMediaLinks.map((link, idx) => (
              <li
                key={idx}
                className="flex items-center bg-primary/10 border border-primary/70 px-3 py-1 rounded shadow text-xs"
              >
                <span className="truncate max-w-[120px]">{link}</span>
                <button
                  type="button"
                  className="ml-2 text-red-400 hover:text-red-700"
                  onClick={() => handleRemoveSocialLink(idx)}
                  aria-label={homeEditTxt.removeSocialLinkAria}
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        </div>
        <Button
          text={loading ? <Loader /> : homeEditTxt.saveBtn}
          type="submit"
          style="w-full mt-4"
          disabled={loading}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default HomeEdit;
