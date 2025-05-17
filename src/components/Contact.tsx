import { useState } from "react";
import { Button } from "./common";
import Input from "./common/Input";
import TextArea from "./common/TextArea";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <section className="flex flex-1 items-center justify-center">
      <div className="max-w-2xl w-full text-center space-y-6">
        <div className="space-y-2">
          <p className="mt-8 text-lg">Connect with me</p>
          <h1 className="text-5xl font-serif font-semibold">Get in touch</h1>
          <p className="text-base mt-2">
            I&apos;d love to hear from you! If you have any questions, comments
            or feedback, please use the form below.
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              type="text"
              placeholder="Enter your name"
              val={name}
              setVal={setName}
            />
            <Input
              type="email"
              placeholder="Enter your email"
              val={email}
              setVal={setEmail}
            />
          </div>

          <TextArea
            placeholder="Enter your message"
            val={message}
            setVal={setMessage}
          />
          <div className="flex justify-center">
            <Button text="Submit Now -> " />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
