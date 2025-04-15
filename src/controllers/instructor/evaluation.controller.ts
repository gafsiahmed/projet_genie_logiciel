
import { Request, Response } from "express";
import TrainingSessionEvaluation from "../../models/Evaluation";
import EvaluationDay from "../../models/EvaluationDay";
import { IStudent } from "../../models/Student";
import StudentEvaluation from "../../models/StudentEvaluation";
import TrainingSession from "../../models/TrainingSession";


interface EvaluationRequest {
  students: string[]; // Or specific student interface
}

// Create new evaluation for a training session
export const createEvaluation = async (req: Request, res: Response) => {
  try {
    const { trainingSessionId } = req.body;

    // Fetch the training session and its students
    const trainingSession = await TrainingSession.findById(trainingSessionId);
    if (!trainingSession) {
      return res.status(404).json({ message: "Training session not found" });
    }
   
    const students: IStudent[] = trainingSession.students as IStudent[];

    // Check if evaluation already exists for the training session
    let evaluation = await TrainingSessionEvaluation.findOne({
      trainingSession: trainingSessionId,
    });

    if (!evaluation) {
      // Create a new evaluation if one doesn't already exist
      evaluation = new TrainingSessionEvaluation({
        trainingSession: trainingSessionId,
        days: [],
      });
    }

    // Create evaluations for each student
    // const evaluations = students.map((student: any) => ({
    //   student: student._id,
    //   present: false,
    //   task: "-",
    //   grade: 0,
    // }));
    let data: any = [];
    const evaluationsOfEachStudent = students.map((student: any) => {
      const evaluateStudent = new StudentEvaluation({
        student: student._id,
        present: false,
        task: "-",
        grade: 0,
        day: Number(evaluation?.days.length) + 1,
      });
      data.push(evaluateStudent);
      evaluateStudent.save();
    });
    console.log(data);

    // save the evaluation to the day
    const evalutionDay1 = new EvaluationDay({
      dayNumber: evaluation.days.length + 1,
      evaluations: data,
    });

    const evalutionDay1Id = evalutionDay1._id;

    evaluation.days.push(evalutionDay1Id);
    await evalutionDay1.save();

    // Add the day to the evaluation

    // Save the evaluation
    await evaluation.save();

    return res.status(200).json(evaluation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getEvaluations = async (req: Request, res: Response) => {
  try {
    // how to populate the student field in the evaluations array

    const evaluations = await TrainingSessionEvaluation.find({})
      .populate("trainingSession")
      .populate({
        path: "days",
        populate: {
          path: "evaluations",
          populate: {
            path: "student",
            model: "Students",
            select: "firstName lastName email",
          },
        },
      });

    return res.status(200).json(evaluations);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// update evaluation for a specific day and student
export const updateEvaluation = async (req: Request, res: Response) => {
  try {
    const {  dayNumber, studentId } = req.params;
    const { present, task, grade } = req.body;

    // Find the evaluation for the training session
    const studentEvaluationData = await StudentEvaluation.findOne({
      student: studentId,
      day: dayNumber,
    });

    if (!studentEvaluationData) {
      return res.status(404).json({ message: "Evaluation not found" });
    }

    // update the data
    studentEvaluationData.present = present;
    studentEvaluationData.task = task;
    studentEvaluationData.grade = grade;

    // save the data
    await studentEvaluationData.save();

    return res.status(200).json(studentEvaluationData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// // Add evaluation data for a specific day
// export const addEvaluationData = async (req: Request, res: Response) => {
//   try {
//     const { trainingSessionId, dayNumber } = req.params;
//     const { evaluations } = req.body;

//     // Find the evaluation for the training session
//     const evaluation = await TrainingSessionEvaluation.findOne({ trainingSession: trainingSessionId });

//     if (!evaluation) {
//       return res.status(404).json({ message: 'Evaluation not found' });
//     }

//     // Find the day in the evaluation
//     const day = evaluation.days.find((d) => d.dayNumber === Number(dayNumber));

//     if (!day) {
//       return res.status(404).json({ message: 'Day not found' });
//     }

//     // Add evaluations to the day
//     day.evaluations = evaluations;

//     // Save the evaluation
//     await evaluation.save();

//     return res.status(200).json(evaluation);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Server Error' });
//   }
// };
