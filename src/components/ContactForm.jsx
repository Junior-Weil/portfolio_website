import { useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stateMessage, setStateMessage] = useState(null);
  const sendEmail = (e) => {
    e.persist();
    e.preventDefault();
    setIsSubmitting(true);
    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        e.target,
        process.env.REACT_APP_PUBLIC_KEY
      )
      .then(
        (result) => {
          setStateMessage('Message sent!');
          setIsSubmitting(false);
          setTimeout(() => {
            setStateMessage(null);
          }, 5000); // hide message after 5 seconds
        },
        (error) => {
          setStateMessage('Something went wrong, please try again later');
          setIsSubmitting(false);
          setTimeout(() => {
            setStateMessage(null);
          }, 5000); // hide message after 5 seconds
        }
      );

    // Clears the form after sending the email
    e.target.reset();
  };
  return (
    <form onSubmit={sendEmail}>
      <div className="flex flex-grid gap-x-4">
        <div className='flex flex-col gap-y-4'>
          <label className='text-black'>Name</label>
          <input className='border border-black rounded' value={name} onChange={(e) => setName} type="text" name="user_name" />
        </div>
        <div className='flex flex-col gap-y-4'>
          <label className='text-black'>Email</label>
          <input className='border border-black rounded' type="email" name="user_email" />
        </div>
        <div className='flex flex-col gap-y-4'>
          <label className='text-black'>Message</label>
          <textarea className='border border-black rounded' name="message" />
        </div>
      </div>
      <div className='mt-8'>
        <button >
          <input className="text-white" type="submit" value="Send" disabled={isSubmitting} />
          {stateMessage && <p>{stateMessage}</p>}
        </button>
      </div>
    </form>
  );
};
export default ContactForm;
