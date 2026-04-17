const HabitListItem = ({ habit, increment, decrement }) => {
  const isCompleted = habit.count >= habit.goal

  return (
    <li style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>
      <span>{habit.name}</span>
      <span>{habit.count} / {habit.goal}</span>
      <button onClick={() => decrement(habit.id)}>-</button>
      <button onClick={() => increment(habit.id)}>+</button>
    </li>
  )
}

export default HabitListItem