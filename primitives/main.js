import * as THREE from 'three';

const canvas = document.querySelector('#c');

const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

let scene = new THREE.Scene();

const fov = 75;
const aspect = 2;
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

{
    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
}

let geometry = new THREE.BoxGeometry(1, 1, 1);

let material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });

let primitives = new THREE.Mesh(geometry, material);

scene.add(primitives);

function loadPrimitives(callback) {
    let scene2 = new THREE.Scene();
    {
        const color = 0xFFFFFF;
        const intensity = 3;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene2.add(light);
    }

    // const boxWidth = 1;
    // const boxHeight = 1;
    // const boxDepth = 1;
    // const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const geometry2 = callback();
    
    const primitives2 = new THREE.Mesh(geometry2, material);
    primitives = primitives2;

    scene2.add(primitives2);
    scene = scene2;
}
function render(time) {
    time *= 0.001;

    primitives.rotation.x = time;
    primitives.rotation.y = time;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
}

requestAnimationFrame(render);
// 직육면체
function BoxGeometry() {
    const width = 1;
    const height = 1;
    const depth = 1;
    return new THREE.BoxGeometry( width, height, depth );
}
function BoxGeometry2() {
    const width = 1;
    const height = 1;
    const depth = 1;
    const widthSegments = 2;
    const heightSegments = 2;
    const depthSegments = 2;  

    return new THREE.BoxGeometry(
        width, height, depth,
        widthSegments, heightSegments, depthSegments );
}
// 원
function CircleGeometry() {
    const radius = 1;  
    const segments = 24;  

    return new THREE.CircleGeometry( radius, segments );
}
// 부채꼴
function CircleGeometry2() {
    const radius = 1;  
    const segments = 24;  
    const thetaStart = Math.PI * 0.25;  
    const thetaLength = Math.PI * 1.5;  

    return new THREE.CircleGeometry(
	    radius, segments, thetaStart, thetaLength );
}
// 원뿔
function ConeGeometry() {
    const radius = 1;  
    const height = 1.5;  
    const radialSegments = 16;  

    return new THREE.ConeGeometry( radius, height, radialSegments );
}
function ConeGeometry2() {
    const radius = 1;  
    const height = 1.5;  
    const radialSegments = 16;  
    const heightSegments = 2;  
    const openEnded = false; // 밑면 제거 여부
    const thetaStart = Math.PI * 0.25;  
    const thetaLength = Math.PI * 1.5;  

    return new THREE.ConeGeometry(
        radius, height,
        radialSegments, heightSegments,
        openEnded,
        thetaStart, thetaLength );
}
// 원뿔대
function CylinderGeometry() {
    const radiusTop = 1;  
    const radiusBottom = 1.5;  
    const height = 1.5;  
    const radialSegments = 12;  

    return new THREE.CylinderGeometry(
        radiusTop, radiusBottom, height, radialSegments );
}
function CylinderGeometry2() {
    const radiusTop = 1;  
    const radiusBottom = 1.5;  
    const height = 1.5;  
    const radialSegments = 12;  
    const heightSegments = 2;  
    const openEnded = false;  
    const thetaStart = Math.PI * 0.25;  
    const thetaLength = Math.PI * 1.5;  

    return new THREE.CylinderGeometry(
        radiusTop, radiusBottom, height,
        radialSegments, heightSegments,
        openEnded,
        thetaStart, thetaLength );
}
// 십이면체
function DodecahedronGeometry() {
    const radius = 1;  

    return new THREE.DodecahedronGeometry( radius );
}
function DodecahedronGeometry2() {
    const radius = 1;  
    const detail = 1;  

    return new THREE.DodecahedronGeometry( radius, detail );
}
// 이십면체
function IcosahedronGeometry(){
    const radius = 1;  

    return new THREE.IcosahedronGeometry( radius );
}
function IcosahedronGeometry2() {
    const radius = 1;  
    const detail = 1;  

    return new THREE.IcosahedronGeometry( radius, detail );
}
// 팔면체
function OctahedronGeometry() {
    const radius = 1;  

    return new THREE.OctahedronGeometry( radius );
}
function OctahedronGeometry2() {
    const radius = 1;  
    const detail = 1;

    return new THREE.OctahedronGeometry( radius, detail );
}
// 구
function SphereGeometry() {
    const radius = 1;  
    const widthSegments = 12;  
    const heightSegments = 8;  

    return new THREE.SphereGeometry( radius, widthSegments, heightSegments );
}
function SphereGeometry2() {
    const radius = 1;  
    const widthSegments = 12;  
    const heightSegments = 8;  
    const phiStart = Math.PI * 0.25;  
    const phiLength = Math.PI * 1.5;  
    const thetaStart = Math.PI * 0.25;  
    const thetaLength = Math.PI * 0.5;  

    return new THREE.SphereGeometry(
        radius,
        widthSegments, heightSegments,
        phiStart, phiLength,
    	thetaStart, thetaLength )
}
// 사면체
function TetrahedronGeometry() {
    const radius = 1;  

    return new THREE.TetrahedronGeometry( radius );
}
function TetrahedronGeometry2() {
    const radius =  1;  
    const detail = 1;  

    return new THREE.TetrahedronGeometry( radius, detail );
}


const functions = {
    // '1': {query: '#c1', func: BoxGeometry}
    1: BoxGeometry,
    2: BoxGeometry2,
    3: CircleGeometry,
    4: CircleGeometry2,
    5: ConeGeometry,
    6: ConeGeometry2,
    7: CylinderGeometry,
    8: CylinderGeometry2,
    9: DodecahedronGeometry,
    10: DodecahedronGeometry2,
    11: IcosahedronGeometry,
    12: IcosahedronGeometry2,
    13: OctahedronGeometry,
    14: OctahedronGeometry2,
    15: SphereGeometry,
    16: SphereGeometry2,
    17: TetrahedronGeometry
}
// console.log(functions[1].func)
const list = document.querySelector('#canvascontainer');
list.addEventListener('click', (event)=>{
    // console.log(event.target)
    // loadPrimitives(functions[event.target.textContent].query, functions[event.target.textContent].func)
    if (event.target.tagName == "BUTTON") {
        loadPrimitives(functions[event.target.textContent])        
    }
})
// loadPrimitives('#c', BoxGeometry);
// loadPrimitives('#c2', BoxGeometry2);
// loadPrimitives('#c3', CircleGeometry);
// loadPrimitives('#c4', CircleGeometry2);
// loadPrimitives('#c5', ConeGeometry);
// loadPrimitives('#c6', ConeGeometry2);
// loadPrimitives('#c7', CylinderGeometry);
// loadPrimitives('#c8', CylinderGeometry2);
// loadPrimitives('#c9', DodecahedronGeometry);
// loadPrimitives('#c10', DodecahedronGeometry2);
// loadPrimitives('#c11', IcosahedronGeometry);
// loadPrimitives('#c12', IcosahedronGeometry2);
// loadPrimitives('#c13', OctahedronGeometry)
// loadPrimitives('#c14', OctahedronGeometry2)
// loadPrimitives('#c15', SphereGeometry);
// loadPrimitives('#c16', SphereGeometry2);
// loadPrimitives('#c17', TetrahedronGeometry)