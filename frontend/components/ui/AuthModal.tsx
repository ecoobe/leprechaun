"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import {
  login,
  register,
  requestCode
} from "@/lib/api";

import { Button } from "@/components/ui/button";


interface AuthModalProps {
  open:boolean;
  onClose:()=>void;
}


export function AuthModal({
  open,
  onClose
}:AuthModalProps){


const [mode,setMode]
=
useState<"login"|"register">("login");


const [email,setEmail]=useState("");
const [code,setCode]=useState("");

const [password,setPassword]=useState("");
const [confirmPassword,setConfirmPassword]=useState("");


const [step,setStep]=useState(false);

const [loading,setLoading]=useState(false);

const [error,setError]=useState("");


const [showPassword,setShowPassword]=useState(false);
const [showConfirm,setShowConfirm]=useState(false);



useEffect(()=>{

if(!open){

setMode("login");

setEmail("");

setCode("");

setPassword("");

setConfirmPassword("");

setStep(false);

setError("");

setShowPassword(false);

}

},[open]);



if(!open)
return null;



async function handleLogin(){

try{

setLoading(true);
setError("");

const data =
await login(email,password);


localStorage.setItem(
"access_token",
data.access_token
);


localStorage.setItem(
"refresh_token",
data.refresh_token
);


window.location.href="/dashboard";


}
catch(err:any){

setError(err.message || "Ошибка входа");

}
finally{

setLoading(false);

}

}



async function handleRequestCode(){

try{

setLoading(true);

setError("");

await requestCode(email);


setStep(true);


}
catch(err:any){

setError(err.message || "Ошибка отправки кода");

}
finally{

setLoading(false);

}

}



async function handleRegister(){


if(password!==confirmPassword){

setError("Пароли не совпадают");

return;

}


try{

setLoading(true);

setError("");


await register(
email,
code,
password
);


await handleLogin();


}
catch(err:any){

setError(err.message || "Ошибка регистрации");

}
finally{

setLoading(false);

}


}



return (

<AnimatePresence>

<motion.div

className="modal-backdrop"

onClick={onClose}


initial={{
opacity:0
}}

animate={{
opacity:1
}}

exit={{
opacity:0
}}

>


<motion.div

className="modal panel"

onClick={
e=>e.stopPropagation()
}


initial={{
opacity:0,
y:8,
scale:.98
}}

animate={{
opacity:1,
y:0,
scale:1
}}

exit={{
opacity:0,
y:8,
scale:.98
}}

transition={{
duration:.16
}}

>


<h2 className="text-xl font-medium">

{
mode==="login"
?
"Войти"
:
"Создать аккаунт"
}

</h2>


<p className="mt-2 text-sm text-muted">

{
mode==="login"
?
"Введите данные аккаунта"
:
"Регистрация нового пользователя"
}

</p>



{error &&
<div className="alert-error mt-5">

{error}

</div>
}



<div className="mt-6 space-y-3">



<input

className="input"

placeholder="Email"

value={email}

disabled={
loading ||
(mode==="register" && step)
}

onChange={
e=>setEmail(e.target.value)
}

/>



{
mode==="register" && step &&

<input

className="input"

placeholder="Код подтверждения"

value={code}

disabled={loading}

onChange={
e=>setCode(e.target.value)
}

/>

}




{
(mode==="login" || step)
&&

<PasswordInput

value={password}

placeholder="Пароль"

disabled={loading}

show={showPassword}

setShow={setShowPassword}

onChange={setPassword}

/>

}



{
mode==="register" && step &&

<PasswordInput

value={confirmPassword}

placeholder="Повторите пароль"

disabled={loading}

show={showConfirm}

setShow={setShowConfirm}

onChange={setConfirmPassword}

/>

}



<Button

className="w-full"

disabled={loading}

onClick={
mode==="login"
?
handleLogin
:
step
?
handleRegister
:
handleRequestCode
}

>

{
loading
?
"Загрузка..."
:
mode==="login"
?
"Войти"
:
step
?
"Создать аккаунт"
:
"Получить код"
}

</Button>



</div>



<div className="mt-7 text-center text-sm">


{
mode==="login"

?

<>

<span className="text-muted">
Нет аккаунта?{" "}
</span>


<button

className="link"

onClick={()=>{
setMode("register");
setError("");
}}

>

Регистрация

</button>

</>


:

<>

<span className="text-muted">
Уже есть аккаунт?{" "}
</span>


<button

className="link"

onClick={()=>{
setMode("login");
setError("");
}}

>

Войти

</button>


</>

}


</div>



</motion.div>


</motion.div>


</AnimatePresence>

)

}



function PasswordInput({

value,

placeholder,

disabled,

show,

setShow,

onChange


}:any){


return (

<div className="relative">


<input

className="input pr-12"

type={
show
?
"text"
:
"password"
}

placeholder={placeholder}

value={value}

disabled={disabled}

onChange={
e=>onChange(e.target.value)
}

/>


<button

type="button"

className="
absolute
right-3
top-1/2
-translate-y-1/2
text-zinc-500
hover:text-white
"

onClick={()=>setShow(!show)}

>

{
show
?
<EyeOff size={17}/>
:
<Eye size={17}/>
}

</button>


</div>

)

}