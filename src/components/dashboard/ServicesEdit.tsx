import { useEffect, useRef, useState } from "react";
import Input from "../common/Input";
import TextArea from "../common/TextArea";
import { Button, CardModal, Loader } from "../common";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addAlertMsg } from "../../utils/store/alertSlice";
import servicesEditTxt from "./texts/servicesEditTxt";
import FileUpload from "./common/FileUpload";
import imageKit from "./utils/imageKit";
import Confirm from "../common/Confirm";
import PillEdit from "./common/PillEdit";

interface Service {
  _id?: string;
  service: string;
  description: string;
  icon: string;
  iconFileId?: string;
}

const ServicesEdit = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [newService, setNewService] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newIcon, setNewIcon] = useState("");
  const [newIconFileId, setNewIconFileId] = useState<string>("");
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Inline edit state (top-level)
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editService, setEditService] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editIcon, setEditIcon] = useState("");
  const [editIconFileId, setEditIconFileId] = useState("");
  const [deleteService, setDeleteService] = useState<any>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleEdit = (idx: number, serviceObj: Service) => {
    setEditingIdx(idx);
    setEditService(serviceObj.service);
    setEditDescription(serviceObj.description);
    setEditIcon(serviceObj.icon);
    setEditIconFileId(serviceObj.iconFileId || "");
    if (editFileInputRef.current) editFileInputRef.current.value = "";
  };

  const handleCancel = () => {
    setEditingIdx(null);
    setEditService("");
    setEditDescription("");
    setEditIcon("");
    setEditIconFileId("");
    if (editFileInputRef.current) editFileInputRef.current.value = "";
  };

  const handleSave = async (idx: number, serviceObj: Service) => {
    if (!editService || !editDescription || !editIcon) {
      dispatch(
        addAlertMsg({
          message: servicesEditTxt.requiredField,
          status: 400,
        })
      );
      return;
    }
    setLoading(true);
    try {
      let iconUrl = editIcon;
      let iconFileId = editIconFileId;
      if (editFileInputRef.current && editFileInputRef.current.files?.length) {
        if (serviceObj.iconFileId) {
          await deleteFile(serviceObj.iconFileId);
        }
        const uploadResponse = await handleUpload(editFileInputRef);
        if (uploadResponse?.url && uploadResponse?.fileId) {
          iconUrl = uploadResponse.url;
          iconFileId = uploadResponse.fileId;
        }
      }
      const payload = {
        service: editService,
        description: editDescription,
        icon: iconUrl,
        iconFileId,
      };
      const res = await axios.patch(
        `${BASE_URL}/services/${serviceObj._id}`,
        payload,
        { withCredentials: true }
      );
      const updated = res.data.data;
      setServices((prev) => prev.map((s, i) => (i === idx ? updated : s)));
      setEditingIdx(null);
      dispatch(
        addAlertMsg({
          message: servicesEditTxt.updateSuccess,
          status: 200,
        })
      );
    } catch (err: any) {
      dispatch(
        addAlertMsg({
          message: servicesEditTxt.updateError,
          status: 400,
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { handleUpload, deleteFile } = imageKit();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/services`, {
          withCredentials: true,
        });
        setServices(res.data.data || []);
      } catch (err: any) {
        dispatch(
          addAlertMsg({ message: servicesEditTxt.fetchError, status: 400 })
        );
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [dispatch]);

  const handleAddService = async () => {
    setLoading(true);
    try {
      if (!newService || !newDescription || !newIcon) {
        dispatch(
          addAlertMsg({ message: servicesEditTxt.requiredField, status: 400 })
        );
        return;
      }
      let iconUrl = newIcon;
      let iconFileId = newIconFileId;
      if (fileInputRef.current && fileInputRef.current.files?.length) {
        const uploadResponse = await handleUpload(fileInputRef);
        if (uploadResponse?.url && uploadResponse?.fileId) {
          iconUrl = uploadResponse.url;
          iconFileId = uploadResponse.fileId;
        }
      }
      const newServiceObj = {
        service: newService,
        description: newDescription,
        icon: iconUrl,
        iconFileId,
      };
      const res = await axios.post(`${BASE_URL}/services`, newServiceObj, {
        withCredentials: true,
      });
      setServices([...services, res.data.data]);
      setNewService("");
      setNewDescription("");
      setNewIcon("");
      setNewIconFileId("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      dispatch(
        addAlertMsg({ message: servicesEditTxt.updateSuccess, status: 200 })
      );
    } catch (err: any) {
      dispatch(addAlertMsg({ message: servicesEditTxt.addError, status: 400 }));
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveService = async (idx: number, serviceObj: Service) => {
    setConfirmModalOpen(false);
    if (!serviceObj._id) {
      setServices(services.filter((_, i) => i !== idx));
      return;
    }
    try {
      setLoading(true);
      if (serviceObj.iconFileId) {
        await deleteFile(serviceObj.iconFileId);
      }
      await axios.delete(`${BASE_URL}/services/${serviceObj._id}`, {
        withCredentials: true,
      });
      setServices(services.filter((_, i) => i !== idx));
      dispatch(
        addAlertMsg({ message: servicesEditTxt.removeSuccess, status: 200 })
      );
    } catch (err: any) {
      dispatch(
        addAlertMsg({ message: servicesEditTxt.removeError, status: 400 })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-primary/10 border-2 rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {servicesEditTxt.heading}
      </h2>
      <div className="flex flex-col gap-5">
        <Input
          label={servicesEditTxt.serviceLabel}
          placeholder={servicesEditTxt.servicePlaceholder}
          type="text"
          val={newService}
          setVal={setNewService}
          required
        />
        <TextArea
          label={servicesEditTxt.descriptionLabel}
          placeholder={servicesEditTxt.descriptionPlaceholder}
          val={newDescription}
          setVal={setNewDescription}
          maxLength={500}
        />
        <FileUpload
          label={servicesEditTxt.iconLabel}
          fileInputRef={fileInputRef}
          setProfilePicUrl={setNewIcon}
          currentUrl={newIcon}
        />
        <Button
          text={loading ? <Loader /> : servicesEditTxt.addServiceBtn}
          type="button"
          onClick={handleAddService}
          disabled={loading}
        />
        <p>
          Download icons from site :-{" "}
          <a
            href={servicesEditTxt.iconLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Link
          </a>
        </p>
        <ul className="flex flex-wrap gap-2">
          {services.length === 0 && (
            <div className="w-full justify-center">
              <li className="text-xs text-center italic">
                {servicesEditTxt.noServices}
              </li>
            </div>
          )}
          {services.map((serviceObj, idx) => (
            <PillEdit
              key={serviceObj._id || idx}
              idx={idx}
              link={serviceObj.service}
              mediaUrl={serviceObj.icon}
              loading={loading}
              ariaLabel={servicesEditTxt.removeServiceAriaLabel}
              onEdit={() => {
                setOpenEditModal(true);
                handleEdit(idx, serviceObj);
              }}
              onDelete={() => {
                setConfirmModalOpen(true);
                setDeleteService({ service: serviceObj, idx });
              }}
            />
          ))}
        </ul>

        {openEditModal && editingIdx !== null && (
          <CardModal
            openModal={openEditModal}
            setOpenModal={setOpenEditModal}
            modalRef={modalRef}
            title={servicesEditTxt.heading}
          >
            <div className="flex flex-col w-full gap-5 mb-2 ">
              <Input
                label={servicesEditTxt.serviceLabel}
                placeholder={servicesEditTxt.servicePlaceholder}
                type="text"
                val={editService}
                setVal={setEditService}
                required
              />
              <TextArea
                label={servicesEditTxt.descriptionLabel}
                placeholder={servicesEditTxt.descriptionPlaceholder}
                val={editDescription}
                setVal={setEditDescription}
                maxLength={500}
              />
              <FileUpload
                label={servicesEditTxt.iconLabel}
                fileInputRef={editFileInputRef}
                setProfilePicUrl={setEditIcon}
                currentUrl={editIcon}
              />
              <div className="flex flex-row items-center justify-end">
                <Button
                  text={servicesEditTxt.cancelBtn}
                  type="button"
                  onClick={() => {
                    handleCancel();
                    setOpenEditModal(false);
                  }}
                  disabled={loading}
                  style="ml-2"
                />
                <Button
                  text={loading ? <Loader /> : servicesEditTxt.saveBtn}
                  type="submit"
                  onClick={() => handleSave(editingIdx, services[editingIdx])}
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
            handleRemoveService(deleteService.idx, deleteService.service);
          }}
          title={servicesEditTxt.confirmModalTitle}
          note={servicesEditTxt.confirmModalNote}
        />
      </div>
    </div>
  );
};

export default ServicesEdit;
