# nodejs_simple_mvc_express

Node.js에서 Express를 가지고 MVC 패턴을 구현하기 위하여 제작한 프로젝트 입니다.

현재 많은 Node.js프레임 워크들이 존재하며 자바스크립트 문법의 업데이트로 현재와 맞지 않는 프로젝트로 사용을 권장하지 않습니다.

보완필요사항으로 Controller의 재정립

Model의 쿼리 처리 (sequelize 라이브러리로 DB연결 교체 필요) 등이 있습니다.

또한 당시 V8엔진의 특성상 동기/비동기의 처리에 대한 문제로 callback처리를 하도록 코드가 작성되고 있었으므로 동기/비동기 처리를 위하여 코드 재작성이 필요합니다.
