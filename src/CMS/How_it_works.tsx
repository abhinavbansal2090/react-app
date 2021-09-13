import React, { FC } from 'react'
import { Header } from 'CMS/header'
import { Footer } from 'CMS/footer'
import { useTranslation } from 'react-i18next';

export const HowItWorks: FC = () => {
    const { t } = useTranslation();

  return (
    <div className="wrap">
                <Header />
                <section id="provider" className="provider mt-5">
        <div className="container">
            <div className="row">
                <div className="col-lg-10">
                    <div className="section-title">
                        <p>{t('#HowItWorks')}</p>
                        <p>{t('The_User_Platform')}</p>
                        <p className="mb-3">{t('Download our App, Register Your Number, Look for your perfect Experience and Book it with your preferences.')}{t('That’s It, all the big hassle to look for the perfect thing online is just a touch away from you. Here’s how')}:</p>
                    </div>
                </div>
                <div className="col-lg-2 provider-right sm-none ">
                    <img src="assets/img/Indian App developer.png" className="img-fluid" alt="Responsive image" />
                </div>
                <div className="text-center">
                    <div className="download-link">
                        <a href="#">
                            <img src="assets/img/appstore.png" alt="" />
                        </a>
                        <a href="#">
                            <img src="assets/img/playstore.png" alt="" />
                        </a>
                    </div>
                    <p className="app-title">{t('Download The App')}</p>
                </div>
                <div className="row app-group my-4">
                    <div className="col-lg-6">
                        <img src="assets/img/app-1.png" className="img-fluid" alt="Responsive image" />
                        <h4>{t('Login/Register your number and Verify It with an OTP')}.</h4>
                        <p>You can also skip this step to book as a Guest User.</p>
                    </div>
                    <div className="col-lg-6">
                        <img src="assets/img/app-2.png" className="img-fluid" alt="Responsive image" />
                        <h4>{t('Enter_your_name_and_tap_Search_For_Events')}</h4>
                        <p>{t('This won’t appear if you’ve skipped the registration/login page')}</p>
                    </div>
                </div>
                <div className="row app-group my-4">
                    <div className="col-lg-6">
                        <img src="assets/img/app-3.png" className="img-fluid" alt="Responsive image" />
                        <h4>{t('Select from the arsenal of Awesome Experiences')}</h4>
                        <p>{t('You can choose from the categories suits you the most')}</p>
                    </div>
                    <div className="col-lg-6">
                        <img src="assets/img/app-4.png" className="img-fluid" alt="Responsive image" />
                        <h4>{t('Choose your date & guest preferences')}</h4>
                        <p>{t('Review the booking and complete The payment. You are done!')}</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-10">
                    <div className="section-title">
                        <p></p>
                        <p>{t('The Provider Platform:')}</p>
                        <p className="mb-3">{t('Download our App, Register Your Number, List your experiences, Create an attractive profile and done! Enjoy the pool of amazing users exploring the best experiences offered by you. Here’s how:')}</p>

                    </div>
                </div>
                <div className="col-lg-2 provider-right sm-none  ">
                    <img src="assets/img/Indian App developer.png" className="img-fluid" alt="Responsive image" />
                </div>
                <div className="row text-center">
                    <div className="download-link">
                        <a href="#">
                            <img src="assets/img/appstore.png" alt="" />
                        </a>
                        <a href="#">
                            <img src="assets/img/playstore.png" alt="" />
                        </a>
                    </div>
                    <p className="app-title">{t('Download The App')}</p>

                </div>
                <div className="row app-group my-4">
                    <div className="col-lg-6">
                        <img src="assets/img/app-1.png" className="img-fluid" alt="Responsive image" />
                        <h4>{t('Login/Register your number and Verify It with an OTP')}.</h4>
                        <p>{t('Do not skip if you want to register as a provider as it’s a crucial step to verify yourself.')}</p>

                    </div>
                    <div className="col-lg-6">
                        <img src="assets/img/app-2.png" className="img-fluid" alt="Responsive image" />
                        <h4>{t('Enter your name and tap Become a Provider')}</h4>
                        <p>{t('This won’t appear if you’ve skipped the registration/login page')}</p>
                    </div>
                </div>

            </div>
            <div className="row justify-content-center no-gutters provider-app-img">
                <div className="col-lg-10">
                    <img src="assets/img/Image 3.png" className="img-fluid" alt="Responsive image" />
                </div>
            </div>
            <div className="row justify-content-center no-gutters">
                <div className="col-lg-10 mt-5 mb-3">
                    <h4>{t('List your experience by adding all the required details and submit. Once reviewed your experience would be live for users.')}</h4>
                    <h5 className="mt-4">{t('You can also create event specific settings to target the right audience')}</h5>
                </div>
            </div>

        </div>
    </section>
    <section id="contact" className="contact">
        <div className="container">
            <div className="section-title">
                <p>#{t('Contact Us')}</p>
                <p>{t('An_Awesome_Application_Need_An_Awesome_Support')}</p>
            </div>
            <div className="row contact-wrap no-gutters">
                <div className="col-lg-7">
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <input type="text" className="form-control" placeholder="Enter Your Name Here" />
                        </div>
                        <div className="row mb-3">
                            <div className="form-group col-md-6 contact-number">
                                <label className="form-label">Contact Number</label>
                                <input type="tel" className="form-control" placeholder="Enter Contact Number" />
                            </div>
                            <div className="form-group col-md-6">
                                <label className="form-label">You Want To</label>
                                <select className="form-control">
                                    <option>Look For Events/Experiences</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-label">Description</label>
                            <textarea className="form-control" placeholder="Enter Description" rows= {7}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
                <div className="col-lg-5">
                    <h2>Contact our Super Awesome Support!</h2>

                    <div className="container con-icon">
                        <div className="row">
                            <div className="icon-list">
                                <a href="">
                                    <i className="fa fa-instagram"></i>
                                </a>
                            </div>
                            <div className="icon-list">
                                <a href="">
                                    <i className="fa fa-whatsapp"></i>
                                </a>
                            </div>
                            <div className="icon-list">
                                <a href="">
                                    <i className="fa fa-phone"></i>
                                </a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="icon-list">
                                <a href="">
                                    <i className="fa fa-facebook-official"></i>
                                </a>
                            </div>
                            <div className="icon-list">
                                <a href="">
                                    <i className="fa fa-youtube-play"></i>
                                </a>
                            </div>
                            <div className="icon-list">
                                <a href="">
                                    <i className="fa fa-linkedin"></i>
                                </a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="icon-list">
                                <a href="">
                                    <i className="fa fa-twitter"></i>
                                </a>
                            </div>
                            <div className="icon-list">
                                <a href="">

                                    <i className="fa fa-snapchat-ghost"> </i>
                                </a>
                            </div>
                            <div className="icon-list">
                                <a href="">
                                    <i className="fa fa-pinterest-square"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
                <Footer />
    </div>
  )
}
