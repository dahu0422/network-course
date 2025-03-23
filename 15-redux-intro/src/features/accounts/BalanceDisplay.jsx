import { connect } from "react-redux"

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value)
}

function BalanceDisplay({ balance }) {
  return <div className="balance">{formatCurrency(balance)}</div>
}

// 从 Redux 的全局状态中提取所需的数据，并将这些数据作为 props 传递给组件。
function mapStateToProps(state) {
  return {
    balance: state.account.balance,
  }
}

// connect 将 Redux 的状态和方法连接到 React 组件
export default connect(mapStateToProps)(BalanceDisplay)
