import Readings from "../schemas/readings";

export const saveReading = async (temperature: number) => {
  const reading = new Readings({ temperature });
  await reading.save();
  return reading;
};

export const getLatestReadings = async (limit: number = 5) => {
  return await Readings.find().sort({ timestamp: -1 }).limit(limit);
};

export const updateReading = async (reading: any) => {
  const { id, status, processedAt } = reading;
  return await Readings.findByIdAndUpdate(
    id,
    { status, processedAt },
    { new: true }
  );
};
