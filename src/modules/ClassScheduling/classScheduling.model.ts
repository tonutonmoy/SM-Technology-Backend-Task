import { Schema, model } from "mongoose";
import { ClassSchedule } from "./classScheduling.interface";



const ClassScheduleSchema: Schema = new Schema<ClassSchedule>({
  trainerId: {  type: String, ref: 'Trainer', required: true }, // Reference to Trainer
  date: { type: Date, required: true }, // Class date
  startTime: { type: String, required: true }, // Start time (e.g., "09:00 AM")
  endTime: { type: String, required: true }, // End time (e.g., "11:00 AM")
  trainees: [{  type: Schema.Types.ObjectId, ref: 'Trainee' }], // Array of trainees
  maxTrainees: { type: Number, default: 10 }, // Default maximum number of trainees set to 10
});

const ClassScheduleModel = model<ClassSchedule>("ClassSchedule", ClassScheduleSchema);

export default ClassScheduleModel;
