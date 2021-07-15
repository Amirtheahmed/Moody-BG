'use strict';

import { SunriseSunset } from './js/sunrise.js';

export class MoodyBg {
  constructor(selector) {
    var _this = this;
    this.body = document.querySelector('.moodyBg');
    this.bgImage = null;
    this.timeofday = null;
  }

  render() {
    this.get_location();
  }

  set_bg = () => {
    this.body.style.backgroundImage = "url('" + this.bgImage + "')";
    this.body.style.backgroundSize = 'cover';
  };

  get_location() {
    navigator.geolocation.getCurrentPosition(
      this.success_callback,
      this.error_callback
    );
  }

  success_callback = p => {
    let now = new Date();
    let here = new SunriseSunset(
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate(),
      p.coords.latitude,
      p.coords.longitude
    );
    let sunrise = here.sunriseLocalHours(-now.getTimezoneOffset() / 60);
    let sunset = here.sunsetLocalHours(-now.getTimezoneOffset() / 60);
    let current = now.getHours() + now.getMinutes() / 60;
    let early_morning = sunrise;
    let late_morning = early_morning + 5;
    let early_noon = late_morning;
    let late_noon = early_noon + 6;
    let early_evening = late_noon;
    let late_evening = sunset;

    //current += 3; //demo make night

    // console.log('sunrise: ' + early_morning);
    // console.log('late_morning: ' + late_morning);
    // console.log('early_noon: ' + early_noon);
    // console.log('late_noon: ' + late_noon);
    // console.log('early_evening: ' + early_evening);
    // console.log('sunset: ' + late_evening);
    // console.log('current: ' + current);
    let timenow = '';
    if (current > early_morning && current < late_morning) {
      timenow = 'morning';
      this.bgImage = './src/img/morning.jpg';
      this.set_bg();
    } else if (current > early_noon && current < late_noon) {
      timenow = 'day';
      this.bgImage = './src/img/day.jpg';
      this.set_bg();
    } else if (current > early_evening && current < late_evening) {
      timenow = 'afternoon';
      this.bgImage = './src/img/afternoon.jpg';
      this.set_bg();
    } else if (current > late_evening || current < early_morning) {
      timenow = 'night';
      this.bgImage = './src/img/night.jpg';
      this.set_bg();
    }

    //console.log(timenow);
  };

  error_callback = p => {
    this.bgImage = './src/img/day.jpg';
    this.set_bg();
  };
}
