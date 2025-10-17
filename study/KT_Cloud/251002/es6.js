const set = new Set([1, 2, 2, 3]); // 중복 제거됨
set.add(4);

const map = new Map();
map.set("name", "Lee");
console.log(map.get("name")); // "Lee"

for (const val of set) {
  console.log(val);
}

// map 에서 for문 사용해서 키값을 사용해서 값만 출력하도록 구하시오.
// Map 객체를 생성하고 키-값 쌍을 초기화합니다.
const myMap = new Map([
  ['사과', 10],
  ['바나나', 20],
  ['체리', 30]
]);

// ----------------------------------------------------------------------
// 방법 1: 키(key)를 사용하여 값(value)을 출력 (요청하신 방식)
// ----------------------------------------------------------------------

// 1. myMap.keys()를 사용하여 키만 담긴 이터레이터(iterator)를 얻습니다.
const keys = myMap.keys();

// 2. for...of 루프를 사용하여 키 이터레이터를 반복합니다.
for (const key of keys) {
  // 3. Map.prototype.get(key) 메서드를 사용하여 현재 키에 해당하는 값을 가져옵니다.
  const value = myMap.get(key);
  console.log(value); // 값만 출력: 10, 20, 30
}

// ----------------------------------------------------------------------
// 방법 2: 값(value)만 직접 반복하여 출력 (가장 일반적인 모범 사례)
// ----------------------------------------------------------------------

console.log('--- 값만 직접 반복하여 출력 ---');

// myMap.values()를 사용하여 값만 담긴 이터레이터를 얻고, 바로 반복합니다.
// 키를 거치지 않기 때문에 더 간결하고 효율적입니다.
for (const value of myMap.values()) {
  console.log(value); // 값만 출력: 10, 20, 30
}