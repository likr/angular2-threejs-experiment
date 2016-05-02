System.register(["angular2/core"], function(exports_1, context_1) {
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
    var size, AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            size = 5;
            AppComponent = (function () {
                function AppComponent() {
                    this.boxes = [
                        {
                            geometry: new THREE.BoxGeometry(1, 1, 1),
                            material: new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.7 }),
                            position: new THREE.Vector3(-3, 0, 0),
                            rotation: new THREE.Vector3(0, 0, 0),
                        },
                        {
                            geometry: new THREE.BoxGeometry(1, 1, 1),
                            material: new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.7 }),
                            position: new THREE.Vector3(0, 0, 0),
                            rotation: new THREE.Vector3(0, 0, 0),
                        },
                        {
                            geometry: new THREE.BoxGeometry(1, 1, 1),
                            material: new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true, opacity: 0.7 }),
                            position: new THREE.Vector3(3, 0, 0),
                            rotation: new THREE.Vector3(0, 0, 0),
                        }
                    ];
                    this.pointsGeometry = new THREE.Geometry();
                    this.pointsMaterial = new THREE.PointsMaterial({
                        vertexColors: THREE.VertexColors,
                        size: 0.1
                    });
                    for (var i = 0; i < 1000; ++i) {
                        var position = new THREE.Vector3(Math.random() * size - size / 2, Math.random() * size - size / 2, 0);
                        this.pointsGeometry.vertices.push(position);
                        var color = new THREE.Color("hsl(" + Math.random() * 360 + ", 100%, 50%)");
                        this.pointsGeometry.colors.push(color);
                    }
                }
                AppComponent.prototype.updateBox = function (box) {
                    var hsl = box.material.color.getHSL();
                    box.material.color.setHSL(hsl.h + 0.01, hsl.s, hsl.l);
                    box.rotation.x += 0.1;
                    box.rotation.y += 0.1;
                };
                AppComponent.prototype.updatePoints = function () {
                    for (var _i = 0, _a = this.pointsGeometry.vertices; _i < _a.length; _i++) {
                        var vertex = _a[_i];
                        vertex.x += 0.1;
                        vertex.y += 0.1;
                        if (vertex.x > size / 2) {
                            vertex.x = -size / 2;
                        }
                        if (vertex.y > size / 2) {
                            vertex.y = -size / 2;
                        }
                    }
                    this.pointsGeometry.verticesNeedUpdate = true;
                };
                AppComponent.prototype.handleClick = function (box) {
                    box.material.opacity = box.material.opacity === 1 ? 0.7 : 1;
                };
                AppComponent.prototype.wrap = function (arg) {
                    return Object.assign({}, arg);
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n    <three-mesh\n      *ngFor=\"let box of boxes\"\n      [geometry]=\"wrap(box.geometry)\"\n      [material]=\"wrap(box.material)\"\n      [position]=\"wrap(box.position)\"\n      [rotation]=\"wrap(box.rotation)\"\n      (click)=\"handleClick(box)\"\n      (tick)=\"updateBox(box)\">\n    </three-mesh>\n    <three-points\n      (tick)=\"updatePoints()\"\n      [geometry]=\"wrap(pointsGeometry)\"\n      [material]=\"wrap(pointsMaterial)\">\n    </three-points>\n  ",
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map