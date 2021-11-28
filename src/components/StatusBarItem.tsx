interface Props {
    stat: string;
    value: string;
}

function StatusBarItem({ stat, value }: Props): JSX.Element {
    return (
        <span>
            {stat}: <b>{value}</b>
        </span>
    );
}

export default StatusBarItem;
