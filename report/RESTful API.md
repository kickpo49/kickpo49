# RESTful API 개념 가이드

## REST란?

REST(Representational State Transfer)는 2000년 Roy Fielding의 박사 논문에서 제안된 웹 아키텍처 스타일입니다. 네트워크 기반 소프트웨어 아키텍처를 설계하기 위한 일련의 제약 조건과 원칙을 정의합니다.

## RESTful API란?

RESTful API는 REST 아키텍처 원칙을 따르는 API(Application Programming Interface)입니다. 클라이언트와 서버 간의 통신을 위한 표준화된 방식을 제공하며, 주로 HTTP 프로토콜을 사용합니다.

## REST의 6가지 제약 조건

### 1. Client-Server (클라이언트-서버)
클라이언트와 서버가 독립적으로 분리되어 있어야 합니다. 이를 통해 각각 독립적으로 개발하고 확장할 수 있습니다.

### 2. Stateless (무상태)
각 요청은 독립적이며, 서버는 클라이언트의 상태를 저장하지 않습니다. 모든 요청에 필요한 정보가 포함되어야 합니다.

### 3. Cacheable (캐시 가능)
응답은 캐시 가능 여부를 명시해야 하며, 캐시를 통해 성능을 향상시킬 수 있습니다.

### 4. Uniform Interface (균일한 인터페이스)
일관된 인터페이스를 통해 클라이언트와 서버가 통신합니다. 이는 시스템 아키텍처를 단순화하고 가시성을 향상시킵니다.

### 5. Layered System (계층화 시스템)
클라이언트는 중간 계층(로드 밸런서, 프록시 등)의 존재를 알 수 없으며, 각 계층은 독립적으로 동작합니다.

### 6. Code on Demand (선택사항)
서버가 클라이언트에게 실행 가능한 코드를 전송할 수 있습니다(예: JavaScript).

## HTTP 메서드

RESTful API는 HTTP 메서드를 사용하여 리소스에 대한 작업을 정의합니다.

| 메서드 | 용도 | 예시 |
|--------|------|------|
| GET | 리소스 조회 | `GET /users` - 모든 사용자 조회 |
| POST | 리소스 생성 | `POST /users` - 새 사용자 생성 |
| PUT | 리소스 전체 수정 | `PUT /users/1` - 사용자 1의 정보 전체 수정 |
| PATCH | 리소스 부분 수정 | `PATCH /users/1` - 사용자 1의 특정 필드만 수정 |
| DELETE | 리소스 삭제 | `DELETE /users/1` - 사용자 1 삭제 |

## URI 설계 원칙

### 리소스 중심 설계
```
좋은 예:
GET /users
GET /users/123
POST /users
DELETE /users/123

나쁜 예:
GET /getUsers
POST /createUser
GET /deleteUser/123
```

### 명사 사용, 동사 지양
URI는 리소스를 나타내는 명사를 사용하고, 행위는 HTTP 메서드로 표현합니다.

### 계층 관계 표현
```
GET /users/123/orders          # 사용자 123의 주문 목록
GET /users/123/orders/456      # 사용자 123의 주문 456
POST /users/123/orders          # 사용자 123에게 새 주문 생성
```

### 소문자 사용 및 하이픈 구분
```
권장: /user-profiles
비권장: /userProfiles, /user_profiles
```

## HTTP 상태 코드

### 성공 응답 (2xx)
- **200 OK**: 요청 성공
- **201 Created**: 리소스 생성 성공
- **204 No Content**: 요청 성공, 응답 본문 없음

### 클라이언트 오류 (4xx)
- **400 Bad Request**: 잘못된 요청
- **401 Unauthorized**: 인증 필요
- **403 Forbidden**: 권한 없음
- **404 Not Found**: 리소스를 찾을 수 없음
- **409 Conflict**: 리소스 충돌

### 서버 오류 (5xx)
- **500 Internal Server Error**: 서버 내부 오류
- **503 Service Unavailable**: 서비스 이용 불가

## 요청/응답 예시

### 사용자 목록 조회
```http
GET /api/users HTTP/1.1
Host: example.com
Accept: application/json

HTTP/1.1 200 OK
Content-Type: application/json

{
  "data": [
    {
      "id": 1,
      "name": "홍길동",
      "email": "hong@example.com"
    },
    {
      "id": 2,
      "name": "김철수",
      "email": "kim@example.com"
    }
  ]
}
```

### 사용자 생성
```http
POST /api/users HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "name": "이영희",
  "email": "lee@example.com"
}

HTTP/1.1 201 Created
Location: /api/users/3
Content-Type: application/json

{
  "id": 3,
  "name": "이영희",
  "email": "lee@example.com",
  "created_at": "2025-10-28T10:30:00Z"
}
```

## RESTful API의 장점

1. **확장성**: 무상태 특성으로 인해 쉽게 확장 가능
2. **유연성**: 클라이언트와 서버가 독립적으로 발전 가능
3. **표준화**: HTTP 프로토콜을 사용하여 이해하기 쉬움
4. **캐싱**: 성능 향상을 위한 캐싱 지원
5. **플랫폼 독립성**: 다양한 플랫폼에서 사용 가능

## RESTful API 설계 시 고려사항

- **버전 관리**: `/api/v1/users` 형식으로 버전 명시
- **필터링 및 정렬**: 쿼리 파라미터 사용 (`/users?status=active&sort=name`)
- **페이지네이션**: 대량 데이터 처리 (`/users?page=1&limit=20`)
- **보안**: HTTPS 사용, 인증/인가 구현
- **에러 처리**: 명확하고 일관된 에러 응답 형식
- **문서화**: API 문서 제공 (Swagger, OpenAPI 등)

## 실제 활용 예시

대부분의 현대 웹 서비스와 모바일 앱은 RESTful API를 사용합니다:
- GitHub API
- Twitter API
- Google Maps API
- 전자상거래 플랫폼
- 소셜 미디어 서비스

RESTful API는 웹 개발의 표준이 되었으며, 마이크로서비스 아키텍처의 기반이 되고 있습니다.