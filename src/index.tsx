import 'assets/styles/tailwind.css'
import 'assets/styles/app.css'

const root = createRoot(document.getElementById('root'))
const App = React.lazy(() => import('App'))

root.render(
	<Suspense>
		<App />
	</Suspense>
)
