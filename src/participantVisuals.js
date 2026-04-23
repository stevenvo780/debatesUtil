import {
  GiCrystalBall,
  GiEagleEmblem,
  GiElephantHead,
  GiFoxHead,
  GiOctopus,
  GiOwl,
  GiRaven,
  GiSpartanHelmet,
  GiTigerHead,
  GiWolfHead,
} from "react-icons/gi"

const PARTICIPANT_VISUALS = [
  {
    Icon: GiFoxHead,
    background: "linear-gradient(135deg, #7a3a14 0%, #cd853f 100%)",
    color: "#fff2df",
    border: "rgba(255, 215, 174, 0.35)",
  },
  {
    Icon: GiOwl,
    background: "linear-gradient(135deg, #3b3448 0%, #8c6ad5 100%)",
    color: "#f7f3ff",
    border: "rgba(214, 202, 255, 0.35)",
  },
  {
    Icon: GiRaven,
    background: "linear-gradient(135deg, #1b2735 0%, #415a77 100%)",
    color: "#ecf5ff",
    border: "rgba(188, 213, 237, 0.35)",
  },
  {
    Icon: GiTigerHead,
    background: "linear-gradient(135deg, #7f2704 0%, #ff8c42 100%)",
    color: "#fff4e6",
    border: "rgba(255, 214, 176, 0.35)",
  },
  {
    Icon: GiWolfHead,
    background: "linear-gradient(135deg, #243b53 0%, #486581 100%)",
    color: "#f1f7fb",
    border: "rgba(199, 220, 236, 0.35)",
  },
  {
    Icon: GiOctopus,
    background: "linear-gradient(135deg, #5c2b5f 0%, #b15cff 100%)",
    color: "#fff0ff",
    border: "rgba(242, 201, 255, 0.35)",
  },
  {
    Icon: GiSpartanHelmet,
    background: "linear-gradient(135deg, #5b3a29 0%, #c08b5c 100%)",
    color: "#fff5ea",
    border: "rgba(255, 221, 186, 0.35)",
  },
  {
    Icon: GiCrystalBall,
    background: "linear-gradient(135deg, #244c4c 0%, #39b8b8 100%)",
    color: "#efffff",
    border: "rgba(192, 255, 250, 0.35)",
  },
  {
    Icon: GiEagleEmblem,
    background: "linear-gradient(135deg, #47311c 0%, #d4a15a 100%)",
    color: "#fff7e8",
    border: "rgba(255, 230, 192, 0.35)",
  },
  {
    Icon: GiElephantHead,
    background: "linear-gradient(135deg, #335c67 0%, #72a4b0 100%)",
    color: "#f1fbff",
    border: "rgba(205, 237, 245, 0.35)",
  },
]

function hashParticipantKey(value) {
  let hash = 0

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index)
    hash |= 0
  }

  return Math.abs(hash)
}

export function getParticipantVisual(participant) {
  const key = `${participant.shortId || ""}-${participant.name || ""}-${participant.id || ""}`
  const visual = PARTICIPANT_VISUALS[hashParticipantKey(key) % PARTICIPANT_VISUALS.length]

  return {
    ...visual,
    title: participant.name,
  }
}