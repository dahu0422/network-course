import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false
}

// Redux Toolkit 写法
const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload
      state.isLoading = false
    },
    withdraw(state, action) {
      state.balance -= action.payload
    },
    requestLoan: {
      // 预处理 action 中的 payload 将贷款金额和用途封装成一的对象
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose }
        }
      },
      reducer(state, action) {
        if (state.loan > 0) return
        state.loan = action.payload.amount
        state.loanPurpose = action.payload.purpose
        state.balance += action.payload.amount
      },
    },
    payLoan(state) {
      state.balance -= state.loan
      state.loan = 0
      state.loanPurpose = ''
    },
    convertingCurrency(state) {
      state.isLoading = true
    }
  }
})

console.log(accountSlice)

export const { withdraw, requestLoan, payLoan } = accountSlice.actions

export function deposit(amount, currency) {
  if (currency === 'USD') {
    return { type: "account/deposit", payload: amount }
  }

  return async (dispatch) => {
    dispatch({ type: "account/convertingCurrency" })
    const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
    const data = await res.json()
    const converted = data.rates.USD

    dispatch({ type: "account/deposit", payload: converted })
  }
}
export default accountSlice.reducer




// Redux 写法
// export default function accountReducer(state = initialState, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return { ...state, balance: state.balance + action.payload, isLoading: false }
//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload }
//     case "account/requestLoan":
//       if (state.load > 0) return state
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: state.balance + action.payload.amount
//       }
//     case "account/payLoan":
//       return { ...state, loan: 0, loanPurpose: '', balance: state.balance - state.loan }
//     case "account/convertingCurrency":
//       return { ...state, isLoading: true }
//     default:
//       return state
//   }
// }



// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount }
// }

// export function requestLoan(amount, purpose) {
//   return { type: "account/requestLoan", payload: { amount, purpose } }
// }

// export function payLoan() {
//   return { type: "account/payLoan" }
// }