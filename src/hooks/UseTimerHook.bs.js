

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Pervasives from "bs-platform/lib/es6/pervasives.js";
import * as Caml_format from "bs-platform/lib/es6/caml_format.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";

function useTimer(stringTime) {
  var timer = React.useRef(undefined);
  var twoChars = React.useCallback((function (number) {
          return "" + (
                  number < 10 ? "0" + String(number) : String(number)
                );
        }), []);
  var match = stringTime.split(":");
  var match$1;
  if (match.length !== 2) {
    match$1 = [
      0,
      0
    ];
  } else {
    var hoursStr = match[0];
    var minutesStr = match[1];
    var match$2 = Pervasives.int_of_string_opt(hoursStr);
    var match$3 = Pervasives.int_of_string_opt(minutesStr);
    match$1 = match$2 !== undefined && match$3 !== undefined ? [
        match$2,
        match$3
      ] : [
        0,
        0
      ];
  }
  var seconds = match$1[1];
  var minutes = match$1[0];
  var getInitialTime = React.useCallback((function (param) {
          return [
                  Curry._1(twoChars, minutes),
                  Curry._1(twoChars, seconds)
                ];
        }), [
        minutes,
        seconds,
        twoChars
      ]);
  var match$4 = React.useState(function () {
        return Curry._1(getInitialTime, undefined);
      });
  var setTime = match$4[1];
  var match$5 = match$4[0];
  var seconds$1 = match$5[1];
  var minutes$1 = match$5[0];
  var hasFinished = Caml_format.caml_int_of_string(minutes$1) === 0 && Caml_format.caml_int_of_string(seconds$1) === 0;
  var start = React.useCallback((function (param) {
          var current = timer.current;
          if (current !== undefined) {
            clearInterval(Caml_option.valFromOption(current));
          } else {
            timer.current = Caml_option.some(setInterval((function (param) {
                        return Curry._1(setTime, (function (time) {
                                      var seconds = time[1];
                                      var minutes = time[0];
                                      var _minutes = Curry._1(twoChars, Caml_format.caml_int_of_string(seconds) === 0 && Caml_format.caml_int_of_string(minutes) > 0 ? Caml_format.caml_int_of_string(minutes) - 1 | 0 : Caml_format.caml_int_of_string(minutes));
                                      var _seconds = Curry._1(twoChars, Caml_format.caml_int_of_string(seconds) === 0 ? 59 : Caml_format.caml_int_of_string(seconds) - 1 | 0);
                                      return [
                                              _minutes,
                                              _seconds
                                            ];
                                    }));
                      }), 1000));
          }
          
        }), [twoChars]);
  var pause = React.useCallback((function (param) {
          var intervalId = timer.current;
          if (intervalId !== undefined) {
            clearInterval(Caml_option.valFromOption(intervalId));
            timer.current = undefined;
            return ;
          }
          
        }), []);
  var finished = React.useCallback((function (func) {
          if (hasFinished) {
            return Curry._1(func, undefined);
          }
          
        }), [hasFinished]);
  var reset = React.useCallback((function (param) {
          return Curry._1(setTime, (function (param) {
                        return Curry._1(getInitialTime, undefined);
                      }));
        }), [getInitialTime]);
  var setTimer = React.useCallback((function (stringTime) {
          var match = stringTime.split(":");
          var match$1;
          if (match.length !== 2) {
            match$1 = [
              0,
              0
            ];
          } else {
            var hoursStr = match[0];
            var minutesStr = match[1];
            var match$2 = Pervasives.int_of_string_opt(hoursStr);
            var match$3 = Pervasives.int_of_string_opt(minutesStr);
            match$1 = match$2 !== undefined && match$3 !== undefined ? [
                match$2,
                match$3
              ] : [
                0,
                0
              ];
          }
          var seconds = match$1[1];
          var minutes = match$1[0];
          return Curry._1(setTime, (function (param) {
                        return [
                                Curry._1(twoChars, minutes),
                                Curry._1(twoChars, seconds)
                              ];
                      }));
        }), [twoChars]);
  React.useEffect((function () {
          if (hasFinished) {
            var intervalId = timer.current;
            if (intervalId !== undefined) {
              Caml_option.some((clearInterval(Caml_option.valFromOption(intervalId)), undefined));
            }
            
          }
          
        }), [hasFinished]);
  return {
          minutes: minutes$1,
          seconds: seconds$1,
          start: start,
          reset: reset,
          setTimer: setTimer,
          finished: finished,
          pause: pause
        };
}

export {
  useTimer ,
  
}
/* react Not a pure module */
