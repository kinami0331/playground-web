import "@/styles/globals.scss";
import {Footer} from "@/components/Footer";
import Head from "next/head";

export default function App({Component, pageProps}) {
    return (<>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
            <link rel="icon" href="/favicon.ico"/>
        </Head>
        <div id={"global-wrapper"}>
            <div id={"page-wrapper"}>
                <Component {...pageProps} />
            </div>
            <Footer/>
        </div>
    </>);

}
