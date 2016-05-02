System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var width, height, MyRootRenderer, MyRenderer;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            width = 600;
            height = 600;
            MyRootRenderer = (function () {
                function MyRootRenderer() {
                    this.scene = new THREE.Scene();
                    this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
                    this.renderer = new THREE.WebGLRenderer();
                    this.targetObjects = [];
                    this.clickEventHandlers = new Map();
                    this.tickEventHandlers = [];
                    this.camera.position.z = 5;
                }
                MyRootRenderer.prototype.renderComponent = function (componentProto) {
                    return new MyRenderer(this);
                };
                MyRootRenderer = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], MyRootRenderer);
                return MyRootRenderer;
            }());
            exports_1("MyRootRenderer", MyRootRenderer);
            MyRenderer = (function () {
                function MyRenderer(rootRenderer) {
                    this.rootRenderer = rootRenderer;
                }
                MyRenderer.prototype.selectRootElement = function (selector, debugInfo) {
                    var _this = this;
                    console.log('selectRootElement', selector);
                    var element = document.querySelector(selector);
                    var canvasElement = this.rootRenderer.renderer.domElement;
                    this.rootRenderer.renderer.setSize(width, height);
                    element.innerHTML = '';
                    element.appendChild(canvasElement);
                    var mouse = { x: 0, y: 0 };
                    canvasElement.addEventListener('click', function (event) {
                        var camera = _this.rootRenderer.camera;
                        if (event.target == _this.rootRenderer.renderer.domElement) {
                            var rect = event.target.getBoundingClientRect();
                            mouse.x = event.clientX - rect.left;
                            mouse.y = event.clientY - rect.top;
                            mouse.x = (mouse.x / width) * 2 - 1;
                            mouse.y = -(mouse.y / height) * 2 + 1;
                            var vector = new THREE.Vector3(mouse.x, mouse.y, 1);
                            vector.unproject(camera);
                            var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
                            var obj = ray.intersectObjects(_this.rootRenderer.targetObjects);
                            obj.forEach(function (item) {
                                _this.rootRenderer.clickEventHandlers.get(item.object)();
                            });
                        }
                    });
                    var render = function () {
                        requestAnimationFrame(render);
                        for (var _i = 0, _a = _this.rootRenderer.tickEventHandlers; _i < _a.length; _i++) {
                            var f = _a[_i];
                            f();
                        }
                        _this.rootRenderer.renderer.render(_this.rootRenderer.scene, _this.rootRenderer.camera);
                    };
                    render();
                    return this.rootRenderer.scene;
                };
                MyRenderer.prototype.createElement = function (parentElement, name, debugInfo) {
                    console.log('createElement', parentElement, name);
                    var geometry = new THREE.Geometry();
                    var material;
                    var node;
                    switch (name) {
                        case 'three-mesh':
                            material = new THREE.MeshBasicMaterial();
                            node = new THREE.Mesh(geometry, material);
                            break;
                        case 'three-points':
                            material = new THREE.PointsMaterial();
                            node = new THREE.Points(geometry, material);
                            break;
                        default:
                            throw 'unknown element';
                    }
                    if (parentElement) {
                        parentElement.add(node);
                    }
                    return node;
                };
                MyRenderer.prototype.createViewRoot = function (hostElement) {
                    console.log('createViewRoot', hostElement);
                    return hostElement;
                };
                MyRenderer.prototype.createTemplateAnchor = function (parentElement, debugInfo) {
                    console.log('createTemplateAnchor', parentElement);
                    return { parent: parentElement };
                };
                MyRenderer.prototype.createText = function (parentElement, value, debugInfo) {
                    return value;
                };
                MyRenderer.prototype.projectNodes = function (parentElement, nodes) {
                    console.log('projectNodes', parentElement, nodes);
                };
                MyRenderer.prototype.attachViewAfter = function (node, viewRootNodes) {
                    console.log('attachViewAfter', node, viewRootNodes);
                    viewRootNodes.forEach(function (viewRootNode) {
                        node.parent.add(viewRootNode);
                    });
                };
                MyRenderer.prototype.detachView = function (viewRootNodes) {
                    console.log('detachView', viewRootNodes);
                };
                MyRenderer.prototype.destroyView = function (hostElement, viewAllNodes) {
                    console.log('destroyView', hostElement, viewAllNodes);
                };
                MyRenderer.prototype.listen = function (renderElement, name, callback) {
                    console.log('listen', renderElement, name, callback);
                    switch (name) {
                        case 'click':
                            this.rootRenderer.targetObjects.push(renderElement);
                            this.rootRenderer.clickEventHandlers.set(renderElement, callback);
                            return function () { };
                        case 'tick':
                            this.rootRenderer.tickEventHandlers.push(callback);
                            return function () { };
                        default:
                            throw 'unknown event';
                    }
                };
                MyRenderer.prototype.listenGlobal = function (target, name, callback) {
                    return function () { };
                };
                MyRenderer.prototype.setElementProperty = function (renderElement, propertyName, propertyValue) {
                    // console.log('setElementProperty', renderElement, propertyName, propertyValue);
                    Object.assign(renderElement[propertyName], propertyValue);
                };
                MyRenderer.prototype.setElementAttribute = function (renderElement, attributeName, attributeValue) {
                    console.log('setElementAttribute');
                };
                MyRenderer.prototype.setBindingDebugInfo = function (renderElement, propertyName, propertyValue) {
                };
                MyRenderer.prototype.setElementClass = function (renderElement, className, isAdd) {
                };
                MyRenderer.prototype.setElementStyle = function (renderElement, styleName, styleValue) {
                };
                MyRenderer.prototype.invokeElementMethod = function (renderElement, methodName, args) {
                    console.log('invokeElementMethod', renderElement, methodName, args);
                };
                MyRenderer.prototype.setText = function (renderNode, text) {
                    console.log('setText', renderNode, text);
                };
                return MyRenderer;
            }());
        }
    }
});
//# sourceMappingURL=my-renderer.js.map