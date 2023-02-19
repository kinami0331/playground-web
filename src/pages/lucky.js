import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import {TitleHeader} from "@/components/TitleHeader";
import {useRouter} from "next/router";
import {LeftCircleIcon} from "@/components/SvgIcons";

export default function Lucky() {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>抽卡概率计算</title>
                <meta name="description" content="抽卡概率计算器"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <TitleHeader
                    title="抽卡概率计算器"
                    icon={<LeftCircleIcon/>}
                    onClick={() => {
                        router.push("/").then();
                    }}
                />

            </main>
        </>
    );
}
