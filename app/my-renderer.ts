import {Injectable} from 'angular2/core';
import {Renderer, RootRenderer, RenderComponentType, RenderDebugInfo} from 'angular2/src/core/render/api';

const width = 600;
const height = 600;

@Injectable()
export class MyRootRenderer implements RootRenderer {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  targetObjects = []
  clickEventHandlers = new Map()
  tickEventHandlers = []

  constructor() {
    this.camera.position.z = 5;
  }

  renderComponent(componentProto: RenderComponentType): Renderer {
    return new MyRenderer(this);
  }
}

class MyRenderer implements Renderer {
  constructor(private rootRenderer: MyRootRenderer) {
  }

  selectRootElement(selector: string, debugInfo: RenderDebugInfo) : any {
    console.log('selectRootElement', selector);
    var element = document.querySelector(selector);
    var canvasElement = this.rootRenderer.renderer.domElement;
    this.rootRenderer.renderer.setSize(width, height);
    element.innerHTML = '';
    element.appendChild(canvasElement);

    var mouse = { x: 0, y: 0 };
    canvasElement.addEventListener('click', (event) => {
      var camera = this.rootRenderer.camera;
      if (event.target == this.rootRenderer.renderer.domElement) {
        var rect = event.target.getBoundingClientRect();
        mouse.x =  event.clientX - rect.left;
        mouse.y =  event.clientY - rect.top;
        mouse.x =  (mouse.x / width) * 2 - 1;
        mouse.y = -(mouse.y / height) * 2 + 1;
        var vector = new THREE.Vector3( mouse.x, mouse.y ,1);
        vector.unproject(camera);
        var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
        var obj = ray.intersectObjects(this.rootRenderer.targetObjects);
        obj.forEach((item) => {
          this.rootRenderer.clickEventHandlers.get(item.object)();
        });
      }
    });

    var render = () => {
      requestAnimationFrame(render)
      for (const f of this.rootRenderer.tickEventHandlers) {
        f()
      }
      this.rootRenderer.renderer.render(this.rootRenderer.scene, this.rootRenderer.camera)
    }
    render()
    return this.rootRenderer.scene
  }

  createElement(parentElement: any, name: string, debugInfo: RenderDebugInfo) : any {
    console.log('createElement', parentElement, name);
    var geometry = new THREE.Geometry();
    var material : any;
    var node : any;
    switch (name) {
      case 'three-mesh':
        material = new THREE.MeshBasicMaterial();
        node = new THREE.Mesh(geometry, material);
        break;
      case 'three-points':
        material = new THREE.PointsMaterial();
        node = new THREE.Points(geometry, material)
        break;
      default:
        throw 'unknown element';
    }
    if (parentElement) {
      parentElement.add(node);
    }
    return node;
  }

  createViewRoot(hostElement: any) : any {
    console.log('createViewRoot', hostElement);
    return hostElement;
  }

  createTemplateAnchor(parentElement: any, debugInfo: RenderDebugInfo) : any {
    console.log('createTemplateAnchor', parentElement);
    return {parent: parentElement}
  }

  createText(parentElement: any, value: string, debugInfo: RenderDebugInfo) : any {
    return value;
  }

  projectNodes(parentElement: any, nodes: any[]) : void {
    console.log('projectNodes', parentElement, nodes);
  }

  attachViewAfter(node: any, viewRootNodes: any[]) : void {
    console.log('attachViewAfter', node, viewRootNodes);
    viewRootNodes.forEach((viewRootNode) => {
      node.parent.add(viewRootNode);
    });
  }

  detachView(viewRootNodes: any[]) : void {
    console.log('detachView', viewRootNodes);
  }

  destroyView(hostElement: any, viewAllNodes: any[]) : void {
    console.log('destroyView', hostElement, viewAllNodes);
  }

  listen(renderElement: any, name: string, callback: Function) : Function {
    console.log('listen', renderElement, name, callback);
    switch (name) {
      case 'click':
        this.rootRenderer.targetObjects.push(renderElement)
        this.rootRenderer.clickEventHandlers.set(renderElement, callback)
        return () => {}
      case 'tick':
        this.rootRenderer.tickEventHandlers.push(callback)
        return () => {}
      default:
        throw 'unknown event'
    }
  }

  listenGlobal(target: string, name: string, callback: Function) : Function {
    return () => {};
  }

  setElementProperty(renderElement: any, propertyName: string, propertyValue: any) : void {
    // console.log('setElementProperty', renderElement, propertyName, propertyValue);
    Object.assign(renderElement[propertyName], propertyValue);
  }

  setElementAttribute(renderElement: any, attributeName: string, attributeValue: string) : void {
    console.log('setElementAttribute');
  }

  setBindingDebugInfo(renderElement: any, propertyName: string, propertyValue: string) : void {
  }

  setElementClass(renderElement: any, className: string, isAdd: boolean) {
  }

  setElementStyle(renderElement: any, styleName: string, styleValue: string) {
  }

  invokeElementMethod(renderElement: any, methodName: string, args: any[]) {
    console.log('invokeElementMethod', renderElement, methodName, args);
  }

  setText(renderNode: any, text: string) {
    console.log('setText', renderNode, text);
  }
}
