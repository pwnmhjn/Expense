
import Transaction from "../models/transaction.model.js"
import User from "../models/user.model.js"
const transactionResolver = {
    Query: {
        transactions: async (_, __, context) => {
            try {
                if (!context.getUser()) throw new Error("Unauthorized")
                const userId = await context.getUser()._id
                const transactions = await Transaction.find({ userId })
                return transactions
            } catch (err) {
                console.log("Error getting Transactions ", err)
                throw new Error(err.message || "Error getting Transactions")
            }
        },
        transaction: async (_, { transactionId }) => {
            try {
                const transaction = await Transaction.findById(transactionId)
                return transaction
            } catch (err) {
                console.log("Error in transaction: ", err)
                throw new Error(err.message || "Error getting Transaction")
            }
        },
        categoryStatistics: async (_, __, context) => {
            if (!context.getUser()) throw new Error("Unauthorized")
            const userId = context.getUser()._id;
            const transactions = await Transaction.find({ userId })
            const categoryMap = {}

            transactions.forEach((transaction) => {
                if (!categoryMap[transaction.category]) {
                    categoryMap[transaction.category] = 0;
                }
                categoryMap[transaction.category] += transaction.amount
            })

            return Object.entries(categoryMap).map(([category, totalAmount]) => ({ category, totalAmount }))
        }
    },
    Mutation: {
        createTransaction: async (_, { input }, context) => {
            try {
                const newTransaciton = new Transaction({
                    ...input, userId: context.getUser()._id
                })
                await newTransaciton.save()
                return newTransaciton
            } catch (err) {
                console.log("Error creating transaction: ", err)
                throw new Error(err.message || "Error creating transaction")
            }
        },
        updateTransaction: async (_, { input }) => {
            try {
                const updatedTransaction = await Transaction.findByIdAndUpdate(input.transactionId, input, { new: true })
                return updatedTransaction
            } catch (err) {
                console.log("Error updating transaction: ", err)
                throw new Error(err.message || "Error updating transaction")
            }
        },
        deleteTransaction: async (_, { transactionId }) => {
            try {
                const deletedTransaction = await Transaction.findByIdAndDelete(transactionId)
                return deletedTransaction
            } catch (error) {
                console.log("Error deleted transaction: ", err)
                throw new Error(err.message || "Error deleted transaction")
            }
        }
    },
    Transaction: {
        user: async (parent) => {
            const userId = parent.userId
            try {
                const user = await User.findById(userId)
                return user
            } catch (error) {
                console.log("error getting user:", error);
                throw new Error("Error getting user")
            }
        }
    }
}

export default transactionResolver;