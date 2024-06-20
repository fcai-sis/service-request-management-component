import { foreignKey, studentModelName } from "@fcai-sis/shared-models";
import mongoose, { mongo } from "mongoose";

const serviceRequestModelName = "ServiceRequest";

export const serviceRequestStatuses = [
  "PENDING",
  "IN_PROGRESS",
  "COMPLETED",
  "REJECTED",
] as const;
export type ServiceRequestStatusType = (typeof serviceRequestStatuses)[number];

export interface IServiceRequest extends mongoose.Document {
  serviceName: string;
  status: ServiceRequestStatusType;
  student: mongoose.Schema.Types.ObjectId;
  message: string;
  createdAt: Date;
  claimAt: Date;
  image: string;
}

export type ServiceRequestType = Omit<IServiceRequest, keyof mongoose.Document>;

const serviceRequestSchema = new mongoose.Schema<IServiceRequest>({
  serviceName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: serviceRequestStatuses,
    required: true,
    default: "PENDING",
  },
  student: foreignKey(studentModelName),
  message: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  claimAt: {
    type: Date,
    default: null,
  },
  image: {
    type: String,
    required: true,
    default: null,
  },
});

const ServiceRequestModel = mongoose.model<IServiceRequest>(
  serviceRequestModelName,
  serviceRequestSchema
);

export default ServiceRequestModel;
