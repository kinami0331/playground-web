import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import {TitleHeader} from "@/components/TitleHeader";
import {SettingIcon} from "@/components/SvgIcons";
import {IndexCard} from "@/components/IndexCard";


export default function Home() {
    return (
        <>
            <Head>
                <title>这是等下要用到的神秘妙妙工具</title>
                <meta name="description" content="一些没什么用的的工具"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <TitleHeader title="妙妙屋" icon={<SettingIcon/>}/>

                <IndexCard url="lucky" title="抽卡概率计算器" paragraph="看看我有多非"/>
                
                <br/>

            </main>
        </>
    );
}
