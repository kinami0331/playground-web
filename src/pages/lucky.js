import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import {TitleHeader} from "@/components/TitleHeader";
import {useRouter} from "next/router";
import {LeftCircleIcon} from "@/components/SvgIcons";
import {Form, InputNumber, Switch} from "antd";
import {ContentWrapper} from "@/components/ContentWrapper";
import {useEffect, useMemo, useState} from "react";
import dynamic from "next/dynamic";

const Line = dynamic(() => import("@ant-design/plots").then((mod) => mod.Line), {ssr: false});


export default function Lucky() {
    let [curP, setCurP] = useState(0.5);
    let [curCount, setCurCount] = useState(0);
    let [notList, setNotList] = useState([1]);
    let [useNot, setUseNot] = useState(false);
    let [form] = Form.useForm();

    const router = useRouter();

    const initialValues = useMemo(() => ({
        p: 0.5,
        pLimit: 99,
        pGot: 919,
        maxNum: 100
    }), []);

    const calcList = (values) => {
        let p = values.p;
        let maxNum = values.maxNum;
        let t_p = p / 100;

        if (Math.abs(t_p - curP) < 1e-8) {
            let t_not_list = notList;
            if (curCount < maxNum) {
                for (let i = curCount + 1; i <= maxNum; i++) {
                    t_not_list.push(t_not_list[t_not_list.length - 1] * (1 - t_p));
                }
                setNotList(t_not_list);
                setCurCount(maxNum);
            } else {
                setNotList(t_not_list.slice(0, maxNum + 1));
                setCurCount(maxNum);
            }
        } else {
            setCurP(t_p);
            let t_not_list = [1];
            for (let i = 1; i <= maxNum; i++) {
                t_not_list.push(t_not_list[t_not_list.length - 1] * (1 - t_p));
            }
            setNotList(t_not_list);
            setCurCount(maxNum);
        }
    };

    useEffect(() => {
        let t_p = initialValues.p / 100;
        setCurP(t_p);
        let t_not_list = [1];
        for (let i = 1; i <= initialValues.maxNum; i++) {
            t_not_list.push(t_not_list[t_not_list.length - 1] * (1 - t_p));
        }
        setNotList(t_not_list);
        setCurCount(initialValues.maxNum);

    }, [initialValues]);

    return (<>
        <Head>
            <title>抽卡概率计算器</title>
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

            <ContentWrapper>
                <Form name="setting" autoComplete="off"
                      form={form}
                      initialValues={initialValues}
                      style={{width: "100%"}}
                      wrapperCol={{
                          span: 12
                      }}
                      labelCol={{
                          span: 3
                      }}
                      onValuesChange={(_, values) => {
                          // console.log(changedValues);
                          if (values.maxNum !== undefined) {
                              if (values.maxNum === null)
                                  values.maxNum = 1;
                              else if (values.maxNum < 1)
                                  values.maxNum = 1;
                              else if (values.maxNum > 10000)
                                  values.maxNum = 10000;
                              values.maxNum = Math.floor(values.maxNum);
                          }
                          if (values.p !== undefined) {
                              if (values.p === null)
                                  values.p = 0;
                              else if (values.p < 0)
                                  values.p = 0;
                              else if (values.p > 100)
                                  values.p = 100;
                          }
                          if (values.pLimit !== undefined) {
                              if (values.pLimit === null)
                                  values.pLimit = 0;
                              else if (values.pLimit < 0)
                                  values.pLimit = 0;
                              else if (values.pLimit > 100)
                                  values.pLimit = 99;
                          }

                          values.pGot = Math.abs(Math.ceil(
                              Math.log(1 - values.pLimit / 100) / Math.log((1 - values.p / 100))
                          ));
                          form.setFieldsValue(values);
                          setUseNot(values.useNot);
                          calcList(values);
                      }}
                      onFinish={(values) => {
                          calcList(values);
                      }}
                >
                    <Form.Item label="单次概率" name="p" rules={[
                        {min: 0, type: "number", message: "概率不能小于 0%"},
                        {max: 100, type: "number", message: "概率不能大于 100%"}
                    ]}>
                        <InputNumber step={0.5} addonAfter="%" style={{width: "100%"}}/>
                    </Form.Item>

                    <Form.Item label="出货阈值" name="pLimit"
                               extra={"你觉得多大的概率下能保证一定出货"}>
                        <InputNumber addonAfter="%" style={{width: "100%"}}/>
                    </Form.Item>

                    <Form.Item label="出货所需次数" name="pGot"
                               extra={"出货概率达到出货阈值所需的次数"}>
                        <InputNumber disabled={true} style={{width: "100%"}}/>
                    </Form.Item>

                    <Form.Item label="最大绘图次数" name="maxNum" rules={[
                        {min: 1, type: "integer", message: "最大次数应当是一个正整数"}
                    ]}>
                        <InputNumber step={10} style={{width: "100%"}}/>
                    </Form.Item>
                    <Form.Item label="抽不到的概率" name="useNot" valuePropName="checked">
                        <Switch/>
                    </Form.Item>
                </Form>
                <br/>

                <ProbabilityPlot notList={notList} useNot={useNot}/>
            </ContentWrapper>
        </main>
    </>);
}

function ProbabilityPlot({notList, useNot}) {
    const data = notList.map((item, index) => ({count: index, probability: useNot ? item * 100 : 100 * (1 - item)}));
    const lastNotData = notList[notList.length - 1] * 100;
    const config = {
        data,
        padding: "auto",
        xField: "count",
        yField: "probability",
        xAxis: {
            tickInterval: 10,
            title: {
                text: "次数"
            }
        },
        yAxis: {
            min: useNot ? lastNotData : 100 - notList[0] * 100,
            title: {
                text: "%",
                autoRotate: false,
                position: "end"
            }
        },
        tooltip: {
            formatter: (datum) => {
                return {name: "概率", value: datum.probability.toPrecision(4) + "%"};
            }
        },
        smooth: true
    };
    return (
        <>
            <h3 style={{marginBottom: "12px", fontWeight: "400"}}>
                {useNot ? "抽不到的概率" : "能抽到的概率"}
            </h3>
            <Line {...config} style={{width: "100%"}}/>
        </>
    );
}
