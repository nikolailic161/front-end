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
import KorisnikLoginPage from './components/KorisnikLoginPage/KorisnikLoginPage';
import CategoryPage from './components/CategoryPage/CategoryPage';
import { KorisnikRegistrationPage } from './components/KorisnikRegistrationPage/KorisnikRegistrationPage';


const menuItems=[
  new MainMenuItem("Home","/"),
  new MainMenuItem("Contact","/contact"),
  new MainMenuItem("Log in","/korisnik/login"),
  new MainMenuItem("Register","/korisnik/register"),
  new MainMenuItem("Kat 1","/kategorija/1/"),
  new MainMenuItem("Kat 2","/kategorija/2/"),
  new MainMenuItem("Kat 3","/kategorija/3/"),

  
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
      </Switch>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


serviceWorker.unregister();
