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
var BgaZone = (function () {
    function BgaZone(config) {
        var _this = this;
        this.animateMoveToZone = function (_a) {
            var fromRect = _a.fromRect, element = _a.element, classesToAdd = _a.classesToAdd, classesToRemove = _a.classesToRemove, zIndex = _a.zIndex, duration = _a.duration;
            return __awaiter(_this, void 0, void 0, function () {
                var _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            (_b = element.classList).remove.apply(_b, (classesToRemove || []));
                            (_c = element.classList).add.apply(_c, (classesToAdd || []));
                            this.setItemCoords({ node: element });
                            return [4, this.animationManager.play(new BgaSlideAnimation({
                                    element: element,
                                    transitionTimingFunction: "linear",
                                    fromRect: fromRect,
                                    zIndex: zIndex,
                                    duration: duration,
                                }))];
                        case 1:
                            _d.sent();
                            return [2];
                    }
                });
            });
        };
        var animationManager = config.animationManager, itemGap = config.itemGap, itemHeight = config.itemHeight, itemWidth = config.itemWidth, containerId = config.containerId;
        this.animationManager = animationManager;
        this.itemGap = itemGap || 0;
        this.itemHeight = itemHeight;
        this.itemWidth = itemWidth;
        this.containerId = containerId;
        this.containerElement = document.getElementById(containerId);
        this.items = [];
        this.setPattern(config.pattern || "grid");
        this.autoWidth = false;
        this.autoHeight = true;
        this.customPattern = config.customPattern;
        if (!this.containerElement) {
            console.error("containerElement null");
            return;
        }
        if (getComputedStyle(this.containerElement).position !== "absolute") {
            this.containerElement.style.position = "relative";
        }
    }
    BgaZone.prototype.getContainerId = function () {
        return this.containerId;
    };
    BgaZone.prototype.remove = function (_a) {
        var input = _a.input, _b = _a.destroy, destroy = _b === void 0 ? false : _b;
        return __awaiter(this, void 0, void 0, function () {
            var itemsToRemove;
            var _this = this;
            return __generator(this, function (_c) {
                itemsToRemove = Array.isArray(input) ? input : [input];
                itemsToRemove.forEach(function (id) {
                    var index = _this.items.findIndex(function (item) { return item.id === id; });
                    if (index < 0) {
                        return;
                    }
                    _this.items.splice(index, 1);
                    if (destroy) {
                        var element = $(id);
                        element && element.remove();
                    }
                });
                return [2, this.updateDisplay()];
            });
        });
    };
    BgaZone.prototype.removeAll = function (_a) {
        var _b = _a === void 0 ? { destroy: false } : _a, destroy = _b.destroy;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                if (destroy) {
                    this.items.forEach(function (item) {
                        var id = item.id;
                        var node = $(id);
                        node.remove();
                    });
                }
                this.items = [];
                return [2, this.updateDisplay()];
            });
        });
    };
    BgaZone.prototype.moveToZone = function (_a) {
        var input = _a.items, classesToAdd = _a.classesToAdd, classesToRemove = _a.classesToRemove, _b = _a.animationSettings, animationSettings = _b === void 0 ? {} : _b, inputItemsToRemove = _a.itemsToRemove;
        return __awaiter(this, void 0, void 0, function () {
            var items, itemsToRemove, animations, duration, zIndex;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        items = Array.isArray(input) ? input : [input];
                        if (inputItemsToRemove) {
                            itemsToRemove = Array.isArray(inputItemsToRemove.elements)
                                ? inputItemsToRemove.elements
                                : [inputItemsToRemove.elements];
                            itemsToRemove.forEach(function (id) {
                                var index = _this.items.findIndex(function (item) { return item.id === id; });
                                if (index < 0) {
                                    return;
                                }
                                _this.items.splice(index, 1);
                                if (inputItemsToRemove.destroy) {
                                    var element = $(id);
                                    element && element.remove();
                                }
                            });
                        }
                        items.forEach(function (_a) {
                            var id = _a.id, weight = _a.weight;
                            _this.items.push({
                                id: id,
                                weight: weight,
                            });
                        });
                        this.sortItems();
                        animations = [];
                        duration = animationSettings.duration, zIndex = animationSettings.zIndex;
                        items.forEach(function (item) {
                            var element = document.getElementById(item.id);
                            if (!element) {
                                console.error("newElement null");
                                return;
                            }
                            var fromRect = element.getBoundingClientRect();
                            var attachTo = document.getElementById(_this.containerId);
                            attachTo.appendChild(element);
                            animations.push(_this.animateMoveToZone({
                                element: element,
                                classesToAdd: classesToAdd,
                                classesToRemove: classesToRemove,
                                zIndex: zIndex,
                                duration: duration,
                                fromRect: fromRect,
                            }));
                        });
                        return [4, Promise.all(__spreadArray(__spreadArray([], this.getUpdateAnimations(items.map(function (_a) {
                                var id = _a.id;
                                return id;
                            })).map(function (anim) {
                                return _this.animationManager.play(anim);
                            }), true), animations, true))];
                    case 1:
                        _c.sent();
                        return [2];
                }
            });
        });
    };
    BgaZone.prototype.setItemCoords = function (_a) {
        var node = _a.node;
        var index = this.items.findIndex(function (item) { return item.id === node.id; });
        var coords = this.itemToCoords({ index: index });
        var top = coords.y, left = coords.x;
        node.style.position = "absolute";
        node.style.top = "".concat(top, "px");
        node.style.left = "".concat(left, "px");
    };
    BgaZone.prototype.placeInZone = function (_a) {
        var input = _a.items, _b = _a.animationSettings, animationSettings = _b === void 0 ? {} : _b;
        return __awaiter(this, void 0, void 0, function () {
            var inputItems, duration, animations;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        inputItems = Array.isArray(input) ? input : [input];
                        inputItems.forEach(function (_a) {
                            var id = _a.id, weight = _a.weight;
                            _this.items.push({ id: id, weight: weight });
                        });
                        this.sortItems();
                        duration = animationSettings.duration;
                        animations = [];
                        inputItems.forEach(function (_a) {
                            var _b;
                            var element = _a.element, id = _a.id, from = _a.from, zIndex = _a.zIndex;
                            var node = dojo.place(element, _this.containerId);
                            node.style.position = "absolute";
                            node.style.zIndex = "".concat(zIndex || 0);
                            _this.setItemCoords({ node: node });
                            if (from) {
                                var fromRect = (_b = $(from)) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect();
                                animations.push(new BgaSlideAnimation({
                                    element: node,
                                    transitionTimingFunction: "linear",
                                    fromRect: fromRect,
                                    duration: duration,
                                }));
                            }
                        });
                        return [4, this.animationManager.playParallel(__spreadArray(__spreadArray([], this.getUpdateAnimations(inputItems.map(function (_a) {
                                var id = _a.id;
                                return id;
                            })), true), animations, true))];
                    case 1:
                        _c.sent();
                        return [2];
                }
            });
        });
    };
    BgaZone.prototype.setupItems = function (_a) {
        var _this = this;
        var input = _a.items;
        var inputItems = Array.isArray(input) ? input : [input];
        inputItems.forEach(function (_a) {
            var id = _a.id, weight = _a.weight;
            _this.items.push({ id: id, weight: weight });
        });
        this.sortItems();
        inputItems.forEach(function (_a) {
            var element = _a.element, zIndex = _a.zIndex;
            var node = dojo.place(element, _this.containerId);
            node.style.position = "absolute";
        });
        this.getUpdateAnimations();
    };
    BgaZone.prototype.updateDisplay = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.animationManager.playParallel(this.getUpdateAnimations())];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    BgaZone.prototype.getUpdateAnimations = function (skip) {
        var _this = this;
        var animations = [];
        var containerHeight = 0;
        var containerWidth = 0;
        this.items.forEach(function (item, index) {
            var element = $(item.id);
            var fromRect = element.getBoundingClientRect();
            if (element) {
                var _a = _this.itemToCoords({ index: index }), left = _a.x, top_1 = _a.y, width = _a.w, height = _a.h;
                if (!(skip || []).includes(item.id)) {
                    element.style.top = "".concat(top_1, "px");
                    element.style.left = "".concat(left, "px");
                    animations.push(new BgaSlideAnimation({ element: element, fromRect: fromRect }));
                }
                if (_this.containerId === "pp_kabul_transcaspia_border") {
                    console.log(item.id, index, left, top_1, width, height);
                }
                containerWidth = Math.max(containerWidth, left + width);
                containerHeight = Math.max(containerHeight, top_1 + height);
            }
        });
        if (this.autoHeight) {
            this.containerElement.style.height = "".concat(containerHeight, "px");
        }
        if (this.autoWidth) {
            this.containerElement.style.width = "".concat(containerWidth, "px");
        }
        return animations;
    };
    BgaZone.prototype.itemToCoords = function (_a) {
        var index = _a.index;
        var boundingClientRect = this.containerElement.getBoundingClientRect();
        var containerWidth = boundingClientRect.width;
        var containerHeight = boundingClientRect.height;
        var itemCount = this.getItemCount();
        var props = {
            index: index,
            containerHeight: containerHeight,
            containerWidth: containerWidth,
            itemCount: itemCount,
        };
        switch (this.pattern) {
            case "grid":
                return this.itemToCoordsGrid(props);
            case "ellipticalFit":
                return this.itemToCoordsEllipticalFit(props);
            case "verticalFit":
                return this.itemToCoordsVerticalFit(props);
            case "horizontalFit":
                return this.itemToCoordsHorizontalFit(props);
            case "custom":
                var custom = this.customPattern
                    ? this.customPattern(props)
                    : { x: 0, y: 0, w: 0, h: 0 };
                return custom;
        }
    };
    BgaZone.prototype.itemToCoordsGrid = function (_a) {
        var e = _a.index, t = _a.containerWidth;
        var i = Math.max(1, Math.floor(t / (this.itemWidth + this.itemGap))), n = Math.floor(e / i), o = {};
        o["y"] = n * (this.itemHeight + this.itemGap);
        o["x"] = (e - n * i) * (this.itemWidth + this.itemGap);
        o["w"] = this.itemWidth;
        o["h"] = this.itemHeight;
        return o;
    };
    BgaZone.prototype.itemToCoordsEllipticalFit = function (_a) {
        var e = _a.index, t = _a.containerWidth, i = _a.containerHeight, n = _a.itemCount;
        var o = t / 2, a = i / 2, s = 3.1415927, r = {
            w: this.itemWidth,
            h: this.itemHeight,
        };
        r["w"] = this.itemWidth;
        r["h"] = this.itemHeight;
        var l = n - (e + 1);
        if (l <= 4) {
            var c = r.w, d = (r.h * a) / o, h = s + l * ((2 * s) / 5);
            r["x"] = o + c * Math.cos(h) - r.w / 2;
            r["y"] = a + d * Math.sin(h) - r.h / 2;
        }
        else if (l > 4) {
            (c = 2 * r.w),
                (d = (2 * r.h * a) / o),
                (h = s - s / 2 + (l - 4) * ((2 * s) / Math.max(10, n - 5)));
            r["x"] = o + c * Math.cos(h) - r.w / 2;
            r["y"] = a + d * Math.sin(h) - r.h / 2;
        }
        return r;
    };
    BgaZone.prototype.itemToCoordsHorizontalFit = function (_a) {
        var e = _a.index, t = _a.containerWidth, i = _a.containerHeight, n = _a.itemCount;
        var o = {};
        o["w"] = this.itemWidth;
        o["h"] = this.itemHeight;
        var a = n * this.itemWidth;
        if (a <= t)
            var s = this.itemWidth, r = (t - a) / 2;
        else
            (s = (t - this.itemWidth) / (n - 1)), (r = 0);
        o["x"] = Math.round(e * s + r);
        o["y"] = 0;
        return o;
    };
    BgaZone.prototype.itemToCoordsVerticalFit = function (_a) {
        var e = _a.index, i = _a.containerHeight, n = _a.itemCount;
        var o = {};
        o["w"] = this.itemWidth;
        o["h"] = this.itemHeight;
        var a = n * this.itemHeight;
        if (a <= i)
            var s = this.itemHeight, r = (i - a) / 2;
        else
            (s = (i - this.itemHeight) / (n - 1)), (r = 0);
        o["y"] = Math.round(e * s + r);
        o["x"] = 0;
        return o;
    };
    BgaZone.prototype.setPattern = function (pattern) {
        switch (pattern) {
            case "grid":
                this.autoHeight = true;
                this.pattern = pattern;
                break;
            case "verticalFit":
            case "horizontalFit":
            case "ellipticalFit":
                this.autoHeight = false;
                this.pattern = pattern;
                break;
            case "custom":
                this.pattern = pattern;
                break;
            default:
                console.error("zone::setPattern: unknow pattern: " + pattern);
        }
    };
    BgaZone.prototype.sortItems = function () {
        return this.items.sort(function (a, b) {
            var aWeight = a.weight || 0;
            var bWeight = b.weight || 0;
            return aWeight > bWeight ? 1 : aWeight < bWeight ? -1 : 0;
        });
    };
    BgaZone.prototype.removeTo = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var inputItems, animations;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        inputItems = Array.isArray(input) ? input : [input];
                        animations = [];
                        inputItems.forEach(function (_a) {
                            var id = _a.id, _b = _a.destroy, destroy = _b === void 0 ? true : _b, to = _a.to;
                            var index = _this.items.findIndex(function (item) { return item.id === id; });
                            if (index < 0) {
                                return;
                            }
                            _this.items.splice(index, 1);
                            var element = $(id);
                            var toElement = $(to);
                            var fromRect = element.getBoundingClientRect();
                            var toRect = toElement.getBoundingClientRect();
                            var top = toRect.top - fromRect.top;
                            var left = toRect.left - fromRect.left;
                            element.style.top = "".concat(_this.pxNumber(element.style.top) + top, "px");
                            element.style.left = "".concat(_this.pxNumber(element.style.left) + left, "px");
                            animations.push(_this.animateRemoveTo({ element: element, fromRect: fromRect, destroy: destroy }));
                        });
                        this.sortItems();
                        return [4, Promise.all(__spreadArray(__spreadArray([], this.getUpdateAnimations().map(function (anim) {
                                return _this.animationManager.play(anim);
                            }), true), animations, true))];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    BgaZone.prototype.animateRemoveTo = function (_a) {
        var element = _a.element, fromRect = _a.fromRect, destroy = _a.destroy;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.animationManager.play(new BgaSlideAnimation({
                            element: element,
                            fromRect: fromRect,
                        }))];
                    case 1:
                        _b.sent();
                        if (destroy) {
                            element.remove();
                        }
                        return [2];
                }
            });
        });
    };
    BgaZone.prototype.getItems = function () {
        return this.items.map(function (item) { return item.id; });
    };
    BgaZone.prototype.getItemCount = function () {
        return this.items.length;
    };
    BgaZone.prototype.pxNumber = function (px) {
        if ((px || "").endsWith("px")) {
            return Number(px.slice(0, -2));
        }
        else {
            return 0;
        }
    };
    return BgaZone;
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
        debug("gamedatas", gamedatas);
        this._connections = [];
        this.activeStates = {};
        this.animationManager = new AnimationManager(this, { duration: 500 });
        this.gameMap = new GameMap(this);
        this.tooltipManager = new TooltipManager(this);
        this.playerManager = new PlayerManager(this);
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
        playArea.style.width = (playAreaContainer.offsetWidth / this.playAreaScale) + 'px';
        console.log('playAreaHeight', playAreaHeight);
        playAreaContainer.style.height = playAreaHeight * this.playAreaScale + 'px';
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
    PaxRenaissance.prototype.onUpdateActionButtons = function (stateName, args) {
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
        var action = _a.action, _b = _a.data, data = _b === void 0 ? {} : _b;
        console.log("takeAction ".concat(action), data);
        if (!this.framework().checkAction(action)) {
            this.actionError(action);
            return;
        }
        data.lock = true;
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
var PR_SELECTABLE = "pr_selectable";
var PR_SELECTED = "pr_selected";
define([
    'dojo',
    'dojo/_base/declare',
    'dojo/fx',
    'dojox/fx/ext-dojo/complex',
    'ebg/core/gamegui',
    'ebg/counter',
    g_gamethemeurl + "modules/js/bga-animations.js",
], function (dojo, declare) {
    return declare('bgagame.paxrenaissance', ebg.core.gamegui, new PaxRenaissance());
});
var isDebug = window.location.host == 'studio.boardgamearena.com' || window.location.hash.indexOf('debug') > -1;
var debug = isDebug ? console.info.bind(window.console) : function () { };
var capitalizeFirstLetter = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
var LOCAL_STORAGE_MAP_ZOOM_KEY = "PaxRenaissance-map-zoom";
var ZOOM_LEVELS = [0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1];
var MAX_MAP_HEIGHT = 1500;
var MAX_MAP_WIDTH = 1500;
var GameMap = (function () {
    function GameMap(game) {
        this.game = game;
        this.zoomLevel =
            Number(localStorage.getItem(LOCAL_STORAGE_MAP_ZOOM_KEY)) || 1;
        console.log('localStorage zoomLevel', this.zoomLevel);
        var gamedatas = game.gamedatas;
        this.setupGameMap({ gamedatas: gamedatas });
    }
    GameMap.prototype.updateGameMap = function (_a) {
        var gamedatas = _a.gamedatas;
    };
    GameMap.prototype.setupGameMap = function (_a) {
        var gamedatas = _a.gamedatas;
        document
            .getElementById("pr_play_area")
            .insertAdjacentHTML("afterbegin", tplGameMap());
        this.updateGameMapSize();
        this.setupZoomButtons();
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
        console.log('zoomLevel', this.zoomLevel);
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
        var mapContainer = document.getElementById('pr_game_map_containter');
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
var tplGameMap = function () { return "\n<div id=\"pr_game_map_containter\">\n  <div class=\"pr_game_map_zoom_buttons\">\n    <button id=\"pr_game_map_zoom_out_button\" type=\"button\" class=\"bga-zoom-button bga-zoom-out-icon\" style=\"margin-bottom: -5px;\"></button>\n    <button id=\"pr_game_map_zoom_in_button\" type=\"button\" class=\"bga-zoom-button bga-zoom-in-icon\" style=\"margin-bottom: -5px;\"></button>\n  </div>\n  <div id=\"pr_game_map\">\n    <div class=\"pr_card\" data-card-id=\"PREN001\" style=\"top: 950px; left: 256px;\"></div>\n    <div class=\"pr_card\" data-card-id=\"PREN058\" style=\"top: 1200px; left: 256px;\"></div>\n    <div class=\"pr_square_card\" data-card-id=\"empire_king_france\" style=\"top: 120px; left: 526px;\"></div>\n    <div class=\"pr_card\" data-card-id=\"reformist_england\" style=\"top: 269.5px; left: 350px;\"></div>\n    <div class=\"pr_square_card\" data-card-id=\"victory_inactive_renaissance\" style=\"top: 121px; left: 136px;\"></div>\n    <div class=\"pr_chess_piece pr_pawn\" data-color=\"purple\" style=\"top: 656px; left: 1028px;\"></div>\n    <div class=\"pr_chess_piece pr_bishop\" data-religion=\"reformist\" style=\"top: 831px; left: 1056px;\"></div>\n    <div class=\"pr_chess_piece pr_knight\" data-religion=\"catholic\" style=\"top: 389px; left: 1056px;\"></div>\n    <div class=\"pr_chess_piece pr_rook\" data-religion=\"islamic\" style=\"top: 533px; left: 890px;\"></div>\n  </div>\n</div>"; };
var LOG_TOKEN_BOLD_TEXT = 'boldText';
var LOG_TOKEN_NEW_LINE = 'newLine';
var LOG_TOKEN_PLAYER_NAME = 'playerName';
var tooltipIdCounter = 0;
var getTokenDiv = function (_a) {
    var key = _a.key, value = _a.value, game = _a.game;
    var splitKey = key.split('_');
    var type = splitKey[1];
    switch (type) {
        case LOG_TOKEN_BOLD_TEXT:
            return tlpLogTokenBoldText({ text: value });
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
        this.playerHexColor = player.hexColor;
        var gamedatas = game.gamedatas;
        this.setupPlayer({ gamedatas: gamedatas });
    }
    PRPlayer.prototype.updatePlayer = function (_a) {
        var gamedatas = _a.gamedatas;
    };
    PRPlayer.prototype.setupPlayer = function (_a) {
        var gamedatas = _a.gamedatas;
        var playerGamedatas = gamedatas.players[this.playerId];
        this.setupPlayerTableau({ playerGamedatas: playerGamedatas });
        this.setupPlayerPanel({ playerGamedatas: playerGamedatas });
    };
    PRPlayer.prototype.setupPlayerPanel = function (_a) {
        var playerGamedatas = _a.playerGamedatas;
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
var tplCardTooltipContainer = function (_a) {
    var card = _a.card, content = _a.content;
    return "<div class=\"pr_card_tooltip\">\n  <div class=\"pr_card_tooltip_inner_container\">\n    ".concat(content, "\n  </div>\n  ").concat(card, "\n</div>");
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
    return TooltipManager;
}());
