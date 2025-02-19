import { createSlice } from '@reduxjs/toolkit'

export const transactionsSlice = createSlice({
  name: 'units',
  initialState: {
    transactionsList: <any>[],
    page: 1,
  },
  reducers: {
    setTransactions: (state, action) => ({ ...state, transactionsList: action.payload }),
    updateTransaction: (state, action) => {
      const updatedTransactionsList = state.transactionsList.map((transaction: any) => {
        if (transaction.id === action.payload.id) {
          return { ...transaction, ...action.payload };
        }
        return transaction;
      });
      return { ...state, transactionsList: updatedTransactionsList };
    },
    setTransactionsPage: (state, action) => ({ ...state, page: action.payload })
  },
})

// Action creators are generated for each case reducer function
export const { setTransactions, setTransactionsPage, updateTransaction } = transactionsSlice.actions

export default transactionsSlice.reducer