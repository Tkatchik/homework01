'use strict';

import countTimer from './modules/countTimer';
import toggleMenue from './modules/toggleMenue';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import insertDots from './modules/insertDots';
import slider from './modules/slider';
import fotoChange from './modules/photoChange';
import calc from './modules/calc';
import justNumber from './modules/justNumber';
import validationPhone from './modules/validationPhone';
import validationForm from './modules/validationForm';
import sendForm from './modules/sendForm';

// timer
countTimer('10 august 2019');

//меню
toggleMenue();

//popup
togglePopUp();

// tabs
tabs();

// insert Dots
insertDots();

// slider
slider();

// changing foto
fotoChange();

//calc
calc(100);

//just number
justNumber();

validationPhone();

validationForm();

// send-ajax-form
sendForm();