import { useState } from "react";
import { Button, Loader } from "../components/common";
import Input from "../components/common/Input";
import TextArea from "../components/common/TextArea";
import { contactTxt } from "../constants/texts";
import axios from "axios";
import { config } from "../constants/texts";
import { useDispatch } from "react-redux";
import { addAlertMsg } from "../utils/store/alertSlice";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_TEMPLATE_ID;
  const userId = import.meta.env.VITE_USERID;
  const [loading, setLoading] = useState(false);

  const sendEmail = (e: any) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        config.emailJSLink,
        {
          service_id: serviceId,
          template_id: templateId,
          user_id: userId,
          template_params: {
            name: name,
            email: import.meta.env.VITE_EMAIL_ID,
            message: message,
            reply_to: email,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        dispatch(addAlertMsg({ message: contactTxt.emailSent, status: 200 }));
        console.log(response.data);
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((err: any) => {
        console.log(err);
        dispatch(addAlertMsg({ message: contactTxt.emailError, status: 400 }));
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <section className="flex flex-1 items-center justify-center px-4 py-10 sm:py-12 md:py-16">
      <div className="max-w-xl sm:max-w-2xl w-full text-center space-y-6">
        <div className="space-y-2">
          <p className="mt-6 text-base sm:text-lg">{contactTxt.subtitle}</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold">
            {contactTxt.title}
          </h1>
          <p className="text-sm sm:text-base md:text-lg mt-2">
            {contactTxt.description}
          </p>
        </div>
        <form
          className="mt-8 sm:mt-10 space-y-6 sm:space-y-8"
          onSubmit={sendEmail}
        >
          <div className="flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-6">
            <Input
              type="text"
              placeholder={contactTxt.namePlaceholder}
              val={name}
              setVal={setName}
              required
            />
            <Input
              type="email"
              placeholder={contactTxt.emailPlaceholder}
              val={email}
              setVal={setEmail}
              required
            />
          </div>

          <TextArea
            placeholder={contactTxt.messagePlaceholder}
            val={message}
            setVal={setMessage}
            maxLength={500}
          />
          <div className="flex justify-center">
            <Button
              text={loading ? <Loader /> : contactTxt.submitButton}
              type="submit"
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
