import { Link } from 'react-router-dom'

const Main:React.FC = () => {
    // const [state, setstate] = useState(initialState)
    const apps = [
        { name: 'To-Do App', path: '/todo', description: 'Manage your daily tasks efficiently.' },
        { name: 'Weather App', path: '/weather', description: 'Get real-time weather updates.' },
        { name: 'Expense Tracker', path: '/tracker', description: 'Track your income and expenses.' },
        { name: 'Calculator', path: '/calculator', description: 'Perform quick calculations.' },
        { name: 'Notepad', path: '/notepad', description: 'Jot down your important notes.' },
    ]
  return (
    <div className="w-full h-screen  flex justify-center items-center">
    <div className="w-12/12 max-w-4xl p-6 bg-white shadow-2xl lg:border rounded-2xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Welcome to TaskSphere</h1>
        <p className="text-lg text-center text-gray-600 mb-8">All your essential tools in one place.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.map((app, index) => (
                <Link to={app.path} key={index} className="block bg-gray-100 hover:bg-indigo-100 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                    <h2 className="text-xl font-semibold text-gray-800">{app.name}</h2>
                    <p className="text-sm text-gray-600 mt-2">{app.description}</p>
                </Link>
            ))}
        </div>
    </div>
</div>
  )
}

export default Main
