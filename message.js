// Vercel 서버리스 함수: 응원 문장 하나를 골라 이름과 함께 돌려준다.
const MESSAGES = [
  "{name}, 오늘도 한 걸음 내디딘 것만으로 충분히 멋져요!",
  "{name}의 노력은 반드시 빛을 볼 거예요.",
  "천천히 가도 괜찮아요, {name}. 멈추지만 않으면 돼요.",
  "{name}, 오늘 하루도 정말 수고 많았어요.",
  "어려운 순간에도 버텨 낸 {name}, 진짜 대단해요!",
  "{name}의 웃음이 누군가에게 큰 힘이 되고 있어요.",
  "작은 성공도 성공이에요. {name}, 스스로를 칭찬해 주세요!",
  "{name}, 지금 모습 그대로도 충분히 소중해요.",
  "실수해도 괜찮아요. {name}은(는) 매일 자라고 있어요.",
  "{name}, 오늘은 좋은 일이 찾아올 거예요!",
  "포기하지 않는 {name}을(를) 응원해요. 끝까지 함께해요!",
  "{name}, 숨 한 번 크게 쉬고 다시 시작해 봐요.",
  "{name}의 하루가 따뜻한 햇살처럼 반짝이길 바라요.",
  "누구보다 열심히 하는 {name}, 잠깐 쉬어 가도 돼요.",
  "{name}, 당신은 생각보다 훨씬 강한 사람이에요!",
];

const MAX_NAME_LENGTH = 20;

module.exports = (req, res) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).json({ error: "GET 요청만 받을 수 있어요." });
    return;
  }

  const raw = typeof req.query.name === "string" ? req.query.name : "";
  const trimmed = raw.trim().slice(0, MAX_NAME_LENGTH);
  const name = trimmed || "여러분";

  const template = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
  const message = template.split("{name}").join(name);

  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ name, message });
};
