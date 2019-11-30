import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { GlobalStyle } from '@/components/Styled/GlobalStyle';

interface Props {
  styleTags: React.Component[];
}

class MyDocument extends Document<Props> {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const styleTags = sheet.getStyleElement();

    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, styleTags };
  }

  render() {
    return (
      <Html>
        <Head>{this.props.styleTags}</Head>
        <body>
          <GlobalStyle />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
