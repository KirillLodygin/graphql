import React from 'react';
import Tabs from './view/Tabs';
import theme from './view/theme';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
	cache: new InMemoryCache(),
	uri: 'http://localhost:3005/graphql',
});

const App = () => {
	return (
		<ApolloProvider client={client}>
			<MuiThemeProvider theme={theme}>
				<Tabs theme={theme}/>
			</MuiThemeProvider>
		</ApolloProvider>
	);
};

export default App;