import Vue from 'vue';
import moment from 'moment-timezone';

Vue.filter('commaString', (input) => {
  if (isNaN(input)) { return 0; }
  return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
});

Vue.filter('extractIPv6String', (ipv6) => {
  if (!ipv6) { return ''; }

  ipv6 = ipv6.toString();

  let ip = ipv6.match(/.{1,4}/g).join(':').replace(/:0{1,3}/g, ':').replace(/^0000:/, '0:');
  [/(^|:)0:0:0:0:0:0:0:0($|:)/,
    /(^|:)0:0:0:0:0:0:0($|:)/,
    /(^|:)0:0:0:0:0:0($|:)/,
    /(^|:)0:0:0:0:0($|:)/,
    /(^|:)0:0:0:0($|:)/,
    /(^|:)0:0:0($|:)/,
    /(^|:)0:0($|:)/]
    .every(function (re) {
      if (ipv6.match(re)) {
        ip = ipv6.replace(re, '::');
        return false;
      }
      return true;
    });

  return ip;
});

Vue.filter('protocol', (protocolCode) => {
  let lookup = { 1: 'icmp', 6: 'tcp', 17: 'udp', 47: 'gre', 58: 'icmp6' };

  let result = lookup[protocolCode];
  if (!result) { result = protocolCode; }
  return result;
});

Vue.filter('humanReadable', (fileSizeInBytes) => {
  let i = 0;
  let byteUnits = ['Bi', 'Ki', 'Mi', 'Gi', 'Ti', 'Pi', 'Ei', 'Zi', 'Yi'];
  while (fileSizeInBytes >= 1000) {
    fileSizeInBytes = fileSizeInBytes / 1024;
    i++;
  }

  if (i === 0 || fileSizeInBytes >= 10) {
    return fileSizeInBytes.toFixed(0) + byteUnits[i];
  } else {
    return fileSizeInBytes.toFixed(1) + byteUnits[i];
  }
});

Vue.filter('timezoneDateString', (seconds, timezone, format) => {
  if (!format) { format = 'YYYY/MM/DD HH:mm:ss z'; }

  if (timezone === 'gmt') {
    return moment.tz(1000 * seconds, 'gmt').format(format);
  }

  return moment(1000 * seconds).format(format);
});

Vue.filter('round', function (value, decimals) {
  if (!value) { value = 0; }

  if (!decimals) { decimals = 0; }

  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
});

Vue.filter('readableTime', function (ms) {
  if (isNaN(ms)) { return '?'; }

  let seconds = parseInt((ms / 1000) % 60);
  let minutes = parseInt((ms / (1000 * 60)) % 60);
  let hours = parseInt((ms / (1000 * 60 * 60)) % 24);
  let days = parseInt((ms / (1000 * 60 * 60 * 24)));

  let result = '';

  if (days) {
    result += days + ' day';
    if (days > 1) {
      result += 's ';
    } else {
      result += ' ';
    }
  }

  if (hours || minutes || seconds) {
    result += (hours < 10) ? '0' + hours : hours;
    result += ':';
    result += (minutes < 10) ? '0' + minutes : minutes;
    result += ':';
    result += (seconds < 10) ? '0' + seconds : seconds;
  }

  return result || '0';
});
