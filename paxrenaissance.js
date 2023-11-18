var Modal = (function () {
    function Modal(id, config) {
        var _this = this;
        this.open = false;
        this.container = 'ebd-body';
        this.class = 'custom_popin';
        this.autoShow = false;
        this.modalTpl = "\n    <div id='popin_${id}_container' class=\"${class}_container\">\n      <div id='popin_${id}_underlay' class=\"${class}_underlay\"></div>\n      <div id='popin_${id}_wrapper' class=\"${class}_wrapper\">\n        <div id=\"popin_${id}\" class=\"${class}\">\n          ${titleTpl}\n          ${closeIconTpl}\n          ${helpIconTpl}\n          ${contentsTpl}\n        </div>\n      </div>\n    </div>\n  ";
        this.closeIcon = 'fa-times-circle';
        this.closeIconTpl = '<a id="popin_${id}_close" class="${class}_closeicon"><i class="fa ${closeIcon} fa-2x" aria-hidden="true"></i></a>';
        this.closeAction = 'destroy';
        this.closeWhenClickOnUnderlay = true;
        this.helpIcon = null;
        this.helpLink = '#';
        this.helpIconTpl = '<a href="${helpLink}" target="_blank" id="popin_${id}_help" class="${class}_helpicon"><i class="fa ${helpIcon} fa-2x" aria-hidden="true"></i></a>';
        this.title = null;
        this.titleTpl = '<h2 id="popin_${id}_title" class="${class}_title">${title}</h2>';
        this.contentsTpl = "\n      <div id=\"popin_${id}_contents\" class=\"${class}_contents\">\n        ${contents}\n      </div>";
        this.contents = '';
        this.verticalAlign = 'center';
        this.animationDuration = 500;
        this.fadeIn = true;
        this.fadeOut = true;
        this.openAnimation = false;
        this.openAnimationTarget = null;
        this.openAnimationDelta = 200;
        this.onShow = null;
        this.onHide = null;
        this.statusElt = null;
        this.scale = 1;
        this.breakpoint = null;
        if (id === undefined) {
            console.error('You need an ID to create a modal');
            throw 'You need an ID to create a modal';
        }
        this.id = id;
        Object.entries(config).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            if (value !== undefined) {
                _this[key] = value;
            }
        });
        this.create();
        if (this.autoShow)
            this.show();
    }
    Modal.prototype.isDisplayed = function () {
        return this.open;
    };
    Modal.prototype.isCreated = function () {
        return this.id != null;
    };
    Modal.prototype.create = function () {
        var _this = this;
        dojo.destroy('popin_' + this.id + '_container');
        var titleTpl = this.title == null ? '' : dojo.string.substitute(this.titleTpl, this);
        var closeIconTpl = this.closeIcon == null ? '' : dojo.string.substitute(this.closeIconTpl, this);
        var helpIconTpl = this.helpIcon == null ? '' : dojo.string.substitute(this.helpIconTpl, this);
        var contentsTpl = dojo.string.substitute(this.contentsTpl, this);
        var modalTpl = dojo.string.substitute(this.modalTpl, {
            id: this.id,
            class: this.class,
            titleTpl: titleTpl,
            closeIconTpl: closeIconTpl,
            helpIconTpl: helpIconTpl,
            contentsTpl: contentsTpl,
        });
        dojo.place(modalTpl, this.container);
        dojo.style('popin_' + this.id + '_container', {
            display: 'none',
            position: 'absolute',
            left: '0px',
            top: '0px',
            width: '100%',
            height: '100%',
        });
        dojo.style('popin_' + this.id + '_underlay', {
            position: 'absolute',
            left: '0px',
            top: '0px',
            width: '100%',
            height: '100%',
            zIndex: 949,
            opacity: 0,
            backgroundColor: 'white',
        });
        dojo.style('popin_' + this.id + '_wrapper', {
            position: 'fixed',
            left: '0px',
            top: '0px',
            width: 'min(100%,100vw)',
            height: '100vh',
            zIndex: 950,
            opacity: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: this.verticalAlign,
            paddingTop: this.verticalAlign == 'center' ? 0 : '125px',
            transformOrigin: 'top left',
        });
        this.adjustSize();
        this.resizeListener = dojo.connect(window, 'resize', function () { return _this.adjustSize(); });
        if (this.closeIcon != null && $('popin_' + this.id + '_close')) {
            dojo.connect($('popin_' + this.id + '_close'), 'click', function () { return _this[_this.closeAction](); });
        }
        if (this.closeWhenClickOnUnderlay) {
            dojo.connect($('popin_' + this.id + '_underlay'), 'click', function () { return _this[_this.closeAction](); });
            dojo.connect($('popin_' + this.id + '_wrapper'), 'click', function () { return _this[_this.closeAction](); });
            dojo.connect($('popin_' + this.id), 'click', function (evt) { return evt.stopPropagation(); });
        }
    };
    Modal.prototype.updateContent = function (newContent) {
        var contentContainerId = "popin_".concat(this.id, "_contents");
        dojo.empty(contentContainerId);
        dojo.place(newContent, contentContainerId);
    };
    Modal.prototype.adjustSize = function () {
        var bdy = dojo.position(this.container);
        dojo.style('popin_' + this.id + '_container', {
            width: bdy.w + 'px',
            height: bdy.h + 'px',
        });
        if (this.breakpoint != null) {
            var newModalWidth = bdy.w * this.scale;
            var modalScale = newModalWidth / this.breakpoint;
            if (modalScale > 1)
                modalScale = 1;
            dojo.style('popin_' + this.id, {
                transform: "scale(".concat(modalScale, ")"),
                transformOrigin: this.verticalAlign == 'center' ? 'center center' : 'top center',
            });
        }
    };
    Modal.prototype.getOpeningTargetCenter = function () {
        var startTop, startLeft;
        if (this.openAnimationTarget == null) {
            startLeft = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) / 2;
            startTop = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) / 2;
        }
        else {
            var target = dojo.position(this.openAnimationTarget);
            startLeft = target.x + target.w / 2;
            startTop = target.y + target.h / 2;
        }
        return {
            x: startLeft,
            y: startTop,
        };
    };
    Modal.prototype.fadeInAnimation = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var containerId = 'popin_' + _this.id + '_container';
            if (!$(containerId))
                reject();
            if (_this.runningAnimation)
                _this.runningAnimation.stop();
            var duration = _this.fadeIn ? _this.animationDuration : 0;
            var animations = [];
            animations.push(dojo.fadeIn({
                node: 'popin_' + _this.id + '_wrapper',
                duration: duration,
            }));
            animations.push(dojo.animateProperty({
                node: 'popin_' + _this.id + '_underlay',
                duration: duration,
                properties: { opacity: { start: 0, end: 0.7 } },
            }));
            if (_this.openAnimation) {
                var pos = _this.getOpeningTargetCenter();
                animations.push(dojo.animateProperty({
                    node: 'popin_' + _this.id + '_wrapper',
                    properties: {
                        transform: { start: 'scale(0)', end: 'scale(1)' },
                        top: { start: pos.y, end: 0 },
                        left: { start: pos.x, end: 0 },
                    },
                    duration: _this.animationDuration + _this.openAnimationDelta,
                }));
            }
            _this.runningAnimation = dojo.fx.combine(animations);
            dojo.connect(_this.runningAnimation, 'onEnd', function () { return resolve(); });
            _this.runningAnimation.play();
            setTimeout(function () {
                if ($('popin_' + _this.id + '_container'))
                    dojo.style('popin_' + _this.id + '_container', 'display', 'block');
            }, 10);
        });
    };
    Modal.prototype.show = function () {
        var _this = this;
        if (this.isOpening || this.open)
            return;
        if (this.statusElt !== null) {
            dojo.addClass(this.statusElt, 'opened');
        }
        this.adjustSize();
        this.isOpening = true;
        this.isClosing = false;
        this.fadeInAnimation().then(function () {
            if (!_this.isOpening)
                return;
            _this.isOpening = false;
            _this.open = true;
            if (_this.onShow !== null) {
                _this.onShow();
            }
        });
    };
    Modal.prototype.fadeOutAnimation = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var containerId = 'popin_' + _this.id + '_container';
            if (!$(containerId))
                reject();
            if (_this.runningAnimation)
                _this.runningAnimation.stop();
            var duration = _this.fadeOut ? _this.animationDuration + (_this.openAnimation ? _this.openAnimationDelta : 0) : 0;
            var animations = [];
            animations.push(dojo.fadeOut({
                node: 'popin_' + _this.id + '_wrapper',
                duration: duration,
            }));
            animations.push(dojo.animateProperty({
                node: 'popin_' + _this.id + '_underlay',
                duration: duration,
                properties: { opacity: { start: 0.7, end: 0 } },
            }));
            if (_this.openAnimation) {
                var pos = _this.getOpeningTargetCenter();
                animations.push(dojo.animateProperty({
                    node: 'popin_' + _this.id + '_wrapper',
                    properties: {
                        transform: { start: 'scale(1)', end: 'scale(0)' },
                        top: { start: 0, end: pos.y },
                        left: { start: 0, end: pos.x },
                    },
                    duration: _this.animationDuration,
                }));
            }
            _this.runningAnimation = dojo.fx.combine(animations);
            dojo.connect(_this.runningAnimation, 'onEnd', function () { return resolve(); });
            _this.runningAnimation.play();
        });
    };
    Modal.prototype.hide = function () {
        var _this = this;
        if (this.isClosing)
            return;
        this.isClosing = true;
        this.isOpening = false;
        this.fadeOutAnimation().then(function () {
            if (!_this.isClosing || _this.isOpening)
                return;
            _this.isClosing = false;
            _this.open = false;
            dojo.style('popin_' + _this.id + '_container', 'display', 'none');
            if (_this.onHide !== null) {
                _this.onHide();
            }
            if (_this.statusElt !== null) {
                dojo.removeClass(_this.statusElt, 'opened');
            }
        });
    };
    Modal.prototype.destroy = function () {
        var _this = this;
        if (this.isClosing)
            return;
        this.isOpening = false;
        this.isClosing = true;
        this.fadeOutAnimation().then(function () {
            if (!_this.isClosing || _this.isOpening)
                return;
            _this.isClosing = false;
            _this.open = false;
            _this.kill();
        });
    };
    Modal.prototype.kill = function () {
        if (this.runningAnimation)
            this.runningAnimation.stop();
        var underlayId = 'popin_' + this.id + '_container';
        dojo.destroy(underlayId);
        dojo.disconnect(this.resizeListener);
        this.id = null;
        if (this.statusElt !== null) {
            dojo.removeClass(this.statusElt, 'opened');
        }
    };
    return Modal;
}());
var BgaAnimation = (function () {
    function BgaAnimation(animationFunction, settings) {
        this.animationFunction = animationFunction;
        this.settings = settings;
        this.played = null;
        this.result = null;
        this.playWhenNoAnimation = false;
    }
    return BgaAnimation;
}());
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function attachWithAnimation(animationManager, animation) {
    var _a;
    var settings = animation.settings;
    var element = settings.animation.settings.element;
    var fromRect = element.getBoundingClientRect();
    settings.animation.settings.fromRect = fromRect;
    settings.attachElement.appendChild(element);
    (_a = settings.afterAttach) === null || _a === void 0 ? void 0 : _a.call(settings, element, settings.attachElement);
    return animationManager.play(settings.animation);
}
var BgaAttachWithAnimation = (function (_super) {
    __extends(BgaAttachWithAnimation, _super);
    function BgaAttachWithAnimation(settings) {
        var _this = _super.call(this, attachWithAnimation, settings) || this;
        _this.playWhenNoAnimation = true;
        return _this;
    }
    return BgaAttachWithAnimation;
}(BgaAnimation));
function cumulatedAnimations(animationManager, animation) {
    return animationManager.playSequence(animation.settings.animations);
}
var BgaCumulatedAnimation = (function (_super) {
    __extends(BgaCumulatedAnimation, _super);
    function BgaCumulatedAnimation(settings) {
        var _this = _super.call(this, cumulatedAnimations, settings) || this;
        _this.playWhenNoAnimation = true;
        return _this;
    }
    return BgaCumulatedAnimation;
}(BgaAnimation));
function showScreenCenterAnimation(animationManager, animation) {
    var promise = new Promise(function (success) {
        var _a, _b, _c, _d;
        var settings = animation.settings;
        var element = settings.element;
        var elementBR = element.getBoundingClientRect();
        var xCenter = (elementBR.left + elementBR.right) / 2;
        var yCenter = (elementBR.top + elementBR.bottom) / 2;
        var x = xCenter - (window.innerWidth / 2);
        var y = yCenter - (window.innerHeight / 2);
        var duration = (_a = settings === null || settings === void 0 ? void 0 : settings.duration) !== null && _a !== void 0 ? _a : 500;
        var originalZIndex = element.style.zIndex;
        var originalTransition = element.style.transition;
        var transitionTimingFunction = (_b = settings.transitionTimingFunction) !== null && _b !== void 0 ? _b : 'linear';
        element.style.zIndex = "".concat((_c = settings === null || settings === void 0 ? void 0 : settings.zIndex) !== null && _c !== void 0 ? _c : 10);
        var timeoutId = null;
        var cleanOnTransitionEnd = function () {
            element.style.zIndex = originalZIndex;
            element.style.transition = originalTransition;
            success();
            element.removeEventListener('transitioncancel', cleanOnTransitionEnd);
            element.removeEventListener('transitionend', cleanOnTransitionEnd);
            document.removeEventListener('visibilitychange', cleanOnTransitionEnd);
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
        var cleanOnTransitionCancel = function () {
            var _a;
            element.style.transition = "";
            element.offsetHeight;
            element.style.transform = (_a = settings === null || settings === void 0 ? void 0 : settings.finalTransform) !== null && _a !== void 0 ? _a : null;
            element.offsetHeight;
            cleanOnTransitionEnd();
        };
        element.addEventListener('transitioncancel', cleanOnTransitionEnd);
        element.addEventListener('transitionend', cleanOnTransitionEnd);
        document.addEventListener('visibilitychange', cleanOnTransitionCancel);
        element.offsetHeight;
        element.style.transition = "width 1s, height 1s, transform ".concat(duration, "ms ").concat(transitionTimingFunction);
        element.offsetHeight;
        element.style.transform = "translate(".concat(-x, "px, ").concat(-y, "px) rotate(").concat((_d = settings === null || settings === void 0 ? void 0 : settings.rotationDelta) !== null && _d !== void 0 ? _d : 0, "deg)");
        timeoutId = setTimeout(cleanOnTransitionEnd, duration + 100);
    });
    return promise;
}
var BgaShowScreenCenterAnimation = (function (_super) {
    __extends(BgaShowScreenCenterAnimation, _super);
    function BgaShowScreenCenterAnimation(settings) {
        return _super.call(this, showScreenCenterAnimation, settings) || this;
    }
    return BgaShowScreenCenterAnimation;
}(BgaAnimation));
function slideToAnimation(animationManager, animation) {
    var promise = new Promise(function (success) {
        var _a, _b, _c, _d, _e;
        var settings = animation.settings;
        var element = settings.element;
        var _f = getDeltaCoordinates(element, settings), x = _f.x, y = _f.y;
        var duration = (_a = settings === null || settings === void 0 ? void 0 : settings.duration) !== null && _a !== void 0 ? _a : 500;
        var originalZIndex = element.style.zIndex;
        var originalTransition = element.style.transition;
        var transitionTimingFunction = (_b = settings.transitionTimingFunction) !== null && _b !== void 0 ? _b : 'linear';
        element.style.zIndex = "".concat((_c = settings === null || settings === void 0 ? void 0 : settings.zIndex) !== null && _c !== void 0 ? _c : 10);
        var timeoutId = null;
        var cleanOnTransitionEnd = function () {
            element.style.zIndex = originalZIndex;
            element.style.transition = originalTransition;
            success();
            element.removeEventListener('transitioncancel', cleanOnTransitionEnd);
            element.removeEventListener('transitionend', cleanOnTransitionEnd);
            document.removeEventListener('visibilitychange', cleanOnTransitionEnd);
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
        var cleanOnTransitionCancel = function () {
            var _a;
            element.style.transition = "";
            element.offsetHeight;
            element.style.transform = (_a = settings === null || settings === void 0 ? void 0 : settings.finalTransform) !== null && _a !== void 0 ? _a : null;
            element.offsetHeight;
            cleanOnTransitionEnd();
        };
        element.addEventListener('transitioncancel', cleanOnTransitionEnd);
        element.addEventListener('transitionend', cleanOnTransitionEnd);
        document.addEventListener('visibilitychange', cleanOnTransitionCancel);
        element.offsetHeight;
        element.style.transition = "transform ".concat(duration, "ms ").concat(transitionTimingFunction);
        element.offsetHeight;
        element.style.transform = "translate(".concat(-x, "px, ").concat(-y, "px) rotate(").concat((_d = settings === null || settings === void 0 ? void 0 : settings.rotationDelta) !== null && _d !== void 0 ? _d : 0, "deg) scale(").concat((_e = settings.scale) !== null && _e !== void 0 ? _e : 1, ")");
        timeoutId = setTimeout(cleanOnTransitionEnd, duration + 100);
    });
    return promise;
}
var BgaSlideToAnimation = (function (_super) {
    __extends(BgaSlideToAnimation, _super);
    function BgaSlideToAnimation(settings) {
        return _super.call(this, slideToAnimation, settings) || this;
    }
    return BgaSlideToAnimation;
}(BgaAnimation));
function slideAnimation(animationManager, animation) {
    var promise = new Promise(function (success) {
        var _a, _b, _c, _d, _e;
        var settings = animation.settings;
        var element = settings.element;
        var _f = getDeltaCoordinates(element, settings), x = _f.x, y = _f.y;
        var duration = (_a = settings.duration) !== null && _a !== void 0 ? _a : 500;
        var originalZIndex = element.style.zIndex;
        var originalTransition = element.style.transition;
        var transitionTimingFunction = (_b = settings.transitionTimingFunction) !== null && _b !== void 0 ? _b : 'linear';
        element.style.zIndex = "".concat((_c = settings === null || settings === void 0 ? void 0 : settings.zIndex) !== null && _c !== void 0 ? _c : 10);
        element.style.transition = null;
        element.offsetHeight;
        element.style.transform = "translate(".concat(-x, "px, ").concat(-y, "px) rotate(").concat((_d = settings === null || settings === void 0 ? void 0 : settings.rotationDelta) !== null && _d !== void 0 ? _d : 0, "deg)");
        var timeoutId = null;
        var cleanOnTransitionEnd = function () {
            element.style.zIndex = originalZIndex;
            element.style.transition = originalTransition;
            success();
            element.removeEventListener('transitioncancel', cleanOnTransitionEnd);
            element.removeEventListener('transitionend', cleanOnTransitionEnd);
            document.removeEventListener('visibilitychange', cleanOnTransitionEnd);
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
        var cleanOnTransitionCancel = function () {
            var _a;
            element.style.transition = "";
            element.offsetHeight;
            element.style.transform = (_a = settings === null || settings === void 0 ? void 0 : settings.finalTransform) !== null && _a !== void 0 ? _a : null;
            element.offsetHeight;
            cleanOnTransitionEnd();
        };
        element.addEventListener('transitioncancel', cleanOnTransitionCancel);
        element.addEventListener('transitionend', cleanOnTransitionEnd);
        document.addEventListener('visibilitychange', cleanOnTransitionCancel);
        element.offsetHeight;
        element.style.transition = "transform ".concat(duration, "ms ").concat(transitionTimingFunction);
        element.offsetHeight;
        element.style.transform = (_e = settings === null || settings === void 0 ? void 0 : settings.finalTransform) !== null && _e !== void 0 ? _e : null;
        timeoutId = setTimeout(cleanOnTransitionEnd, duration + 100);
    });
    return promise;
}
var BgaSlideAnimation = (function (_super) {
    __extends(BgaSlideAnimation, _super);
    function BgaSlideAnimation(settings) {
        return _super.call(this, slideAnimation, settings) || this;
    }
    return BgaSlideAnimation;
}(BgaAnimation));
function pauseAnimation(animationManager, animation) {
    var promise = new Promise(function (success) {
        var _a;
        var settings = animation.settings;
        var duration = (_a = settings === null || settings === void 0 ? void 0 : settings.duration) !== null && _a !== void 0 ? _a : 500;
        setTimeout(function () { return success(); }, duration);
    });
    return promise;
}
var BgaPauseAnimation = (function (_super) {
    __extends(BgaPauseAnimation, _super);
    function BgaPauseAnimation(settings) {
        return _super.call(this, pauseAnimation, settings) || this;
    }
    return BgaPauseAnimation;
}(BgaAnimation));
function shouldAnimate(settings) {
    var _a;
    return document.visibilityState !== 'hidden' && !((_a = settings === null || settings === void 0 ? void 0 : settings.game) === null || _a === void 0 ? void 0 : _a.instantaneousMode);
}
function getDeltaCoordinates(element, settings) {
    var _a;
    if (!settings.fromDelta && !settings.fromRect && !settings.fromElement) {
        throw new Error("[bga-animation] fromDelta, fromRect or fromElement need to be set");
    }
    var x = 0;
    var y = 0;
    if (settings.fromDelta) {
        x = settings.fromDelta.x;
        y = settings.fromDelta.y;
    }
    else {
        var originBR = (_a = settings.fromRect) !== null && _a !== void 0 ? _a : settings.fromElement.getBoundingClientRect();
        var originalTransform = element.style.transform;
        element.style.transform = '';
        var destinationBR = element.getBoundingClientRect();
        element.style.transform = originalTransform;
        x = (destinationBR.left + destinationBR.right) / 2 - (originBR.left + originBR.right) / 2;
        y = (destinationBR.top + destinationBR.bottom) / 2 - (originBR.top + originBR.bottom) / 2;
    }
    if (settings.scale) {
        x /= settings.scale;
        y /= settings.scale;
    }
    return { x: x, y: y };
}
function logAnimation(animationManager, animation) {
    var settings = animation.settings;
    var element = settings.element;
    if (element) {
        console.log(animation, settings, element, element.getBoundingClientRect(), element.style.transform);
    }
    else {
        console.log(animation, settings);
    }
    return Promise.resolve(false);
}
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var AnimationManager = (function () {
    function AnimationManager(game, settings) {
        this.game = game;
        this.settings = settings;
        this.zoomManager = settings === null || settings === void 0 ? void 0 : settings.zoomManager;
        if (!game) {
            throw new Error('You must set your game as the first parameter of AnimationManager');
        }
    }
    AnimationManager.prototype.getZoomManager = function () {
        return this.zoomManager;
    };
    AnimationManager.prototype.setZoomManager = function (zoomManager) {
        this.zoomManager = zoomManager;
    };
    AnimationManager.prototype.getSettings = function () {
        return this.settings;
    };
    AnimationManager.prototype.animationsActive = function () {
        return document.visibilityState !== 'hidden' && !this.game.instantaneousMode;
    };
    AnimationManager.prototype.play = function (animation) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        return __awaiter(this, void 0, void 0, function () {
            var settings, _r;
            return __generator(this, function (_s) {
                switch (_s.label) {
                    case 0:
                        animation.played = animation.playWhenNoAnimation || this.animationsActive();
                        if (!animation.played) return [3, 2];
                        settings = animation.settings;
                        (_a = settings.animationStart) === null || _a === void 0 ? void 0 : _a.call(settings, animation);
                        (_b = settings.element) === null || _b === void 0 ? void 0 : _b.classList.add((_c = settings.animationClass) !== null && _c !== void 0 ? _c : 'bga-animations_animated');
                        animation.settings = __assign(__assign({}, animation.settings), { duration: (_g = (_e = (_d = animation.settings) === null || _d === void 0 ? void 0 : _d.duration) !== null && _e !== void 0 ? _e : (_f = this.settings) === null || _f === void 0 ? void 0 : _f.duration) !== null && _g !== void 0 ? _g : 500, scale: (_l = (_j = (_h = animation.settings) === null || _h === void 0 ? void 0 : _h.scale) !== null && _j !== void 0 ? _j : (_k = this.zoomManager) === null || _k === void 0 ? void 0 : _k.zoom) !== null && _l !== void 0 ? _l : undefined });
                        _r = animation;
                        return [4, animation.animationFunction(this, animation)];
                    case 1:
                        _r.result = _s.sent();
                        (_o = (_m = animation.settings).animationEnd) === null || _o === void 0 ? void 0 : _o.call(_m, animation);
                        (_p = settings.element) === null || _p === void 0 ? void 0 : _p.classList.remove((_q = settings.animationClass) !== null && _q !== void 0 ? _q : 'bga-animations_animated');
                        return [3, 3];
                    case 2: return [2, Promise.resolve(animation)];
                    case 3: return [2];
                }
            });
        });
    };
    AnimationManager.prototype.playParallel = function (animations) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, Promise.all(animations.map(function (animation) { return _this.play(animation); }))];
            });
        });
    };
    AnimationManager.prototype.playSequence = function (animations) {
        return __awaiter(this, void 0, void 0, function () {
            var result, others;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!animations.length) return [3, 3];
                        return [4, this.play(animations[0])];
                    case 1:
                        result = _a.sent();
                        return [4, this.playSequence(animations.slice(1))];
                    case 2:
                        others = _a.sent();
                        return [2, __spreadArray([result], others, true)];
                    case 3: return [2, Promise.resolve([])];
                }
            });
        });
    };
    AnimationManager.prototype.playWithDelay = function (animations, delay) {
        return __awaiter(this, void 0, void 0, function () {
            var promise;
            var _this = this;
            return __generator(this, function (_a) {
                promise = new Promise(function (success) {
                    var promises = [];
                    var _loop_1 = function (i) {
                        setTimeout(function () {
                            promises.push(_this.play(animations[i]));
                            if (i == animations.length - 1) {
                                Promise.all(promises).then(function (result) {
                                    success(result);
                                });
                            }
                        }, i * delay);
                    };
                    for (var i = 0; i < animations.length; i++) {
                        _loop_1(i);
                    }
                });
                return [2, promise];
            });
        });
    };
    AnimationManager.prototype.attachWithAnimation = function (animation, attachElement) {
        var attachWithAnimation = new BgaAttachWithAnimation({
            animation: animation,
            attachElement: attachElement
        });
        return this.play(attachWithAnimation);
    };
    return AnimationManager;
}());
var CardStock = (function () {
    function CardStock(manager, element, settings) {
        this.manager = manager;
        this.element = element;
        this.settings = settings;
        this.cards = [];
        this.selectedCards = [];
        this.selectionMode = 'none';
        manager.addStock(this);
        element === null || element === void 0 ? void 0 : element.classList.add('card-stock');
        this.bindClick();
        this.sort = settings === null || settings === void 0 ? void 0 : settings.sort;
    }
    CardStock.prototype.remove = function () {
        var _a;
        this.manager.removeStock(this);
        (_a = this.element) === null || _a === void 0 ? void 0 : _a.remove();
    };
    CardStock.prototype.getCards = function () {
        return this.cards.slice();
    };
    CardStock.prototype.isEmpty = function () {
        return !this.cards.length;
    };
    CardStock.prototype.getSelection = function () {
        return this.selectedCards.slice();
    };
    CardStock.prototype.isSelected = function (card) {
        var _this = this;
        return this.selectedCards.some(function (c) { return _this.manager.getId(c) == _this.manager.getId(card); });
    };
    CardStock.prototype.contains = function (card) {
        var _this = this;
        return this.cards.some(function (c) { return _this.manager.getId(c) == _this.manager.getId(card); });
    };
    CardStock.prototype.getCardElement = function (card) {
        return this.manager.getCardElement(card);
    };
    CardStock.prototype.canAddCard = function (card, settings) {
        return !this.contains(card);
    };
    CardStock.prototype.addCard = function (card, animation, settings) {
        var _this = this;
        var _a, _b, _c, _d;
        if (!this.canAddCard(card, settings)) {
            return Promise.resolve(false);
        }
        var promise;
        var originStock = this.manager.getCardStock(card);
        var index = this.getNewCardIndex(card);
        var settingsWithIndex = __assign({ index: index }, (settings !== null && settings !== void 0 ? settings : {}));
        var updateInformations = (_a = settingsWithIndex.updateInformations) !== null && _a !== void 0 ? _a : true;
        var needsCreation = true;
        if (originStock === null || originStock === void 0 ? void 0 : originStock.contains(card)) {
            var element = this.getCardElement(card);
            if (element) {
                promise = this.moveFromOtherStock(card, element, __assign(__assign({}, animation), { fromStock: originStock }), settingsWithIndex);
                needsCreation = false;
                if (!updateInformations) {
                    element.dataset.side = ((_b = settingsWithIndex === null || settingsWithIndex === void 0 ? void 0 : settingsWithIndex.visible) !== null && _b !== void 0 ? _b : this.manager.isCardVisible(card)) ? 'front' : 'back';
                }
            }
        }
        else if ((_c = animation === null || animation === void 0 ? void 0 : animation.fromStock) === null || _c === void 0 ? void 0 : _c.contains(card)) {
            var element = this.getCardElement(card);
            if (element) {
                promise = this.moveFromOtherStock(card, element, animation, settingsWithIndex);
                needsCreation = false;
            }
        }
        if (needsCreation) {
            var element = this.manager.createCardElement(card, ((_d = settingsWithIndex === null || settingsWithIndex === void 0 ? void 0 : settingsWithIndex.visible) !== null && _d !== void 0 ? _d : this.manager.isCardVisible(card)));
            promise = this.moveFromElement(card, element, animation, settingsWithIndex);
        }
        if (settingsWithIndex.index !== null && settingsWithIndex.index !== undefined) {
            this.cards.splice(index, 0, card);
        }
        else {
            this.cards.push(card);
        }
        if (updateInformations) {
            this.manager.updateCardInformations(card);
        }
        if (!promise) {
            console.warn("CardStock.addCard didn't return a Promise");
            promise = Promise.resolve(false);
        }
        if (this.selectionMode !== 'none') {
            promise.then(function () { var _a; return _this.setSelectableCard(card, (_a = settingsWithIndex.selectable) !== null && _a !== void 0 ? _a : true); });
        }
        return promise;
    };
    CardStock.prototype.getNewCardIndex = function (card) {
        if (this.sort) {
            var otherCards = this.getCards();
            for (var i = 0; i < otherCards.length; i++) {
                var otherCard = otherCards[i];
                if (this.sort(card, otherCard) < 0) {
                    return i;
                }
            }
            return otherCards.length;
        }
        else {
            return undefined;
        }
    };
    CardStock.prototype.addCardElementToParent = function (cardElement, settings) {
        var _a;
        var parent = (_a = settings === null || settings === void 0 ? void 0 : settings.forceToElement) !== null && _a !== void 0 ? _a : this.element;
        if ((settings === null || settings === void 0 ? void 0 : settings.index) === null || (settings === null || settings === void 0 ? void 0 : settings.index) === undefined || !parent.children.length || (settings === null || settings === void 0 ? void 0 : settings.index) >= parent.children.length) {
            parent.appendChild(cardElement);
        }
        else {
            parent.insertBefore(cardElement, parent.children[settings.index]);
        }
    };
    CardStock.prototype.moveFromOtherStock = function (card, cardElement, animation, settings) {
        var promise;
        var element = animation.fromStock.contains(card) ? this.manager.getCardElement(card) : animation.fromStock.element;
        var fromRect = element === null || element === void 0 ? void 0 : element.getBoundingClientRect();
        this.addCardElementToParent(cardElement, settings);
        this.removeSelectionClassesFromElement(cardElement);
        promise = fromRect ? this.animationFromElement(cardElement, fromRect, {
            originalSide: animation.originalSide,
            rotationDelta: animation.rotationDelta,
            animation: animation.animation,
        }) : Promise.resolve(false);
        if (animation.fromStock && animation.fromStock != this) {
            animation.fromStock.removeCard(card);
        }
        if (!promise) {
            console.warn("CardStock.moveFromOtherStock didn't return a Promise");
            promise = Promise.resolve(false);
        }
        return promise;
    };
    CardStock.prototype.moveFromElement = function (card, cardElement, animation, settings) {
        var promise;
        this.addCardElementToParent(cardElement, settings);
        if (animation) {
            if (animation.fromStock) {
                promise = this.animationFromElement(cardElement, animation.fromStock.element.getBoundingClientRect(), {
                    originalSide: animation.originalSide,
                    rotationDelta: animation.rotationDelta,
                    animation: animation.animation,
                });
                animation.fromStock.removeCard(card);
            }
            else if (animation.fromElement) {
                promise = this.animationFromElement(cardElement, animation.fromElement.getBoundingClientRect(), {
                    originalSide: animation.originalSide,
                    rotationDelta: animation.rotationDelta,
                    animation: animation.animation,
                });
            }
        }
        else {
            promise = Promise.resolve(false);
        }
        if (!promise) {
            console.warn("CardStock.moveFromElement didn't return a Promise");
            promise = Promise.resolve(false);
        }
        return promise;
    };
    CardStock.prototype.addCards = function (cards, animation, settings, shift) {
        if (shift === void 0) { shift = false; }
        return __awaiter(this, void 0, void 0, function () {
            var promises, result, others, _loop_2, i, results;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.manager.animationsActive()) {
                            shift = false;
                        }
                        promises = [];
                        if (!(shift === true)) return [3, 4];
                        if (!cards.length) return [3, 3];
                        return [4, this.addCard(cards[0], animation, settings)];
                    case 1:
                        result = _a.sent();
                        return [4, this.addCards(cards.slice(1), animation, settings, shift)];
                    case 2:
                        others = _a.sent();
                        return [2, result || others];
                    case 3: return [3, 5];
                    case 4:
                        if (typeof shift === 'number') {
                            _loop_2 = function (i) {
                                setTimeout(function () { return promises.push(_this.addCard(cards[i], animation, settings)); }, i * shift);
                            };
                            for (i = 0; i < cards.length; i++) {
                                _loop_2(i);
                            }
                        }
                        else {
                            promises = cards.map(function (card) { return _this.addCard(card, animation, settings); });
                        }
                        _a.label = 5;
                    case 5: return [4, Promise.all(promises)];
                    case 6:
                        results = _a.sent();
                        return [2, results.some(function (result) { return result; })];
                }
            });
        });
    };
    CardStock.prototype.removeCard = function (card, settings) {
        var promise;
        if (this.contains(card) && this.element.contains(this.getCardElement(card))) {
            promise = this.manager.removeCard(card, settings);
        }
        else {
            promise = Promise.resolve(false);
        }
        this.cardRemoved(card, settings);
        return promise;
    };
    CardStock.prototype.cardRemoved = function (card, settings) {
        var _this = this;
        var index = this.cards.findIndex(function (c) { return _this.manager.getId(c) == _this.manager.getId(card); });
        if (index !== -1) {
            this.cards.splice(index, 1);
        }
        if (this.selectedCards.find(function (c) { return _this.manager.getId(c) == _this.manager.getId(card); })) {
            this.unselectCard(card);
        }
    };
    CardStock.prototype.removeCards = function (cards, settings) {
        return __awaiter(this, void 0, void 0, function () {
            var promises, results;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promises = cards.map(function (card) { return _this.removeCard(card, settings); });
                        return [4, Promise.all(promises)];
                    case 1:
                        results = _a.sent();
                        return [2, results.some(function (result) { return result; })];
                }
            });
        });
    };
    CardStock.prototype.removeAll = function (settings) {
        var _this = this;
        var cards = this.getCards();
        cards.forEach(function (card) { return _this.removeCard(card, settings); });
    };
    CardStock.prototype.setSelectionMode = function (selectionMode, selectableCards) {
        var _this = this;
        if (selectionMode !== this.selectionMode) {
            this.unselectAll(true);
        }
        this.cards.forEach(function (card) { return _this.setSelectableCard(card, selectionMode != 'none'); });
        this.element.classList.toggle('bga-cards_selectable-stock', selectionMode != 'none');
        this.selectionMode = selectionMode;
        if (selectionMode === 'none') {
            this.getCards().forEach(function (card) { return _this.removeSelectionClasses(card); });
        }
        else {
            this.setSelectableCards(selectableCards !== null && selectableCards !== void 0 ? selectableCards : this.getCards());
        }
    };
    CardStock.prototype.setSelectableCard = function (card, selectable) {
        if (this.selectionMode === 'none') {
            return;
        }
        var element = this.getCardElement(card);
        var selectableCardsClass = this.getSelectableCardClass();
        var unselectableCardsClass = this.getUnselectableCardClass();
        if (selectableCardsClass) {
            element === null || element === void 0 ? void 0 : element.classList.toggle(selectableCardsClass, selectable);
        }
        if (unselectableCardsClass) {
            element === null || element === void 0 ? void 0 : element.classList.toggle(unselectableCardsClass, !selectable);
        }
        if (!selectable && this.isSelected(card)) {
            this.unselectCard(card, true);
        }
    };
    CardStock.prototype.setSelectableCards = function (selectableCards) {
        var _this = this;
        if (this.selectionMode === 'none') {
            return;
        }
        var selectableCardsIds = (selectableCards !== null && selectableCards !== void 0 ? selectableCards : this.getCards()).map(function (card) { return _this.manager.getId(card); });
        this.cards.forEach(function (card) {
            return _this.setSelectableCard(card, selectableCardsIds.includes(_this.manager.getId(card)));
        });
    };
    CardStock.prototype.selectCard = function (card, silent) {
        var _this = this;
        var _a;
        if (silent === void 0) { silent = false; }
        if (this.selectionMode == 'none') {
            return;
        }
        var element = this.getCardElement(card);
        var selectableCardsClass = this.getSelectableCardClass();
        if (!element || !element.classList.contains(selectableCardsClass)) {
            return;
        }
        if (this.selectionMode === 'single') {
            this.cards.filter(function (c) { return _this.manager.getId(c) != _this.manager.getId(card); }).forEach(function (c) { return _this.unselectCard(c, true); });
        }
        var selectedCardsClass = this.getSelectedCardClass();
        element.classList.add(selectedCardsClass);
        this.selectedCards.push(card);
        if (!silent) {
            (_a = this.onSelectionChange) === null || _a === void 0 ? void 0 : _a.call(this, this.selectedCards.slice(), card);
        }
    };
    CardStock.prototype.unselectCard = function (card, silent) {
        var _this = this;
        var _a;
        if (silent === void 0) { silent = false; }
        var element = this.getCardElement(card);
        var selectedCardsClass = this.getSelectedCardClass();
        element === null || element === void 0 ? void 0 : element.classList.remove(selectedCardsClass);
        var index = this.selectedCards.findIndex(function (c) { return _this.manager.getId(c) == _this.manager.getId(card); });
        if (index !== -1) {
            this.selectedCards.splice(index, 1);
        }
        if (!silent) {
            (_a = this.onSelectionChange) === null || _a === void 0 ? void 0 : _a.call(this, this.selectedCards.slice(), card);
        }
    };
    CardStock.prototype.selectAll = function (silent) {
        var _this = this;
        var _a;
        if (silent === void 0) { silent = false; }
        if (this.selectionMode == 'none') {
            return;
        }
        this.cards.forEach(function (c) { return _this.selectCard(c, true); });
        if (!silent) {
            (_a = this.onSelectionChange) === null || _a === void 0 ? void 0 : _a.call(this, this.selectedCards.slice(), null);
        }
    };
    CardStock.prototype.unselectAll = function (silent) {
        var _this = this;
        var _a;
        if (silent === void 0) { silent = false; }
        var cards = this.getCards();
        cards.forEach(function (c) { return _this.unselectCard(c, true); });
        if (!silent) {
            (_a = this.onSelectionChange) === null || _a === void 0 ? void 0 : _a.call(this, this.selectedCards.slice(), null);
        }
    };
    CardStock.prototype.bindClick = function () {
        var _this = this;
        var _a;
        (_a = this.element) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function (event) {
            var cardDiv = event.target.closest('.card');
            if (!cardDiv) {
                return;
            }
            var card = _this.cards.find(function (c) { return _this.manager.getId(c) == cardDiv.id; });
            if (!card) {
                return;
            }
            _this.cardClick(card);
        });
    };
    CardStock.prototype.cardClick = function (card) {
        var _this = this;
        var _a;
        if (this.selectionMode != 'none') {
            var alreadySelected = this.selectedCards.some(function (c) { return _this.manager.getId(c) == _this.manager.getId(card); });
            if (alreadySelected) {
                this.unselectCard(card);
            }
            else {
                this.selectCard(card);
            }
        }
        (_a = this.onCardClick) === null || _a === void 0 ? void 0 : _a.call(this, card);
    };
    CardStock.prototype.animationFromElement = function (element, fromRect, settings) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var side, cardSides_1, animation, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        side = element.dataset.side;
                        if (settings.originalSide && settings.originalSide != side) {
                            cardSides_1 = element.getElementsByClassName('card-sides')[0];
                            cardSides_1.style.transition = 'none';
                            element.dataset.side = settings.originalSide;
                            setTimeout(function () {
                                cardSides_1.style.transition = null;
                                element.dataset.side = side;
                            });
                        }
                        animation = settings.animation;
                        if (animation) {
                            animation.settings.element = element;
                            animation.settings.fromRect = fromRect;
                        }
                        else {
                            animation = new BgaSlideAnimation({ element: element, fromRect: fromRect });
                        }
                        return [4, this.manager.animationManager.play(animation)];
                    case 1:
                        result = _b.sent();
                        return [2, (_a = result === null || result === void 0 ? void 0 : result.played) !== null && _a !== void 0 ? _a : false];
                }
            });
        });
    };
    CardStock.prototype.setCardVisible = function (card, visible, settings) {
        this.manager.setCardVisible(card, visible, settings);
    };
    CardStock.prototype.flipCard = function (card, settings) {
        this.manager.flipCard(card, settings);
    };
    CardStock.prototype.getSelectableCardClass = function () {
        var _a, _b;
        return ((_a = this.settings) === null || _a === void 0 ? void 0 : _a.selectableCardClass) === undefined ? this.manager.getSelectableCardClass() : (_b = this.settings) === null || _b === void 0 ? void 0 : _b.selectableCardClass;
    };
    CardStock.prototype.getUnselectableCardClass = function () {
        var _a, _b;
        return ((_a = this.settings) === null || _a === void 0 ? void 0 : _a.unselectableCardClass) === undefined ? this.manager.getUnselectableCardClass() : (_b = this.settings) === null || _b === void 0 ? void 0 : _b.unselectableCardClass;
    };
    CardStock.prototype.getSelectedCardClass = function () {
        var _a, _b;
        return ((_a = this.settings) === null || _a === void 0 ? void 0 : _a.selectedCardClass) === undefined ? this.manager.getSelectedCardClass() : (_b = this.settings) === null || _b === void 0 ? void 0 : _b.selectedCardClass;
    };
    CardStock.prototype.removeSelectionClasses = function (card) {
        this.removeSelectionClassesFromElement(this.getCardElement(card));
    };
    CardStock.prototype.removeSelectionClassesFromElement = function (cardElement) {
        var selectableCardsClass = this.getSelectableCardClass();
        var unselectableCardsClass = this.getUnselectableCardClass();
        var selectedCardsClass = this.getSelectedCardClass();
        cardElement === null || cardElement === void 0 ? void 0 : cardElement.classList.remove(selectableCardsClass, unselectableCardsClass, selectedCardsClass);
    };
    return CardStock;
}());
var SlideAndBackAnimation = (function (_super) {
    __extends(SlideAndBackAnimation, _super);
    function SlideAndBackAnimation(manager, element, tempElement) {
        var distance = (manager.getCardWidth() + manager.getCardHeight()) / 2;
        var angle = Math.random() * Math.PI * 2;
        var fromDelta = {
            x: distance * Math.cos(angle),
            y: distance * Math.sin(angle),
        };
        return _super.call(this, {
            animations: [
                new BgaSlideToAnimation({ element: element, fromDelta: fromDelta, duration: 250 }),
                new BgaSlideAnimation({ element: element, fromDelta: fromDelta, duration: 250, animationEnd: tempElement ? (function () { return element.remove(); }) : undefined }),
            ]
        }) || this;
    }
    return SlideAndBackAnimation;
}(BgaCumulatedAnimation));
var Deck = (function (_super) {
    __extends(Deck, _super);
    function Deck(manager, element, settings) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        var _this = _super.call(this, manager, element) || this;
        _this.manager = manager;
        _this.element = element;
        element.classList.add('deck');
        var cardWidth = _this.manager.getCardWidth();
        var cardHeight = _this.manager.getCardHeight();
        if (cardWidth && cardHeight) {
            _this.element.style.setProperty('--width', "".concat(cardWidth, "px"));
            _this.element.style.setProperty('--height', "".concat(cardHeight, "px"));
        }
        else {
            throw new Error("You need to set cardWidth and cardHeight in the card manager to use Deck.");
        }
        _this.fakeCardGenerator = (_a = settings === null || settings === void 0 ? void 0 : settings.fakeCardGenerator) !== null && _a !== void 0 ? _a : manager.getFakeCardGenerator();
        _this.thicknesses = (_b = settings.thicknesses) !== null && _b !== void 0 ? _b : [0, 2, 5, 10, 20, 30];
        _this.setCardNumber((_c = settings.cardNumber) !== null && _c !== void 0 ? _c : 0);
        _this.autoUpdateCardNumber = (_d = settings.autoUpdateCardNumber) !== null && _d !== void 0 ? _d : true;
        _this.autoRemovePreviousCards = (_e = settings.autoRemovePreviousCards) !== null && _e !== void 0 ? _e : true;
        var shadowDirection = (_f = settings.shadowDirection) !== null && _f !== void 0 ? _f : 'bottom-right';
        var shadowDirectionSplit = shadowDirection.split('-');
        var xShadowShift = shadowDirectionSplit.includes('right') ? 1 : (shadowDirectionSplit.includes('left') ? -1 : 0);
        var yShadowShift = shadowDirectionSplit.includes('bottom') ? 1 : (shadowDirectionSplit.includes('top') ? -1 : 0);
        _this.element.style.setProperty('--xShadowShift', '' + xShadowShift);
        _this.element.style.setProperty('--yShadowShift', '' + yShadowShift);
        if (settings.topCard) {
            _this.addCard(settings.topCard);
        }
        else if (settings.cardNumber > 0) {
            _this.addCard(_this.getFakeCard());
        }
        if (settings.counter && ((_g = settings.counter.show) !== null && _g !== void 0 ? _g : true)) {
            if (settings.cardNumber === null || settings.cardNumber === undefined) {
                console.warn("Deck card counter created without a cardNumber");
            }
            _this.createCounter((_h = settings.counter.position) !== null && _h !== void 0 ? _h : 'bottom', (_j = settings.counter.extraClasses) !== null && _j !== void 0 ? _j : 'round', settings.counter.counterId);
            if ((_k = settings.counter) === null || _k === void 0 ? void 0 : _k.hideWhenEmpty) {
                _this.element.querySelector('.bga-cards_deck-counter').classList.add('hide-when-empty');
            }
        }
        _this.setCardNumber((_l = settings.cardNumber) !== null && _l !== void 0 ? _l : 0);
        return _this;
    }
    Deck.prototype.createCounter = function (counterPosition, extraClasses, counterId) {
        var left = counterPosition.includes('right') ? 100 : (counterPosition.includes('left') ? 0 : 50);
        var top = counterPosition.includes('bottom') ? 100 : (counterPosition.includes('top') ? 0 : 50);
        this.element.style.setProperty('--bga-cards-deck-left', "".concat(left, "%"));
        this.element.style.setProperty('--bga-cards-deck-top', "".concat(top, "%"));
        this.element.insertAdjacentHTML('beforeend', "\n            <div ".concat(counterId ? "id=\"".concat(counterId, "\"") : '', " class=\"bga-cards_deck-counter ").concat(extraClasses, "\"></div>\n        "));
    };
    Deck.prototype.getCardNumber = function () {
        return this.cardNumber;
    };
    Deck.prototype.setCardNumber = function (cardNumber, topCard) {
        var _this = this;
        if (topCard === void 0) { topCard = undefined; }
        var promise = topCard === null || cardNumber == 0 ?
            Promise.resolve(false) :
            _super.prototype.addCard.call(this, topCard || this.getFakeCard(), undefined, { autoUpdateCardNumber: false });
        this.cardNumber = cardNumber;
        this.element.dataset.empty = (this.cardNumber == 0).toString();
        var thickness = 0;
        this.thicknesses.forEach(function (threshold, index) {
            if (_this.cardNumber >= threshold) {
                thickness = index;
            }
        });
        this.element.style.setProperty('--thickness', "".concat(thickness, "px"));
        var counterDiv = this.element.querySelector('.bga-cards_deck-counter');
        if (counterDiv) {
            counterDiv.innerHTML = "".concat(cardNumber);
        }
        return promise;
    };
    Deck.prototype.addCard = function (card, animation, settings) {
        var _this = this;
        var _a, _b;
        if ((_a = settings === null || settings === void 0 ? void 0 : settings.autoUpdateCardNumber) !== null && _a !== void 0 ? _a : this.autoUpdateCardNumber) {
            this.setCardNumber(this.cardNumber + 1, null);
        }
        var promise = _super.prototype.addCard.call(this, card, animation, settings);
        if ((_b = settings === null || settings === void 0 ? void 0 : settings.autoRemovePreviousCards) !== null && _b !== void 0 ? _b : this.autoRemovePreviousCards) {
            promise.then(function () {
                var previousCards = _this.getCards().slice(0, -1);
                _this.removeCards(previousCards, { autoUpdateCardNumber: false });
            });
        }
        return promise;
    };
    Deck.prototype.cardRemoved = function (card, settings) {
        var _a;
        if ((_a = settings === null || settings === void 0 ? void 0 : settings.autoUpdateCardNumber) !== null && _a !== void 0 ? _a : this.autoUpdateCardNumber) {
            this.setCardNumber(this.cardNumber - 1);
        }
        _super.prototype.cardRemoved.call(this, card, settings);
    };
    Deck.prototype.getTopCard = function () {
        var cards = this.getCards();
        return cards.length ? cards[cards.length - 1] : null;
    };
    Deck.prototype.shuffle = function (settings) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var animatedCardsMax, animatedCards, elements, getFakeCard, uid, i, newCard, newElement, pauseDelayAfterAnimation;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        animatedCardsMax = (_a = settings === null || settings === void 0 ? void 0 : settings.animatedCardsMax) !== null && _a !== void 0 ? _a : 10;
                        this.addCard((_b = settings === null || settings === void 0 ? void 0 : settings.newTopCard) !== null && _b !== void 0 ? _b : this.getFakeCard(), undefined, { autoUpdateCardNumber: false });
                        if (!this.manager.animationsActive()) {
                            return [2, Promise.resolve(false)];
                        }
                        animatedCards = Math.min(10, animatedCardsMax, this.getCardNumber());
                        if (!(animatedCards > 1)) return [3, 4];
                        elements = [this.getCardElement(this.getTopCard())];
                        getFakeCard = function (uid) {
                            var newCard;
                            if (settings === null || settings === void 0 ? void 0 : settings.fakeCardSetter) {
                                newCard = {};
                                settings === null || settings === void 0 ? void 0 : settings.fakeCardSetter(newCard, uid);
                            }
                            else {
                                newCard = _this.fakeCardGenerator("".concat(_this.element.id, "-shuffle-").concat(uid));
                            }
                            return newCard;
                        };
                        uid = 0;
                        for (i = elements.length; i <= animatedCards; i++) {
                            newCard = void 0;
                            do {
                                newCard = getFakeCard(uid++);
                            } while (this.manager.getCardElement(newCard));
                            newElement = this.manager.createCardElement(newCard, false);
                            newElement.dataset.tempCardForShuffleAnimation = 'true';
                            this.element.prepend(newElement);
                            elements.push(newElement);
                        }
                        return [4, this.manager.animationManager.playWithDelay(elements.map(function (element) { return new SlideAndBackAnimation(_this.manager, element, element.dataset.tempCardForShuffleAnimation == 'true'); }), 50)];
                    case 1:
                        _d.sent();
                        pauseDelayAfterAnimation = (_c = settings === null || settings === void 0 ? void 0 : settings.pauseDelayAfterAnimation) !== null && _c !== void 0 ? _c : 500;
                        if (!(pauseDelayAfterAnimation > 0)) return [3, 3];
                        return [4, this.manager.animationManager.play(new BgaPauseAnimation({ duration: pauseDelayAfterAnimation }))];
                    case 2:
                        _d.sent();
                        _d.label = 3;
                    case 3: return [2, true];
                    case 4: return [2, Promise.resolve(false)];
                }
            });
        });
    };
    Deck.prototype.getFakeCard = function () {
        return this.fakeCardGenerator(this.element.id);
    };
    return Deck;
}(CardStock));
var LineStock = (function (_super) {
    __extends(LineStock, _super);
    function LineStock(manager, element, settings) {
        var _a, _b, _c, _d;
        var _this = _super.call(this, manager, element, settings) || this;
        _this.manager = manager;
        _this.element = element;
        element.classList.add('line-stock');
        element.dataset.center = ((_a = settings === null || settings === void 0 ? void 0 : settings.center) !== null && _a !== void 0 ? _a : true).toString();
        element.style.setProperty('--wrap', (_b = settings === null || settings === void 0 ? void 0 : settings.wrap) !== null && _b !== void 0 ? _b : 'wrap');
        element.style.setProperty('--direction', (_c = settings === null || settings === void 0 ? void 0 : settings.direction) !== null && _c !== void 0 ? _c : 'row');
        element.style.setProperty('--gap', (_d = settings === null || settings === void 0 ? void 0 : settings.gap) !== null && _d !== void 0 ? _d : '8px');
        return _this;
    }
    return LineStock;
}(CardStock));
var ManualPositionStock = (function (_super) {
    __extends(ManualPositionStock, _super);
    function ManualPositionStock(manager, element, settings, updateDisplay) {
        var _this = _super.call(this, manager, element, settings) || this;
        _this.manager = manager;
        _this.element = element;
        _this.updateDisplay = updateDisplay;
        element.classList.add('manual-position-stock');
        return _this;
    }
    ManualPositionStock.prototype.addCard = function (card, animation, settings) {
        var promise = _super.prototype.addCard.call(this, card, animation, settings);
        this.updateDisplay(this.element, this.getCards(), card, this);
        return promise;
    };
    ManualPositionStock.prototype.cardRemoved = function (card, settings) {
        _super.prototype.cardRemoved.call(this, card, settings);
        this.updateDisplay(this.element, this.getCards(), card, this);
    };
    return ManualPositionStock;
}(CardStock));
function sortFunction() {
    var sortedFields = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sortedFields[_i] = arguments[_i];
    }
    return function (a, b) {
        for (var i = 0; i < sortedFields.length; i++) {
            var direction = 1;
            var field = sortedFields[i];
            if (field[0] == '-') {
                direction = -1;
                field = field.substring(1);
            }
            else if (field[0] == '+') {
                field = field.substring(1);
            }
            var type = typeof a[field];
            if (type === 'string') {
                var compare = a[field].localeCompare(b[field]);
                if (compare !== 0) {
                    return compare;
                }
            }
            else if (type === 'number') {
                var compare = (a[field] - b[field]) * direction;
                if (compare !== 0) {
                    return compare * direction;
                }
            }
        }
        return 0;
    };
}
var CardManager = (function () {
    function CardManager(game, settings) {
        var _a;
        this.game = game;
        this.settings = settings;
        this.stocks = [];
        this.updateMainTimeoutId = [];
        this.updateFrontTimeoutId = [];
        this.updateBackTimeoutId = [];
        this.animationManager = (_a = settings.animationManager) !== null && _a !== void 0 ? _a : new AnimationManager(game);
    }
    CardManager.prototype.animationsActive = function () {
        return this.animationManager.animationsActive();
    };
    CardManager.prototype.addStock = function (stock) {
        this.stocks.push(stock);
    };
    CardManager.prototype.removeStock = function (stock) {
        var index = this.stocks.indexOf(stock);
        if (index !== -1) {
            this.stocks.splice(index, 1);
        }
    };
    CardManager.prototype.getId = function (card) {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.settings).getId) === null || _b === void 0 ? void 0 : _b.call(_a, card)) !== null && _c !== void 0 ? _c : "card-".concat(card.id);
    };
    CardManager.prototype.createCardElement = function (card, visible) {
        var _a, _b, _c, _d, _e, _f;
        if (visible === void 0) { visible = true; }
        var id = this.getId(card);
        var side = visible ? 'front' : 'back';
        if (this.getCardElement(card)) {
            throw new Error('This card already exists ' + JSON.stringify(card));
        }
        var element = document.createElement("div");
        element.id = id;
        element.dataset.side = '' + side;
        element.innerHTML = "\n            <div class=\"card-sides\">\n                <div id=\"".concat(id, "-front\" class=\"card-side front\">\n                </div>\n                <div id=\"").concat(id, "-back\" class=\"card-side back\">\n                </div>\n            </div>\n        ");
        element.classList.add('card');
        document.body.appendChild(element);
        (_b = (_a = this.settings).setupDiv) === null || _b === void 0 ? void 0 : _b.call(_a, card, element);
        (_d = (_c = this.settings).setupFrontDiv) === null || _d === void 0 ? void 0 : _d.call(_c, card, element.getElementsByClassName('front')[0]);
        (_f = (_e = this.settings).setupBackDiv) === null || _f === void 0 ? void 0 : _f.call(_e, card, element.getElementsByClassName('back')[0]);
        document.body.removeChild(element);
        return element;
    };
    CardManager.prototype.getCardElement = function (card) {
        return document.getElementById(this.getId(card));
    };
    CardManager.prototype.removeCard = function (card, settings) {
        var _a;
        var id = this.getId(card);
        var div = document.getElementById(id);
        if (!div) {
            return Promise.resolve(false);
        }
        div.id = "deleted".concat(id);
        div.remove();
        (_a = this.getCardStock(card)) === null || _a === void 0 ? void 0 : _a.cardRemoved(card, settings);
        return Promise.resolve(true);
    };
    CardManager.prototype.getCardStock = function (card) {
        return this.stocks.find(function (stock) { return stock.contains(card); });
    };
    CardManager.prototype.isCardVisible = function (card) {
        var _a, _b, _c, _d;
        return (_c = (_b = (_a = this.settings).isCardVisible) === null || _b === void 0 ? void 0 : _b.call(_a, card)) !== null && _c !== void 0 ? _c : ((_d = card.type) !== null && _d !== void 0 ? _d : false);
    };
    CardManager.prototype.setCardVisible = function (card, visible, settings) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        var element = this.getCardElement(card);
        if (!element) {
            return;
        }
        var isVisible = visible !== null && visible !== void 0 ? visible : this.isCardVisible(card);
        element.dataset.side = isVisible ? 'front' : 'back';
        var stringId = JSON.stringify(this.getId(card));
        if ((_a = settings === null || settings === void 0 ? void 0 : settings.updateMain) !== null && _a !== void 0 ? _a : false) {
            if (this.updateMainTimeoutId[stringId]) {
                clearTimeout(this.updateMainTimeoutId[stringId]);
                delete this.updateMainTimeoutId[stringId];
            }
            var updateMainDelay = (_b = settings === null || settings === void 0 ? void 0 : settings.updateMainDelay) !== null && _b !== void 0 ? _b : 0;
            if (isVisible && updateMainDelay > 0 && this.animationsActive()) {
                this.updateMainTimeoutId[stringId] = setTimeout(function () { var _a, _b; return (_b = (_a = _this.settings).setupDiv) === null || _b === void 0 ? void 0 : _b.call(_a, card, element); }, updateMainDelay);
            }
            else {
                (_d = (_c = this.settings).setupDiv) === null || _d === void 0 ? void 0 : _d.call(_c, card, element);
            }
        }
        if ((_e = settings === null || settings === void 0 ? void 0 : settings.updateFront) !== null && _e !== void 0 ? _e : true) {
            if (this.updateFrontTimeoutId[stringId]) {
                clearTimeout(this.updateFrontTimeoutId[stringId]);
                delete this.updateFrontTimeoutId[stringId];
            }
            var updateFrontDelay = (_f = settings === null || settings === void 0 ? void 0 : settings.updateFrontDelay) !== null && _f !== void 0 ? _f : 500;
            if (!isVisible && updateFrontDelay > 0 && this.animationsActive()) {
                this.updateFrontTimeoutId[stringId] = setTimeout(function () { var _a, _b; return (_b = (_a = _this.settings).setupFrontDiv) === null || _b === void 0 ? void 0 : _b.call(_a, card, element.getElementsByClassName('front')[0]); }, updateFrontDelay);
            }
            else {
                (_h = (_g = this.settings).setupFrontDiv) === null || _h === void 0 ? void 0 : _h.call(_g, card, element.getElementsByClassName('front')[0]);
            }
        }
        if ((_j = settings === null || settings === void 0 ? void 0 : settings.updateBack) !== null && _j !== void 0 ? _j : false) {
            if (this.updateBackTimeoutId[stringId]) {
                clearTimeout(this.updateBackTimeoutId[stringId]);
                delete this.updateBackTimeoutId[stringId];
            }
            var updateBackDelay = (_k = settings === null || settings === void 0 ? void 0 : settings.updateBackDelay) !== null && _k !== void 0 ? _k : 0;
            if (isVisible && updateBackDelay > 0 && this.animationsActive()) {
                this.updateBackTimeoutId[stringId] = setTimeout(function () { var _a, _b; return (_b = (_a = _this.settings).setupBackDiv) === null || _b === void 0 ? void 0 : _b.call(_a, card, element.getElementsByClassName('back')[0]); }, updateBackDelay);
            }
            else {
                (_m = (_l = this.settings).setupBackDiv) === null || _m === void 0 ? void 0 : _m.call(_l, card, element.getElementsByClassName('back')[0]);
            }
        }
        if ((_o = settings === null || settings === void 0 ? void 0 : settings.updateData) !== null && _o !== void 0 ? _o : true) {
            var stock = this.getCardStock(card);
            var cards = stock.getCards();
            var cardIndex = cards.findIndex(function (c) { return _this.getId(c) === _this.getId(card); });
            if (cardIndex !== -1) {
                stock.cards.splice(cardIndex, 1, card);
            }
        }
    };
    CardManager.prototype.flipCard = function (card, settings) {
        var element = this.getCardElement(card);
        var currentlyVisible = element.dataset.side === 'front';
        this.setCardVisible(card, !currentlyVisible, settings);
    };
    CardManager.prototype.updateCardInformations = function (card, settings) {
        var newSettings = __assign(__assign({}, (settings !== null && settings !== void 0 ? settings : {})), { updateData: true });
        this.setCardVisible(card, undefined, newSettings);
    };
    CardManager.prototype.getCardWidth = function () {
        var _a;
        return (_a = this.settings) === null || _a === void 0 ? void 0 : _a.cardWidth;
    };
    CardManager.prototype.getCardHeight = function () {
        var _a;
        return (_a = this.settings) === null || _a === void 0 ? void 0 : _a.cardHeight;
    };
    CardManager.prototype.getSelectableCardClass = function () {
        var _a, _b;
        return ((_a = this.settings) === null || _a === void 0 ? void 0 : _a.selectableCardClass) === undefined ? 'bga-cards_selectable-card' : (_b = this.settings) === null || _b === void 0 ? void 0 : _b.selectableCardClass;
    };
    CardManager.prototype.getUnselectableCardClass = function () {
        var _a, _b;
        return ((_a = this.settings) === null || _a === void 0 ? void 0 : _a.unselectableCardClass) === undefined ? 'bga-cards_disabled-card' : (_b = this.settings) === null || _b === void 0 ? void 0 : _b.unselectableCardClass;
    };
    CardManager.prototype.getSelectedCardClass = function () {
        var _a, _b;
        return ((_a = this.settings) === null || _a === void 0 ? void 0 : _a.selectedCardClass) === undefined ? 'bga-cards_selected-card' : (_b = this.settings) === null || _b === void 0 ? void 0 : _b.selectedCardClass;
    };
    CardManager.prototype.getFakeCardGenerator = function () {
        var _this = this;
        var _a, _b;
        return (_b = (_a = this.settings) === null || _a === void 0 ? void 0 : _a.fakeCardGenerator) !== null && _b !== void 0 ? _b : (function (deckId) { return ({ id: _this.getId({ id: "".concat(deckId, "-fake-top-card") }) }); });
    };
    return CardManager;
}());
var PaxRenaissance = (function () {
    function PaxRenaissance() {
        this._notif_uid_to_log_id = {};
        this._last_notif = null;
        console.log("paxrenaissance constructor");
    }
    PaxRenaissance.prototype.setup = function (gamedatas) {
        var _this = this;
        dojo.place("<div id='customActions' style='display:inline-block'></div>", $("generalactions"), "after");
        this.gamedatas = gamedatas;
        debug("gamedata", gamedatas);
        this._connections = [];
        this.activeStates = {
            playerAction: new PlayerActionState(this),
        };
        this.animationManager = new AnimationManager(this, { duration: 1000 });
        this.setupCardManagers();
        this.gameMap = new GameMap(this);
        this.tooltipManager = new TooltipManager(this);
        this.playerManager = new PlayerManager(this);
        this.market = new Market(this);
        this.hand = new Hand(this);
        this.updatePlayAreaSize();
        window.addEventListener("resize", function () {
            _this.updatePlayAreaSize();
        });
        if (this.notificationManager != undefined) {
            this.notificationManager.destroy();
        }
        this.notificationManager = new NotificationManager(this);
        this.notificationManager.setupNotifications();
        this.tooltipManager.setupTooltips();
        debug("Ending game setup");
    };
    PaxRenaissance.prototype.updatePlayAreaSize = function () {
        var playAreaContainer = document.getElementById("pr_play_area_container");
        this.playAreaScale = Math.min(1, playAreaContainer.offsetWidth / MIN_PLAY_AREA_WIDTH);
        var playArea = document.getElementById("pr_play_area");
        playArea.style.transform = "scale(".concat(this.playAreaScale, ")");
        var playAreaHeight = playArea.offsetHeight;
        playArea.style.width =
            playAreaContainer.offsetWidth / this.playAreaScale + "px";
        console.log("playAreaHeight", playAreaHeight);
        playAreaContainer.style.height = playAreaHeight * this.playAreaScale + "px";
    };
    PaxRenaissance.prototype.setupCardManagers = function () {
        var _this = this;
        this.cardManager = new CardManager(this, {
            animationManager: this.animationManager,
            getId: function (card) { return card.id.split("_")[0]; },
            setupDiv: function (card, div) {
                div.style.width = "calc(var(--paxRenCardScale) * 151px)";
                div.style.height = "calc(var(--paxRenCardScale) * 230px)";
            },
            setupFrontDiv: function (card, div) {
                div.classList.add("pr_card");
                div.setAttribute("data-card-id", card.id.split("_")[0]);
                div.style.width = "calc(var(--paxRenCardScale) * 151px)";
                div.style.height = "calc(var(--paxRenCardScale) * 230px)";
                if (!card.id.startsWith("FAKE")) {
                    _this.tooltipManager.addCardTooltip({
                        nodeId: card.id.split("_")[0] + "-front",
                        card: card,
                    });
                }
            },
            setupBackDiv: function (card, div) {
                div.classList.add("pr_card");
                div.setAttribute("data-card-id", card.region === EAST ? "EAST_BACK" : "WEST_BACK");
                div.style.width = "calc(var(--paxRenCardScale) * 151px)";
                div.style.height = "calc(var(--paxRenCardScale) * 230px)";
            },
            cardWidth: 151,
            cardHeight: 230,
            isCardVisible: function (_a) {
                var location = _a.location;
                if (location.startsWith("deck")) {
                    return false;
                }
                if (location === "market_west_0" || location === "market_east_0") {
                    return false;
                }
                return true;
            },
        });
    };
    PaxRenaissance.prototype.setupNotifications = function () {
    };
    PaxRenaissance.prototype.onEnteringState = function (stateName, args) {
        console.log("Entering state: " + stateName, args);
        if (this.framework().isCurrentPlayerActive() &&
            this.activeStates[stateName]) {
            this.activeStates[stateName].onEnteringState(args.args);
        }
    };
    PaxRenaissance.prototype.onLeavingState = function (stateName) {
        console.log("Leaving state: " + stateName);
        this.clearPossible();
    };
    PaxRenaissance.prototype.moveFlorin = function (_a) {
        var _b;
        var index = _a.index;
        return __awaiter(this, void 0, void 0, function () {
            var node, element, fromRect;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        node = document.getElementById("pr_florins_counter_2371052_icon");
                        node.insertAdjacentHTML("beforeend", tplIcon({
                            id: "temp_florin_".concat(index),
                            icon: "florin",
                            style: "position: absolute;",
                        }));
                        element = document.getElementById("temp_florin_".concat(index));
                        fromRect = (_b = $("pr_market_west_3_florins")) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect();
                        this.market.incFlorinValue({ region: WEST, column: 3, value: -1 });
                        return [4, this.animationManager.play(new BgaSlideAnimation({
                                element: element,
                                transitionTimingFunction: "ease-in-out",
                                fromRect: fromRect,
                            }))];
                    case 1:
                        _c.sent();
                        element.remove();
                        this.playerManager
                            .getPlayer({ playerId: 2371052 })
                            .counters.florins.incValue(1);
                        return [2, true];
                }
            });
        });
    };
    PaxRenaissance.prototype.onUpdateActionButtons = function (stateName, args) {
        var _this = this;
        return;
        if (this.framework().isCurrentPlayerActive()) {
            this.addPrimaryActionButton({
                id: "florins_button",
                text: _("Move Florins"),
                callback: function () { return __awaiter(_this, void 0, void 0, function () {
                    var promises, _loop_3, i, results;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                promises = [];
                                _loop_3 = function (i) {
                                    setTimeout(function () { return promises.push(_this.moveFlorin({ index: i })); }, i * 100);
                                };
                                for (i = 0; i < 2; i++) {
                                    _loop_3(i);
                                }
                                return [4, Promise.all(promises)];
                            case 1:
                                results = _a.sent();
                                return [2, results.some(function (result) { return result; })];
                        }
                    });
                }); },
            });
        }
    };
    PaxRenaissance.prototype.addActionButtonClient = function (_a) {
        var id = _a.id, text = _a.text, callback = _a.callback, extraClasses = _a.extraClasses, _b = _a.color, color = _b === void 0 ? "none" : _b;
        if ($(id)) {
            return;
        }
        this.framework().addActionButton(id, text, callback, "customActions", false, color);
        if (extraClasses) {
            dojo.addClass(id, extraClasses);
        }
    };
    PaxRenaissance.prototype.addCancelButton = function () {
        var _this = this;
        this.addDangerActionButton({
            id: "cancel_btn",
            text: _("Cancel"),
            callback: function () { return _this.onCancel(); },
        });
    };
    PaxRenaissance.prototype.addConfirmButton = function (_a) {
        var callback = _a.callback;
        this.addPrimaryActionButton({
            id: "confirm_btn",
            text: _("Confirm"),
            callback: callback,
        });
    };
    PaxRenaissance.prototype.addUndoButton = function () {
        var _this = this;
        this.addDangerActionButton({
            id: "undo_btn",
            text: _("Undo"),
            callback: function () { return _this.takeAction({ action: "restart" }); },
        });
    };
    PaxRenaissance.prototype.addPrimaryActionButton = function (_a) {
        var id = _a.id, text = _a.text, callback = _a.callback, extraClasses = _a.extraClasses;
        if ($(id)) {
            return;
        }
        this.framework().addActionButton(id, text, callback, "customActions", false, "blue");
        if (extraClasses) {
            dojo.addClass(id, extraClasses);
        }
    };
    PaxRenaissance.prototype.addSecondaryActionButton = function (_a) {
        var id = _a.id, text = _a.text, callback = _a.callback, extraClasses = _a.extraClasses;
        if ($(id)) {
            return;
        }
        this.framework().addActionButton(id, text, callback, "customActions", false, "gray");
        if (extraClasses) {
            dojo.addClass(id, extraClasses);
        }
    };
    PaxRenaissance.prototype.addDangerActionButton = function (_a) {
        var id = _a.id, text = _a.text, callback = _a.callback, extraClasses = _a.extraClasses;
        if ($(id)) {
            return;
        }
        this.framework().addActionButton(id, text, callback, "customActions", false, "red");
        if (extraClasses) {
            dojo.addClass(id, extraClasses);
        }
    };
    PaxRenaissance.prototype.clearInterface = function () {
        console.log("clear interface");
        this.playerManager.clearInterface();
    };
    PaxRenaissance.prototype.clearPossible = function () {
        this.framework().removeActionButtons();
        dojo.empty("customActions");
        dojo.forEach(this._connections, dojo.disconnect);
        this._connections = [];
        dojo.query(".".concat(PR_SELECTABLE)).removeClass(PR_SELECTABLE);
        dojo.query(".".concat(PR_SELECTED)).removeClass(PR_SELECTED);
    };
    PaxRenaissance.prototype.getPlayerId = function () {
        return Number(this.framework().player_id);
    };
    PaxRenaissance.prototype.getCurrentPlayer = function () {
        return this.playerManager.getPlayer({ playerId: this.getPlayerId() });
    };
    PaxRenaissance.prototype.framework = function () {
        return this;
    };
    PaxRenaissance.prototype.onCancel = function () {
        this.clearPossible();
        this.framework().restoreServerGameState();
    };
    PaxRenaissance.prototype.clientUpdatePageTitle = function (_a) {
        var text = _a.text, args = _a.args;
        this.gamedatas.gamestate.descriptionmyturn = this.format_string_recursive(_(text), args);
        this.framework().updatePageTitle();
    };
    PaxRenaissance.prototype.format_string_recursive = function (log, args) {
        var _this = this;
        try {
            if (log && args && !args.processed) {
                args.processed = true;
                Object.entries(args).forEach(function (_a) {
                    var key = _a[0], value = _a[1];
                    if (key.startsWith("tkn_")) {
                        args[key] = getTokenDiv({
                            key: key,
                            value: value,
                            game: _this,
                        });
                    }
                });
            }
        }
        catch (e) {
            console.error(log, args, "Exception thrown", e.stack);
        }
        return this.inherited(arguments);
    };
    PaxRenaissance.prototype.onPlaceLogOnChannel = function (msg) {
        var currentLogId = this.framework().notifqueue.next_log_id;
        var res = this.framework().inherited(arguments);
        this._notif_uid_to_log_id[msg.uid] = currentLogId;
        this._last_notif = {
            logId: currentLogId,
            msg: msg,
        };
        return res;
    };
    PaxRenaissance.prototype.checkLogCancel = function (notifId) {
        if (this.gamedatas.canceledNotifIds != null &&
            this.gamedatas.canceledNotifIds.includes(notifId)) {
            this.cancelLogs([notifId]);
        }
    };
    PaxRenaissance.prototype.cancelLogs = function (notifIds) {
        var _this = this;
        notifIds.forEach(function (uid) {
            if (_this._notif_uid_to_log_id.hasOwnProperty(uid)) {
                var logId = _this._notif_uid_to_log_id[uid];
                if ($("log_" + logId))
                    dojo.addClass("log_" + logId, "cancel");
            }
        });
    };
    PaxRenaissance.prototype.addLogClass = function () {
        if (this._last_notif == null)
            return;
        var notif = this._last_notif;
        if ($("log_" + notif.logId)) {
            var type = notif.msg.type;
            if (type == "history_history")
                type = notif.msg.args.originalType;
            dojo.addClass("log_" + notif.logId, "notif_" + type);
        }
    };
    PaxRenaissance.prototype.setLoader = function (value, max) {
        this.framework().inherited(arguments);
        if (!this.framework().isLoadingComplete && value >= 100) {
            this.framework().isLoadingComplete = true;
            this.onLoadingComplete();
        }
    };
    PaxRenaissance.prototype.onLoadingComplete = function () {
        this.cancelLogs(this.gamedatas.canceledNotifIds);
    };
    PaxRenaissance.prototype.actionError = function (actionName) {
        this.framework().showMessage("cannot take ".concat(actionName, " action"), "error");
    };
    PaxRenaissance.prototype.takeAction = function (_a) {
        var action = _a.action, _b = _a.args, args = _b === void 0 ? {} : _b;
        console.log("takeAction ".concat(action), args);
        if (!this.framework().checkAction(action)) {
            this.actionError(action);
            return;
        }
        var data = {
            lock: true,
            args: JSON.stringify(args),
        };
        var gameName = this.framework().game_name;
        this.framework().ajaxcall("/".concat(gameName, "/").concat(gameName, "/").concat(action, ".html"), data, this, function () { });
    };
    return PaxRenaissance;
}());
var MIN_PLAY_AREA_WIDTH = 1516;
var BLUE = "blue";
var GREEN = "green";
var PURPLE = "purple";
var YELLOW = "yellow";
var COLOR_MAP = {
    "1084c7": BLUE,
    bddcc6: GREEN,
    "732473": PURPLE,
    ffce00: YELLOW,
};
var DISABLED = "disabled";
var PR_NONE = "pr_none";
var PR_SELECTABLE = "pr_selectable";
var PR_SELECTED = "pr_selected";
var WEST = "west";
var EAST = "east";
var EMPIRE_CARD = "empireCard";
var TABLEAU_CARD = "tableauCard";
var VICTORY_CARD = "victoryCard";
var ENGLAND = "england";
var FRANCE = "france";
var HOLY_ROMAN_EMIRE = "holy_roman_empire";
var HUNGARY = "hungary";
var BYZANTIUM = "byzantium";
var PORTUGAL = "portugal";
var ARAGON = "aragon";
var PAPAL_STATES = "papal_states";
var OTTOMAN = "ottoman";
var MAMLUK = "mamluk";
var LONDON = "london";
var BORDEAUX = "bordeaux";
var BRUGES = "bruges";
var PARIS = "paris";
var LYON = "lyon";
var LUBECK = "lubeck";
var NURNBERG = "nurnberg";
var NOVGOROD = "novgorod";
var VIENNA = "vienna";
var BUDA = "buda";
var VARNA = "varna";
var TANA = "tana";
var CAFFA = "caffa";
var TREBIZOND = "trebizond";
var TOLEDO = "toledo";
var GRANADA = "granada";
var SPICE_ISLANDS = "spiceIslands";
var VALENCIA = "valencia";
var ALGIERS = "algiers";
var TIMBUKTU = "timbuktu";
var VENICE = "venice";
var CONSTANTINOPLE_1 = "constantinople1";
var CONSTANTINOPLE_2 = "constantinople2";
var CONSTANTINOPLE_3 = "constantinople3";
var MODON = "modon";
var RHODES = "rhodes";
var CYPRUS = "cyprus";
var CAIRO = "cairo";
var RED_SEA = "redSea";
var CITIES = [
    LONDON,
    BORDEAUX,
    BRUGES,
    PARIS,
    LYON,
    LUBECK,
    NURNBERG,
    NOVGOROD,
    VIENNA,
    BUDA,
    VARNA,
    TANA,
    CAFFA,
    TREBIZOND,
    TOLEDO,
    GRANADA,
    SPICE_ISLANDS,
    VALENCIA,
    ALGIERS,
    TIMBUKTU,
    VENICE,
    CONSTANTINOPLE_1,
    CONSTANTINOPLE_2,
    CONSTANTINOPLE_3,
    MODON,
    RHODES,
    CYPRUS,
    CAIRO,
    RED_SEA,
];
var isDebug = window.location.host == 'studio.boardgamearena.com' || window.location.hash.indexOf('debug') > -1;
var debug = isDebug ? console.info.bind(window.console) : function () { };
var capitalizeFirstLetter = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
var EMPIRE_CARD_CONFIG = (_a = {},
    _a[ENGLAND] = {
        top: 120,
        left: 349,
    },
    _a[FRANCE] = {
        top: 120,
        left: 526,
    },
    _a[HOLY_ROMAN_EMIRE] = {
        top: 120,
        left: 700,
    },
    _a[HUNGARY] = {
        top: 120,
        left: 876,
    },
    _a[BYZANTIUM] = {
        top: 120,
        left: 1052,
    },
    _a[PORTUGAL] = {
        top: 754,
        left: 349,
    },
    _a[ARAGON] = {
        top: 754,
        left: 526,
    },
    _a[PAPAL_STATES] = {
        top: 754,
        left: 700,
    },
    _a[OTTOMAN] = {
        top: 754,
        left: 876,
    },
    _a[MAMLUK] = {
        top: 754,
        left: 1052,
    },
    _a);
var MARKET_EAST_CONFIG = [
    {
        top: 1200,
        left: 93,
    },
    {
        top: 1200,
        left: 256,
    },
    {
        top: 1200,
        left: 425,
    },
    {
        top: 1200,
        left: 594,
    },
    {
        top: 1200,
        left: 762,
    },
    {
        top: 1200,
        left: 931,
    },
];
var MARKET_WEST_CONFIG = [
    {
        top: 950,
        left: 93,
    },
    {
        top: 950,
        left: 256,
    },
    {
        top: 950,
        left: 425,
    },
    {
        top: 950,
        left: 594,
    },
    {
        top: 950,
        left: 762,
    },
    {
        top: 950,
        left: 931,
    },
];
var MAP_CONFIG = (_b = {},
    _b[ENGLAND] = {
        top: 270,
        left: 350,
        cities: (_c = {},
            _c[LONDON] = {
                top: 76,
                left: 80,
            },
            _c[BORDEAUX] = {
                top: 185,
                left: 108,
            },
            _c),
    },
    _b[FRANCE] = {
        top: 270,
        left: 525.5,
        cities: (_d = {},
            _d[BRUGES] = {
                top: 65.5,
                left: 51.5,
            },
            _d[PARIS] = {
                top: 127,
                left: 9,
            },
            _d[LYON] = {
                top: 164,
                left: 91,
            },
            _d),
    },
    _b[HOLY_ROMAN_EMIRE] = {
        top: 270,
        left: 701,
        cities: (_e = {},
            _e[LUBECK] = {
                top: 42,
                left: 27,
            },
            _e[NOVGOROD] = {
                top: 35,
                left: 89,
            },
            _e[NURNBERG] = {
                top: 128.5,
                left: 14,
            },
            _e[VIENNA] = {
                top: 150,
                left: 88.5,
            },
            _e),
    },
    _b[HUNGARY] = {
        top: 270,
        left: 876,
        cities: (_f = {},
            _f[BUDA] = {
                top: 158,
                left: 15.5,
            },
            _f[VARNA] = {
                top: 170.5,
                left: 76,
            },
            _f),
    },
    _b[BYZANTIUM] = {
        top: 270,
        left: 1053,
        cities: (_g = {},
            _g[TANA] = {
                top: 41,
                left: 40,
            },
            _g[CAFFA] = {
                top: 131,
                left: 5,
            },
            _g[TREBIZOND] = {
                top: 188,
                left: 112,
            },
            _g),
    },
    _b[PORTUGAL] = {
        top: 525,
        left: 350,
        cities: (_h = {},
            _h[TOLEDO] = {
                top: 62.5,
                left: 94,
            },
            _h[GRANADA] = {
                top: 118.5,
                left: 103,
            },
            _h[SPICE_ISLANDS] = {
                top: 184,
                left: 37,
            },
            _h),
    },
    _b[ARAGON] = {
        top: 525,
        left: 525.5,
        cities: (_j = {},
            _j[VALENCIA] = {
                top: 55.5,
                left: 14.5,
            },
            _j[ALGIERS] = {
                top: 143.5,
                left: 101,
            },
            _j[TIMBUKTU] = {
                top: 165.5,
                left: 33,
            },
            _j),
    },
    _b[PAPAL_STATES] = {
        top: 525,
        left: 701,
        cities: (_k = {},
            _k[VENICE] = {
                top: 20.5,
                left: 40,
            },
            _k),
    },
    _b[OTTOMAN] = {
        top: 525,
        left: 876,
        cities: (_l = {},
            _l[CONSTANTINOPLE_1] = {
                top: 24.5,
                left: 10.5,
            },
            _l[CONSTANTINOPLE_2] = {
                top: 24.5,
                left: 45,
            },
            _l[CONSTANTINOPLE_3] = {
                top: 24.5,
                left: 79.5,
            },
            _l[MODON] = {
                top: 96,
                left: 19.5,
            },
            _l[RHODES] = {
                top: 86.5,
                left: 108,
            },
            _l),
    },
    _b[MAMLUK] = {
        top: 525,
        left: 1053,
        cities: (_m = {},
            _m[CYPRUS] = {
                top: 76,
                left: 54.5,
            },
            _m[CAIRO] = {
                top: 162,
                left: 42,
            },
            _m[RED_SEA] = {
                top: 163.5,
                left: 106,
            },
            _m),
    },
    _b);
var LOCAL_STORAGE_MAP_ZOOM_KEY = "PaxRenaissance-map-zoom";
var ZOOM_LEVELS = [0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1];
var MAX_MAP_HEIGHT = 1500;
var MAX_MAP_WIDTH = 1500;
var GameMap = (function () {
    function GameMap(game) {
        this.game = game;
        this.zoomLevel =
            Number(localStorage.getItem(LOCAL_STORAGE_MAP_ZOOM_KEY)) || 1;
        console.log("localStorage zoomLevel", this.zoomLevel);
        var gamedatas = game.gamedatas;
        this.setupGameMap({ gamedatas: gamedatas });
    }
    GameMap.prototype.setupChessPieces = function (_a) {
        var gamedatas = _a.gamedatas;
        CITIES.forEach(function (city) {
            var chessPiece = gamedatas.chessPieces.find(function (piece) { return piece.location === city; });
            if (!chessPiece) {
                return;
            }
            var node = document.getElementById("pr_city_".concat(city));
            if (!node) {
                return;
            }
            node.insertAdjacentHTML("beforeend", tplChessPiece({ id: chessPiece.id }));
        });
    };
    GameMap.prototype.setupEmpireCards = function (_a) {
        var gamedatas = _a.gamedatas;
        gamedatas.gameMap.forEach(function (card) {
            var id = card.id, location = card.location;
            var node = document.getElementById("pr_".concat(location));
            if (!node) {
                debug("Unable to get empire card node");
            }
            node.setAttribute("data-card-id", "".concat(id, "_king"));
        });
    };
    GameMap.prototype.updateGameMap = function (_a) {
        var gamedatas = _a.gamedatas;
    };
    GameMap.prototype.setupGameMap = function (_a) {
        var _this = this;
        var gamedatas = _a.gamedatas;
        document
            .getElementById("pr_play_area")
            .insertAdjacentHTML("afterbegin", tplGameMap());
        this.updateGameMapSize();
        window.addEventListener("resize", function () {
            _this.updateGameMapSize();
        });
        this.setupZoomButtons();
        this.setupEmpireCards({ gamedatas: gamedatas });
        this.setupChessPieces({ gamedatas: gamedatas });
    };
    GameMap.prototype.setupZoomButtons = function () {
        var _this = this;
        dojo.connect($("pr_game_map_zoom_out_button"), "onclick", this, function () {
            return _this.zoom({ type: "out" });
        });
        dojo.connect($("pr_game_map_zoom_in_button"), "onclick", this, function () {
            return _this.zoom({ type: "in" });
        });
        this.checkZoomButtonClasses();
    };
    GameMap.prototype.clearInterface = function () { };
    GameMap.prototype.getCurrentZoomIndex = function () {
        console.log("zoomLevel", this.zoomLevel);
        return ZOOM_LEVELS.indexOf(Number(localStorage.getItem(LOCAL_STORAGE_MAP_ZOOM_KEY)) || 1);
    };
    GameMap.prototype.checkZoomButtonClasses = function () {
        var zoomInButton = $("pr_game_map_zoom_in_button");
        var zoomOutButton = $("pr_game_map_zoom_out_button");
        zoomInButton.classList.remove(DISABLED);
        zoomOutButton.classList.remove(DISABLED);
        if (this.zoomLevel === ZOOM_LEVELS[0]) {
            zoomOutButton.classList.add(DISABLED);
        }
        else if (this.zoomLevel === ZOOM_LEVELS[ZOOM_LEVELS.length - 1]) {
            zoomInButton.classList.add(DISABLED);
        }
    };
    GameMap.prototype.updateGameMapSize = function () {
        var map = document.getElementById("pr_game_map");
        map.style.transform = "scale(".concat(this.zoomLevel, ")");
        var mapContainer = document.getElementById("pr_game_map_container");
        mapContainer.style.width = "".concat(this.zoomLevel * MAX_MAP_WIDTH, "px");
        mapContainer.style.height = "".concat(this.zoomLevel * MAX_MAP_HEIGHT + 56, "px");
    };
    GameMap.prototype.zoom = function (_a) {
        var type = _a.type;
        var currentZoomIndex = this.getCurrentZoomIndex();
        if (type === "in" && currentZoomIndex !== ZOOM_LEVELS.length - 1) {
            this.zoomLevel = ZOOM_LEVELS[currentZoomIndex + 1];
        }
        else if (type === "out" && currentZoomIndex > 0) {
            this.zoomLevel = ZOOM_LEVELS[currentZoomIndex - 1];
        }
        this.updateGameMapSize();
        this.checkZoomButtonClasses();
        this.game.updatePlayAreaSize();
        localStorage.setItem(LOCAL_STORAGE_MAP_ZOOM_KEY, this.zoomLevel + "");
    };
    return GameMap;
}());
var tplChessPiece = function (_a) {
    var id = _a.id;
    var type = id.split('_')[0];
    var religion = id.split('_')[1];
    return "<div id=\"".concat(id, "\" class=\"pr_chess_piece pr_").concat(type, "\" data-religion=\"").concat(religion, "\"></div>");
};
var tplGameMapMarket = function () { return "\n  ".concat(MARKET_WEST_CONFIG.map(function (_a, index) {
    var top = _a.top, left = _a.left;
    return "\n  <div id=\"pr_market_west_".concat(index, "\" class=\"pr_market\" style=\"top: calc(var(--paxRenMapScale) * ").concat(top, "px); left: calc(var(--paxRenMapScale) * ").concat(left, "px);\">\n    <div id=\"pr_market_west_").concat(index, "_stock\" class=\"pr_market_stock\"></div>\n    ").concat(tplIcon({ id: "pr_market_west_".concat(index, "_florins"), icon: 'florin', classes: 'pr_none', extra: 'data-region="west"', children: "<span id=\"pr_market_west_".concat(index, "_counter\" class=\"pr_counter\"></span>") }), "\n  </div>");
}).join(''), "\n  <div id=\"pr_market_west_deck_container\" class=\"pr_market\" style=\"top: calc(var(--paxRenCardScale) * 950px); left: calc(var(--paxRenCardScale) * 1095px);\">\n    <div id=\"pr_market_west_deck\"></div>\n  </div>\n  ").concat(MARKET_EAST_CONFIG.map(function (_a, index) {
    var top = _a.top, left = _a.left;
    return "\n  <div id=\"pr_market_east_".concat(index, "\" class=\"pr_market\" style=\"top: calc(var(--paxRenMapScale) * ").concat(top, "px); left: calc(var(--paxRenMapScale) * ").concat(left, "px);\">\n    <div id=\"pr_market_east_").concat(index, "_stock\" class=\"pr_market_stock\"></div>\n    ").concat(tplIcon({ id: "pr_market_east_".concat(index, "_florins"), icon: 'florin', classes: 'pr_none', extra: 'data-region="east"', children: "<span id=\"pr_market_east_".concat(index, "_counter\" class=\"pr_counter\"></span>") }), "\n  </div>");
}).join(''), "\n  <div id=\"pr_market_east_deck_container\" class=\"pr_market\" style=\"top:  calc(var(--paxRenCardScale) * 1200px); left: calc(var(--paxRenCardScale) * 1095px);\">\n    <div id=\"pr_market_east_deck\"></div>\n  </div>\n"); };
var tplGameMapEmpireCards = function () { return "\n  ".concat(Object.entries(EMPIRE_CARD_CONFIG).map(function (_a) {
    var empire = _a[0], _b = _a[1], top = _b.top, left = _b.left;
    return "<div id=\"pr_empire_".concat(empire, "\" class=\"pr_square_card\" data-card-id=\"null\" style=\"top: calc(var(--paxRenCardScale) * ").concat(top, "px); left: calc(var(--paxRenCardScale) * ").concat(left, "px);\"></div>");
}).join(''), "\n"); };
var tplGameMapMapCards = function () {
    var htmlArray = Object.entries(MAP_CONFIG).map(function (_a) {
        var empire = _a[0], data = _a[1];
        return "\n  <div id=\"pr_empire_".concat(empire, "\" class=\"pr_map_card\" data-card-id=\"medieval_").concat(empire, "\" style=\"top: calc(var(--paxRenMapScale) * ").concat(data.top, "px); left: calc(var(--paxRenMapScale) * ").concat(data.left, "px);\">\n    ").concat(Object.entries(data.cities)
            .map(function (_a) {
            var city = _a[0], coords = _a[1];
            return "<div id=\"pr_city_".concat(city, "\" class=\"pr_city\" style=\"top: calc(var(--paxRenMapScale) * ").concat(coords.top, "px); left: calc(var(--paxRenMapScale) * ").concat(coords.left, "px);\"></div>");
        })
            .join(""), "\n  </div>\n");
    });
    return htmlArray.join("");
};
var tplGameMapVictoryCards = function () { return "\n  <div class=\"pr_square_card\" data-card-id=\"victory_renaissance_inactive\" style=\"top: calc(var(--paxRenCardScale) * 120.5px); left: calc(var(--paxRenCardScale) * 135.5px);\"></div>\n  <div class=\"pr_square_card\" data-card-id=\"victory_globalization_inactive\" style=\"top: calc(var(--paxRenCardScale) * 296px); left: calc(var(--paxRenCardScale) * 135.5px);\"></div>\n  <div class=\"pr_square_card\" data-card-id=\"victory_imperial_inactive\" style=\"top: calc(var(--paxRenCardScale) * 578px); left: calc(var(--paxRenCardScale) * 135.5px);\"></div>\n  <div class=\"pr_square_card\" data-card-id=\"victory_holy_inactive\" style=\"top: calc(var(--paxRenCardScale) * 753.5px); left: calc(var(--paxRenCardScale) * 135.5px);\"></div>\n"; };
var tplGameMap = function () { return "\n<div id=\"pr_game_map_container\">\n  <div class=\"pr_game_map_zoom_buttons\">\n    <button id=\"pr_game_map_zoom_out_button\" type=\"button\" class=\"bga-zoom-button bga-zoom-out-icon\" style=\"margin-bottom: -5px;\"></button>\n    <button id=\"pr_game_map_zoom_in_button\" type=\"button\" class=\"bga-zoom-button bga-zoom-in-icon\" style=\"margin-bottom: -5px;\"></button>\n  </div>\n  <div id=\"pr_game_map\">\n    ".concat(tplGameMapVictoryCards(), "\n    ").concat(tplGameMapEmpireCards(), "\n    ").concat(tplGameMapMapCards(), "\n    ").concat(tplGameMapMarket(), "\n  </div>\n</div>"); };
var Hand = (function () {
    function Hand(game) {
        this.game = game;
        this.setupHand();
    }
    Hand.prototype.setupHand = function () {
        var node = $("game_play_area");
        node.insertAdjacentHTML("beforeend", tplHand());
        var handWrapper = $("pr_floating_hand_wrapper");
        $("pr_floating_hand_button").addEventListener("click", function () {
            if (handWrapper.dataset.open && handWrapper.dataset.open == "hand") {
                delete handWrapper.dataset.open;
            }
            else {
                handWrapper.dataset.open = "hand";
            }
        });
        this.hand = new LineStock(this.game.cardManager, document.getElementById("pr_player_hand"), { wrap: "wrap" });
    };
    Hand.prototype.addCard = function (card) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.hand.addCard(card);
                return [2];
            });
        });
    };
    return Hand;
}());
var tplHand = function () {
    return "<div id=\"pr_floating_hand_wrapper\" class=\"active\">\n            <div id=\"pr_floating_hand_button_container\">\n              <button id=\"pr_floating_hand_button\" type=\"button\" class=\"pr_button\">\n                <div class=\"pr_icon\"></div>\n              </button>  \n            </div>\n            <div id=\"pr_floating_hand\">\n              <div id=\"pr_player_hand\" style=\"justify-content: start;\">\n              </div>\n            </div>\n          </div\n  ";
};
var IconCounter = (function () {
    function IconCounter(config) {
        var iconCounterId = config.iconCounterId, containerId = config.containerId;
        this.iconCounterId = iconCounterId;
        this.containerId = containerId;
        this.setup(config);
    }
    IconCounter.prototype.setup = function (_a) {
        var icon = _a.icon, initialValue = _a.initialValue, extraIconClasses = _a.extraIconClasses;
        var container = document.getElementById(this.containerId);
        if (!container) {
            return;
        }
        container.insertAdjacentHTML("beforeend", tplIconCounter({ extraIconClasses: extraIconClasses, icon: icon, iconCounterId: this.iconCounterId, value: initialValue }));
        this.counter = new ebg.counter();
        this.counter.create("".concat(this.iconCounterId, "_counter"));
        this.counter.setValue(initialValue);
    };
    IconCounter.prototype.setValue = function (value) {
        this.counter.setValue(value);
        var node = document.getElementById(this.iconCounterId);
        if (!node) {
            return;
        }
        this.checkNone({ node: node, value: value });
    };
    IconCounter.prototype.incValue = function (value) {
        this.counter.incValue(value);
        var node = document.getElementById(this.iconCounterId);
        if (!node) {
            return;
        }
        this.checkNone({ node: node, value: this.counter.getValue() });
    };
    IconCounter.prototype.getValue = function () {
        return this.counter.getValue();
    };
    IconCounter.prototype.checkNone = function (_a) {
        var node = _a.node, value = _a.value;
        if (value === 0) {
            node.classList.add(PR_NONE);
        }
        else {
            node.classList.remove(PR_NONE);
        }
    };
    return IconCounter;
}());
var tplIconCounter = function (_a) {
    var icon = _a.icon, iconCounterId = _a.iconCounterId, value = _a.value, extraIconClasses = _a.extraIconClasses;
    return "\n  <div id=\"".concat(iconCounterId, "\" class=\"pr_icon_counter_container").concat(value === 0 ? ' pr_none' : '', "\">\n    <span id=\"").concat(iconCounterId, "_counter\" class=\"pr_counter\"></span>\n    <div id=\"").concat(iconCounterId, "_icon\" class=\"pr_icon").concat(extraIconClasses ? " ".concat(extraIconClasses) : '', "\" data-icon=\"").concat(icon, "\"></div>\n  </div>");
};
var tplIcon = function (_a) {
    var id = _a.id, children = _a.children, classes = _a.classes, _b = _a.extra, extra = _b === void 0 ? "" : _b, icon = _a.icon, style = _a.style;
    return "<div ".concat(id ? "id=\"".concat(id, "\"") : '', " class=\"pr_icon").concat(classes ? " ".concat(classes) : '', "\" data-icon=\"").concat(icon, "\" ").concat(extra, " ").concat(style ? "style=\"".concat(style, "\"") : '', ">\n    ").concat(children || '', "\n  </div>");
};
var LOG_TOKEN_BOLD_TEXT = 'boldText';
var LOG_TOKEN_NEW_LINE = 'newLine';
var LOG_TOKEN_PLAYER_NAME = 'playerName';
var LOG_TOKEN_FLORIN = 'florin';
var tooltipIdCounter = 0;
var getTokenDiv = function (_a) {
    var key = _a.key, value = _a.value, game = _a.game;
    var splitKey = key.split('_');
    var type = splitKey[1];
    switch (type) {
        case LOG_TOKEN_BOLD_TEXT:
            return tlpLogTokenBoldText({ text: value });
        case LOG_TOKEN_FLORIN:
            return tplIcon({ icon: 'florin' });
        case LOG_TOKEN_NEW_LINE:
            return '<br>';
        case LOG_TOKEN_PLAYER_NAME:
            var player = game.playerManager.getPlayers().find(function (player) { return player.getName() === value; });
            return player ? tplLogTokenPlayerName({ name: player.getName(), color: player.getHexColor() }) : value;
        default:
            return value;
    }
};
var tlpLogTokenBoldText = function (_a) {
    var text = _a.text;
    return "<span style=\"font-weight: 700;\">".concat(_(text), "</span>");
};
var tplLogTokenPlayerName = function (_a) {
    var name = _a.name, color = _a.color;
    return "<span class=\"playername\" style=\"color:#".concat(color, ";\">").concat(name, "</span>");
};
var Market = (function () {
    function Market(game) {
        this.game = game;
        var gamedatas = game.gamedatas;
        this.setupDecksAndStocks({ gamedatas: gamedatas });
        this.setupMarket({ gamedatas: gamedatas });
    }
    Market.prototype.setupDecksAndStocks = function (_a) {
        var _b, _c, _d;
        var _this = this;
        var gamedatas = _a.gamedatas;
        this.decks = (_b = {},
            _b[EAST] = new Deck(this.game.cardManager, document.getElementById("pr_market_east_deck"), {
                cardNumber: gamedatas.market.deckCounts[EAST].cardCount,
                fakeCardGenerator: function (deckId) {
                    return _this.getFakeCard({ deckId: deckId, region: EAST });
                },
            }),
            _b[WEST] = new Deck(this.game.cardManager, document.getElementById("pr_market_west_deck"), {
                cardNumber: gamedatas.market.deckCounts[WEST].cardCount,
                fakeCardGenerator: function (deckId) {
                    return _this.getFakeCard({ deckId: deckId, region: WEST });
                },
            }),
            _b);
        this.stocks = (_c = {},
            _c[EAST] = [],
            _c[WEST] = [],
            _c);
        this.counters = (_d = {},
            _d[EAST] = [],
            _d[WEST] = [],
            _d);
        for (var i = 0; i <= 5; i++) {
            this.stocks[EAST][i] = new LineStock(this.game.cardManager, document.getElementById("pr_market_east_".concat(i, "_stock")));
            this.counters[EAST][i] = new ebg.counter();
            this.counters[EAST][i].create("pr_market_east_".concat(i, "_counter"));
            this.stocks[WEST][i] = new LineStock(this.game.cardManager, document.getElementById("pr_market_west_".concat(i, "_stock")));
            this.counters[WEST][i] = new ebg.counter();
            this.counters[WEST][i].create("pr_market_west_".concat(i, "_counter"));
        }
    };
    Market.prototype.setupMarket = function (_a) {
        var gamedatas = _a.gamedatas;
        return __awaiter(this, void 0, void 0, function () {
            var i;
            var _this = this;
            return __generator(this, function (_b) {
                gamedatas.market.cards.forEach(function (card) {
                    var id = card.id, location = card.location;
                    var _a = location.split("_"), market = _a[0], region = _a[1], column = _a[2];
                    var stock = _this.getStock({ region: region, column: Number(column) });
                    stock.addCard(card);
                });
                for (i = 0; i <= 5; i++) {
                    this.setFlorinValue({
                        column: i,
                        region: EAST,
                        value: gamedatas.market.florins[EAST][i],
                    });
                    this.setFlorinValue({
                        column: i,
                        region: WEST,
                        value: gamedatas.market.florins[WEST][i],
                    });
                }
                return [2];
            });
        });
    };
    Market.prototype.getDeck = function (_a) {
        var region = _a.region;
        return this.decks[region];
    };
    Market.prototype.getStock = function (_a) {
        var region = _a.region, column = _a.column;
        return this.stocks[region][column];
    };
    Market.prototype.getFakeCard = function (_a) {
        var deckId = _a.deckId, region = _a.region;
        return {
            id: "FAKE-".concat(region),
            type: "tableauCard",
            region: region,
            location: "deck_".concat(region),
            flavorText: [],
            state: 0,
            name: "",
            used: 0,
        };
    };
    Market.prototype.incFlorinValue = function (_a) {
        var region = _a.region, column = _a.column, value = _a.value;
        var currentValue = this.counters[region][column].getValue();
        this.counters[region][column].incValue(value);
        var node = document.getElementById("pr_market_".concat(region, "_").concat(column, "_florins"));
        if (node !== null) {
            this.checkNone({ node: node, value: currentValue + value });
        }
    };
    Market.prototype.setFlorinValue = function (_a) {
        var region = _a.region, column = _a.column, value = _a.value;
        this.counters[region][column].setValue(value);
        var node = document.getElementById("pr_market_".concat(region, "_").concat(column, "_florins"));
        if (node !== null) {
            this.checkNone({ node: node, value: value });
        }
    };
    Market.prototype.checkNone = function (_a) {
        var node = _a.node, value = _a.value;
        if (value === 0) {
            node.classList.add(PR_NONE);
        }
        else {
            node.classList.remove(PR_NONE);
        }
    };
    return Market;
}());
var NotificationManager = (function () {
    function NotificationManager(game) {
        this.game = game;
        this.subscriptions = [];
    }
    NotificationManager.prototype.setupNotifications = function () {
        var _this = this;
        console.log('notifications subscriptions setup');
        var notifs = [
            ['log', 1],
        ];
        notifs.forEach(function (notif) {
            _this.subscriptions.push(dojo.subscribe(notif[0], _this, function (notifDetails) {
                debug("notif_".concat(notif[0]), notifDetails);
                var promise = _this["notif_".concat(notif[0])](notifDetails);
                promise === null || promise === void 0 ? void 0 : promise.then(function () { return _this.game.framework().notifqueue.onSynchronousNotificationEnd(); });
            }));
            _this.game.framework().notifqueue.setSynchronous(notif[0], notif[1]);
        });
    };
    NotificationManager.prototype.notif_log = function (notif) {
        debug('notif_log', notif.args);
    };
    NotificationManager.prototype.notif_smallRefreshInterface = function (notif) {
        var updatedGamedatas = __assign(__assign({}, this.game.gamedatas), notif.args);
        this.game.clearInterface();
        this.game.gamedatas = updatedGamedatas;
        this.game.playerManager.updatePlayers({ gamedatas: updatedGamedatas });
    };
    NotificationManager.prototype.destroy = function () {
        dojo.forEach(this.subscriptions, dojo.unsubscribe);
    };
    NotificationManager.prototype.getPlayer = function (_a) {
        var playerId = _a.playerId;
        return this.game.playerManager.getPlayer({ playerId: playerId });
    };
    return NotificationManager;
}());
var PlayerManager = (function () {
    function PlayerManager(game) {
        console.log("Constructor PlayerManager");
        this.game = game;
        this.players = {};
        this.setupPlayerTableaux({
            playerOrder: game.gamedatas.playerorder.map(function (playerId) {
                return Number(playerId);
            }),
        });
        for (var playerId in game.gamedatas.players) {
            var player = game.gamedatas.players[playerId];
            this.players[playerId] = new PRPlayer({ player: player, game: this.game });
        }
    }
    PlayerManager.prototype.setupPlayerTableaux = function (_a) {
        var playerOrder = _a.playerOrder;
        document
            .getElementById("pr_play_area")
            .insertAdjacentHTML("beforeend", tplPlayerTableauxContainer({ playerOrder: playerOrder }));
    };
    PlayerManager.prototype.getPlayer = function (_a) {
        var playerId = _a.playerId;
        return this.players[playerId];
    };
    PlayerManager.prototype.getPlayers = function () {
        return Object.values(this.players);
    };
    PlayerManager.prototype.getPlayerIds = function () {
        return Object.keys(this.players).map(Number);
    };
    PlayerManager.prototype.updatePlayers = function (_a) {
        var gamedatas = _a.gamedatas;
        for (var playerId in gamedatas.players) {
            this.players[playerId].updatePlayer({ gamedatas: gamedatas });
        }
    };
    PlayerManager.prototype.clearInterface = function () {
        var _this = this;
        Object.keys(this.players).forEach(function (playerId) {
            _this.players[playerId].clearInterface();
        });
    };
    return PlayerManager;
}());
var PRPlayer = (function () {
    function PRPlayer(_a) {
        var game = _a.game, player = _a.player;
        this.game = game;
        var playerId = player.id;
        this.playerId = Number(playerId);
        this.player = player;
        this.playerName = player.name;
        this.playerColor = player.color;
        var gamedatas = game.gamedatas;
        this.setupPlayer({ gamedatas: gamedatas, player: player });
    }
    PRPlayer.prototype.updatePlayer = function (_a) {
        var gamedatas = _a.gamedatas;
    };
    PRPlayer.prototype.setupPlayer = function (_a) {
        var gamedatas = _a.gamedatas, player = _a.player;
        var playerGamedatas = gamedatas.players[this.playerId];
        this.setupPlayerTableau({ playerGamedatas: playerGamedatas });
        this.setupPlayerPanel({ playerGamedatas: playerGamedatas, player: player });
    };
    PRPlayer.prototype.setupPlayerPanel = function (_a) {
        var playerGamedatas = _a.playerGamedatas, player = _a.player;
        var playerBoardDiv = $('player_board_' + this.playerId);
        playerBoardDiv.insertAdjacentHTML('beforeend', tplPlayerPanel({ playerId: this.playerId }));
        var node = document.getElementById("pr_player_panel_".concat(this.playerId));
        this.counters = {
            cardsWest: new IconCounter({ containerId: "pr_player_panel_icons_".concat(this.playerId), extraIconClasses: 'pr_card_back_icon', icon: 'west_back', iconCounterId: "pr_cards_west_counter_".concat(this.playerId), initialValue: 0 }),
            cardsEast: new IconCounter({ containerId: "pr_player_panel_icons_".concat(this.playerId), extraIconClasses: 'pr_card_back_icon', icon: 'east_back', iconCounterId: "pr_cards_east_counter_".concat(this.playerId), initialValue: 0 }),
            florins: new IconCounter({ containerId: "pr_player_panel_icons_".concat(this.playerId), icon: 'florin', iconCounterId: "pr_florins_counter_".concat(this.playerId), initialValue: player.florins }),
        };
        this.updatePlayerPanel({ playerGamedatas: playerGamedatas });
    };
    PRPlayer.prototype.setupPlayerTableau = function (_a) {
        var playerGamedatas = _a.playerGamedatas;
        document
            .getElementById("pr_player_tableau_".concat(this.playerId))
            .insertAdjacentHTML("beforeend", tplPlayerTableauContent({ playerGamedatas: playerGamedatas }));
    };
    PRPlayer.prototype.updatePlayerPanel = function (_a) {
        var _b;
        var playerGamedatas = _a.playerGamedatas;
        if ((_b = this.game.framework().scoreCtrl) === null || _b === void 0 ? void 0 : _b[this.playerId]) {
            this.game.framework().scoreCtrl[this.playerId].setValue(Number(playerGamedatas.score));
        }
    };
    PRPlayer.prototype.clearInterface = function () {
    };
    PRPlayer.prototype.getColor = function () {
        return this.playerColor;
    };
    PRPlayer.prototype.getHexColor = function () {
        return this.playerHexColor;
    };
    PRPlayer.prototype.getName = function () {
        return this.playerName;
    };
    PRPlayer.prototype.getPlayerId = function () {
        return this.playerId;
    };
    return PRPlayer;
}());
var tplPlayerPanel = function (_a) {
    var playerId = _a.playerId;
    return "<div id=\"pr_player_panel_".concat(playerId, "\" class=\"pr_player_panel\">\n            <div id=\"pr_player_panel_icons_").concat(playerId, "\" class=\"pr_player_panel_icons\"></div>\n          </div>");
};
var tplPlayerTableauxContainer = function (_a) {
    var playerOrder = _a.playerOrder;
    console.log("playerOrderInTpl", playerOrder);
    return "\n    <div id=\"pr_player_tableaux\">\n    ".concat(playerOrder
        .map(function (playerId) {
        return "<div id=\"pr_player_tableau_".concat(playerId, "\" class=\"pr_player_tableau\"></div>");
    })
        .join(""), "\n    </div>\n  ");
};
var tplPlayerTableauContent = function (_a) {
    var playerGamedatas = _a.playerGamedatas;
    var playerId = playerGamedatas.id;
    return "\n  <div class=\"pr_player_tableau_title\"><span>".concat(_("${playerName}'s tableau").replace("${playerName}", playerGamedatas.name), "</span></div>\n  <div>\n    <div class=\"pr_player_board\" data-color=\"").concat(COLOR_MAP[playerGamedatas.color], "\"></div>\n  </div>\n    ");
};
var PlayerActionState = (function () {
    function PlayerActionState(game) {
        this.game = game;
    }
    PlayerActionState.prototype.onEnteringState = function (args) {
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    PlayerActionState.prototype.onLeavingState = function () {
        debug("Leaving PlayerActionsState");
    };
    PlayerActionState.prototype.updateInterfaceInitialStep = function () {
        this.game.clearPossible();
        this.updatePageTitle();
        this.setMarketCardsSelectable();
    };
    PlayerActionState.prototype.updateInterfaceConfirmPurchase = function (_a) {
        var _this = this;
        var card = _a.card, column = _a.column;
        this.game.clearPossible();
        var node = document.getElementById("".concat(card.id.split('_')[0], "-front"));
        if (node) {
            node.classList.add(PR_SELECTED);
        }
        this.game.clientUpdatePageTitle({
            text: 'Purchase ${cardName} for ${amount} ${tkn_florin} ?',
            args: {
                amount: column,
                cardName: _(card.name),
                tkn_florin: _('Florin(s)')
            },
        });
        this.game.addConfirmButton({
            callback: function () { return _this.game.takeAction({ action: 'actPlayerAction', args: {
                    action: 'purchaseCard',
                    cardId: card.id,
                } }); }
        });
        this.game.addCancelButton();
    };
    PlayerActionState.prototype.updatePageTitle = function () {
        var remainingActions = this.args.remainingActions;
        var titleText = _("${you} may perform an action");
        if (remainingActions === 1) {
            titleText += _(" (1 remaining)");
        }
        else if (remainingActions === 2) {
            titleText += _(" (2 remaining)");
        }
        this.game.clientUpdatePageTitle({
            text: titleText,
            args: {
                you: "${you}",
            },
        });
    };
    PlayerActionState.prototype.setMarketCardsSelectable = function () {
        var _this = this;
        console.log('setMarketCardsSelectable');
        this.args.cardsPlayerCanPurchase.forEach(function (card) {
            var id = card.id, location = card.location;
            var _a = location.split('_'), market = _a[0], region = _a[1], column = _a[2];
            var nodeId = "".concat(id.split('_')[0], "-front");
            var node = $(nodeId);
            if (node === null) {
                return;
            }
            node.classList.add(PR_SELECTABLE);
            _this.game._connections.push(dojo.connect(node, 'onclick', _this, function () { return _this.updateInterfaceConfirmPurchase({ card: card, column: Number(column) }); }));
        });
    };
    return PlayerActionState;
}());
var tplCardTooltipContainer = function (_a) {
    var card = _a.card, content = _a.content;
    return "<div class=\"pr_card_tooltip\">\n  <div class=\"pr_card_tooltip_inner_container\">\n    ".concat(content, "\n  </div>\n  ").concat(card, "\n</div>");
};
var tplTableauCardTooltip = function (_a) {
    var card = _a.card;
    return tplCardTooltipContainer({
        card: "<div class=\"pr_card\" data-card-id=\"".concat(card.id.split('_')[0], "\"></div>"),
        content: "\n      <span class=\"pr_title\">".concat(_(card.name), "</span>\n      ").concat(card.flavorText.map(function (text) { return "<span class=\"pr_flavor_text\">".concat(_(text), "</span>"); }).join(''), "\n    ")
    });
};
var TooltipManager = (function () {
    function TooltipManager(game) {
        this.idRegex = /id="[a-z]*_[0-9]*_[0-9]*"/;
        this.game = game;
    }
    TooltipManager.prototype.addTextToolTip = function (_a) {
        var nodeId = _a.nodeId, text = _a.text;
        this.game.framework().addTooltip(nodeId, _(text), '', 500);
    };
    TooltipManager.prototype.removeTooltip = function (nodeId) {
        this.game.framework().removeTooltip(nodeId);
    };
    TooltipManager.prototype.setupTooltips = function () {
    };
    TooltipManager.prototype.addCardTooltip = function (_a) {
        var nodeId = _a.nodeId, card = _a.card;
        var html = tplTableauCardTooltip({ card: card });
        this.game.framework().addTooltipHtml(nodeId, html, 500);
    };
    return TooltipManager;
}());
define([
    'dojo',
    'dojo/_base/declare',
    'dojo/fx',
    'dojox/fx/ext-dojo/complex',
    'ebg/core/gamegui',
    'ebg/counter',
], function (dojo, declare) {
    return declare('bgagame.paxrenaissance', ebg.core.gamegui, new PaxRenaissance());
});
