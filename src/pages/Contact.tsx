import { useState } from "react";
import { Button } from "../components/common";
import Input from "../components/common/Input";
import TextArea from "../components/common/TextArea";
import { contactTxt } from "../constants/texts";
import axios from "axios";
import { config } from "../constants/texts";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_TEMPLATE_ID;
  const userId = import.meta.env.VITE_USERID;

  const sendEmail = (e: any) => {
    e.preventDefault();
    axios
      .post(
        config.emailJSLink,
        {
          service_id: serviceId,
          template_id: templateId,
          user_id: userId,
          template_params: {
            name: name,
            email: email,
            message: message,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        alert(contactTxt.emailSent);
        console.log(response.data);
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((error) => {
        console.error(contactTxt.emailError, error);
      });
  };
  return (
    <section className="flex flex-1 items-center justify-center">
      <div className="max-w-2xl w-full text-center space-y-6">
        <div className="space-y-2">
          <p className="mt-8 text-lg">{contactTxt.subtitle}</p>
          <h1 className="text-5xl font-serif font-semibold">
            {contactTxt.title}
          </h1>
          <p className="text-base mt-2">{contactTxt.description}</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={sendEmail}>
          <div className="flex flex-col md:flex-row gap-4">
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
            <Button text={contactTxt.submitButton} type="submit" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
