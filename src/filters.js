import Vue from 'vue';
import moment from 'moment';
import 'moment/locale/ru.js';
import linkifyStr from 'linkifyjs/string';

moment.locale('ru');

Vue.filter('moment', function(time) {
    return moment.unix(time);
});

Vue.filter('linkify', function(text) {
    return linkifyStr(text);
});

Vue.filter('secondsToTimeString', function(value) {
    return Math.floor(value / 60)+':'+Math.floor(value % 60);
});

Vue.filter('pluralize', function (n, values) {
    if (typeof n === 'undefined') return;

    var valuesArray = values.split(',');

    var one = valuesArray[0];
    var few = valuesArray[1];
    var many = valuesArray[2];

    var d = parseInt(n.toString().substr(-1));
    if(n > 10 && n < 20) return many;
    if(d == 1)           return one;
    if(d >= 2 && d <= 4) return few;
    /*otherwise*/        return many;
});