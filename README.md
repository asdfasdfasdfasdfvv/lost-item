# Lost Item Search Platform

## 프로젝트 소개
이 프로젝트는 여러 관공서 페이지에 흩어져 있는 분실물 정보를 하나의 플랫폼에서 조회할 수 있도록 만든 웹 애플리케이션입니다. 공공 API를 활용하여 사용자가 필요한 분실물 정보를 편리하게 검색할 수 있도록 중점을 두고 개발되었습니다.

## 기술적 배경
이 프로젝트를 통해 사용한 커스텀 폼 컨트롤 개발에 중점을 두어, 재사용성과 가독성 좋은 Form 구성해 보고자 했습니다.

## 학습 포인트
- **Custom Hook 구현**: `useForm` 커스텀 훅을 통해 재사용 가능한 폼 로직을 만들어 폼 구성요소 간의 상태 공유가 용이하도록 설계하였습니다.

## 사용 방법
## useForm Hook 사용 방법

`useForm`은 폼의 상태 관리를 위한 커스텀 훅으로, 폼 요소의 유효성 검사, 상태 업데이트 및 폼 제출 처리를 담당합니다. 이 훅은 각 폼 필드의 초기 상태, 변경 이벤트 핸들러, 그리고 필드 값 설정 함수를 제공합니다.

### 기본 구조

`useForm` 훅은 `FormSchema` 타입의 스키마를 인자로 받아, 폼의 상태와 관련 함수들을 반환합니다. 사용자는 이 훅을 통해 폼 필드를 동적으로 생성하고 관리할 수 있습니다.

```typescript
import { useForm } from './path/to/useForm';

// 폼 스키마 정의
const formSchema = {
  name: {
    key: 'form_name',
    value: '',
    type: 'text',
    controlled: true,
    validate: (value: string) => {
      if (!value.trim()) return 'Name is required';
      return null;
    }
  },
  age: {
    key: 'form_age',
    value: '',
    type: 'number',
    controlled: true,
    validate: (value: string) => {
      if (isNaN(Number(value))) return 'Age must be a number';
      if (Number(value) < 18) return 'You must be at least 18 years old';
      return null;
    }
  }
};

// 컴포넌트에서 useForm 사용
const MyFormComponent = () => {
  const {
    form,
    handleOnChange,
    handleOnSubmit,
    getFormFields
  } = useForm(formSchema);

  // 폼 제출 핸들러
  const handleSubmit = async (event, formData, { isFormValid, error }) => {
    if (!isFormValid) {
      alert(`Error: ${error}`);
      return;
    }
    // 폼 데이터 처리 로직
    console.log('Form Data:', formData);
  };

  const { renderFields } = getFormFields();

  return (
    <form onSubmit={handleOnSubmit(handleSubmit)}>
      {Object.keys(renderFields).map((key) => (
        <div key={key}>
          {renderFields[key]}
          <div>
            {form[key].error && <span>{form[key].error}</span>}
          </div>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};
```
- formSchema: 각 필드에 대한 정의를 포함합니다. 이는 필드의 기본 값, 유효성 검사 함수 및 기타 필요한 설정을 포함할 수 있습니다.
- handleOnChange: 필드 값이 변경될 때 호출되는 함수로, 필드의 유효성 검사를 실행하고 폼의 상태를 업데이트합니다.
- handleOnSubmit: 폼 제출 시 호출되는 함수로, 폼 데이터의 유효성을 최종 검증하고, 유효한 경우 제출 이벤트를 처리합니다.
- getFormFields: 폼의 각 필드를 렌더링하기 위한 컴포넌트를 반환합니다. 이 함수는 폼의 현재 상태에 따라 적절한 입력 컴포넌트와 유효성 검사 결과를 제공합니다.



## useForm Hook 확장 사용법

`useForm` 훅은 폼의 각 필드를 동적으로 렌더링하기 위해 커스텀 컴포넌트를 사용할 수 있도록 지원합니다. 이를 통해 개발자는 폼 필드에 대해 더욱 유연하게 커스터마이즈 할 수 있습니다.

### InputComponent 추가

`InputComponent`는 폼 필드를 렌더링하기 위해 사용자 정의 컴포넌트입니다. 이 컴포넌트는 필드의 유효성 검사 결과와 함께 사용자 입력을 처리하고 표시하는 역할을 합니다.

```typescript
// InputComponent 정의
const InputComponent = ({ args, controller }) => {
  const { value, handleOnChange, name, placeholder } = args;

  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={(e) => handleOnChange({ event: e, inputData: { name, value: e.target.value } })}
      placeholder={placeholder}
    />
  );
};

// 폼 스키마에 InputComponent 통합
const formSchema = {
  name: {
    key: 'form_name',
    value: '',
    type: 'text',
    controlled: true,
    placeholder: 'Enter your name',
    component: InputComponent, // 사용자 정의 입력 컴포넌트 지정
    validate: (value: string) => {
      if (!value.trim()) return 'Name is required';
      return null;
    }
  },
  // 다른 필드 정의...
};

// 컴포넌트에서 useForm 사용
const MyFormComponent = () => {
  const {
    form,
    handleOnChange,
    handleOnSubmit,
    getFormFields
  } = useForm(formSchema);

  const { renderFields } = getFormFields();

  return (
    <form onSubmit={handleOnSubmit(handleSubmit)}>
      {Object.keys(renderFields).map((key) => (
        <div key={key}>
          {renderFields[key]}
          <div>
            {form[key].error && <span>{form[key].error}</span>}
          </div>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};
```
- InputComponent: 이 컴포넌트는 args와 controller를 인자로 받아, 필요한 폼 필드를 렌더링합니다. args는 필드의 속성(예: name, value, placeholder)을 포함하며, controller는 폼의 상태를 제어하는 함수들을 포함합니다.
- handleOnChange: 폼 필드 값이 변경될 때마다 호출되며, 폼의 유효성 검사 및 상태 업데이트를 수행합니다.
- component: 폼 스키마 정의에서 각 필드에 대해 사용자 정의 컴포넌트를 지정할 수 있습니다. 이를 통해 표준 HTML 입력 필드 이외의 복잡한 UI 구성요소를 폼에 통합할 수 있습니다.
