import * as THREE from 'three';

function main() {
    const canvas = document.querySelector('#c2');

    // 렌더러 생성 : 인자 없으면 자동으로 canvas 생성하나 append 수동으로 해야됨
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

    // 렌더할 절두체 설정
    const fov = 75; // field of view : 시야각
    const aspect = 2; // canvas의 가로세로 비율, default : 2
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    // 카메라 뒤로 옮기기
    camera.position.z = 2;

    // scene 만들기
    const scene = new THREE.Scene();

    // 정육면체 만들기
    // 기하학 객체 만들기 (형태 만들기)
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    // // material 생성과 정의 (색, 밝기, 질감)
    // // const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
    // // 광원에 반응하는 material 로 설정 : Basic -> Phong
    // const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });

    // // 합치기
    // const cube = new THREE.Mesh(geometry, material);

    // // Scene 에 넣기
    // scene.add(cube);
    function makeInstance(geometry, color, x) {
        const material = new THREE.MeshPhongMaterial({ color });

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        cube.position.x = x;

        return cube;
    }

    const cubes = [
        makeInstance(geometry, 0x44aa88, 0),
        makeInstance(geometry, 0x8844aa, -2),
        makeInstance(geometry, 0xaa8844, 2),
    ];

    // 광원 만들기
    // 광원 정보 설정
    const color = 0xFFFFFF;
    const intensity = 3;
    
    // directional light 광원 생성
    const light = new THREE.DirectionalLight(color, intensity);

    // directional light : position, target 속성 설정
    // position : default (0, 0, 0)
    // target : default (0, 0, 0)
    light.position.set(-1, 2, 4);
    
    // scene에 넣기
    scene.add(light);

    // 렌더
    // renderer.render(scene, camera);
    
    // 애니메이션 구현하고 렌더하기
    function render(time) {
        // 밀리초 -> 초 변환
        time *= 0.001;

        // // x, y축 회전값(라디안)을 현재 시간값으로 설정
        // cube.rotation.x = time;
        // cube.rotation.y = time;

        cubes.forEach((cube, ndx) => {
            const speed = 1 + ndx * .1;
            const rot = time * speed;
            cube.rotation.x = rot;
            cube.rotation.y = rot;
        })

        renderer.render(scene, camera);

        // 재귀적으로 애니메이션 프레임 요청 (애니메이션 반복)
        requestAnimationFrame(render);
    }
    // 애니메이션 시작하기
    // requestAnimationFrame : callback 에 페이지가 로드된 이후의 시간값을 밀리초 단위로 넘김
    requestAnimationFrame(render);
}

main();