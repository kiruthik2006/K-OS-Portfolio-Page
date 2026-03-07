// src/data/portfolioData.js

export const terminalProfile = {
  user: "kiruthik",
  host: "macbook-pro-m1",
  path: "~/skills",
  commands: [
    {
      cmd: "neofetch",
      output: [
        { label: "OS", value: "macOS Sequoia" },
        { label: "Host", value: "KPRCAS Scholar (CS & Data Analytics)" }, // [cite: 2, 12]
        { label: "Uptime", value: "20 Years" }, // Calculated from 2006 [cite: 6]
        { label: "Kernel", value: "Java, Python, C++, SQL" }, // 
        { label: "Shell", value: "Zsh" },
        { label: "Resolution", value: "1920x1080" },
        { label: "CPU", value: "Brain (Creative & Logical)" },
        { label: "Memory", value: "Infinite Learning Capacity" },
      ]
    },
    {
      cmd: "cat technical_skills.txt",
      output: "Tools: GCP, Firebase, N8n, Docker, Wireshark, Nmap" // [cite: 22]
    },
    {
      cmd: "whoami",
      output: "I build real-time CV apps, dashboards, and automation tools." // [cite: 9]
    }
  ]
};

export const finderItems = [
  {
    id: 1,
    title: "Student Dashboard",
    type: "folder",
    date: "2024",
    tag: "React + Python",
    desc: "Attendance & marks analytics system reducing manual work by 40%.", // [cite: 33, 34]
    tech: ["React.js", "Python", "MongoDB"] // [cite: 36]
  },
  {
    id: 2,
    title: "Hand Sign AI",
    type: "folder",
    date: "2024",
    tag: "Machine Learning",
    desc: "Real-time gesture recognition for hands-free control using MediaPipe.", // [cite: 37, 39]
    tech: ["TensorFlow", "MediaPipe", "CV"] // 
  },
  {
    id: 3,
    title: "Auto Parking",
    type: "folder",
    date: "Fixit Hackathon",
    tag: "IoT/Automation",
    desc: "Winner of 24hr Hackathon. Automatic parking management system.", // [cite: 27, 29]
    tech: ["Hardware", "C++", "Sensors"]
  },
  {
    id: 4,
    title: "3D Models",
    type: "image",
    date: "Blender",
    tag: "Design",
    desc: "Collection of 3D designs and models created in Blender.", // [cite: 22, 43]
    tech: ["Blender"]
  },
  {
    id: 5,
    title: "Cyber Security",
    type: "pdf",
    date: "Certification",
    tag: "Course",
    desc: "Training on system protection, vulnerability ID, and modern security tools.", // [cite: 16, 17]
    tech: ["Nmap", "Wireshark"]
  }
];

export const contactConfig = {
  email: "kiruthikk911@gmail.com", // [cite: 3]
  phone: "+91 9150642527", // [cite: 5]
  github: "kiruthik2006", // [cite: 6]
  location: "Tiruppur, India" // [cite: 6]
};