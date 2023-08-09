# DOZN HOMEWORK

### 개발환경

node.js : 16.14.0  
axios : 1.4.0

### 실행방법

```
npm init
node cgvlogin.js // 과제 1번
node banapresso.js // 과제 2번
```

### 과제 1. CGV idLogin 분석하기

cgv 로그인 코드 분석

```javascript
var $frm = $("#form1");
$frm.validate({
  submitHandler: function (form) {
    var $loginFrm = $("#loginform");

    $loginFrm
      .find("#id")
      .val(app.crypto.AESEncryptToBase64($frm.find("#txtUserId").val()));
    $loginFrm
      .find("#password")
      .val(app.crypto.AESEncryptToBase64($frm.find("#txtPassword").val()));

    $loginFrm.submit();
    return false;
  }
});
```

crypto.js 파일의 `AESEcryptToBase64` 함수를 찾아봤습니다.

```javascript
var _AESEncryptToBase64 = function (s, isOriginal) {
  var bytes = System.Text.Encoding.UTF8.GetBytes(s);
  var encryptedBytes = AESEncrypt(bytes, isOriginal);
  var base64String = System.Convert.ToBase64String(encryptedBytes);
  return base64String;
};
```

주어진 문자열을 AES 암호화한 후 Base64 형식으로 인코딩하여 반환하는 함수입니다.  
여기서 `AESEncrypt` 함수는 주어진 바이트 배열을 AES로 암호화하는 역할을 합니다.

```javascript
function AESEncrypt(bytes, isOriginal) {
  var encryptor;
  if (isOriginal) {
    if (aesEncryptorOriginal == null)
      aesEncryptorOriginal = GetTransform(true, true);
    encryptor = aesEncryptorOriginal;
  } else {
    if (aesEncryptor == null) aesEncryptor = GetTransform(true, false);
    encryptor = aesEncryptor;
  }
  encryptor.Clear();
  //encryptor = GetTransform(true, isOriginal);
  return CipherStreamWrite(encryptor, bytes);
}
```

주어진 바이트 배열을 AES 알고리즘을 사용하여 암호화하는 역할을 수행하는 함수입니다.  
`isOriginal`의 값에 따라 암호화 변환 객체를 `aesEncryptorOriginal` 이나 `aesEncryptor` 변수에 할당합니다.  
해당 변수가 null인 경우 `GetTransform` 함수를 호출하여 암호화 변환 객체를 가져옵니다.

```javascript
function GetTransform(encrypt, isOriginal) {
  var cipher = new System.Security.Cryptography.RijndaelManaged();
  var kBytes;
  var iBytes;
  if (isOriginal) {
    kBytes = // key array
    iBytes = // iv array
  } else {
    kBytes = // key array
    iBytes = // iv array
  }
  var cryptor = null;
  if (encrypt) {
    cryptor = cipher.CreateEncryptor(kBytes, iBytes);
  } else {
    cryptor = cipher.CreateDecryptor(kBytes, iBytes);
  }
  return cryptor;
}
```

`getTransform`은 암호화 및 복호화에 사용되는 key와 iv 값을 설정하는 함수입니다.

### 과제 2. 바나프레소 매장 정보 조회

크롤링 방식 의사 결정 트리

<img src="https://github.com/leejy001/dozn-homework/assets/49552804/bbbcdbcc-c139-4fce-9a69-48ba1e3dc57b" width=80%/></p>

바나프레소의 경우 메인 HTML 소스에 찾는 데이터가 존재하지 않습니다.

<img src="https://github.com/leejy001/dozn-homework/assets/49552804/b53fea47-291e-4069-90c8-a4def6925e58" width=80%/></p>

보통 웹페이지 어딘가에서 API를 호출을 추가로 데이터를 불러오기 때문일 가능성이 높습니다.  
3번인 API를 호출해서 외부에서 데이터를 불러오는 경우  
4번인 헤드리스 브라우저를 사용하는 방법이 있지만  
과제 조건에는 webbrowser, headless 등 소스상에서 브라우저를 사용한 통신은 금지하고 있기 때문에 3번 방법을 이용하여 과제를 진행했습니다.

| <p align="center">매장 정보 불러오는 API</p>                                                                                                 | <p align="center">결과 값</p>                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| <p align="center"><img src="https://github.com/leejy001/dozn-homework/assets/49552804/0f1f4e16-6ed1-4cdb-82b0-a3c3a53f6bb3" width=100%/></p> | <p align="center"><img src="https://github.com/leejy001/dozn-homework/assets/49552804/b8601b9b-795c-46b4-b5d3-45528e542ba2" width=100%/></p> |
