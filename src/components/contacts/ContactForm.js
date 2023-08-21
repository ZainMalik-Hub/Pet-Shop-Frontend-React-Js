import React, { useState } from "react";
import ContactAddress from "./ContactAddress";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const templateParams = {
    user_name: name,
    user_email: email,
    message: message,
  };

  function formSubmit(e) {
    e.preventDefault();
    emailjs
      .send(
        "service_fvt98ao",
        "template_8pwpo8t",
        templateParams,
        "PkjGQpSxrZfN6bc54"
      )
      .then(
        (response) => {
          if (response.status) {
            setName("");
            setEmail("");
            setMessage("");
            return toast.success(
              "Email sent! we will let you in short time ! "
            );
          }
          // console.log("SUCCESS!", response.status, response.text);
        },
        (err) => {
          console.log("FAILED...", err);
        }
      );
  }

  return (
    <section className='contact-area pt-110 pb-110'>
      <div className='container'>
        <div className='container-inner-wrap'>
          <div className='row justify-content-center justify-content-lg-between'>
            <div className='col-lg-6 col-md-8 order-2 order-lg-0'>
              <div className='contact-title mb-20'>
                <h5 className='sub-title'>Contact Us</h5>
                <h2 className='title'>
                  Let's Talk Question<span>.</span>
                </h2>
              </div>
              <div className='contact-wrap-content'>
                <p>
                  The domestic dog is a doiated dendant of the wolf. The dog
                  derived from an ancient, extinct wolf, and the modern grey.
                </p>
                <form onSubmit={(e) => formSubmit(e)} className='contact-form'>
                  <div className='form-grp'>
                    <label htmlFor='name'>
                      Your Name <span>*</span>
                    </label>
                    <input
                      name='name'
                      required
                      type='text'
                      id='name'
                      placeholder='Jon Deo...'
                      value={name}
                      onChange={handleNameChange}
                    />
                  </div>
                  <div className='form-grp'>
                    <label htmlFor='email'>
                      Your Email <span>*</span>
                    </label>
                    <input
                      name='email'
                      required
                      type='text'
                      id='email'
                      placeholder='info.example@.com'
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <div className='form-grp'>
                    <label htmlFor='message'>
                      Your Message <span>*</span>
                    </label>
                    <textarea
                      required
                      name='message'
                      id='message'
                      placeholder='Opinion...'
                      defaultValue={""}
                      value={message}
                      onChange={handleMessageChange}
                    />
                  </div>
                  {/* <div className='form-grp checkbox-grp'>
                    <input type='checkbox' id='checkbox' />
                    <label htmlFor='checkbox'>
                      Don’t show your email address
                    </label>
                  </div> */}
                  <button type='submit' className='btn rounded-btn'>
                    Send Now
                  </button>
                </form>
              </div>
            </div>

            <ContactAddress />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
