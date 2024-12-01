import mongoose from "mongoose";

export interface IProcessAttr {
  processName: string;
  processResult: any[];
}

export interface IProcessDocument extends IProcessAttr, mongoose.Document {
  processName: string;
  processResult: any[];
}

export interface IProcessModel extends mongoose.Model<IProcessDocument> {
  build(attr: IProcessAttr): IProcessDocument;
}

const processSchema = new mongoose.Schema(
  {
    processName: {
      type: String,
      required: true,
    },
    processResult: [
      {
        type: mongoose.Schema.Types.Mixed,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

processSchema.statics.build = (attr: IProcessAttr) => {
  return new Process(attr);
};

const Process = mongoose.model<IProcessDocument, IProcessModel>(
  "Process",
  processSchema
);

export { Process };
