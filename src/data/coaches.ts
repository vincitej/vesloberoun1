import { Coach } from "@/types";

export const coaches: Coach[] = [
  {
    id: "1",
    name: "Růžena Sehnoutková",
    role: "Hlavní trenérka",
    division: "mladez",
    email: "r.sehnoutkova64@gmail.com",
    phone: "+420 602 683 113",
    image: "/images/coaches/sehnoutkova.webp",
    bio: " Hlavní trenérka klubu s dlouholetou zkušeností ve veslování i plavání. Veslování se věnuje více jak 20 let.",
    achievements: [
      "Trenérská licence B - veslování",
      "Bývalá reprezentantka v plavání",
      "Trenérka plavání",
    ],
  },
  {
    id: "2",
    name: "Jaroslav Sehnoutka",
    role: "Trenér",
    division: "mladez",
    email: "",
    phone: "+420 606 743 608",
    image: "/images/coaches/sehnoutka.webp",
    bio: "Založil v roce 1999 veslařský klub v Berouně, aby zpřístupnil tento sport místním. Pod jeho vedením klub vychoval řadu medailistů z mistroství ČR a reprezentantů.",
    achievements: [
      "Bývalý reprezentant ve veslování",
      "Emeritní předseda klubu",
      "Sportovní osobnost Berounska 2019",
    ],
  },
  {
    id: "3",
    name: "Blanka Petrášová",
    role: "Trenérka",
    division: "pripravka",
    email: "",
    image: "/images/coaches/petrasova.webp",
    bio: "Se věnuje tréninku mladých veslařů, ale také kormidlování závodních lodí.",
    achievements: ["Trenérská licence C - veslování"],
  },
  {
    id: "4",
    name: "Karel Kouklík",
    role: "Trenér",
    division: "pripravka",
    email: "",
    phone: "+420 721 959 479",
    image: "/images/coaches/kouklik.webp",
    bio: "V minulosti působil jako trenér v ČVK Praha. Mezi jeho nejznámější odchovance patří ústřední trenér reprezentace Petr Blecha.",
    achievements: [
      "Trenérská licence C - veslování",
      "Bývalý reprezentant ve veslování",
    ],
  },
];
