import React, { FC } from 'react'
import { Header } from 'CMS/header'
import { Footer } from 'CMS/footer'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

export const LandingPage: FC = () => {

    const { t } = useTranslation();

  return (
    <div className="wrap">
                <Header />
                <section id="track-app" className="track-app">
                    <div className="container">
                        <div className="section-title">
                            <p>{t('TrackAPP')}</p>
                            <p>{t('Enjoy_The_Indulging_Experiences_Tailored_By_Top_Notch_Providers')}</p>
                            <p>{t('TrackApp_has_an_amazing_arsenal_of')} {t('experiences_to_choose_from')}, {t('devoted_experience_providers_and_a_fluidic')} {t('booking_experience')} all together.</p>
                        </div>
                        <div className="row no-gutters">
                            <img src="assets/img/TrackAPP.png" className="img-fluid" alt="Responsive image" /> 
                        </div>
                    </div>
                </section>
                <section id="features" className="features">
                    <div className="container">
                        <div className="section-title">
                            <p>#{t('Features')}</p>
                            <p>The Specificity Of Genre Of Experiences And Their Segmentations</p>
                            <p>The experiences are consciously placed in the categories such that you are just one tap away from</p>
                        </div>
                        <div className="row">
                            <div className="image offset-xl-1 col-xl-4 d-flex align-items-stretch justify-content-center">
                                <img src="assets/img/features.png" className="img-fluid features-img" alt="" />
                            </div>
                            <div className="offset-xl-2 col-xl-5 d-flex align-items-stretch ">
                                <div className="content d-flex flex-column justify-content-center">
                                    <div className="row">
                                        <ul>
                                            <li>
                                                <img src="assets/img/BoatTravel.png" alt="" />
                                                <p>{t('Adventure')}</p>
                                            </li>
                                            <li>
                                                <img src="assets/img/Walk to Work.png" alt="" />
                                                <p>{t('In_the_city')}</p>
                                            </li>
                                            <li>
                                                <img src="assets/img/Teaching and learning in school.png" alt="" />
                                                <p>{t('Educational')}</p>
                                            </li>
                                            <li>
                                                <img src="assets/img/Eid celeberation.png" alt="" />
                                                <p>{t('City_landmarks')}</p>
                                            </li>
                                            <li>
                                                <img src="assets/img/Soccer Match.png" alt="" />
                                                <p>{t('Sport')}</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="provider" className="provider">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10">
                                <div className="section-title">
                                    <p>#BecomeAProvider</p>
                                    <p>{t('The_Perfect_Platform_For_Experienc_Providers_To_Showcase_Their_Beloved_Event’s_&_Experiences')}
                                    </p>
                                    <p className="mb-3">{t('The_TrackApp_is_loaded_with_options_to_showcase_the_exact_idea_of_your_Event_&_Experiences.')}
                                    {t('The_options_to_create_a_perfect_outline_and_choose_the_right_audience_for_the_same_make_it_an_amazing_booking_experience.')}</p>
                                    
                                   <a href="How_it_works">
                                        <button className="btn-common">{t('Know how it works?')}</button>
                                </a>
                                </div>
                            </div>
                            <div className="col-lg-2 provider-right ">
                                <img src="assets/img/Indian App developer.png" className="img-fluid" alt="Responsive image" />
                            </div>
                        </div>
                        <div className="row justify-content-center no-gutters provider-app-img">
                            <div className="col-lg-10">
                                <img src="assets/img/Image 3.png" className="img-fluid" alt="Responsive image" />
                            </div>
                        </div>

                    </div>
                </section>
                <section id="contact" className="contact">
                    <div className="container">
                        <div className="section-title">
                            <p>{t('Know how it works?')}</p>
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
