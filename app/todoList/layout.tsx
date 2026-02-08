import Link from 'next/link';

export default function TodoListLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return(
        <div>
            <span className="todoListAddbtn">
                <Link href="/todoList/write">
                    <span className="todoListAddbtn">
                        글쓰기
                    </span>
                </Link>
            </span>
            <main>
                { children}
            </main>
        </div>
    )
}