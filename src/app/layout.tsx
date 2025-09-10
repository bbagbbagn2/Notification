'use client';

import StyledComponentsRegistry from './lib/registry';
import GlobalStyles from '../styles/globalStyles';
import Header from '../components/Header/Header';

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html>
      <body>
        <StyledComponentsRegistry>
          <GlobalStyles />
          <Header />
          {props.children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
