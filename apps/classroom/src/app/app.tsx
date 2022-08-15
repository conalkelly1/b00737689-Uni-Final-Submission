import styled from '@emotion/styled';

import { ClassroomShell } from '@ewgg/classroom/shell';
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  const theme = createTheme({
    components: {
      // Name of the component
      MuiSelect: {
        styleOverrides: {
          // Name of the slot
          select: {
            // Some CSS
            color: 'black',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <StyledApp>
          <ClassroomShell />
        </StyledApp>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
