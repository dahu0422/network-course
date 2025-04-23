import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  fullName: '',
  nationalID: '',
  createdAt: '',
}

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalID) {
        return {
          payload: { fullName, nationalID }
        }
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName
        state.nationalID = action.payload.nationalID
        state.createdAt = new Date().toISOString()
      }
    },

    updateCustomer(state, action) {
      state.fullName = action.payload.fullName
      state.nationalID = action.payload.nationalID
    }
  }
})

export const { createCustomer, updateCustomer } = customerSlice.actions

export default customerSlice.reducer

// export default function customerReducer(state = initialState, action) {
//   switch (action.type) {
//     case "customer/createCustomer":
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationalID: action.payload.nationalID,
//         createdAt: new Date().toISOString()
//       }
//     case "customer/updateCustomer":
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationalID: action.payload.nationalID,
//       }
//     default:
//       return state
//   }
// }

// export function createCustomer(fullName, nationalID) {
//   return { type: 'customer/createCustomer', payload: { fullName, nationalID } }
// }

// export function updateCustomer(fullName, nationalID) {
//   return { type: 'customer/updateCustomer', payload: { fullName, nationalID } }
// }