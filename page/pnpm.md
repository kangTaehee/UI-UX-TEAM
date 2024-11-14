# pnpm

## Powershell 설치

* ```iwr https://get.pnpm.io/install.ps1 -useb | iex```
* ```npm install -g pnpm```

## guide

|         npm        |                       pnpm                       |
|:------------------:|:------------------------------------------------:|
| npm install        | pnpm install                                     |
| npm i &lt;pkg&gt;        | [pnpm add &lt;pkg&gt;]                                 |
| npm run &lt;cmd&gt;      | [pnpm &lt;cmd&gt;]                                     |
| pnpm up &quot;@babel/*&quot; | @babel 범위 아래의 모든 의존성을 업데이트합니다. |

|       명령어       |                                 의미                                 |
|:------------------:|:--------------------------------------------------------------------:|
| pnpm up            | package.json에 지정된 범위를 준수하여, 모든 의존성을 업데이트합니다. |
| pnpm up --latest   | package.json에 지정된 범위를 무시하고, 모든 의존성을 업데이트합니다. |
| pnpm up foo@2      | foo 를 v2의 최신 버전으로 업데이트합니다.                            |
| pnpm up "@babel/*" | @babel 범위 아래의 모든 의존성을 업데이트합니다.                     |

## pnpm run

별칭: `run-script`

패키지의 매니페스트 파일에 정의된 스크립트를 실행합니다.

### 예시[​](#예시 "Direct link to 예시")

다음과 같이 `package.json`에 구성된 `watch` 스크립트가 있다고 가정해 보겠습니다.

    "scripts": {    "watch": "webpack --watch"}

이제 `pnpm run watch`을 사용하여 해당 스크립트를 실행할 수 있습니다! 간단하지요? 키 입력과 시간을 절약하는 것을 좋아하는 사람들을 위해 주목해야 할 또 다른 사항은 모든 스크립트가 pnpm 명령으로 앨리어싱된다는 것입니다. 따라서 궁극적으로 `pnpm watch` 는 `pnpm run watch` 의 축약형입니다 (이미 존재하는 pnpm 명령과 동일한 이름을 공유하지 않는 스크립트에만 해당함).

## site

* [pnpm.io](https://pnpm.io/ko/installation)
