import React from "react";
import ContactBreadCumb from "../components/contacts/ContactBreadCumb";
import NewsLetter from "../components/NewsLetter";
import ContactForm from "../components/contacts/ContactForm";
import emailjs from "@emailjs/browser";

const templateParams = {
  user_name: "James",
  user_email: "mzain6805@gmail.com",
  message: "Check this out!",
};

// emailjs
//   .send(
//     "service_fvt98ao",
//     "template_8pwpo8t",
//     templateParams,
//     "PkjGQpSxrZfN6bc54"
//   )
//   .then(
//     (response) => {
//       console.log("SUCCESS!", response.status, response.text);
//     },
//     (err) => {
//       console.log("FAILED...", err);
//     }
//   );
function ContactPage() {
  return (
    <main>
      <ContactBreadCumb />
      <ContactForm />
      {/* <NewsLetter /> */}
    </main>
  );
}

export default ContactPage;
