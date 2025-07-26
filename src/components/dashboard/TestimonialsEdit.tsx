import { useEffect, useRef, useState } from "react";
import Input from "../common/Input";
import TextArea from "../common/TextArea";
import { Button, CardModal, Loader } from "../common";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addAlertMsg } from "../../utils/store/alertSlice";
import testimonialsEditTxt from "./texts/testimonialsEditTxt";
import FileUpload from "./common/FileUpload";
import imageKit from "./utils/imageKit";
import Confirm from "../common/Confirm";
import ActionButton from "../common/ActionButton";

interface Testimonial {
  _id?: string;
  projectName: string;
  description: string;
  problemSolve?: string;
  techStack?: string[];
  gitHubLink?: string;
  liveLink?: string;
  imageUrl: string;
  imageFileId?: string;
}

const TestimonialsEdit = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [newName, setNewName] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [newSummary, setNewSummary] = useState("");
  const [newTechStack, setNewTechStack] = useState<string[]>([]);
  const [newGitHubLink, setNewGitHubLink] = useState("");
  const [newLiveLink, setNewLiveLink] = useState("");
  const [newFileUrl, setNewFileUrl] = useState("");
  const [newFileId, setNewFileId] = useState<string>("");
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editMessage, setEditMessage] = useState("");
  const [editSummary, setEditSummary] = useState("");
  const [editTechStack, setEditTechStack] = useState<string[]>([]);
  const [editGitHubLink, setEditGitHubLink] = useState("");
  const [editLiveLink, setEditLiveLink] = useState("");
  const [editFileUrl, setEditFileUrl] = useState("");
  const [editFileId, setEditFileId] = useState("");
  const [deleteTestimonial, setDeleteTestimonial] = useState<any>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { handleUpload, deleteFile } = imageKit();
  const dispatch = useDispatch();

  // Fetch testimonials
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/projects`, {
          withCredentials: true,
        });
        setTestimonials(res.data.data || []);
      } catch (err: any) {
        dispatch(
          addAlertMsg({ message: err.response.data.error, status: err.status })
        );
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, [dispatch]);

  const handleAddTestimonial = async () => {
    setLoading(true);
    try {
      if (!newName || !newMessage || !newFileUrl) {
        dispatch(
          addAlertMsg({
            message: testimonialsEditTxt.requiredField,
            status: 400,
          })
        );
        return;
      }
      let fileUrl = newFileUrl;
      let fileId = newFileId;
      if (fileInputRef.current && fileInputRef.current.files?.length) {
        const uploadResponse = await handleUpload(fileInputRef);
        if (uploadResponse?.url && uploadResponse?.fileId) {
          fileUrl = uploadResponse.url;
          fileId = uploadResponse.fileId;
        }
      }
      const newTestimonialObj: Testimonial = {
        projectName: newName,
        description: newMessage,
        problemSolve: newSummary,
        techStack: newTechStack,
        gitHubLink: newGitHubLink,
        liveLink: newLiveLink,
        imageUrl: fileUrl,
        imageFileId: fileId,
      };
      const res = await axios.post(`${BASE_URL}/projects`, newTestimonialObj, {
        withCredentials: true,
      });
      setTestimonials([...testimonials, res.data.data]);
      setNewName("");
      setNewMessage("");
      setNewSummary("");
      setNewTechStack([]);
      setNewGitHubLink("");
      setNewLiveLink("");
      setNewFileUrl("");
      setNewFileId("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      dispatch(
        addAlertMsg({ message: testimonialsEditTxt.uploadSuccess, status: 200 })
      );
    } catch (err: any) {
      dispatch(
        addAlertMsg({ message: err.response.data.error, status: err.status })
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (idx: number, testimonialObj: Testimonial) => {
    setEditingIdx(idx);
    setEditName(testimonialObj.projectName);
    setEditMessage(testimonialObj.description);
    setEditSummary(testimonialObj.problemSolve || "");
    setEditTechStack(testimonialObj.techStack || []);
    setEditGitHubLink(testimonialObj.gitHubLink || "");
    setEditLiveLink(testimonialObj.liveLink || "");
    setEditFileUrl(testimonialObj.imageUrl);
    setEditFileId(testimonialObj.imageFileId || "");
    if (editFileInputRef.current) editFileInputRef.current.value = "";
  };

  const handleCancel = () => {
    setEditingIdx(null);
    setEditName("");
    setEditMessage("");
    setEditSummary("");
    setEditTechStack([]);
    setEditGitHubLink("");
    setEditLiveLink("");
    setEditFileUrl("");
    setEditFileId("");
    if (editFileInputRef.current) editFileInputRef.current.value = "";
  };

  const handleSave = async (idx: number, testimonialObj: Testimonial) => {
    if (!editName || !editMessage || !editFileUrl) {
      dispatch(
        addAlertMsg({ message: testimonialsEditTxt.requiredField, status: 400 })
      );
      return;
    }
    setLoading(true);
    try {
      let fileUrl = editFileUrl;
      let fileId = editFileId;
      if (editFileInputRef.current && editFileInputRef.current.files?.length) {
        if (testimonialObj.imageFileId) {
          await deleteFile(testimonialObj.imageFileId);
        }
        const uploadResponse = await handleUpload(editFileInputRef);
        if (uploadResponse?.url && uploadResponse?.fileId) {
          fileUrl = uploadResponse.url;
          fileId = uploadResponse.fileId;
        }
      }
      const payload = {
        projectName: editName,
        description: editMessage,
        problemSolve: editSummary,
        techStack: editTechStack,
        gitHubLink: editGitHubLink,
        liveLink: editLiveLink,
        imageUrl: fileUrl,
        imageFileId: fileId,
      };
      const res = await axios.patch(
        `${BASE_URL}/projects/${testimonialObj._id}`,
        payload,
        { withCredentials: true }
      );
      const updated = res.data.data;
      setTestimonials((prev) => prev.map((t, i) => (i === idx ? updated : t)));
      setEditingIdx(null);
      dispatch(
        addAlertMsg({ message: testimonialsEditTxt.uploadSuccess, status: 200 })
      );
    } catch (err: any) {
      dispatch(
        addAlertMsg({ message: err.response.data.error, status: err.status })
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveTestimonial = async (
    idx: number,
    testimonialObj: Testimonial
  ) => {
    setConfirmModalOpen(false);
    if (!testimonialObj._id) {
      setTestimonials(testimonials.filter((_, i) => i !== idx));
      return;
    }
    try {
      setLoading(true);
      if (testimonialObj.imageFileId) {
        await deleteFile(testimonialObj.imageFileId);
      }
      await axios.delete(`${BASE_URL}/projects/${testimonialObj._id}`, {
        withCredentials: true,
      });
      setTestimonials(testimonials.filter((_, i) => i !== idx));
      dispatch(
        addAlertMsg({ message: testimonialsEditTxt.delete, status: 200 })
      );
    } catch (err: any) {
      dispatch(
        addAlertMsg({ message: err.response.data.error, status: err.status })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-primary/10 border-2 rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {testimonialsEditTxt.add}
      </h2>
      <div className="flex flex-col gap-5">
        <Input
          label={testimonialsEditTxt.projectName}
          placeholder={testimonialsEditTxt.projectNamePlaceholder}
          type="text"
          val={newName}
          setVal={setNewName}
          required
        />
        <TextArea
          label={testimonialsEditTxt.description}
          placeholder={testimonialsEditTxt.descriptionPlaceholder}
          val={newMessage}
          setVal={setNewMessage}
          maxLength={500}
        />
        <Input
          label={testimonialsEditTxt.problemSolve}
          placeholder={testimonialsEditTxt.problemSolvePlaceholder}
          type="text"
          val={newSummary}
          setVal={setNewSummary}
        />
        <Input
          label={testimonialsEditTxt.techStack}
          placeholder={testimonialsEditTxt.techStackPlaceholder}
          type="text"
          val={newTechStack.join(", ")}
          setVal={(v: string) =>
            setNewTechStack(
              v
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            )
          }
        />
        <Input
          label={testimonialsEditTxt.gitHubLink}
          placeholder={testimonialsEditTxt.gitHubLinkPlaceholder}
          type="text"
          val={newGitHubLink}
          setVal={setNewGitHubLink}
        />
        <Input
          label={testimonialsEditTxt.liveLink}
          placeholder={testimonialsEditTxt.liveLinkPlaceholder}
          type="text"
          val={newLiveLink}
          setVal={setNewLiveLink}
        />
        <FileUpload
          label={testimonialsEditTxt.upload}
          fileInputRef={fileInputRef}
          setProfilePicUrl={setNewFileUrl}
          currentUrl={newFileUrl}
        />
        <Button
          text={loading ? <Loader /> : testimonialsEditTxt.add}
          type="button"
          onClick={handleAddTestimonial}
          disabled={loading}
        />
        <ul className="flex flex-wrap gap-2">
          {testimonials.length === 0 && (
            <div className="w-full justify-center">
              <li className="text-xs text-center italic">
                {testimonialsEditTxt.emptyList}
              </li>
            </div>
          )}
          {testimonials.map((testimonialObj, idx) => (
            <li
              key={testimonialObj._id || idx}
              className="flex items-center bg-primary/10 border border-primary/70 px-3 py-1 rounded shadow text-xs gap-2"
            >
              <span className="truncate max-w-[120px]">
                {testimonialObj.projectName}
              </span>
              {testimonialObj.imageUrl &&
                (testimonialObj.imageUrl.match(/\.(mp4|webm|ogg)$/i) ? (
                  <video
                    src={testimonialObj.imageUrl}
                    className="w-10 h-10 ml-2 rounded object-cover border"
                    controls
                  />
                ) : (
                  <img
                    src={testimonialObj.imageUrl}
                    alt={testimonialsEditTxt.altImageTxt}
                    className="w-10 h-10 ml-2 rounded object-cover border"
                  />
                ))}
              <ActionButton
                text={"✏️"}
                onClick={() => {
                  setOpenEditModal(true);
                  handleEdit(idx, testimonialObj);
                }}
                disabled={loading}
                style=" border-none px-0 py-0"
              />
              <ActionButton
                text={"❌"}
                onClick={() => {
                  setConfirmModalOpen(true);
                  setDeleteTestimonial({
                    testimonial: testimonialObj,
                    idx,
                  });
                }}
                disabled={loading}
                style="border-none px-0 py-0"
              />
            </li>
          ))}
        </ul>
        {openEditModal && editingIdx !== null && (
          <CardModal
            openModal={openEditModal}
            setOpenModal={setOpenEditModal}
            modalRef={modalRef}
            title={testimonialsEditTxt.edit}
          >
            <div className="flex flex-col w-full gap-5 mb-2 ">
              <Input
                label={testimonialsEditTxt.projectName}
                placeholder={testimonialsEditTxt.projectNamePlaceholder}
                type="text"
                val={editName}
                setVal={setEditName}
                required
              />
              <TextArea
                label={testimonialsEditTxt.description}
                placeholder={testimonialsEditTxt.descriptionPlaceholder}
                val={editMessage}
                setVal={setEditMessage}
                maxLength={500}
              />
              <Input
                label={testimonialsEditTxt.problemSolve}
                placeholder={testimonialsEditTxt.problemSolvePlaceholder}
                type="text"
                val={editSummary}
                setVal={setEditSummary}
              />
              <Input
                label={testimonialsEditTxt.techStack}
                placeholder={testimonialsEditTxt.techStackPlaceholder}
                type="text"
                val={editTechStack.join(", ")}
                setVal={(v: string) =>
                  setEditTechStack(
                    v
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean)
                  )
                }
              />
              <Input
                label={testimonialsEditTxt.gitHubLink}
                placeholder={testimonialsEditTxt.gitHubLinkPlaceholder}
                type="text"
                val={editGitHubLink}
                setVal={setEditGitHubLink}
              />
              <Input
                label={testimonialsEditTxt.liveLink}
                placeholder={testimonialsEditTxt.liveLinkPlaceholder}
                type="text"
                val={editLiveLink}
                setVal={setEditLiveLink}
              />
              <FileUpload
                label={testimonialsEditTxt.upload}
                fileInputRef={editFileInputRef}
                setProfilePicUrl={setEditFileUrl}
                currentUrl={editFileUrl}
              />
              <div className="flex flex-row items-center justify-end">
                <Button
                  text={testimonialsEditTxt.cancel}
                  type="button"
                  onClick={() => {
                    handleCancel();
                    setOpenEditModal(false);
                  }}
                  disabled={loading}
                  style="ml-2"
                />
                <Button
                  text={loading ? <Loader /> : testimonialsEditTxt.save}
                  type="submit"
                  onClick={() =>
                    handleSave(editingIdx, testimonials[editingIdx])
                  }
                  disabled={loading}
                  style="ml-2"
                />
              </div>
            </div>
          </CardModal>
        )}
        <Confirm
          open={confirmModalOpen}
          onCancel={() => setConfirmModalOpen(false)}
          onConfirm={() => {
            setOpenEditModal(false);
            handleRemoveTestimonial(
              deleteTestimonial.idx,
              deleteTestimonial.testimonial
            );
          }}
          title={testimonialsEditTxt.confirmDelete}
          note={testimonialsEditTxt.confirmModalNote}
        />
      </div>
    </div>
  );
};

export default TestimonialsEdit;
