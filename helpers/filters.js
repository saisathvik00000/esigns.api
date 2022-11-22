import Vue from 'vue'
import moment from "moment";
import store from "@/store";

Vue.filter('getUserFullName', (user) => {
  if (!user) return ''
  let fullName = user.first_name ? user.first_name : '';
  fullName += user.first_name && user.last_name ? ' ' : '';
  fullName += user.last_name ? user.last_name : '';
  return fullName;
});

Vue.filter('getMenuTitle', (menuName) => {
  let menuList = store.getters['menuManagementV2/getMenu'] && store.getters['menuManagementV2/getMenu']['menu_list'] ? store.getters['menuManagementV2/getMenu']['menu_list'] : [];
  let currentMenuItem = store.getters['navigationOpen/getCurrentMenu'];
  if(menuList && menuList.length && currentMenuItem && currentMenuItem.title){
    return currentMenuItem.title
  }
  return menuName
});

Vue.filter('getUserFullNameShortened', (user) => {
  if (!user) return ''
  let name = '';
  name += user.first_name && user.first_name.length ? user.first_name[0] : ''
  if (name.length > 0) {
    name += user.last_name && user.last_name.length ? '. ' + user.last_name[0] : ''
  } else {
    name += user.last_name && user.last_name.length ? user.last_name[0] : ''
  }
  return name.toUpperCase();
});

Vue.filter('getUserNameAvatar', (user) => {
  if (!user) return ''
  let name = '';
  name += user.first_name && user.first_name.length ? user.first_name[0] : ''
  name += user.last_name && user.last_name.length ? user.last_name[0] : ''
  return name.toUpperCase();
})
Vue.filter('globalDateFormat', (date) => {
  if (!date) return ''
  const format = store.getters['auth/getDefaultDateFormat'] ? store.getters['auth/getDefaultDateFormat'] :
    'MM-DD-YYYY'
  return moment(date).format(format)
})

Vue.filter('globalDateTimeFormat', (date) => {
  if (!date) return ''
  const format = store.getters['auth/getDefaultDateFormat'] ? store.getters['auth/getDefaultDateFormat'] + ' HH:mm:ss' : +'MM-DD-YYYY HH:mm'
  return moment(date).format(format)
})

Vue.filter('globalTimeFormat', (date) => {
  if (!date) return ''
  const format = store.getters['auth/getDefaultDateFormat'] ? ' HH:mm:ss' : +'MM-DD-YYYY HH:mm:ss'
  return moment(date).format(format)
})

Vue.filter('getFormattedDate', (dateStr) => {
  // 2021-12-03
  var dt = new Date(dateStr);
  var today = new Date();
  var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  var rtn = dt.toLocaleDateString("en-US", options);
  var todayStr = today.toLocaleDateString("en-US", options);
  if (rtn == todayStr) {
    rtn = "Today - " + rtn;
  }
  return rtn;
})

Vue.filter('getFormattedDateTypeThree', (dateStr) => {
  if (!dateStr) return ''

  function getFormattedDateTypeTwo(dateStr2) {
    // 2021-12-03T09:41:13.163Z -> 03-12-2021 09:30 AM
    // 2021-10-18T17:19:31.823Z 19-10-20 2::9: AM
    var dt = new Date(dateStr2);

    var dateStrLocal = dt.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }); // -> 02/28/2004
    var timeStrLocal = dt.toLocaleTimeString('en-GB'); // -> 23:45:26
    // console.log('>>> getFormattedDateTypeTwo(), dateStrLocal, timeStrLocal', dateStrLocal, timeStrLocal);
    // var rtn = dateStrLocal.substring(3, 5) + "-" + dateStrLocal.substring(0, 2) + "-" + dateStrLocal.substring(6, 10) + " ";
    const format = store.getters['auth/getDefaultDateFormat'] ? store.getters['auth/getDefaultDateFormat'] :
      'MM-DD-YYYY'
    var rtn = moment(dateStrLocal).format(format);

    var hourStr = timeStrLocal.substring(0, 2);
    var amPm = 'AM';
    var hour = parseInt(hourStr);
    if (hour > 12) {
      var hourTmp = hour - 12;
      hourStr = ((hourTmp) < 10 ? "0" : "") + hourTmp.toString();
      amPm = 'PM'
    }
    rtn = rtn + " " + hourStr + ":" + timeStrLocal.substring(3, 5) + "" + amPm;
    return rtn;
  }
  // console.log('>>> getFormattedDateTypeThree(), dateStr', dateStr);
  // 2021-12-03T09:41:13.163Z -> 03-12-2021 09:30 AM, Just Now, 1 hour ago, Today, Yesterday,
  var dt = new Date(dateStr);
  var today = new Date();

  var t1 = dt.getTime();
  var t2 = today.getTime();

  var hoursDiff = parseInt((t2 - t1) / (3600 * 1000));
  var minsDiff = parseInt((t2 - t1) / (60 * 1000));
  // console.log('>>> getFormattedDateTypeThree(), hoursDiff, minsDiff', hoursDiff, minsDiff);
  var rtn = "";
  var dateStrTypeTwo = getFormattedDateTypeTwo(dateStr);
  // console.log('>>> getFormattedDateTypeThree(), dateStr, dateStrTypeTwo', dateStr, dateStrTypeTwo);
  if (minsDiff < 5) {
    rtn = "Just Now";
  } else if (minsDiff < 60) {
    rtn = minsDiff.toString() + ((minsDiff == 1) ? ' min' : ' mins') + " ago";
  } else if (hoursDiff < 12) {
    rtn = hoursDiff.toString() + ((hoursDiff == 1) ? ' hour' : ' hours') + " ago";
  } else if (hoursDiff < 24) {
    rtn = "Today "
  } else if (hoursDiff < 48) {
    rtn = "Yesterday "
  } else {
    rtn = dateStrTypeTwo;
  }
  // console.log('>>> getFormattedDateTypeThree(), rtn', rtn);
  return rtn;
})

var filter = function (text, length, clamp) {
  clamp = clamp || '...';
  var node = document.createElement('div');
  node.innerHTML = text;
  var content = node.textContent;
  return content.length > length ? content.slice(0, length) + clamp : content;
};

Vue.filter('truncate', filter);


Vue.filter('getUserRoleShortened', (role) => {
  if (!role) return ''
  let name = '';
  let words = role.split(' ');
  words.forEach(element => {
    name += element[0].toUpperCase()
  });
  return name.toUpperCase();
});