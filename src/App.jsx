import { useState, useEffect } from 'react'
import Header from './components/Header'
import HabitForm from './components/HabitForm'
import HabitList from './components/HabitList'
import ProgressActions from './components/ProgressActions'

const BACKGROUND_IMAGES = {
  default: 'https://images.unsplash.com/photo-1546587348-d12660c30c50?w=1920&q=80',
  water: 'https://images.unsplash.com/photo-1546587348-d12660c30c50?w=1920&q=80',
  fruit: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=1920&q=80',
  exercise: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&q=80',
  sleep: 'https://images.unsplash.com/photo-1531353826977-0941b4779a1c?w=1920&q=80',
  read: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1920&q=80',
}

const getKeyword = (name) => {
  const lower = name.toLowerCase()
  if (lower.includes('water') || lower.includes('wasser')) return 'water'
  if (lower.includes('fruit') || lower.includes('obst') || lower.includes('früchte')) return 'fruit'
  if (lower.includes('exercise') || lower.includes('sport') || lower.includes('gym')) return 'exercise'
  if (lower.includes('sleep') || lower.includes('schlaf')) return 'sleep'
  if (lower.includes('read') || lower.includes('lesen') || lower.includes('buch')) return 'read'
  return 'default'
}

const App = () => {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('habits')
    return saved ? JSON.parse(saved) : []
  })

  const [background, setBackground] = useState(BACKGROUND_IMAGES.default)

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits))
  }, [habits])

  const addHabit = (name, goal) => {
    const newHabit = {
      id: Date.now(),
      name,
      goal: Number(goal),
      count: 0,
    }
    setHabits(prev => [...prev, newHabit])
  }

  const increment = (id) => {
    const habit = habits.find(h => h.id === id)
    if (habit) {
      const keyword = getKeyword(habit.name)
      setBackground(BACKGROUND_IMAGES[keyword])
    }
    setHabits(prev =>
      prev.map(habit =>
        habit.id === id && habit.count < habit.goal
          ? { ...habit, count: habit.count + 1 }
          : habit
      )
    )
  }

  const decrement = (id) => {
    const habit = habits.find(h => h.id === id)
    if (habit) {
      const keyword = getKeyword(habit.name)
      setBackground(BACKGROUND_IMAGES[keyword])
    }
    setHabits(prev =>
      prev.map(habit =>
        habit.id === id && habit.count > 0
          ? { ...habit, count: habit.count - 1 }
          : habit
      )
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      transition: 'background-image 0.5s ease',
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '16px',
        padding: '2rem',
        width: '90%',
        maxWidth: '600px',
      }}>
        <Header />
        <ProgressActions habits={habits} />
        <HabitForm addHabit={addHabit} />
        <HabitList
          habits={habits}
          increment={increment}
          decrement={decrement}
        />
      </div>
    </div>
  )
}

export default App