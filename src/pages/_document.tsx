import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentProps,
} from 'next/document';

export default class MyDocument extends Document<DocumentProps> {
  render(): JSX.Element {
    return (
      <Html lang="pt-br">
        <Head>
          <meta charSet="UTF-8" />
        </Head>

        <body>
          <noscript>
            Você precisa habilitar o JavaScript no seu navegador para essa
            aplicação funcionar.
          </noscript>

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
