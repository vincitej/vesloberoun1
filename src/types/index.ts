// Typy pro články/aktuality
export interface Article {
  id: number; // Changed from string to match database
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
  category: "zavod" | "treninky" | "akce" | "uspech";
}

// Typy pro trenéry
export interface Coach {
  id: string;
  name: string;
  role: string;
  division: "pripravka" | "mladez" | "dospeli" | "masters";
  email: string;
  phone?: string;
  image: string;
  bio: string;
  achievements: string[];
}

// Typy pro vedení klubu
export interface BoardMember {
  id: string;
  name: string;
  position: string;
  email: string;
  image: string;
}

// Typy pro tréninkový plán
export interface TrainingSchedule {
  division: string;
  days: {
    day: string;
    time: string;
    location: string;
    coach: string;
  }[];
}

// Typy pro úspěchy klubu
export interface Achievement {
  id: string;
  year: number;
  title: string;
  athlete: string;
  competition: string;
  place: number;
}
