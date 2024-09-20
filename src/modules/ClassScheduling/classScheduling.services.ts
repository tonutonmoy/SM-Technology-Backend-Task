import { ClassSchedule } from "./classScheduling.interface";
import ClassScheduleModel from "./classScheduling.model";


const createClassScheduleDB = async (payload: ClassSchedule) => {
  const { date, trainerId, startTime, endTime } = payload;

  // Step 1: Check if the day already has 5 class schedules
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const classCount = await ClassScheduleModel.countDocuments({
    date: { $gte: startOfDay, $lt: endOfDay }
  });

  if (classCount >= 5) {
    throw {
      success: false,
       message: "Maximum of 5 class ",
       errorDetails: 'Maximum of 5 class schedules already reached for the day.'

    };
    
  }

  // Step 2: Ensure that each class lasts for exactly 2 hours

  // Parse times in "HH:MM AM/PM" format to Date objects
  const parseTime = (time: string, date: Date): Date => {
    const [timePart, period] = time.split(' ');
    const [hours, minutes] = timePart.split(':').map(Number);

    let adjustedHours = hours;
    if (period === 'PM' && hours < 12) {
      adjustedHours += 12;
    } else if (period === 'AM' && hours === 12) {
      adjustedHours = 0;
    }

    const timeDate = new Date(date);
    timeDate.setHours(adjustedHours, minutes, 0, 0);
    return timeDate;
  };

  const classStartTime = parseTime(startTime, date);
  const classEndTime = parseTime(endTime, date);

  const classDurationInMs = classEndTime.getTime() - classStartTime.getTime();
  const classDurationInHours = classDurationInMs / (1000 * 60 * 60);

  if (classDurationInHours !== 2) {
    throw {
      success: false,
       message: "2 hours.",
       errorDetails: 'Each class schedule must last for exactly 2 hours.'

    };
   
  }

  // Step 3: Create the class schedule
  try {
    const result = await ClassScheduleModel.create(payload);
    return result;
  } catch (error) {
    console.error("Error creating class schedule:", error);
    throw error; // Re-throw error after logging
  }
};


const getAllClassScheduleDB = async () => {
 

  const result = await ClassScheduleModel.find();
  return result;
};

const getTranierClassScheduleDB = async (id: string | undefined) => {
  const result = await ClassScheduleModel.find({ trainerId: id });
  return result;
};
const updateClassScheduleDB = async (id: string, {trainees}:any) => {
  // Check if the class exists
  const isExist = await ClassScheduleModel.findById(id);

  if (!isExist) {
    throw {
      success: false,
      message: "Class Not Exist.",
      errorDetails: 'This class does not exist.',
    };
  }

  // Check if the number of trainees has reached the limit
  if (isExist.trainees && isExist.trainees.length >= 10) {
    throw {
      success: false,
      message: "Class Full",
      errorDetails: 'No more spots available in this class.',
    };
  }

  if (isExist) {
    // Check if the trainee is already in the trainees array
    const alreadyBooked = await ClassScheduleModel.findOne({
      _id: id,
      trainees: { $in: [trainees] },  // Check if the traineeId is already in the trainees array
    });
  
    if (alreadyBooked) {
      throw {
        success: false,
        message: "Already booked",
        errorDetails: 'You have already booked this class.',
      };
    }
  }
  

  // Update the class by adding the new trainee
  const updateResult = await ClassScheduleModel.updateOne(
    { _id: id },
    { $push: { trainees: trainees },  $inc: { maxTrainees: -1 }  } // Use the $push operator to add the traineeId to the trainees array
  );

  // Fetch and return the updated class schedule if the update was successful
  let result;
  if (updateResult?.acknowledged) {
    result = await ClassScheduleModel.findById(id);
  }

  return result;
};
const CancelClassScheduleModelDB = async (_id: string, { trainees }: any) => {
  // Check if the class with the specified _id exists and contains the trainee
  const checking = await ClassScheduleModel.findOne({
    _id,
    trainees: { $in: [trainees] }, // Check if 'trainees' array contains the trainee
  });

  if (!checking) {
    throw {
      success: false,
      message: "Not found booking",
      errorDetails: "Not found booked class or trainee doesn't exist in the list.",
    };
  }

  // Proceed to remove the trainee from the class's 'trainees' array
  const updateResult = await ClassScheduleModel.updateOne(
    { _id },
    { $pull: { trainees: trainees }, $inc: { maxTrainees: +1 }} // Remove the trainee from the trainees array
  );

  let result;
  if (updateResult?.acknowledged && updateResult?.modifiedCount >= 1) {
    result = await ClassScheduleModel.findOne({ _id });
  }

  return result;
};



const deleteClassScheduleModelDB = async (_id: string) => {
  const checking= await ClassScheduleModel.findOne({ _id });


  if (!checking) {
    throw {
      success: false,
      message: "Not found Class",
      errorDetails: "Not found the ClassSchedule.",
    };
  }
  const updateResult:any= await ClassScheduleModel.deleteOne({ _id })
console.log(updateResult)
  let result
  if (updateResult?.acknowledged && updateResult?.deletedCount >= 1) {
    result="Class deleted"
  }
  
  return result;
};

export const ClassScheduleServices = {
  createClassScheduleDB,
  getAllClassScheduleDB,
  getTranierClassScheduleDB,
  updateClassScheduleDB,
  deleteClassScheduleModelDB,
  CancelClassScheduleModelDB
};
