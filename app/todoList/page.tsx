'use client' // ← Next.js App Router라면 꼭 넣어야 함 (Pages Router면 생략)

import { useState, useEffect } from 'react'
import { supabase } from '@/utils/supabase'
import Link from 'next/link';

// todos 테이블의 데이터 구조에 맞게 타입 정의 (가장 중요!)
type Todo = {
  id: string
  title: string
  content: string
  is_complete: boolean
  created_at: string
}

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function getTodos() {
      try {
        setLoading(true)
        setError(null)

        const { data, error } = await supabase
          .from('todos')
          .select('*')

        console.log(data);

        if (error) {
          throw error
        }

        setTodos(data || [])
      } catch (err: any) {
        console.error('할 일 목록 불러오기 실패:', err)
        setError(err.message || '데이터를 불러오지 못했습니다.')
      } finally {
        setLoading(false)
      }
    }

    getTodos()
  }, [])

  if (loading) return <div>로딩 중...</div>
  if (error) return <div>에러: {error}</div>

  return (
    <div>
      <h1 className="title">할 일 목록</h1>
      {todos.length === 0 ? (
        <p>할 일이 없습니다.</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li className='todo' key={todo.id}>
              <Link href={`/todoList/${todo.id}`}>{todo.title} {todo.is_complete ? 'o' : 'x'}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}