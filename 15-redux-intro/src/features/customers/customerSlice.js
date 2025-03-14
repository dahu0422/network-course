const initialStateCustomer = {
  fullName: '',
  nationalID: '',
  createdAt: '',
}

export default function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: new Date().toISOString()
      }
    case "customer/updateCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
      }
    default:
      return state
  }
}

export function createCustomer(fullName, nationalID) {
  return { type: 'customer/createCustomer', payload: { fullName, nationalID } }
}

export function updateCustomer(fullName, nationalID) {
  return { type: 'customer/updateCustomer', payload: { fullName, nationalID } }
}