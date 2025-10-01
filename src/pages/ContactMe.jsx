import React from "react";
import ContactForm from "../components/ContactForm";

const ContactMe = () => {
  return (
    <div>
      <h1 className="text-black">
        Contact Me!
      </h1>
      <div className="mt-15">
      <ContactForm />
      </div>
    </div>
  )
}

export default ContactMe;
