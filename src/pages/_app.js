import "@/styles/globals.scss";
import {Footer} from "@/components/Footer";

export default function App({Component, pageProps}) {
  return <div id={"global-wrapper"}>
    <div id={"content-wrapper"}>
      <Component {...pageProps} />
    </div>
    <Footer/>
  </div>;
}
