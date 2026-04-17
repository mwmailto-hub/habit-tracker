import HabitListItem from './HabitListItem'

const HabitList = ({ habits, increment, decrement }) => {
  if (habits.length === 0) {
    return <p>No habits yet. Add one above!</p>
  }

  return (
    <ul>
      {habits.map(habit => (
        <HabitListItem
          key={habit.id}
          habit={habit}
          increment={increment}
          decrement={decrement}
        />
      ))}
    </ul>
  )
}

export default HabitList