@echo off
set  gitcmd=%~1
if "%gitcmd%" == "" (
    set gitcmd=push
)else if "%gitcmd:~-4%" == "help" (
    goto help
)
set  gitUrl=%~2
set  user=%~3
 if  "%user%" == ""  (
     set user=%COMPUTERNAME% 
 )
goto %user%

:ZQLT
set gitBinpath=./
set workdir=%~dp0
goto MAIN

:push
git add *
set /p CommonStr="please input the Notes:"
git commit -m "normal %date% %time% %CommonStr%"

::echo set pws=WScript.CreateObject("WScript.Shell")>%temp%\pws.vbs
::echo pws.SendKeys "xxxx{ENTER}">>%temp%\pws.vbs
::echo pws.SendKeys "xxxx{ENTER}">>%temp%\pws.vbs

wscript pws.vbs & git %gitcmd% %gitUrl%
goto END

:pull
git %gitcmd% %gitUrl%
goto END

:help
echo help cmd user:\n xxx.bat [cmd] [giturl] [user]
echo cmd       [push] or [pull]
echo giturl    remote gitrep url 
echo           example: https://github.com/paulli3/htmllayouttest.git master
echo user      computer name
echo           it will use the diffrent config by this name

goto END

:MAIN
chdir %workdir%
%workdir:~0,2%
set path=%path%;%gitBinpath%;
goto %gitcmd%


:END






