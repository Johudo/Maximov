import type { AppInitialProps } from "next/app";
import App from "next/app";
import { wrapper } from "../store";

import "../styles/globals.scss";
import "../styles/normalize.scss";
import "../styles/fonts.scss";

class MyApp extends App<AppInitialProps> {
    public render() {
        const { Component, pageProps } = this.props;
        return <Component {...pageProps} />;
    }
}

export default wrapper.withRedux(MyApp);
