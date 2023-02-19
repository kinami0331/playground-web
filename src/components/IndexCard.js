import {Card, Typography} from "antd";
import {useRouter} from "next/router";

const {Title, Paragraph} = Typography;

export function IndexCard({url, title, paragraph}) {
    const router = useRouter();
    return (
        <Card
            className="fancy-card"
            hoverable
            style={{width: "100%"}}
            size="small"
            onClick={() => router.push(url)}
        >
            <Title level={5}>{title}</Title>
            <Paragraph style={{marginBottom: 0}}>
                {paragraph}
            </Paragraph>
        </Card>
    );
}