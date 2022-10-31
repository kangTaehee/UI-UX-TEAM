# react-query

## install 

```yarn add @tanstack/react-query```

## useQuery

동기적으로 실행됨

```javascript
const { data: todoList, error, isFetching } = useQuery("todos", fetchTodoList);
const { data: nextTodo, error, isFetching } = useQuery(
  "nextTodos",
  fetchNextTodoList,
  {
    enabled: !!todoList // true가 되면 fetchNextTodoList를 실행한다
  }
);
```

### invalidateQueries

```javascript
queryClient.invalidateQueries("bordinfolist");
// 파라미터로 넣어준 쿼리키에 해당하는 쿼리를 명시적으로 stale 하다고 알려주고, 해당 쿼리 데이터를 새로 받아온다. ( refetch )
// 업데이트는 비동기 이기때문에 동기작업이 끝난 후에 실행되어야 한다
```

### 데이터요청 및 상태값

|fresh| fetching| paused| stale| inactive|
|최신|요청됨||최근 데이터|

[부가설명](https://jforj.tistory.com/243)


### 윈도우 포커스 변경에 따른 서버 재호출 옵션(refetch window focus 설정)

```javascript
// 전역설정
import * as React from 'react';
import ReactDom from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';

const queryClient = new QueryClient(
    {
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false, // window focus 설정
            }
        }
    }
); // queryClient 생성

ReactDom.render(
    // App에 QueryClient 제공
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>, 
    document.querySelector('#root')
);

// 1
const res = useQuery(['persons'], () => axios.get('http://localhost:8080/persons'), {
    refetchOnWindowFocus: false // window focus 설정
});

// 2
const res = useQuery({
    queryKey: ['persons'],
    queryFn: () => axios.get('http://localhost:8080/persons'),
    refetchOnWindowFocus: false // window focus 설정
});
```

### 쿼리 자동실행 방지

```id```유무에 따른 실행 조건 예시
enabled:true[default]

```javascript
// if문사용
if(id) {
    const res = axios.get('http://localhost:8080/person', {
        params: {
            id: id,
        }
    })
}
// 1
const res = useQuery(['person', id], () => axios.get('http://localhost:8080/person', {
    params: {
        id: id,
    }
}), {
    enabled: !!id // 코드 자동 실행 설정
});

// 2
const res1 = useQuery({
    queryKey: ['person', id],
    queryFn: () => axios.get('http://localhost:8080/person', {
        params: {
            id: id,
        }
    }),
    enabled: !!id // 코드 자동 실행 설정
});
```

## useMutation

기본형
```javascript
import { useMutation } from "react-query";
// 더 많은 return 값들이 있다. 
const { data, isLoading, mutate, mutateAsync } = useMutation(mutationFn, options);
```

### sample [더보기](https://tanstack.com/query/v4/docs/reference/useMutation?from=reactQueryV3&original=https://react-query-v3.tanstack.com/reference/useMutation)

```typeScript
import { useMutation } from "react-query";
import axios from 'axios';
interface TodoType {
  id: number;
  todo: string;
}
const addTodo = async (newTodo: TodoType): Promise<TodoType> => {
  const { data } = await axios.post<TodoType>(`/todos`, newTodo);
  return data;
};
// api 요청하는 함수(addTodo) 를 작성하지 않았을 경우
const { mutate, isLoading, isError, error, isSuccess } = useMutation(newTodo => {
  return axios.post<TodoType>('/todos', newTodo);
});
// api 요청하는 함수(addTodo) 를 작성했을 경우
const { mutate, isLoading, isError, error, isSuccess } = useMutation(addTodo);
export default function App() {
  return (
    <div>
      {
        isLoading ? (
          'Adding todo...'
        ) : (
        <>
          {isError && <p>error: {error.message}</p>}
          {isSuccess && <p>Todo added!</p>}
          <button
            onClick={() => {
              mutate({ id: 1, todo: 'useMutation 블로그 작성하기' })
            }}
          >
               작성 완료
          </button>
        </>
        )
      }
    </div>
  );
}
```