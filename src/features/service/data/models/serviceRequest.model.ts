import { studentModelName } from "@fcai-sis/shared-models";
import mongoose, { InferSchemaType, Schema } from "mongoose";

const ServiceStatus = [
  "pending",
  "in progress",
  "completed",
  "rejected",
] as const;
export type ServiceStatusType = (typeof ServiceStatus)[number];

const ServiceRequestSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ServiceStatus,
    required: true,
    default: "pending",
  },
  studentId: {
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
  imgAttachment: {
    type: String,
    required: true,
    default: null,
  },
});

export type ServiceRequestType = InferSchemaType<typeof ServiceRequestSchema>;

const serviceRequestModelName = "ServiceRequest";

const ServiceRequestModel = mongoose.model<ServiceRequestType>(
  serviceRequestModelName,
  ServiceRequestSchema
);

export default ServiceRequestModel;
