import React from 'react';

import '../styles/pages/landing.css'

import { FiArrowRight } from 'react-icons/fi';
import logoImg from '../images/logo.svg'

import { Link } from 'react-router-dom'

function Landing() {
    return (
        <div id="page-landing">
      <div className="content-wrapper">
        <Link to="/">
          <img src={logoImg} alt="Happy"/>
        </Link>

        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
          
          <div className="location">
            <strong>São Paulo</strong>
            <span>São Paulo</span>
          </div>
          
          <Link to="/app" className="enter-app">
            <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)"/>
          </Link>
        </main>

      </div>
    </div>
    );
}

export default Landing;