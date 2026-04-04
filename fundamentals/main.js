import * as THREE from 'three';

function main() {
    const canvas = document.querySelector('#c');

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

    // material 생성과 정의 (색, 밝기, 질감)
    const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
    
    // 합치기
    const cube = new THREE.Mesh(geometry, material);

    // Scene 에 넣기
    scene.add(cube);

    // 렌더
    // renderer.render(scene, camera);
    
    // 애니메이션 구현하고 렌더하기
    function render(time) {
        // 밀리초 -> 초 변환
        time *= 0.001;

        // x, y축 회전값(라디안)을 현재 시간값으로 설정
        cube.rotation.x = time;
        cube.rotation.y = time;

        renderer.render(scene, camera);

        // 재귀적으로 애니메이션 프레임 요청 (애니메이션 반복)
        requestAnimationFrame(render);
    }
    // 애니메이션 시작하기
    // requestAnimationFrame : callback 에 페이지가 로드된 이후의 시간값을 밀리초 단위로 넘김
    requestAnimationFrame(render);
}

main();