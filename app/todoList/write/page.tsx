export default function Write() {
    return(
        <div>
            <form className="todoList-write-form">
                <input
                    className="todoList-write-title-input"
                    type="text"
                    placeholder="제목을 입력해주세요"
                    required
                />
                <textarea
                    className="todoList-write-content"
                    placeholder="내용을 입력해주세요"
                    required
                />
                <button className="todoList-write-submit-btn">게시</button>
            </form>
        </div>
    )
}