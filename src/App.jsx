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
			<QueryClientProvider client={queryClient}>
				<MainProvider>
					<Main/>
				</MainProvider>
			</QueryClientProvider>
		</>
	)
}

export default App
