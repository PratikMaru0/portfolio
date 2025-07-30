import { useEffect, useRef, useState } from "react";
import Input from "../common/Input";
import TextArea from "../common/TextArea";
import { Button, Loader } from "../common";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addAlertMsg } from "../../utils/store/alertSlice";
import aboutEditTxt from "./texts/aboutEditTxt";
import FileUpload from "./common/FileUpload";
import imageKit from "./utils/imageKit";
import Confirm from "../common/Confirm";
import PillEdit from "./common/PillEdit";
interface Skill {
  _id?: string;
  skill: string;
  icon: string;
  iconFileId?: string;
}

const AboutEdit = () => {
  const [introduction, setIntroduction] = useState("");
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [newSkillIcon, setNewSkillIcon] = useState("");
  const [newSkillIconFileId, setNewSkillIconFileId] = useState<string>("");
  const [addLoading, setAddLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aboutId, setAboutId] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [deleteSkill, setDeleteSkill] = useState<any>();
  const { handleUpload } = imageKit();
  const { deleteFile } = imageKit();
  const dispatch = useDispatch();

  const fetchAbout = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/about`, {
        withCredentials: true,
      });
      const about = res.data.abouts?.[0] || {};
      setAboutId(about._id || "");
      setIntroduction(about.introduction || "");
      setSkills(about.skills || []);
    } catch (err: any) {
      dispatch(addAlertMsg({ message: aboutEditTxt.fetchError, status: 400 }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, [dispatch]);

  const handleAddSkill = async () => {
    setAddLoading(true);
    try {
      if (!newSkill || !newSkillIcon) {
        dispatch(
          addAlertMsg({ message: "Skill and icon are required", status: 400 })
        );
        return;
      }
      let iconUrl = newSkillIcon;
      let iconFileId = newSkillIconFileId;
      if (fileInputRef.current && fileInputRef.current.files?.length) {
        const uploadResponse = await handleUpload(
          fileInputRef,
          undefined,
          undefined
        );
        if (uploadResponse?.url && uploadResponse?.fileId) {
          iconUrl = uploadResponse.url;
          iconFileId = uploadResponse.fileId;
        }
      }
      const updatedSkills = [
        ...skills,
        { skill: newSkill, icon: iconUrl, iconFileId },
      ];
      setSkills(updatedSkills);
      setNewSkill("");
      setNewSkillIcon("");
      setNewSkillIconFileId("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      let res;
      if (aboutId) {
        res = await axios.put(
          `${BASE_URL}/about/${aboutId}`,
          { introduction, skills: updatedSkills },
          { withCredentials: true }
        );
      } else {
        res = await axios.post(
          `${BASE_URL}/about`,
          { introduction, skills: updatedSkills },
          { withCredentials: true }
        );
        setAboutId(res.data.abouts?._id || "");
      }
      fetchAbout();
      dispatch(
        addAlertMsg({ message: aboutEditTxt.updateSuccess, status: 200 })
      );
    } catch (err: any) {
      dispatch(addAlertMsg({ message: aboutEditTxt.updateError, status: 400 }));
    } finally {
      setAddLoading(false);
    }
  };

  const handleRemoveSkill = async (idx: number, skillObj: Skill) => {
    console.log(idx, skillObj);

    debugger;
    if (!aboutId || !skillObj._id) {
      setSkills(skills.filter((_, i) => i !== idx));
      return;
    }
    try {
      setConfirmModalOpen(false);
      setLoading(true);
      if (skillObj.iconFileId) {
        await deleteFile(skillObj.iconFileId);
      }
      await axios.delete(`${BASE_URL}/about/${aboutId}/skill/${skillObj._id}`, {
        withCredentials: true,
      });
      await fetchAbout();
      dispatch(addAlertMsg({ message: "Skill deleted", status: 200 }));
    } catch (err: any) {
      dispatch(addAlertMsg({ message: aboutEditTxt.updateError, status: 400 }));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (newSkill) {
        await handleAddSkill();
        setLoading(false);
        return;
      }

      let res;
      if (aboutId) {
        res = await axios.put(
          `${BASE_URL}/about/${aboutId}`,
          { introduction, skills },
          { withCredentials: true }
        );
      } else {
        res = await axios.post(
          `${BASE_URL}/about`,
          { introduction, skills },
          { withCredentials: true }
        );
        setAboutId(res.data.abouts?._id || "");
      }
      fetchAbout();
      dispatch(
        addAlertMsg({ message: aboutEditTxt.updateSuccess, status: 200 })
      );
    } catch (err: any) {
      dispatch(addAlertMsg({ message: aboutEditTxt.updateError, status: 400 }));
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-2xl mx-auto mt-10 bg-primary/10 border-2 rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {aboutEditTxt.heading}
      </h2>
      <div className="flex flex-col gap-5">
        <TextArea
          label={aboutEditTxt.introductionLabel}
          placeholder={aboutEditTxt.introductionPlaceholder}
          val={introduction}
          setVal={setIntroduction}
          maxLength={500}
        />
        <div>
          <div className="flex flex-col gap-2 mb-2">
            <Input
              label={aboutEditTxt.skillNameLabel}
              placeholder={aboutEditTxt.skillNamePlaceholder}
              type="text"
              val={newSkill}
              setVal={setNewSkill}
              required
            />

            <FileUpload
              label={aboutEditTxt.skillIconLabel}
              fileInputRef={fileInputRef}
              setProfilePicUrl={setNewSkillIcon}
            />

            <Button
              text={addLoading ? <Loader /> : aboutEditTxt.addSkillBtn}
              type="button"
              onClick={handleAddSkill}
              disabled={addLoading}
            />
            <p>
              Download icons from site :-{" "}
              <a
                href={aboutEditTxt.iconLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Link
              </a>
            </p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {skills.length === 0 && (
              <div className="w-full justify-center">
                <li className="text-xs text-center italic">
                  {aboutEditTxt.noSkills}
                </li>
              </div>
            )}
            {skills.map((skillObj, idx) => (
              <PillEdit
                key={skillObj._id || idx}
                idx={idx}
                link={skillObj.skill}
                mediaUrl={skillObj.icon}
                loading={addLoading}
                ariaLabel={aboutEditTxt.removeSkillAria}
                onDelete={() => {
                  setDeleteSkill({
                    idx,
                    skill: skillObj,
                    icon: skillObj.icon,
                  });
                  setConfirmModalOpen(true);
                }}
              />
            ))}
          </ul>
        </div>
        <Confirm
          open={confirmModalOpen}
          onCancel={() => setConfirmModalOpen(false)}
          onConfirm={() =>
            handleRemoveSkill(deleteSkill.idx, deleteSkill.skill)
          }
          title={aboutEditTxt.deleteTitle}
          note={aboutEditTxt.deleteNote}
        />
        <Button
          text={loading ? <Loader /> : aboutEditTxt.saveBtn}
          type="submit"
          style="w-full mt-4"
          disabled={loading}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AboutEdit;
