import { useEffect, useRef, useState } from "react";
import Input from "../common/Input";
import { Button, Loader } from "../common";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addAlertMsg } from "../../utils/store/alertSlice";
import homeEditTxt from "./texts/homeEditTxt";
import FileUpload from "./common/FileUpload";
import imageKit from "./utils/imageKit";
import Confirm from "../common/Confirm";
import PillEdit from "./common/PillEdit";

const HomeEdit = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePic, setProfilePic] = useState<string>("");
  const [profilePicFileId, setProfilePicFileId] = useState<string>("");
  const [tagline, setTagline] = useState("");
  const [shortIntro, setShortIntro] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [resumeFileId, setResumeFileId] = useState<string>("");
  const [socialMediaLinks, setSocialMediaLinks] = useState<string[]>([]);
  const [newSocialLink, setNewSocialLink] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const [idx, setIdx] = useState(-1);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const { handleUpload, deleteFile } = imageKit();
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
        setProfilePic(data.profilePicUrl || "");
        setProfilePicFileId(data.profilePicFileId || "");
        setTagline(data.tagline || "");
        setShortIntro(data.shortIntro || "");
        setResumeUrl(data.resumeUrl || "");
        setResumeFileId(data.resumeFileId || "");
        setSocialMediaLinks(data.socialMediaLinks || []);
      } catch (err: any) {
        dispatch(
          addAlertMsg({
            message: err.response?.data?.error,
            status: err.status || 400,
          })
        );
      } finally {
        setLoading(false);
      }
    };
    fetchHomeDetails();
  }, [dispatch]);

  const handleSubmit = async (updatedSocialMediaLinks?: string[]) => {
    try {
      setLoading(true);

      if (!firstName || !lastName || !emailId || !phoneNumber || !shortIntro) {
        dispatch(
          addAlertMsg({
            message: "All required fields must be filled",
            status: 400,
          })
        );
        return;
      }

      let iconUrl = profilePic;
      let iconFileId = profilePicFileId;
      let resumeLink = resumeUrl;
      let resumeFile = resumeFileId;

      // Upload new profile pic if selected
      if (fileInputRef.current && fileInputRef.current.files?.length) {
        if (profilePicFileId) {
          await deleteFile(profilePicFileId);
        }
        const uploadResponse = await handleUpload(fileInputRef);
        if (uploadResponse?.url && uploadResponse?.fileId) {
          iconUrl = uploadResponse.url;
          iconFileId = uploadResponse.fileId;
        }
      }

      // Upload new resume if selected
      if (resumeInputRef.current && resumeInputRef.current.files?.length) {
        if (resumeFileId) {
          await deleteFile(resumeFileId);
        }
        const uploadResponse = await handleUpload(resumeInputRef);
        if (uploadResponse?.url && uploadResponse?.fileId) {
          resumeLink = uploadResponse.url;
          resumeFile = uploadResponse.fileId;
        }
      }

      const payload = {
        firstName,
        lastName,
        emailId,
        phoneNumber,
        tagline,
        shortIntro,
        resumeUrl: resumeLink,
        resumeFileId: resumeFile,
        profilePicUrl: iconUrl,
        profilePicFileId: iconFileId,
        socialMediaLinks: updatedSocialMediaLinks || socialMediaLinks,
      };

      const res = await axios.patch(`${BASE_URL}/profile`, payload, {
        withCredentials: true,
      });

      dispatch(
        addAlertMsg({ message: res.data.message, status: res.data.status })
      );

      setProfilePic(iconUrl);
      setProfilePicFileId(iconFileId);
      setResumeUrl(resumeLink);
      setResumeFileId(resumeFile);
      setSocialMediaLinks(updatedSocialMediaLinks || []);
    } catch (err: any) {
      dispatch(
        addAlertMsg({
          message: err.response?.data?.error || "Upload failed",
          status: err.status || 400,
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddSocialLink = () => {
    if (newSocialLink && !socialMediaLinks.includes(newSocialLink)) {
      const updatedSocialMediaLinks = [...socialMediaLinks, newSocialLink];
      handleSubmit(updatedSocialMediaLinks);
      setNewSocialLink("");
    }
  };

  const handleRemoveSocialLink = (idx: number) => {
    const updatedSocialMediaLinks = socialMediaLinks.filter(
      (_, i) => i !== idx
    );
    setSocialMediaLinks(updatedSocialMediaLinks);
    handleSubmit(updatedSocialMediaLinks);
    setConfirmModalOpen(false);
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

        <FileUpload
          label={homeEditTxt.profilePicUrlLabel}
          fileInputRef={fileInputRef}
          currentUrl={profilePic}
          setProfilePicUrl={setProfilePic}
        />

        <FileUpload
          label={homeEditTxt.resumeUrlLabel}
          fileInputRef={resumeInputRef}
          currentUrl={resumeUrl}
          setProfilePicUrl={setResumeUrl}
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
            <span className="text-xs text-themeText/50">
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
            {socialMediaLinks.map((link, index) => (
              <PillEdit
                key={index}
                idx={index}
                link={link}
                loading={loading}
                ariaLabel={homeEditTxt.removeSocialLinkAria}
                onDelete={(idx: number) => {
                  setConfirmModalOpen(true);
                  setIdx(idx);
                }}
              />
            ))}
          </ul>
        </div>

        <Confirm
          open={confirmModalOpen}
          onCancel={() => setConfirmModalOpen(false)}
          onConfirm={() => handleRemoveSocialLink(idx)}
          title={homeEditTxt.confirmModalTitle}
          note={homeEditTxt.confirmModalNote}
        />

        <Button
          text={loading ? <Loader /> : homeEditTxt.saveBtn}
          type="submit"
          style="w-full mt-4"
          disabled={loading}
          onClick={() => handleSubmit()}
        />
      </div>
    </div>
  );
};

export default HomeEdit;
