# 5wesome-mall-item
## Introduction
밈팔이닷컴 카테고리, 상품, 주문을 담당하는 백엔드 레포지토리입니다.
## Architecture
router, presentation, application, domain layer로 구성된 전형적인 layered architecture 기준으로 소프트웨어 설계를 진행했습니다.
- router: Router만을 정의한 계층
- presentation: 표현계층, controller와 middleware를 모아둔 계층
- application: 응용계층, 비지니스 로직을 모아둔 계층
- domain: 도메인계층, 엔티티와 dao를 정의한 계층
## API 요구사항 및 문서
<a href="https://www.notion.so/elice/API-07da616fe8d048828cd8f42868668a32">API 요구사항</a>

<a href="https://www.notion.so/elice/API-a05f1864fdd1435aa7dd31dace057297">API 문서</a>

## Deployment Environment (배포 환경)
- Nginx
- Docker
- PM2