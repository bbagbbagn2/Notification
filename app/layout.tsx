'use client';

import StyledComponentsRegistry from './lib/registry';
import GlobalStyles from './_styles/GlobalStyle';
import Header from './_components/Header';

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
