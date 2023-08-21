import React from "react";

function ContactAddress() {
  return (
    <div className='col-xl-5 col-lg-6 col-md-8'>
      <div className='contact-info-wrap'>
        <div className='contact-img'>
          <img src='img/images/contact_img.png' alt='' />
        </div>
        <div className='contact-info-list'>
          <ul>
            <li>
              <div className='icon'>
                <i className='fas fa-map-marker-alt' />
              </div>
              <div className='content'>
                <p>Johar town, lahore, lahore 54782 Pakistan</p>
              </div>
            </li>
            <li>
              <div className='icon'>
                <i className='fas fa-phone-alt' />
              </div>
              <div className='content'>
                <p>+92 3204170794</p>
              </div>
            </li>
            <li>
              <div className='icon'>
                <i className='fas fa-envelope-open' />
              </div>
              <div className='content'>
                <p>official.vetcare@gmail.com</p>
              </div>
            </li>
          </ul>
        </div>

        <div className='contact-social'>
          <ul>
            <li>
              <a href='/#'>
                <i className='fab fa-facebook-f' />
              </a>
            </li>
            <li>
              <a href='/#'>
                <i className='fab fa-twitter' />
              </a>
            </li>
            <li>
              <a href='/#'>
                <i className='fab fa-linkedin-in' />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ContactAddress;
