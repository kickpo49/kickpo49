# 📘 데이터 교환 포맷 및 시리얼라이징 이해  
## JSON · XML · YAML 비교

> **목적:**  
> 시스템 간 데이터 교환과 구성(Configuration) 관리에서 널리 쓰이는 **JSON, XML, YAML**의 개념과 특징, 장단점, 선택 가이드를 실무 중심으로 정리한 문서입니다.

---

## 🧩 1. 시리얼라이징(Serialization) 기본 개념

- **정의:**  
  객체(리스트, 맵, 클래스 등)를 **전송·저장 가능한 문자열 또는 바이트 형태**로 변환하는 과정  
- **역직렬화(Deserialization):**  
  직렬화된 데이터를 다시 **실행 가능한 객체 형태**로 복원하는 과정  

**활용 예시**
- 네트워크 전송 (클라이언트 ↔ 서버, 마이크로서비스)
- 파일 저장 (설정, 캐시, 로그)
- 언어 간 상호운용 (Java ↔ Python 등)

> 💡 **포맷 선택 기준:**  
> 가독성 · 스키마 표현력 · 성능 · 도구 생태계 · 보안성

---

## ⚖️ 2. 세 포맷 비교 요약

| 구분 | **JSON** | **XML** | **YAML** |
|:---|:---|:---|:---|
| **구조** | 키-값, 배열 중심 | 태그 기반 트리 구조 | 들여쓰기 기반 구조 |
| **가독성** | 높음 (간결) | 낮음 (태그冗長) | 매우 높음 (사람 친화) |
| **스키마 검증** | JSON Schema | XSD / DTD (성숙) | JSON Schema 연동 필요 |
| **주석** | ❌ 미지원 | ✅ `<!-- -->` | ✅ `#` |
| **데이터 타입** | 명확 (number, bool 등) | 텍스트 중심 | 유연 (앵커, 별칭 등) |
| **스트리밍** | 가능 (JSON Lines) | 매우 성숙 (SAX/StAX) | 제한적 |
| **주요 사용처** | API, 웹/모바일 | 기업 문서, SOAP, 표준 규격 | 설정 파일 (K8s, Ansible) |
| **장점** | 경량, 빠른 파싱 | 구조적, 표준화 | 사람 친화적, 주석 가능 |
| **단점** | 주석 없음 | 장황함, 파싱 느림 | 공백 민감, 파서 차이 |

---

## 💡 3. 최소 예제 비교

### ✅ JSON
```json
{
  "service": "payments",
  "version": 2,
  "enabled": true,
  "regions": ["ap-northeast-2", "us-west-2"],
  "retry": { "max": 3, "backoff": "exponential" }
}
```


### ✅ XML
```xml
<config>
  <service name="payments" version="2" enabled="true">
    <regions>
      <region>ap-northeast-2</region>
      <region>us-west-2</region>
    </regions>
    <retry>
      <max>3</max>
      <backoff>exponential</backoff>
    </retry>
  </service>
</config>
```

### ✅ YAML
```yaml
service: payments
version: 2
enabled: true
regions:
  - ap-northeast-2
  - us-west-2
retry:
  max: 3
  backoff: exponential
```

## 🧱 4. 스키마와 검증(Validation)

JSON → JSON Schema: 필드, 타입, enum, 포맷(email, uri) 등 제약 정의

XML → XSD / DTD: 복잡한 트리, 속성 제약, 네임스페이스 관리

YAML: 스키마 없음 → JSON Schema / OpenAPI 조합 사용

🔍 실무 팁:

JSON 응답은 CI에서 JSON Schema 자동 검증

XML은 XSD 기반 계약 관리

YAML 설정은 애플리케이션에서 pydantic / zod 등으로 검증

## ⚡ 5. 성능 및 용량 비교
항목	JSON	XML	YAML
속도	빠름	중간	느림
용량 효율	높음	낮음	중간
파싱 복잡도	낮음	높음	높음
대용량 적합성	✅	⚠️	❌

**💡 추천 가이드:**

대규모·고빈도 API → JSON

문서 기반·계약 중심 → XML

설정 관리·사람 친화성 → YAML

