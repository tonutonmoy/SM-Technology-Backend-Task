export interface ClassSchedule {
  
  trainerId: string;
  date: Date; // The date the class is scheduled
  startTime: string; // Example: "09:00 AM"
  endTime: string;   // Example: "11:00 AM"
  trainees: Trainee[]; // List of enrolled trainees
  maxTrainees: number; // Set to 10
}

interface Trainee {

  name: string;
  email: string;
}

interface DaySchedule {
  date: Date;
  classSchedules: ClassSchedule[]; // A maximum of 5 class schedules per day
}

interface Admin {

  name: string;
  email: string;
  scheduleClass: (day: DaySchedule, classSchedule: ClassSchedule) => void; // Method to schedule a class
  assignTrainer: (classSchedule: ClassSchedule, trainerId: string) => void; // Method to assign a trainer to a class
}