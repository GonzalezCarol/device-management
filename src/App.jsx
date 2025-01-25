import './App.css'
import {Main} from "./pages/Main/index.jsx";
import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'
import {MainProvider} from "./contexts/MainContext/index.jsx";

function App() {
	const queryClient = new QueryClient()

	return (
		<>
			<MainProvider>
				<QueryClientProvider client={queryClient}>
					<Main/>
				</QueryClientProvider>
			</MainProvider>
		</>
	)
}

export default App
