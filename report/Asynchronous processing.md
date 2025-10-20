# 비동기 처리와 Promise, async/await 개념 정리

## 1. 동기와 비동기

### 동기(Synchronous) 처리
동기 처리는 작업이 순차적으로 실행되며, 하나의 작업이 완료될 때까지 다음 작업이 대기하는 방식입니다.

```javascript
console.log('첫 번째');
console.log('두 번째');
console.log('세 번째');
// 출력: 첫 번째 → 두 번째 → 세 번째
```

### 비동기(Asynchronous) 처리
비동기 처리는 특정 작업이 완료되기를 기다리지 않고 다음 작업을 실행하는 방식입니다. 주로 시간이 오래 걸리는 작업(네트워크 요청, 파일 읽기 등)에 사용됩니다.

```javascript
console.log('첫 번째');
setTimeout(() => {
  console.log('두 번째');
}, 1000);
console.log('세 번째');
// 출력: 첫 번째 → 세 번째 → 두 번째 (1초 후)
```

## 2. 콜백(Callback) 함수

비동기 처리의 가장 기본적인 방법은 콜백 함수를 사용하는 것입니다.

```javascript
function fetchData(callback) {
  setTimeout(() => {
    const data = { id: 1, name: 'John' };
    callback(data);
  }, 1000);
}

fetchData((data) => {
  console.log(data);
});
```

### 콜백 지옥(Callback Hell)
콜백이 중첩되면 코드의 가독성이 떨어지고 유지보수가 어려워집니다.

```javascript
getData1((data1) => {
  getData2(data1, (data2) => {
    getData3(data2, (data3) => {
      getData4(data3, (data4) => {
        console.log(data4);
      });
    });
  });
});
```

## 3. Promise

Promise는 비동기 작업의 완료 또는 실패를 나타내는 객체입니다. ES6에서 도입되어 콜백 지옥 문제를 해결합니다.

### Promise의 3가지 상태
- **Pending(대기)**: 비동기 처리가 아직 완료되지 않은 상태
- **Fulfilled(이행)**: 비동기 처리가 성공적으로 완료된 상태
- **Rejected(거부)**: 비동기 처리가 실패한 상태

### Promise 생성

```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    
    if (success) {
      resolve('성공!');
    } else {
      reject('실패!');
    }
  }, 1000);
});
```

### Promise 사용

```javascript
promise
  .then((result) => {
    console.log(result); // '성공!'
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log('작업 완료');
  });
```

### Promise 체이닝

```javascript
fetchUser()
  .then((user) => {
    return fetchPosts(user.id);
  })
  .then((posts) => {
    return fetchComments(posts[0].id);
  })
  .then((comments) => {
    console.log(comments);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Promise 정적 메서드

```javascript
// Promise.all - 모든 Promise가 이행될 때까지 대기
Promise.all([promise1, promise2, promise3])
  .then((results) => {
    console.log(results); // [result1, result2, result3]
  });

// Promise.race - 가장 먼저 이행되는 Promise의 결과 반환
Promise.race([promise1, promise2, promise3])
  .then((result) => {
    console.log(result); // 가장 먼저 완료된 결과
  });

// Promise.allSettled - 모든 Promise가 완료될 때까지 대기 (성공/실패 무관)
Promise.allSettled([promise1, promise2, promise3])
  .then((results) => {
    console.log(results);
    // [{ status: 'fulfilled', value: ... }, { status: 'rejected', reason: ... }]
  });

// Promise.any - 가장 먼저 이행되는 Promise 반환 (거부는 무시)
Promise.any([promise1, promise2, promise3])
  .then((result) => {
    console.log(result);
  });
```

## 4. async/await

async/await는 Promise를 더 간결하고 동기적인 코드처럼 작성할 수 있게 해주는 ES2017의 문법입니다.

### async 함수

async 키워드를 함수 앞에 붙이면 해당 함수는 항상 Promise를 반환합니다.

```javascript
async function fetchData() {
  return 'Hello';
}

// 위 코드는 아래와 동일합니다
function fetchData() {
  return Promise.resolve('Hello');
}
```

### await 키워드

await는 Promise가 처리될 때까지 함수의 실행을 일시 중지합니다. await는 async 함수 내에서만 사용할 수 있습니다.

```javascript
async function getData() {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  return data;
}
```

### 에러 처리

```javascript
async function fetchUser(id) {
  try {
    const response = await fetch(`https://api.example.com/users/${id}`);
    
    if (!response.ok) {
      throw new Error('사용자를 찾을 수 없습니다');
    }
    
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('에러 발생:', error);
    throw error;
  }
}
```

### 순차 처리 vs 병렬 처리

```javascript
// 순차 처리 (느림)
async function sequential() {
  const user = await fetchUser();
  const posts = await fetchPosts();
  const comments = await fetchComments();
  return { user, posts, comments };
}

// 병렬 처리 (빠름)
async function parallel() {
  const [user, posts, comments] = await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchComments()
  ]);
  return { user, posts, comments };
}
```

## 5. 실전 예제

### API 호출 예제

```javascript
async function getUserData(userId) {
  try {
    // 사용자 정보 가져오기
    const userResponse = await fetch(`https://api.example.com/users/${userId}`);
    const user = await userResponse.json();
    
    // 사용자의 게시글 가져오기
    const postsResponse = await fetch(`https://api.example.com/users/${userId}/posts`);
    const posts = await postsResponse.json();
    
    return {
      user,
      posts,
      totalPosts: posts.length
    };
  } catch (error) {
    console.error('데이터를 가져오는 중 오류 발생:', error);
    throw error;
  }
}

// 사용
getUserData(1)
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

### 여러 비동기 작업 처리

```javascript
async function fetchMultipleUsers(userIds) {
  try {
    const promises = userIds.map(id => 
      fetch(`https://api.example.com/users/${id}`).then(res => res.json())
    );
    
    const users = await Promise.all(promises);
    return users;
  } catch (error) {
    console.error('사용자 데이터 로드 실패:', error);
    return [];
  }
}

// 사용
fetchMultipleUsers([1, 2, 3, 4, 5])
  .then(users => console.log(users));
```

## 6. 주요 포인트

### Promise를 사용해야 하는 경우
- 콜백 지옥을 피하고 싶을 때
- 여러 비동기 작업을 조합해야 할 때
- 에러 처리를 일관되게 하고 싶을 때

### async/await를 사용해야 하는 경우
- 코드를 더 읽기 쉽게 만들고 싶을 때
- 동기 코드처럼 순차적으로 작성하고 싶을 때
- try/catch로 에러를 처리하고 싶을 때

### 주의사항
- await는 async 함수 내에서만 사용 가능
- async 함수는 항상 Promise를 반환
- Promise 체인에서 에러 처리를 잊지 말 것
- 불필요한 순차 처리보다는 병렬 처리를 고려할 것

## 7. 정리

비동기 처리는 현대 JavaScript 프로그래밍의 핵심입니다. 콜백에서 Promise로, 그리고 async/await로 발전하면서 더 읽기 쉽고 유지보수하기 좋은 코드를 작성할 수 있게 되었습니다. 각 방법의 장단점을 이해하고 상황에 맞게 적절히 사용하는 것이 중요합니다.
