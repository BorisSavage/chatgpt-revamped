export default function InfoText({ info }: { info: string }) {
    return (
        <p className="max-w-[300px] rounded-lg bg-danviolet-700/50 p-4">
            &quot;{info}&quot;
        </p>
    );
}
