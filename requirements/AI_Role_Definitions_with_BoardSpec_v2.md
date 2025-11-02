# AI Role Definitions with Board Specification (v2)

이 문서는 **AI와 함께 애자일하게 서비스를 만들어가는 플랫폼**의 구조와 AI 역할 정의를 통합한 버전입니다.  
사용자는 코딩이나 애자일 지식이 없어도, AI와 함께 아이디어를 실제 서비스로 발전시킬 수 있습니다.

---

## 📘 개요

- **서비스 형태:** 보드 기반 (트렐로/노션 스타일)
- **보드 열:** `Idea → In Progress → Review → Done → Dropped`
- **AI 트리거:** 카드를 `In Progress`로 이동하면 Claude가 해당 단계를 자동 실행
- **결정 로직:** 피드백 분석 결과에 따라 `Go` → 피처 개선 진행, `No-Go` → 드롭 리포트 생성

---

# BOARD_SPEC.md

## 📋 기본 보드 구조

| 순서 | 보드 열 이름 | 설명 |
|------|---------------|------|
| 1 | 🧠 Idea | 아이디어 등록 및 초기 카드 생성 |
| 2 | ⚙️ In Progress | 현재 수행 중인 단계 (Claude 자동 실행 트리거) |
| 3 | 🔍 Review | 결과 검토 및 피드백 요약 |
| 4 | ✅ Done | 완료된 카드 |
| 5 | ❌ Dropped | 중단된 프로젝트 및 교훈 기록 |

---

## 🧩 초기 카드 세트 (기본 티켓 9종)

Claude는 사용자가 아이디어를 입력하면 아래 9개의 기본 티켓을 자동 생성합니다.

| 순서 | 카드 이름 | 설명 | 연결된 AI 역할 |
|------|------------|------|----------------|
| 1 | 💡 아이디어 등록 | 아이디어 구조화 | Idea Registration |
| 2 | 🔍 시장 조사 | 시장/경쟁 분석 | Market Research |
| 3 | 🧭 문제 정의 | 핵심 문제 명확화 | Problem Definition |
| 4 | 🧪 가설 설정 | 검증 가능한 가설 작성 | Hypothesis Setup |
| 5 | 🧰 최소 기능 정의 (MVP) | 검증을 위한 필수 기능 도출 | MVP Definition |
| 6 | 🎨 프로토타입 제작 | 기본 화면·흐름 설계 | Prototype Planning |
| 7 | 🧭 실험 설계 | 검증 실험 설계 | Experiment Design |
| 8 | 📊 피드백 분석 | 실험 결과 요약 및 판단 (Go / No-Go) | Feedback Analysis |
| 9 | 🔁 피처 개선 | “Go”일 경우 자동 생성 | Feature Improvement |

드롭(No-Go)일 경우 자동으로 생성되는 보조 카드:
| 카드 이름 | 설명 |
|------------|------|
| 📝 드롭 리포트 | 중단 사유 및 학습 인사이트 정리 |

---

## ⚙️ 보드 동작 규칙

| 이벤트 | 설명 | AI 동작 |
|---------|------|----------|
| 카드가 `In Progress`로 이동 | 사용자가 작업 시작 | Claude가 해당 단계 수행 |
| 카드가 `Review`로 이동 | 결과 검토 | Claude가 요약 및 다음 단계 추천 |
| `Feedback Analysis` 결과가 **Go**이면 | 성공으로 간주 | Claude가 “Feature Improvement” 카드 생성 |
| `Feedback Analysis` 결과가 **No-Go**이면 | 종료로 간주 | Claude가 “Drop Report” 카드 생성 |
| 카드가 `Done`으로 이동 | 완료 처리 | Claude가 상태 업데이트 및 회고 제안 |

---

# AI_ROLES.md

(각 단계별 AI 역할 정의 포함 — 동일 내용 생략)
