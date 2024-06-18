import { studentModelName } from "@fcai-sis/shared-models";
import mongoose, { Document, Schema } from "mongoose";

export const serviceRequestStatuses = [
  "PENDING",
  "IN_PROGRESS",
  "COMPLETED",
  "REJECTED",
] as const;

export type ServiceRequestStatusType = (typeof serviceRequestStatuses)[number];

interface IServiceRequest extends Document {
  serviceName: string;
  status: ServiceRequestStatusType;
  student: Schema.Types.ObjectId;
  message: string;
  createdAt: Date;
  claimAt: Date;
  image: string;
}

const ServiceRequestSchema = new mongoose.Schema<IServiceRequest>({
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
  student: {
    type: Schema.Types.ObjectId,
    ref: studentModelName,
    required: true,
  },
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

const serviceRequestModelName = "ServiceRequest";

const ServiceRequestModel = mongoose.model<IServiceRequest>(
  serviceRequestModelName,
  ServiceRequestSchema
);

export default ServiceRequestModel;
