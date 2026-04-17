import { useState } from 'react'

const HabitForm = ({ addHabit }) => {
  const [name, setName] = useState('')
  const [goal, setGoal] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (!name.trim() || !goal) return alert('Please fill in all fields')
    addHabit(name, goal)
    setName('')
    setGoal('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Habit name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Daily goal"
        value={goal}
        min="1"
        onChange={e => setGoal(e.target.value)}
      />
      <button type="submit">Add Habit</button>
    </form>
  )
}

export default HabitForm