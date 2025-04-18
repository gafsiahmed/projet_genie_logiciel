import randomstring from "randomstring";

export const generateCode = () =>
  randomstring.generate({
    length: 30,
    capitalization: "uppercase",
  });

export const Roles = {
  marketingManager: "marketingManager",
  admin: "admin",
  instructor: "instructor",
  user: "user",
};
export const Transaction = {
  revenu: "Revenu",
  depenses: "Depense",
};

export const TrainingCategory = {
  webdev: {
    "1": "Developpement Web 1",
    "2": "Developpement Web 2",
    "3": "Developpement Web 3",
  },
  design: "Design",
  marketing: "Marketing",
  python: "Python",
  ux_ui: "UX/UI",
  junior: "Junior",
  data : "Data science"
};
