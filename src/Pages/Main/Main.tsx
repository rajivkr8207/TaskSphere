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
    <div className="w-full lg:h-screen h-auto my-2  flex justify-center items-center">
    <div className="w-12/12 max-w-4xl p-6 card_style shadow-2xl lg:border rounded-2xl">
        <h1 className="lg:text-4xl text-3xl font-bold text-center text_style mb-6">Welcome to TaskSphere</h1>
        <p className="text-lg text-center text_style mb-8">All your essential tools in one place.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.map((app, index) => (
                <Link to={app.path} key={index} className="block card_link_style hover:bg-indigo-100 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                    <h2 className="text-xl font-semibold ">{app.name}</h2>
                    <p className="text-sm  mt-2">{app.description}</p>
                </Link>
            ))}
        </div>
    </div>
</div>
  )
}

export default Main
