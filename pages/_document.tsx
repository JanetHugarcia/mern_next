import React from 'react'
import Document from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/styles'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const styledComponentSheet = new ServerStyleSheet();
    const materialUiSheets = new MaterialUiServerStyleSheets()
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => 
            styledComponentSheet.collectStyles(
              materialUiSheets.collect(<App {...props} />),
            )
        })

      const initialProps = await Document.getInitialProps(ctx)

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {materialUiSheets.getStyleElement()}
            {styledComponentSheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      styledComponentSheet.seal()
    }
  }
}