import { TrainingSchedule } from "@/types";

export const summerDescription =
  "V letní sezóně probíhají tréninky v loděnici na Štulovně. Veslujme na řece Berounce, zdokonalujeme techniku, trénujeme vytrvalost a běháme. ";

export const winterDescription =
  "V zimním období probíhá příprava na suchu a posilovně. Zaměřuje se na rozvoj fyzické kondice, síly a vytrvalosti. Využíváme hlavně zázemí posilovny v Kasárnách.";

export const summerActivities = [
  {
    title: "Vodní příprava",
    items: ["Technika", "Rychlost", "Vytrvalost", "Posádky"],
  },
  {
    title: "Suchá příprava",
    items: ["Běh", "Rozcvičky", "Posilování"],
  },
  {
    title: "Závody",
    items: ["Regaty", "Mistroství"],
  },
];

export const winterActivities = [
  {
    title: "Hala",
    items: ["Atletika", "Běh", "Opičí dráha", "Týmové hry"],
  },
  {
    title: "Posilovna",
    items: ["Trenažéry Concept2", "Veslařský bazén", "Silový trénink"],
  },
  {
    title: "Plavání",
    items: ["Kondiční plavání", "Regenerace"],
  },
];

export const seasonalTraining: {
  leto: TrainingSchedule[];
  zima: TrainingSchedule[];
} = {
  leto: [
    {
      division: "Přípravka (9-10 let)",
      days: [
        {
          day: "Pondělí",
          time: "15:00 - 17:00",
          location: "Loděnice na Štulovně",
          coach: "",
        },
        {
          day: "Čtvrtek",
          time: "15:00 - 17:00",
          location: "Loděnice na Štulovně",
          coach: "Petr Dvořák",
        },
      ],
    },
    {
      division: "Mladší žáci (11-12 let)",
      days: [
        {
          day: "Pondělí",
          time: "15:00 - 17:00",
          location: "Loděnice na Štulovně",
          coach: "",
        },
        {
          day: "Středa",
          time: "15:00 - 17:00",
          location: "Loděnice na Štulovně",
          coach: "",
        },
        {
          day: "Pátek",
          time: "15:00 - 17:00",
          location: "Loděnice na Štulovně",
          coach: "",
        },
      ],
    },
    {
      division: "Starší žáci (13 - 14 let)",
      days: [
        {
          day: "Pondělí",
          time: "15:00 - 18:00",
          location: "Loděnice na Štulovně",
          coach: "",
        },
        {
          day: "Středa",
          time: "15:00 - 18:00",
          location: "Loděnice na Štulovně",
          coach: "",
        },
        {
          day: "Čtvrtek",
          time: "15:00 - 18:00",
          location: "Loděnice na Štulovně",
          coach: "",
        },
        {
          day: "Pátek",
          time: "15:00 - 18:00",
          location: "Loděnice na Štulovně",
          coach: "",
        },
      ],
    },
    {
      division: "Dorost a starší (15+ let)",
      days: [
        {
          day: "Pondělí",
          time: "15:30 - 18:30",
          location: "Loděnice na Štulovně",
          coach: "Růžena Sehnoutková",
        },
        {
          day: "Úterý",
          time: "15:30 - 18:30",
          location: "Loděnice na Štulovně",
          coach: "Růžena Sehnoutková",
        },
        {
          day: "Středa",
          time: "15:30 - 18:30",
          location: "Loděnice na Štulovně",
          coach: "Růžena Sehnoutková",
        },
        {
          day: "Čtvrtek",
          time: "15:30 - 18:30",
          location: "Loděnice na Štulovně",
          coach: "Růžena Sehnoutková",
        },
        {
          day: "Pátek",
          time: "15:30 - 18:30",
          location: "Loděnice na Štulovně",
          coach: "Růžena Sehnoutková",
        },
      ],
    },
  ],
  zima: [
    {
      division: "Přípravka (9-10 let)",
      days: [
        {
          day: "Pondělí",
          time: "18:00 - 18:50",
          location: "Plavání - TP Laguna",
          coach: "",
        },
        {
          day: "Čtvrtek",
          time: "16:30 - 18:00",
          location: "Hala TJ Lokomotiva",
          coach: "",
        },
      ],
    },
    {
      division: "Mladší žáci (11-12 let)",
      days: [
        {
          day: "Pondělí",
          time: "18:00 - 18:50",
          location: "Plavání - TP Laguna",
          coach: "",
        },
        {
          day: "Čtvrtek",
          time: "15:30 - 17:00",
          location: "Hala TJ Lokomotiva",
          coach: "",
        },
        {
          day: "Pátek",
          time: "15:00 -16:30",
          location: "Posilovna v Kasárnách",
          coach: "",
        },
      ],
    },
    {
      division: "Starší žáci (13 - 14 let)",
      days: [
        {
          day: "Pondělí",
          time: "15:00 - 16:30",
          location: "Posilovna v Kasárnách",
          coach: "",
        },
        {
          day: "Pondělí",
          time: "18:00 - 18:50",
          location: "Plavání - TP Laguna",
          coach: "",
        },
        {
          day: "Středa",
          time: "15:30 - 17:30",
          location: "Posilovna v Kasárnách",
          coach: "",
        },
        {
          day: "Čtvrtek",
          time: "15:30 - 17:00",
          location: "Hala TJ Lokomotiva",
          coach: "",
        },
        {
          day: "Pátek",
          time: "15:00 - 17:00",
          location: "Posilovna v Kasárnách",
          coach: "",
        },
      ],
    },
    {
      division: "Dorost a starší (15+ let)",
      days: [
        {
          day: "Pondělí",
          time: "15:30 - 17:30",
          location: "Posilovna v Kasárnách",
          coach: "Růžena Sehnoutková",
        },
        {
          day: "Pondělí",
          time: "18:40 - 19:30",
          location: "Plavání - TP Laguna",
          coach: "Růžena Sehnoutková",
        },
        {
          day: "Úterý",
          time: "16:00 - 18:30",
          location: "Posilovna v Kasárnách",
          coach: "Růžena Sehnoutková",
        },
        {
          day: "Středa",
          time: "16:30 - 18:30",
          location: "Posilovna v Kasárnách",
          coach: "Růžena Sehnoutková",
        },
        {
          day: "Čtvrtek",
          time: "15:30 - 18:00",
          location: "Posilovna v Kasárnách",
          coach: "Růžena Sehnoutková",
        },
        {
          day: "Pátek",
          time: "15:30 - 17:00",
          location: "Hala TJ Lokomotiva",
          coach: "Růžena Sehnoutková",
        },
      ],
    },
  ],
};

const month = new Date().getMonth() + 1;
const isSummer = month >= 4 && month <= 10;
export const trainingSchedules: TrainingSchedule[] = isSummer
  ? seasonalTraining.leto
  : seasonalTraining.zima;

export const currentSeasonActivities = isSummer
  ? summerActivities
  : winterActivities;
