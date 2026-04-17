const ProgressActions = ({ habits }) => {
  const completedHabits = habits.filter(habit => habit.count >= habit.goal).length
  const totalHabits = habits.length

  return (
    <div>
      <p>Completed: {completedHabits} / {totalHabits}</p>
    </div>
  )
}

export default ProgressActions