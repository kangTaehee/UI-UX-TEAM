"use strict";

var _all = require("gsap/all");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // import {TweenMax, Power2, TimelineLite} from "gsap";
var ActivitiesAnimationComponent = /*#__PURE__*/function () {
  function ActivitiesAnimationComponent(options) {
    _classCallCheck(this, ActivitiesAnimationComponent);
    console.log(options);
    this.el = options.el;
    this._setup();
    this._setupEventListener();
  }
  return _createClass(ActivitiesAnimationComponent, [{
    key: "_setup",
    value: function _setup() {
      this._ui = {
        animationContainer: this.el.querySelector('.section-activites__content'),
        imageAnimationContainer: this.el.querySelector('.section-activites__images-container'),
        nextImageContainer: this.el.querySelector(".section-activites__next-image"),
        currentImageContainer: this.el.querySelector(".section-activites__current-image"),
        nextImage: this.el.querySelector(".section-activites__next-image .section-activites__image"),
        currentImage: this.el.querySelector(".section-activites__current-image .section-activites__image"),
        listActivities: this.el.querySelector(".section-activites__list"),
        activity: this.el.querySelectorAll(".section-activites__list-item"),
        activityLinks: this.el.querySelectorAll(".section-activites__list-item a"),
        activityLinksSpan: this.el.querySelectorAll(".section-activites__list-item a span")
      };
      this.mouse = {
        x: 0,
        y: 0
      };
      this._setupTween();
    }
  }, {
    key: "_setupTween",
    value: function _setupTween() {
      var _this = this;
      this.timelineIntro = new _all.TimelineMax({
        paused: true,
        onComplete: function onComplete() {
          _this._onCompleteIntro();
        }
      });
      this.timelineIntro.fromTo(this._ui.nextImageContainer, 1, {
        height: 0
      }, {
        height: 500,
        ease: _all.Power2.easeInOut
      }, 0).fromTo(this._ui.nextImage, 1.1, {
        autoAlpha: 0,
        scale: 1.3
      }, {
        autoAlpha: 1,
        scale: 1,
        ease: _all.Power1.easeOut
      }, 0);
    }
  }, {
    key: "_setupEventListener",
    value: function _setupEventListener() {
      var _this2 = this;
      this._ui.animationContainer.addEventListener('mousemove', function () {
        return _this2._mouseFollow();
      });
      var _loop = function _loop(index) {
        _this2._ui.activity[index].addEventListener('mouseenter', function () {
          _this2._mouseEnterFunction(index);
        });
      };
      for (var index = 0; index < this._ui.activity.length; index++) {
        _loop(index);
      }
      this._ui.listActivities.addEventListener('mouseleave', function () {
        return _this2._leaveContainer();
      });
    }
  }, {
    key: "_mouseEnterFunction",
    value: function _mouseEnterFunction(index) {
      _all.TweenMax.to(this._ui.imageAnimationContainer, .5, {
        autoAlpha: 1,
        ease: _all.Power1.easeInOut
      });
      if (this._ui.currentImage.src === "") {
        this._firstImageAnimation(index);
      } else {
        this._imageAnimation(index);
        this._textAnimation(index);
      }
    }
  }, {
    key: "_textAnimation",
    value: function _textAnimation(index) {
      var _this3 = this;
      var textBounds = this._ui.activityLinks[index].getBoundingClientRect();
      var imageAnimationContainerBounds = this._ui.imageAnimationContainer.getBoundingClientRect();
      this._ui.activityLinks[index].addEventListener('mousemove', function () {
        var positionMouse = event.clientX - textBounds.left,
          minPositionPath = positionMouse - imageAnimationContainerBounds.width / 2,
          maxPositionPath = positionMouse + imageAnimationContainerBounds.width / 2;
        _all.TweenMax.to(_this3._ui.activityLinksSpan[index], 0.7, {
          webkitClipPath: "polygon(".concat(minPositionPath, "px 0, ").concat(maxPositionPath, "px 0, ").concat(maxPositionPath, "px 100%, ").concat(minPositionPath, "px 100%)"),
          ease: _all.Power2.easeInCubic
        });
        _all.TweenMax.to(_this3._ui.activityLinksSpan[index], 0.7, {
          clipPath: "polygon(".concat(minPositionPath, "px 0, ").concat(maxPositionPath, "px 0, ").concat(maxPositionPath, "px 100%, ").concat(minPositionPath, "px 100%)"),
          ease: _all.Power2.easeInCubic
        });
      });
    }
  }, {
    key: "_firstImageAnimation",
    value: function _firstImageAnimation(index) {
      this._ui.currentImage.style.opacity = 0;
      this._ui.nextImage.src = this._ui.activity[index].dataset.image;
      this.currentImageLink = this._ui.activity[index].dataset.image;
      this._ui.currentImage.src = this.currentImageLink;
      this.timelineIntro.play();
    }
  }, {
    key: "_leaveContainer",
    value: function _leaveContainer() {
      var _this4 = this;
      _all.TweenMax.to(this._ui.imageAnimationContainer, .5, {
        autoAlpha: 0,
        onComplete: function onComplete() {
          _this4._ui.currentImage.src = "";
          _this4._ui.nextImage.src = "";
        },
        ease: _all.Power1.easeInOut
      });
    }
  }, {
    key: "_onCompleteIntro",
    value: function _onCompleteIntro() {
      this._ui.currentImage.src = this.currentImageLink;
      this._ui.currentImage.style.opacity = 1;
    }
  }, {
    key: "_onCompleteImageChange",
    value: function _onCompleteImageChange() {
      this._ui.currentImage.src = this.currentImageLink;
    }
  }, {
    key: "_imageAnimation",
    value: function _imageAnimation(index) {
      var _this5 = this;
      this.currentImageLink = this._ui.activity[index].dataset.image;
      this._ui.nextImage.src = this._ui.activity[index].dataset.image;
      _all.TweenLite.fromTo(this._ui.nextImageContainer, 1, {
        height: 0,
        ease: _all.Power2.easeInOut
      }, {
        height: 500,
        ease: _all.Power2.easeInOut,
        onComplete: function onComplete() {
          return _this5._onCompleteImageChange();
        }
      }, 0);
      _all.TweenLite.fromTo(this._ui.nextImage, 1.1, {
        scale: 1.3
      }, {
        scale: 1,
        ease: _all.Power1.easeOut
      }, 0);
    }
  }, {
    key: "_mouseFollow",
    value: function _mouseFollow() {
      var imageAnimationContainerBounds = this._ui.imageAnimationContainer.getBoundingClientRect();
      this.mouse.x = event.clientX;
      this.mouse.y = event.clientY - this.el.getBoundingClientRect().y;
      _all.TweenMax.to(this._ui.imageAnimationContainer, 0.7, {
        x: this.mouse.x - imageAnimationContainerBounds.width / 2,
        y: this.mouse.y - imageAnimationContainerBounds.height / 2,
        ease: _all.Power2.easeInCubic
      });
    }
  }]);
}(); // const instance = new ActivitiesAnimationComponent();
// instance._setup()
// export default ActivitiesAnimationComponent;
var COMPONENTS = {
  'activities-animation': ActivitiesAnimationComponent
};
var ComponentFactory = /*#__PURE__*/function () {
  function ComponentFactory() {
    _classCallCheck(this, ComponentFactory);
    this._selector = 'data-component';
    this._elements = document.querySelectorAll("[".concat(this._selector, "]"));
    this._components = {};
  }
  return _createClass(ComponentFactory, [{
    key: "start",
    value: function start() {
      for (var i = 0, limit = this._elements.length; i < limit; i++) {
        var element = this._elements[i];
        var componentName = element.getAttribute(this._selector);
        if (COMPONENTS[componentName]) {
          var Component = COMPONENTS[componentName];
          new Component({
            el: element
          });
        } else {
          console.log("Component: '".concat(componentName, "' not found"));
        }
      }
    }
  }]);
}();
var instance = new ComponentFactory();
instance.start();