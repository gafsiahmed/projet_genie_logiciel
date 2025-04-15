import mongoose, { Schema } from "mongoose";





const DonneFincieresSchema: Schema = new mongoose.Schema(
    {
      turnover: {
        type: Number,
       
        required: [true, "Can't be blank"],
     
      },
      charge: {
        type: Number ,
        required: true,
       
      },
      margeBrut:{
          type: Number ,
          required: true,
         
    
      }
  

    
    },
    {
      timestamps: true,
    }
  );
  












const DonneFincieres = mongoose.model("DonneFincieresSchema", DonneFincieresSchema);
export default DonneFincieres;