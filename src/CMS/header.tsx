import { en } from 'lib/i18n/en'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

export const Header: FC = () => {

    const { t } = useTranslation();

    function handleClick(lang: string | undefined) {
        i18next.changeLanguage(lang)
      }

    return (
        <div>
            <header id="header" className="fixed" >
                    <div className="container  d-flex align-items-center justify-content-between header-wrap">
                        <nav id="navbar" className="navbar">
                            <ul>
                                <li><a className="nav-link active" href="#track-app">{t('About')}</a></li>
                                <li><a className="nav-link " href="#features">{t('#Features')}</a></li>
                                <li><a className="nav-link " href="#provider">{t('Become A Provider')}</a></li>
                                <li><a className="nav-link " href="#contact">{t('Contact Us')}</a></li>
                            </ul>
                            <i className="fa fa-bars mobile-nav-toggle"></i>
                        </nav>
                        <nav className="nav-lang">
                            <ul>
                                <li><a className="nav-link" href="javascript:void(0);" onClick={()=>handleClick('en')}  id="en">English </a></li>
                                <li><a className="nav-link" href="javascript:void(0);" onClick={()=>handleClick('ar')}  id="ar">عربى </a></li>
                            </ul>
                        </nav>
                        <div className="logo">
                            <a href="index.html"><img src="assets/img/logo.png" alt="" className="img-fluid" /></a>
                        </div>
                        <div className="download-link">
                            <a href="#">
                                <img src="assets/img/appstore.png" alt="" />
                            </a>
                            <a href="#">
                                <img src="assets/img/playstore.png" alt="" />
                            </a>
                        </div>
                    </div>
                </header>
                <section id="home">
                    <div className="container">
                        <div className="row">
                            <div
                                className="offset-lg-6 col-lg-6 col-sm-12 d-lg-flex flex-lg-column justify-content-center align-items-stretch pt-5 pt-lg-0 text-center">
                                <div>
                                    <h4>{t('The World of')}</h4>
                                    <h2>{t('Events & Experience')}</h2>
                                    <p>{t('What_are_you_waiting_for_?')} {t('Find_something_you_want_to_experience_Now_!')}</p>
                                    <div className="app-link">
                                        <a href="#">
                                            <img src="assets/img/appstore.png" alt="" />

                                        </a>
                                        <a href="#">
                                            <img src="assets/img/playstore.png" alt="" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        </div>
    )
}

