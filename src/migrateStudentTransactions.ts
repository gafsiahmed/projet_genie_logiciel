
import connectToDatabase from "./config/dbconnection";
import TransactionModel from "./models/Transaction";

async function migrateStudentTransactions() {
  try {
    // Connect to database
    await connectToDatabase();
    console.log("Connected to database");

    // Find all student payment transactions
    const studentTransactions = await TransactionModel.find({ 
      category: "TrainingPayment"
    });

    console.log(`Found ${studentTransactions.length} student transactions to update`);

    // Update each transaction
    let updatedCount = 0;
    for (const transaction of studentTransactions) {
      // Set transactionType to Income (lowercase 't')
      transaction.transactionType = "Income";
      
      // If student field exists but relatedEntity doesn't, copy it
      if (transaction.student && !transaction.relatedEntity) {
        transaction.relatedEntity = transaction.student;
        transaction.relatedEntityModel = "Student";
      }
      
      await transaction.save();
      updatedCount++;
      
      if (updatedCount % 10 === 0) {
        console.log(`Updated ${updatedCount} transactions so far...`);
      }
    }

    console.log(`Successfully updated ${updatedCount} student transactions`);
    process.exit(0);
  } catch (error) {
    console.error("Error migrating student transactions:", error);
    process.exit(1);
  }
}

// Run the migration
migrateStudentTransactions();