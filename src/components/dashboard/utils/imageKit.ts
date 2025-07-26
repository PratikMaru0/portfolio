import { useDispatch } from "react-redux";
import { addAlertMsg } from "../../../utils/store/alertSlice";
import { upload } from "@imagekit/javascript";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";

const imageKit = () => {
  const dispatch = useDispatch();
  const abortController = new AbortController();

  const authenticator = async () => {
    try {
      const res = await axios.get(BASE_URL + "/imageKitAuth");
      return res.data;
    } catch (err: any) {
      console.log(err);
      addAlertMsg({ message: err.response.data.error, status: err.status });
    }
  };

  const deleteFile = async (fileId: string) => {
    try {
      await axios.delete(BASE_URL + "/delete/" + fileId);
    } catch (err: any) {
      console.log(err);
      addAlertMsg({ message: err.response.data.error, status: err.status });
    }
  };

  const handleUpload = async (
    fileInputRef: React.RefObject<HTMLInputElement | null>,
    profilePicFileId?: string,
    resumeFileId?: string
  ) => {
    if (profilePicFileId) {
      deleteFile(profilePicFileId);
    }
    if (resumeFileId) {
      deleteFile(resumeFileId);
    }
    const fileInput = fileInputRef?.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      return;
    }

    const file = fileInput.files[0];

    try {
      let { signature, expire, token, publicKey } = await authenticator();
      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name,
        abortSignal: abortController.signal,
      });
      console.log(uploadResponse);
      return uploadResponse;
    } catch (err: any) {
      console.error(err);
      dispatch(addAlertMsg({ message: err.message, status: 400 }));
    }
  };

  function isVideo(url: string) {
    return /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(url);
  }

  return {
    handleUpload,
    deleteFile,
    authenticator,
    isVideo,
  };
};

export default imageKit;
