import {Typography} from "antd";

import styles from "@/styles/TitleHeader.module.scss";

const {Title} = Typography;

export function TitleHeader({title, icon, onClick}) {
    return (
        <div
            className={styles.header + (!!onClick ? " " + styles.headerWithHover : "")}
            onClick={onClick}
        >
            <Title level={3} style={{marginBottom: "24px"}}>{icon} {title}</Title>
        </div>
    );
}