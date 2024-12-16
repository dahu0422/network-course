import { useState } from 'react'


const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return <button className="button" onClick={onClick}>
    {children}
  </button>
}

// 朋友展示行
function Friend({ friend, selectedFriend, onSelection }) {
  const isSelected = friend.id === selectedFriend?.id

  return <li>
    <img src={friend.image} alt={friend.name} />
    <h3>{friend.name}</h3>

    {friend.balance < 0 && (
      <p className="red">
        You owe {friend.name} {Math.abs(friend.balance)}
      </p>
    )}

    {friend.balance > 0 && (
      <p className="green">
        {friend.name} owes you {Math.abs(friend.balance)}
      </p>
    )}

    {friend.balance === 0 && <p>You and {friend.name} are even</p>}

    <Button onClick={() => onSelection(friend)}>
      {isSelected ? 'Close' : 'Select'}
    </Button>
  </li>
}

// 朋友列表
function FriendList({ friends, selectedFriend, onSelection }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          selectedFriend={selectedFriend}
          onSelection={onSelection}
        />))
      }
    </ul>
  )
}

// 添加朋友
function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState()
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name || !image) return

    const id = crypto.randomUUID()
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0
    }

    onAddFriend(newFriend)
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👫 Friend name</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

      <label>🌄 Image URL</label>
      <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />

      <Button>Add</Button>
    </form>
  )
}

// 分帐单
function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState('')
  const [paidByUser, setPaidByUser] = useState('')
  const paidByFriend = bill ? bill - paidByUser : ""
  const [whoIsPaying, setWhoIsPaying] = useState("user")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!paidByFriend || !paidByUser) return

    onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidByUser)
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰 Bill value</label>
      <input type="text" value={bill} onChange={(e) => setBill(Number(e.target.value))} />

      <label>🧍‍♀️ Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) => setPaidByUser(Number(e.target.value) > bill ? bill : Number(e.target.value))}
      />

      <label htmlFor="">👫 {selectedFriend.name}`s expense</label>
      <input type="text" disabled value={paidByFriend} />

      <label>🤑 Who is paying the bill</label>
      <select name="" id="" value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  )
}

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null); // 选中的朋友

  // 添加朋友
  const handleAddFriend = (newFriend) => {
    setFriends((friends) => ([...friends, newFriend]))
    setShowAddFriend(false);
  }

  // 选中朋友
  const handleSelection = (friend) => {
    console.log(123);

    setSelectedFriend((cur) => cur?.id === friend.id ? null : friend)
  }

  const handleSplitBill = (value) => {
    setFriends((friends) => friends.map((friend) => (
      friend.id === selectedFriend.id ? { ...friend, balance: friend.balance + value } : friend
    )))

    setSelectedFriend(null);
  }

  return (
    <div className='app'>
      <div className="sidebar">
        <FriendList friends={friends} selectedFriend={selectedFriend} onSelection={handleSelection} />

        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend}></FormAddFriend>}


        {/* 添加朋友按钮 */}
        <Button onClick={() => setShowAddFriend(!showAddFriend)}>
          {showAddFriend ? 'Close' : 'Add Friend'}
        </Button>
      </div>

      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} onSplitBill={handleSplitBill} key={selectedFriend.id} />}

    </div>
  )
}

