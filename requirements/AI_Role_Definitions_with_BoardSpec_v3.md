# AI Role Definitions with Board Specification (v3)

이 문서는 **AI와 함께 애자일하게 서비스를 만들어가는 플랫폼**의 구조와 AI 역할 정의를 통합한 버전입니다.  
사용자는 코딩이나 애자일 지식이 없어도, AI와 함께 아이디어를 실제 서비스로 발전시킬 수 있습니다.

---

## 📘 개요

- **서비스 형태:** 보드 기반 (트렐로/노션 스타일)
- **보드 열:** `Idea → In Progress → Review → Done → Dropped`
- **기본 단계:** 총 10단계
- **AI 트리거:** 각 카드가 `In Progress`로 이동할 때 Claude가 자동으로 해당 단계의 산출물을 생성
- **결정 로직:** `피드백 분석` 단계 결과에 따라 `Go` → `피처 개선`, `No-Go` → `드롭 리포트`로 분기

---

# BOARD_SPEC.md

## 📋 기본 보드 구조

| 순서 | 보드 열 이름 | 설명 |
|------|---------------|------|
| 1 | 🧠 Idea | 아이디어 등록 및 초기 카드 생성 |
| 2 | ⚙️ In Progress | 현재 수행 중인 단계 (Claude 자동 실행 트리거) |
| 3 | 🔍 Review | 결과 검토 및 피드백 요약 |
| 4 | ✅ Done | 완료된 프로젝트 |
| 5 | ❌ Dropped | 중단된 프로젝트 및 교훈 기록 |

---

## 🧩 기본 카드 세트 (10단계)

| 순서 | 카드 이름 | 설명 | Claude 산출물 |
|------|------------|------|----------------|
| 1 | 💡 아이디어 등록 | 아이디어를 구조화 | `IdeaSummary` |
| 2 | 🔍 시장 조사 | 시장 적합성 및 경쟁 분석 | `MarketBrief` |
| 3 | 🧭 문제 정의 | 핵심 문제 및 성공 지표 정의 | `ProblemDef` |
| 4 | 🧪 가설 설정 | SMART 기준의 가설 작성 | `Hypotheses` |
| 5 | 🧰 최소 기능 정의 (MVP) | 검증용 최소 기능 도출 | `MVPStories` |
| 6 | 🎨 프로토타입 제작 | 화면 및 흐름 설계 | `ProtoPlan` |
| 7 | 🧭 실험 설계 | 검증 실험 계획 | `ExperimentPlan` |
| 8 | 📊 피드백 분석 | 실험 결과 요약 및 Go/No-Go 판단 | `Findings` |
| 9 | 🔁 피처 개선 | Go일 경우 다음 기능 개선 | `PrioritizedBacklog` |
| 10 | 📝 드롭/완료 리포트 | No-Go일 경우 종료, Go일 경우 회고 작성 | `ProjectReport` |

---

## ⚙️ 보드 동작 규칙

| 이벤트 | 설명 | Claude의 동작 |
|---------|------|---------------|
| 카드가 `In Progress`로 이동 | 작업 시작 | 해당 단계의 산출물을 생성 (`Output Schema` 기준) |
| 카드가 `Review`로 이동 | 결과 검토 | Claude가 결과 요약 및 다음 단계 추천 |
| `Feedback Analysis` 결과가 **Go**이면 | 성공 판단 | “Feature Improvement” 카드 생성 및 다음 단계 진행 |
| `Feedback Analysis` 결과가 **No-Go**이면 | 중단 판단 | “Drop Report” 카드 생성 |
| 카드가 `Done`으로 이동 | 완료 처리 | Claude가 회고(`ProjectReport`) 작성 |
| 카드가 `Dropped`로 이동 | 중단 처리 | Claude가 교훈 기록(`DropReport`) 작성 |

---

# AI_ROLES.md

아래는 각 카드 단계별 Claude의 역할 정의입니다.  
모든 단계 이동 시 Claude는 `OUTPUT_SCHEMAS.md` 기준으로 산출물을 생성합니다.

## 1️⃣ 아이디어 등록
**Goal:** 아이디어를 문제/고객/가치로 구조화  
**Output Schema:** `IdeaSummary`

```json
{
  "idea_title": "",
  "problem_one_liner": "",
  "target_user": "",
  "value_prop": "",
  "assumptions": ["", ""]
}
```

## 2️⃣ 시장 조사
**Goal:** 문제-시장 적합성 점검  
**Output Schema:** `MarketBrief`

```json
{
  "comparables": [{"name":"","url":"","similarity":"","difference":""}],
  "tam_sam_som": {"tam_note":"","sam_note":"","som_note":""},
  "risks": ["","","","",""],
  "opportunities": ["","","","",""],
  "go_no_go_hint": "go|no_go|unsure"
}
```

## 3️⃣ 문제 정의
**Goal:** 문제 가설 명문화  
**Output Schema:** `ProblemDef`

```json
{
  "problem_statement": "",
  "who_when_why": {"who":"","when":"","why":""},
  "leading_metrics": [{"name":"","how_to_measure":""}]
}
```

## 4️⃣ 가설 설정
**Goal:** SMART 기준 가설 2~3개  
**Output Schema:** `Hypotheses`

```json
{
  "hypotheses": [
    {"id":"H1","statement":"","success_criteria":"","fail_criteria":""},
    {"id":"H2","statement":"","success_criteria":"","fail_criteria":""}
  ]
}
```

## 5️⃣ 최소 기능 정의 (MVP)
**Goal:** 검증용 최소 기능 도출  
**Output Schema:** `MVPStories`

```json
{
  "stories": [
    {"id":"S1","as_a":"","i_want":"","so_that":"","acceptance_criteria":["","",""]}
  ],
  "must_have_ids":["S1","S2"]
}
```

## 6️⃣ 프로토타입 제작
**Goal:** 화면 및 흐름 설계  
**Output Schema:** `ProtoPlan`

```json
{
  "screens": [{"id":"SCR-1","name":"","goal":""}],
  "components": [{"name":"","purpose":""}],
  "flows": [{"from":"SCR-1","to":"SCR-2","via":""}],
  "build_instructions": "명령형 지시문(툴/커맨드/폴더구조)"
}
```

## 7️⃣ 실험 설계
**Goal:** 검증 실험 계획  
**Output Schema:** `ExperimentPlan`

```json
{
  "goal": "",
  "participants": {"who":"","n":0,"recruitment":""},
  "procedure": ["","",""],
  "metrics": [{"name":"","instrument":"","threshold":""}],
  "timeline_days": 7
}
```

## 8️⃣ 피드백 분석
**Goal:** 결과 요약 및 Go/No-Go 판단  
**Output Schema:** `Findings`

```json
{
  "themes": [{"name":"","evidence":["",""]}],
  "metrics_summary": [{"metric":"","value":"","threshold":"","pass":true}],
  "hypothesis_judgement": [{"id":"H1","pass":false,"evidence":""}],
  "decision": "go|no_go|pivot",
  "rationale": "",
  "next_actions": ["",""]
}
```

## 9️⃣ 피처 개선
**Goal:** 기능 개선 및 스프린트 계획  
**Output Schema:** `PrioritizedBacklog`

```json
{
  "ranked_stories": [{"id":"S1","impact":"H/M/L","effort":"H/M/L","rank":1}],
  "story_map": [{"activity":"","steps":["",""]}],
  "sprint_suggestion": {"duration_weeks":1,"stories":["S1","S3"]}
}
```

## 🔟 드롭/완료 리포트
**Goal:** 프로젝트 종료 또는 회고 작성  
**Output Schema:** `ProjectReport`

```json
{
  "decision": "go|no_go",
  "summary": "",
  "key_risks": ["",""],
  "lessons_learned": ["",""],
  "recommendations": ["",""]
}
```

---

# CLAUDE.md

- **역할:** “애자일 런칭 코치 (Agile Launch Coach)”  
- **미션:** 각 카드가 `In Progress`로 이동될 때, `AI_ROLES.md`의 해당 단계를 자동 수행하고 `Output Schema`에 맞는 결과를 생성  
- **출력 형식:** JSON → 요약 → 본문 → 다음 단계 제안  
- **품질 보증:** 스키마 준수 및 자기검수 포함  
- **원칙:**
  - 항상 한국어로 출력  
  - 불확실 시 최대 3개의 질문 후 진행  
  - 데이터 출처 불명 시 가정 명시  

---

# 실행 프롬프트 예시

| 명령 | 설명 |
|------|------|
| `@Claude run --stage="시장 조사"` | 해당 단계 자동 실행 |
| `@Claude suggest-next` | 다음 단계 제안 |
| `@Claude decide --mode="auto"` | Feedback Analysis 기반 Go/No-Go 자동 판정 |
| `@Claude summarize --scope="project"` | 전체 진행 요약 |

---

이 문서를 Claude에 업로드하면, AI는 10단계 전체 보드 플로우를 인식하고  
각 단계 이동 시 자동으로 산출물을 생성하며, “Feedback Analysis” 결과를 기반으로 “Feature Improvement” 또는 “Drop Report”를 진행합니다.
