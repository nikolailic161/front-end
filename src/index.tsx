import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HomePage from './components/HomePage/HomePage';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.js';
import 'popper.js/dist/popper.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import { MainMenu, MainMenuItem } from './components/MainMenu/MainMenu';
import { HashRouter, Route } from 'react-router-dom';
import Switch from 'react-bootstrap/esm/Switch';
import ContactPage from './components/ContactPage/ContactPage';

import CategoryPage from './components/CategoryPage/CategoryPage';
import { KorisnikRegistrationPage } from './components/KorisnikRegistrationPage/KorisnikRegistrationPage';
import KorpaPage from './components/KorpaPage/KorpaPage';
import { KorisnikLoginPage } from './components/KorisnikLoginPage/KorisnikLoginPage';


const menuItems=[
  new MainMenuItem("Home","/"),
  new MainMenuItem("Contact","/contact"),
  new MainMenuItem("Log in","/korisnik/login"),
  new MainMenuItem("Register","/korisnik/register"),
  new MainMenuItem("Korpa","/korisnik/korpa"),
  
];
ReactDOM.render(
  <React.StrictMode>
    <MainMenu items = {menuItems}></MainMenu>
    <HashRouter>
      <Switch>
        <Route exact path = "/" component = { HomePage }/>
        <Route exact path = "/contact" component = {ContactPage} />
        <Route exact path = "/korisnik/login" component = {KorisnikLoginPage} />
        <Route exact path = "/korisnik/register" component = {KorisnikRegistrationPage} />
        <Route exact path = "/kategorija/:cId" component = {CategoryPage} />
        <Route exact path = "/korpa/" component = {KorpaPage} />
      </Switch>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


serviceWorker.unregister();
