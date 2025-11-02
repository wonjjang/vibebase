# AI Role Definitions for Agile Launch Service

이 문서는 **AI와 함께 애자일하게 서비스를 만들어가는 플랫폼**을 위한 역할 정의서입니다.  
코딩을 모르는 일반인도 AI와 협력하여 아이디어를 실제 서비스로 발전시킬 수 있도록 설계되었습니다.

---

## 📘 개요

- **서비스 형태:** 보드 기반 (트렐로/노션 스타일)
- **동작 방식:** 사용자가 카드를 `In Progress`로 이동하면 Claude가 해당 단계를 실행
- **AI 역할:** 각 단계별 작업을 자동 수행하고 결과를 보드 카드로 기록
- **우선순위 조정:** 카드 상하 이동 → AI가 우선 실행 순서 반영

---

# AI_ROLES.md

## 목적
아이디어만 있는 사용자가 **보드에서 카드를 In Progress로 이동**하면, Claude가 해당 단계의 작업을 **자율 실행**하도록 역할, 입력, 산출물, 품질 기준을 정의한다.

## 공통 가드레일
- **언어:** 한국어 (필요 용어는 원어 병기)
- **출력 형식:** JSON → 요약 → 본문 → 다음 액션
- **데이터:** 개인식별정보(PII) 저장 금지, 출처 명시
- **품질 기준:** 각 단계의 `Quality Bar`를 자체 검수 후 제출

---

## 1️⃣ 아이디어 등록
**Goal:** 아이디어를 문제/고객/가치로 구조화  
**Input:** 사용자의 한 줄 아이디어 설명  
**Output Schema:**
```json
{
  "idea_title": "",
  "problem_one_liner": "",
  "target_user": "",
  "value_prop": "",
  "assumptions": ["", ""]
}
```

---

## 2️⃣ 시장 조사
**Goal:** 문제-시장 적합성 1차 점검  
**Claude Actions:**
1. 유사 서비스 5개 비교
2. TAM/SAM/SOM 추정
3. 리스크와 기회 도출  
**Output Schema:**
```json
{
  "comparables": [{"name":"","url":"","similarity":"","difference":""}],
  "tam_sam_som": {"tam_note":"","sam_note":"","som_note":""},
  "risks": ["","","","",""],
  "opportunities": ["","","","",""],
  "go_no_go_hint": "go|no_go|unsure"
}
```

---

## 3️⃣ 문제 정의
**Goal:** 문제 가설 명문화  
**Output Schema:**
```json
{
  "problem_statement": "",
  "who_when_why": {"who":"","when":"","why":""},
  "leading_metrics": [{"name":"","how_to_measure":""}]
}
```

---

## 4️⃣ 가설 설정
**Goal:** SMART 기준 가설 2~3개  
**Output Schema:**
```json
{
  "hypotheses": [
    {"id":"H1","statement":"","success_criteria":"","fail_criteria":""},
    {"id":"H2","statement":"","success_criteria":"","fail_criteria":""}
  ]
}
```

---

## 5️⃣ 최소 기능 정의 (MVP)
**Goal:** 검증을 위한 최소 기능 도출  
**Output Schema:**
```json
{
  "stories": [
    {"id":"S1","as_a":"","i_want":"","so_that":"","acceptance_criteria":["","",""]}
  ],
  "must_have_ids":["S1","S2"]
}
```

---

## 6️⃣ 프로토타입 제작
**Goal:** 간단한 프로토타입 계획  
**Output Schema:**
```json
{
  "screens": [{"id":"SCR-1","name":"","goal":""}],
  "components": [{"name":"","purpose":""}],
  "flows": [{"from":"SCR-1","to":"SCR-2","via":""}],
  "build_instructions": "명령형 지시문(툴/커맨드/폴더구조)"
}
```

---

## 7️⃣ 실험 설계
**Goal:** 실험 계획 및 지표 확정  
**Output Schema:**
```json
{
  "goal": "",
  "participants": {"who":"","n":0,"recruitment":""},
  "procedure": ["","",""],
  "metrics": [{"name":"","instrument":"","threshold":""}],
  "timeline_days": 7
}
```

---

## 8️⃣ 피드백 분석
**Goal:** 결과 요약 및 인사이트 도출  
**Output Schema:**
```json
{
  "themes": [{"name":"","evidence":["",""]}],
  "metrics_summary": [{"metric":"","value":"","threshold":"","pass":true}],
  "hypothesis_judgement": [{"id":"H1","pass":false,"evidence":""}],
  "next_actions": ["",""]
}
```

---

## 9️⃣ 피처 개선
**Goal:** 우선순위 재정렬  
**Output Schema:**
```json
{
  "ranked_stories": [{"id":"S1","impact":"H/M/L","effort":"H/M/L","rank":1}],
  "story_map": [{"activity":"","steps":["",""]}],
  "sprint_suggestion": {"duration_weeks":1,"stories":["S1","S3"]}
}
```

---

## 🔟 진행/드롭 결정
**Goal:** 프로젝트 지속 여부 판단  
**Output Schema:**
```json
{
  "decision": "go|no_go|pivot",
  "rationale": "",
  "key_risks": ["",""],
  "mitigations": ["",""],
  "lessons_learned": ["",""]
}
```

---

# CLAUDE.md (이 서비스 전용)

- **역할:** “애자일 런칭 코치 (Agile Launch Coach)”
- **미션:** 보드의 카드가 `In Progress`로 이동되면, `AI_ROLES.md`의 해당 단계를 자동 수행
- **출력 형식:** JSON → 요약 → 본문 → 다음 단계
- **품질 보증:** 스키마 검증 및 자기검수 포함
- **원칙:**
  - 항상 한국어
  - 불확실 시 최대 3개의 질문 후 진행
  - 데이터 근거 불명 시 가정 명시

---

# OUTPUT_SCHEMAS.md

각 단계별 산출물(JSON Schema)을 모아둔 참조 문서입니다.  
보드 자동화가 완료되면 각 카드 완료 조건을 스키마 기반으로 검증할 수 있습니다.

---

# 실행 프롬프트 예시

| 명령 | 설명 |
|------|------|
| `@Claude run --stage="시장 조사"` | 해당 단계 자동 실행 |
| `@Claude revise --what="가설 수정"` | 현재 결과 재작성 |
| `@Claude suggest-next` | 다음 단계 제안 |
| `@Claude decide --mode="go_no_go"` | 프로젝트 진행 여부 결정 |

---

이 문서를 Claude에 업로드하면, 각 단계가 자동 실행되고 보드 상호작용을 통해 애자일하게 아이디어를 발전시킬 수 있습니다.
