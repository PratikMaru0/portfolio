import { useState } from "react";
import { Button } from "./common";
import Input from "./common/Input";
import TextArea from "./common/TextArea";
import { contactTxt } from "../constants/texts";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

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
        <form className="mt-8 space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              type="text"
              placeholder={contactTxt.namePlaceholder}
              val={name}
              setVal={setName}
            />
            <Input
              type="email"
              placeholder={contactTxt.emailPlaceholder}
              val={email}
              setVal={setEmail}
            />
          </div>

          <TextArea
            placeholder={contactTxt.messagePlaceholder}
            val={message}
            setVal={setMessage}
          />
          <div className="flex justify-center">
            <Button text={contactTxt.submitButton} />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
