import React, { FC } from 'react'
import { useTranslation } from 'react-i18next';

export const Footer: FC = () => {
    const { t } = useTranslation();
    return (
        <div>
            <footer id="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4  footer-contact">
                                <div className="footer-logo">
                                    <a href="#"><img src="assets/img/logo.png" alt="" className="img-fluid" /></a>
                                </div>
                                <h4>{t('The World of')} </h4>
                                <h2>{t('Events & Experience')}</h2>
                                <nav className="footer-nav">
                                    <ul>
                                        <li><a className="nav-link " href="#hero">English </a></li>
                                        <li><a className="nav-link p-0" href="#hero">عربى </a></li>
                                    </ul>
                                    <ul>
                                        <li><a className="nav-link" href="#track-app">{t('About')}</a></li>
                                        <li><a className="nav-link " href="#features">{t('#Features')}</a></li>
                                        <li><a className="nav-link " href="#provider">{t('Become A Provider')}</a></li>
                                        <li><a className="nav-link " href="#contact">{t('Contact Us')}</a></li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="col-lg-5  footer-links">
                                <h5>{t('What are you waiting for?')} {t('Find something you want to experience Now!')}</h5>
                                <div className="app-link">
                                    <a href="#">
                                        <img src="assets/img/appstore.png" alt="" />
                                    </a>
                                    <a href="#">
                                        <img src="assets/img/playstore.png" alt="" />
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-3  footer-features">
                                <img src="assets/img/features.png" className="img-fluid" alt="" /> 
                            </div>
                        </div>
                    </div>
                    <div className="footer-bg">
                        <img src="assets/img/footer-bg.png" className="img-fluid" alt="" />
                        <div id="footer-bottom" className="container-fulid">
                            <div className="container-fulid  footer-cta">
                                <button><a href="./How_it_works">{t('Know how it works?')}</a> </button>

                                <div className="icon-cons">
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
                                    <div className="icon-list">
                                        <a href="">
                                            <i className="fa fa-facebook"></i>
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
                                            <i className="fa fa-pinterest-p"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
        </div>
    )
}

